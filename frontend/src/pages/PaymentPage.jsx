import React from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Typography,
  Steps,
  notification,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { createNewOrder } from '../reudx/actions/orderActions';

const { Step } = Steps;

const PaymentPage = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingInfo, cartItems, loading } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);
  const stripe = useStripe();
  const elements = useElements();
  const order = {
    orderItems: cartItems,
    shippingInfo,
  };
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }
  const onFinish = async (values) => {
    const payButton = document.querySelector('#pay-btn');
    const paymentData = {
      amount: Math.round(orderInfo.totalPrice * 100),
    };
    payButton.disabled = true;
    let res;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      res = await axios.post('/api/v1/payment/process', paymentData, config);

      const clientSecret = res.data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        payButton.disabled = false;
        notification.error({
          title: result.error.response.data.message,
          description: result.error.response.data.message,
        });
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createNewOrder(order));
          history.push('/success');
        } else {
          payButton.disabled = false;
          notification.error({
            title: 'There is some issue while payment processing',
            description: 'There is some issue while payment processing',
          });
        }
      }
    } catch (error) {
      payButton.disabled = false;
      notification.error({
        title: error.response.data.message,
        description: error.response.data.message,
      });
    }
  };

  const options = {
    style: {
      base: {
        fontSize: '16px',
      },
      invalid: { color: '#9e2146' },
    },
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
          <Step title='Confirm Order' status='finish' />
          <Step title='Payment' status='finish' />
        </Steps>
      </Col>
      <Col span={8}>
        <Card>
          <Typography.Title>Card Info</Typography.Title>
          <Form
            name='normal_login'
            layout='vertical'
            className='login-form'
            onFinish={onFinish}>
            <Form.Item
              name='cardNumber'
              label='Card Number'
              required
              rules={[
                {
                  required: true,
                  message: 'Please Enter Your Card Number',
                },
              ]}
              hasFeedback>
              <CardNumberElement options={options} />
            </Form.Item>
            <Form.Item
              name='cardExpiry'
              label='Card Expiry'
              required
              rules={[
                {
                  required: true,
                  message: 'Please Enter Your Card Expiry',
                },
              ]}
              hasFeedback>
              <CardExpiryElement options={options} />
            </Form.Item>
            <Form.Item
              name='cardCvc'
              label='Card CVC'
              required
              rules={[
                {
                  required: true,
                  message: 'Please Enter Your Card CVC',
                },
              ]}
              hasFeedback>
              <CardCvcElement options={options} />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                size='large'
                block
                disabled={loading}
                id='pay-btn'
                htmlType='submit'
                className='login-form-button'>
                Pay - ${orderInfo && orderInfo.totalPrice}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default PaymentPage;
