import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Card,
  Button,
  Input,
  notification,
  Layout,
  Select,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from '../reudx/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_USER } from '../reudx/types/userTypes';
import SideBar from '../components/SideBar';

const { Content } = Layout;

const UpdateUser = ({ history, match }) => {
  const { user } = useSelector((state) => state.userDetails);
  const { isUpdated, error, loading } = useSelector((state) => state.user);
  const [role, setRole] = useState(user.role);
  const dispatch = useDispatch();
  const userId = match.params.id;
  useEffect(() => {
    dispatch(getUserDetails(userId));

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
      history.push('/admin/users');
      dispatch({ type: UPDATE_USER.RESET });
    }
  }, [dispatch, error, history, isUpdated, userId]);

  const onFinish = (values) => {
    dispatch(updateUser(userId, { ...values, role }));
  };

  return (
    <Layout>
      <SideBar />
      <Layout>
        <Content>
          <Row justify='center' align='middle' style={{ height: '100vh' }}>
            <Col>
              <Card hoverable>
                <Form
                  name='normal_login'
                  layout='vertical'
                  className='login-form'
                  title='Update User'
                  initialValues={{
                    name: user?.name,
                    email: user?.email,
                    role: user?.role,
                  }}
                  onFinish={onFinish}>
                  <Form.Item
                    name='name'
                    label='Name'
                    rules={[
                      { required: true, message: 'Please input your Email!' },
                    ]}>
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
                    name='role'
                    label='Role'
                    rules={[
                      { required: true, message: 'Please input user role' },
                    ]}>
                    <Select onChange={setRole} size='large' value={role}>
                      <Select.Option value='user'>User</Select.Option>
                      <Select.Option value='admin'>Admin</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type='primary'
                      size='large'
                      block
                      disabled={loading}
                      htmlType='submit'
                      className='login-form-button'>
                      Update User
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UpdateUser;
