import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Card, Button, Input, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { clearErrors, userPasswordUpdate } from '../reudx/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PASSWORD_RESET } from '../reudx/types/userTypes';

const UpdatePassword = ({ history }) => {
  const { isUpdated, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      notification.error({
        title: 'An Error Has Occurred',
        description: error,
      });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      notification.success({
        title: 'Password updated Successfully',
        description: 'Password updated Successfully',
      });
      history.push('/me');
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, history, isUpdated]);

  const onFinish = ({ password, oldPassword }) => {
    const formData = new FormData();
    formData.set('password', password);
    formData.set('lodPassword', oldPassword);
    dispatch(userPasswordUpdate(formData));
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
              name='oldPassword'
              label='Old Password'
              required
              rules={[
                {
                  required: true,
                  message: 'Please input your old password!',
                },
              ]}
              hasFeedback>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='password'
              label='Password'
              required
              rules={[
                {
                  required: true,
                  message: 'Please input your new password!',
                },
              ]}
              hasFeedback>
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                size='large'
                block
                disabled={loading}
                htmlType='submit'
                className='login-form-button'>
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdatePassword;
