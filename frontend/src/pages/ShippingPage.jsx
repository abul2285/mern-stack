import React from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Typography,
  Steps,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { countries } from 'countries-list';
import { saveShippingInfo } from '../reudx/actions/cartActions';

const { Option } = Select;
const { Step } = Steps;

const ShippingPage = ({ history }) => {
  const dispatch = useDispatch();
  const countriesList = Object.values(countries);
  const { shippingInfo, loading } = useSelector((state) => state.cart);

  const onFinish = (values) => {
    dispatch(saveShippingInfo(values));
    history.push('/order/confirm');
  };
  return (
    <Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
      <Col
        span={24}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50px',
        }}>
        <Steps current={1} size='small' style={{ maxWidth: '500px' }}>
          <Step title='Shipping' status='finish' />
          <Step title='Confirm Order' status='wait' />
          <Step title='Payment' status='wait' />
        </Steps>
      </Col>
      <Col span={8}>
        <Card>
          <Typography.Title>Shipping Info</Typography.Title>
          <Form
            name='normal_login'
            layout='vertical'
            className='login-form'
            initialValues={{
              address: shippingInfo.address,
              city: shippingInfo.city,
              phoneNo: shippingInfo.phoneNo,
              postalCode: shippingInfo.postalCode,
              country: shippingInfo.country,
            }}
            onFinish={onFinish}>
            <Form.Item
              name='address'
              label='Address'
              required
              rules={[
                {
                  required: true,
                  message: 'Please Enter Your Address',
                },
              ]}
              hasFeedback>
              <Input />
            </Form.Item>
            <Form.Item
              name='city'
              label='City'
              required
              rules={[
                {
                  required: true,
                  message: 'Please Enter Your City Name',
                },
              ]}
              hasFeedback>
              <Input />
            </Form.Item>
            <Form.Item
              name='phoneNo'
              label='Phone No'
              required
              rules={[
                {
                  required: true,
                  message: 'Please Enter Your Phone No',
                },
              ]}
              hasFeedback>
              <Input />
            </Form.Item>
            <Form.Item
              name='postalCode'
              label='Postal Code'
              required
              rules={[
                {
                  required: true,
                  message: 'Please Enter Your Postal Code',
                },
              ]}
              hasFeedback>
              <Input />
            </Form.Item>
            <Form.Item
              name='country'
              label='Country'
              required
              rules={[
                {
                  required: true,
                  message: 'Please Enter Your Country',
                },
              ]}
              hasFeedback>
              <Select placeholder='Please select a country'>
                {countriesList.map((country) => (
                  <Option value={country.name} key={country.name}>
                    {country.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                size='large'
                block
                disabled={loading}
                htmlType='submit'
                shape='round'
                className='login-form-button'>
                Continue
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ShippingPage;
