import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Typography,
  notification,
  PageHeader,
  Descriptions,
  Image,
  List,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../reudx/actions/orderActions';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const { Title, Text } = Typography;
const OrderDetailsPage = ({ match }) => {
  const { order = {}, error, loading } = useSelector(
    (state) => state.orderDetails
  );
  const { shippingInfo, orderItems, user, totalPrice, paymentInfo } = order;
  const orderId = match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    if (error) {
      notification.error({
        title: error,
        description: error,
      });
    }
  }, [dispatch, error, orderId]);

  const isPaid = !!paymentInfo?.status;

  return (
    <Row>
      {loading ? (
        <Loader />
      ) : (
        <Col span={20} offset={2}>
          <Title>Order #${orderId}</Title>
          <PageHeader title='Shipping Info' ghost={false}>
            <Descriptions column={1}>
              <Descriptions.Item label='Name'>{user?.name}</Descriptions.Item>
              <Descriptions.Item label='Phone'>
                {shippingInfo.phoneNo}
              </Descriptions.Item>
              <Descriptions.Item label='Address'>
                {shippingInfo.address},{shippingInfo.city},
                {shippingInfo.country}
              </Descriptions.Item>
              <Descriptions.Item label='Amount'>
                ${totalPrice}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>

          <Title level={3}>Payment </Title>
          {isPaid ? (
            <Text type='success' strong>
              Paid
            </Text>
          ) : (
            <Text type='danger' strong>
              Not Paid
            </Text>
          )}
          <Title level={3}>Order Status </Title>
          {order?.orderStatus === 'delivered' ? (
            <Text type='success' strong>
              {order.orderStatus}
            </Text>
          ) : (
            <Text type='danger' strong>
              {order.orderStatus}
            </Text>
          )}
          <Title level={3}>Your Cart Items: </Title>
          <List
            dataSource={orderItems}
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

                  <Text>${item.price}</Text>
                  <Text>{item.quantity} Piece(s)</Text>
                </List.Item>
              );
            }}
          />
        </Col>
      )}
    </Row>
  );
};

export default OrderDetailsPage;
