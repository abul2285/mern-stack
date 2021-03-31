import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Card, Button, Input, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  clearErrors,
  userLoad,
  userProfileUpdate,
} from '../reudx/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PROFILE_RESET } from '../reudx/types/userTypes';

const UpdateProfile = ({ history }) => {
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/avatar.png');
  const { user } = useSelector((state) => state.auth);
  const { isUpdated, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      notification.error({
        title: 'An Error Has Occurred',
        description: error,
      });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      notification.success({
        title: 'Profile updated Successfully',
        description: 'Profile updated Successfully',
      });
      dispatch(userLoad());

      history.push('/me');
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, history, isUpdated, user]);

  const onFinish = ({ name, email }) => {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('avatar', avatar);
    dispatch(userProfileUpdate(formData));
  };

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <Col span={8}>
        <Card hoverable>
          <Form
            name='normal_login'
            layout='vertical'
            className='login-form'
            initialValues={{ name: user?.name, email: user?.email }}
            onFinish={onFinish}>
            <Form.Item
              name='name'
              label='Name'
              rules={[{ required: true, message: 'Please input your Email!' }]}>
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='User Name'
                size='large'
                type='text'
              />
            </Form.Item>

            <Form.Item
              name='email'
              label='Email'
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'Please input a valid Email!' },
              ]}>
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='User Email'
                size='large'
                type='email'
              />
            </Form.Item>

            <Form.Item>
              <div>
                <figure>
                  <img src={avatarPreview} alt='avatar' />
                </figure>
              </div>
              <Form.Item>
                <input
                  size='large'
                  name='avatar'
                  accept='images/*'
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='file'
                  onChange={onChange}
                />
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                size='large'
                block
                disabled={loading}
                htmlType='submit'
                className='login-form-button'>
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateProfile;
