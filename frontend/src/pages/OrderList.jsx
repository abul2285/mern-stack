import React, { useEffect } from 'react';
import { Col, Layout, Row, Typography, notification, Table, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from '../reudx/actions/orderActions';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Loader from '../components/Loader';
import MetaData from '../components/MetaData';
import { DELETE_ORDER } from '../reudx/types/orderTypes';

const { Content } = Layout;
const { Title, Text } = Typography;

const OrderList = () => {
  const { loading, error, orders = [] } = useSelector((state) => state.orders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
    if (error || deleteError) {
      notification.error({
        title: error || deleteError,
        description: error || deleteError,
      });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      notification.success({
        title: 'Product deleted successfully',
        description: 'Product deleted successfully',
        placement: 'bottomLeft',
      });
      dispatch({ type: DELETE_ORDER.RESET });
    }
  }, [deleteError, dispatch, error, isDeleted]);

  const data = [];
  orders.forEach((order, i) => {
    data.push({
      key: i,
      id: order._id,
      numOfItems: order.orderItems.length,
      amount: `$${order.totalPrice}`,
      status:
        order.orderStatus === 'delivered' ? (
          <Text type='success'>{order.orderStatus}</Text>
        ) : (
          <Text type='danger'>{order.orderStatus}</Text>
        ),
      action: (
        <Space>
          <Link to={`/admin/order/${order._id}`}>
            <EditOutlined
              style={{
                width: '30px',
                height: '30px',
                color: 'green',
              }}
            />
          </Link>
          <DeleteOutlined
            onClick={() => dispatch(deleteOrder(order._id))}
            style={{
              width: '30px',
              height: '30px',
              color: 'red',
            }}
          />
        </Space>
      ),
    });
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '30%',
    },
    {
      title: 'Num Of Item',
      dataIndex: 'numOfItems',
      key: 'numOfItems',
      width: '40%',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  return (
    <Layout>
      <SideBar />
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <Row justify='center'>
            <Col>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <MetaData title='Orders list' />
                  <Title level={2}>All Orders:</Title>
                  <Table columns={columns} dataSource={data} bordered />
                </>
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default OrderList;
