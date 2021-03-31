import React from 'react';
import {
  Row,
  Col,
  Card,
  Steps,
  Typography,
  List,
  Divider,
  Button,
  PageHeader,
  Descriptions,
  Image,
} from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Step } = Steps;
const { Title, Text } = Typography;

const OrderConfirmPage = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = 0.05 * itemsPrice;
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const handleProcced = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    history.push('/payment');
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
          <Step title='Payment' status='wait' />
        </Steps>
      </Col>
      <Col span={12} offset={2}>
        <PageHeader title='Shipping Info'>
          <Descriptions column={1}>
            <Descriptions.Item label='Name'>{user?.name}</Descriptions.Item>
            <Descriptions.Item label='Phone'>
              {shippingInfo.phoneNo}
            </Descriptions.Item>
            <Descriptions.Item label='Address'>
              {shippingInfo.address},{shippingInfo.city},{shippingInfo.country}
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
        <Title level={3}>Your Cart Items: </Title>
        <List
          dataSource={cartItems}
          bordered
          renderItem={(item) => {
            return (
              <List.Item>
                <Image src='' alt='cart-img' />
                <Link
                  to={`/products/${item.product}`}
                  style={{ width: '200px' }}>
                  <Text>{item.name}</Text>
                </Link>

                <Text>
                  {item.quantity} x ${item.price} = $
                  {item.quantity * item.price}
                </Text>
              </List.Item>
            );
          }}
        />
      </Col>
      <Col span={6} offset={2}>
        <Card>
          <Title>Order Summary</Title>
          <List.Item>
            <Text>Subtotal</Text>
            <Text strong>{itemsPrice}</Text>
          </List.Item>
          <List.Item>
            <Text>Shipping</Text>
            <Text strong>{shippingPrice}</Text>
          </List.Item>
          <List.Item>
            <Text>Tax</Text>
            <Text strong>{taxPrice.toFixed(2)}</Text>
          </List.Item>
          <Divider />
          <List.Item>
            <Text>Total</Text>
            <Text strong>{totalPrice}</Text>
          </List.Item>
          <Divider />
          <Button
            size='large'
            shape='round'
            block
            type='primary'
            onClick={handleProcced}>
            Procced to payment
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderConfirmPage;
