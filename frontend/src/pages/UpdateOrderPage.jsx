import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Layout,
  Typography,
  notification,
  PageHeader,
  Descriptions,
  Image,
  List,
  Button,
  Card,
  Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, updateOrder } from '../reudx/actions/orderActions';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import SideBar from '../components/SideBar';
import { UPDATE_ORDER } from '../reudx/types/orderTypes';
import MetaData from '../components/MetaData';

const { Title, Text } = Typography;
const { Content } = Layout;

const OrderUpdatePage = ({ match, history }) => {
  const { order = {}, error, loading } = useSelector(
    (state) => state.orderDetails
  );
  const { isUpdated } = useSelector((state) => state.order);
  const { shippingInfo, orderItems, user, totalPrice, paymentInfo } = order;
  const [status, setStatus] = useState(order?.orderStatus);
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
    if (isUpdated) {
      notification.success({
        title: 'Order status updated succefully',
        description: 'Order status updated succefully',
        placement: 'bottomLeft',
      });
      dispatch({ type: UPDATE_ORDER.RESET });
    }
  }, [dispatch, error, history, isUpdated, orderId]);

  const isPaid = !!paymentInfo?.status;

  const handleUpdateOrder = () => {
    dispatch(updateOrder(orderId, { status }));
  };

  return (
    <Layout>
      <SideBar />
      <MetaData title='Order Statsu' />
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <Row>
            {loading ? (
              <Loader />
            ) : (
              <>
                <Col span={16}>
                  <Title>{orderId}</Title>
                  <PageHeader title='Shipping Info' ghost={false}>
                    <Descriptions column={1}>
                      <Descriptions.Item label='Name'>
                        {user?.name}
                      </Descriptions.Item>
                      <Descriptions.Item label='Phone'>
                        {shippingInfo?.phoneNo}
                      </Descriptions.Item>
                      <Descriptions.Item label='Address'>
                        {shippingInfo?.address},{shippingInfo?.city},
                        {shippingInfo?.country}
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
                  <Title level={3}>Stripe ID </Title>
                  <Text type='success' strong>
                    {paymentInfo?.id}
                  </Text>
                  <Title level={3}>Order Status </Title>
                  {order?.orderStatus === 'delivered' ? (
                    <Text type='success' strong>
                      {order?.orderStatus}
                    </Text>
                  ) : (
                    <Text type='danger' strong>
                      {order?.orderStatus}
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
                <Col span={6} offset={2}>
                  <Card>
                    <Select
                      onChange={setStatus}
                      value={status}
                      style={{ width: '100%', marginBottom: '5px' }}>
                      {['processing', 'shipped', 'delivered'].map((sts) => {
                        return (
                          <Select.Option key={sts} value={sts}>
                            {sts}
                          </Select.Option>
                        );
                      })}
                    </Select>
                    <Button
                      size='large'
                      type='primary'
                      block
                      onClick={handleUpdateOrder}>
                      Update Status
                    </Button>
                  </Card>
                </Col>
              </>
            )}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default OrderUpdatePage;
