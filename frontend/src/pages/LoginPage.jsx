import React, { useEffect } from 'react';
import { Row, Col, Form, Card, Button, Input, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { userLogin, clearErrors } from '../reudx/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LoginPage = ({ history, location }) => {
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }
    if (error) {
      notification.error({
        title: 'An Error Has Occurred',
        description: error,
      });
      dispatch(clearErrors());
    }
  }, [dispatch, error, history, isAuthenticated, redirect]);
  const onFinish = (values) => {
    dispatch(userLogin(values));
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
              name='email'
              label='Email'
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'Please input a valid Email!' },
              ]}>
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Username'
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
              <Link to='/password/forgot'>Forgot Password</Link>
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                size='large'
                block
                htmlType='submit'
                className='login-form-button'>
                Log in
              </Button>
              Or <Link to='/register'>Register Now</Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
