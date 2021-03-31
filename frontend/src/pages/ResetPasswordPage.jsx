import React, { useEffect } from 'react';
import { Row, Col, Form, Card, Button, Input, notification } from 'antd';
import { clearErrors, resetPassword } from '../reudx/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const ResetPasswordPage = ({ history, match }) => {
  const { error, loading, success } = useSelector(
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
    if (success) {
      notification.success({
        title: 'Password updated Successfully',
        description: 'Password updated Successfully',
      });
      history.push('/login');
    }
  }, [dispatch, error, history, success]);

  const onFinish = (values) => {
    dispatch(resetPassword(match.params.token, values));
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
              name='password'
              label='Password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='confirmPassword'
              label='Confirm Password'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}>
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
                Send Email
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPasswordPage;
