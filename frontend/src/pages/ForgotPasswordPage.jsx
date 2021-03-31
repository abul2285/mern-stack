import React, { useEffect } from 'react';
import { Row, Col, Form, Card, Button, Input, notification } from 'antd';
import { clearErrors, forgotPassword } from '../reudx/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';

const ForgotPassword = ({ history }) => {
  const { message, error, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      notification.error({
        title: 'An Error Has Occurred',
        description: error,
      });
      dispatch(clearErrors());
    }
    if (message) {
      notification.success({
        title: message,
        description: message,
      });
    }
  }, [dispatch, error, history, message]);

  const onFinish = ({ email }) => {
    const formData = new FormData();
    formData.set('email', email);
    dispatch(forgotPassword(formData));
  };

  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <Col span={8}>
        <Card hoverable>
          <Form
            name='normal_login'
            layout='vertical'
            className='login-form'
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
                placeholder='User Email'
                size='large'
                type='email'
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                size='large'
                block
                disabled={loading}
                htmlType='submit'
                className='login-form-button'>
                Send Email
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
