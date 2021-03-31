import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Card, Button, Input, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { userRegister, clearErrors } from '../reudx/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const RegisterPage = ({ history }) => {
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/avatar.png');
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    if (error) {
      notification.error({
        title: 'An Error Has Occurred',
        description: error,
      });
      dispatch(clearErrors());
    }
  }, [dispatch, error, history, isAuthenticated]);
  const onFinish = ({ name, email, password }) => {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('avatar', avatar);
    dispatch(userRegister(formData));
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
            initialValues={{ email: '', password: '' }}
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
            <Form.Item
              name='password'
              label='Password'
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}>
              <Input
                size='large'
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item>
              <div>
                <figure>
                  <img
                    src={avatarPreview}
                    alt='avatar'
                    width='50'
                    height='50'
                  />
                </figure>
              </div>
              <Form.Item>
                <input
                  size='large'
                  name='avatar'
                  accept='image/*'
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
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterPage;
