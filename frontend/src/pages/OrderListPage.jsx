import React, { useEffect } from 'react';
import { Row, Col, Typography, notification, Table } from 'antd';
import Loader from '../components/Loader';
import MetaData from '../components/MetaData';
import { Link } from 'react-router-dom';
import { EyeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../reudx/actions/orderActions';

const OrderListPage = () => {
  const { loading, error, orders = [] } = useSelector(
    (state) => state.myOrders
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyOrders());
    if (error) {
      notification.error({
        title: error,
        description: error,
      });
    }
  }, [dispatch, error]);

  const data = [];
  orders.forEach((order, i) => {
    data.push({
      key: i,
      id: order._id,
      numOfItems: order.orderItems.length,
      amount: `$${order.totalPrice}`,
      status:
        order.orderStatus === 'delivered' ? (
          <Typography.Text type='success'>{order.orderStatus}</Typography.Text>
        ) : (
          <Typography.Text type='danger'>{order.orderStatus}</Typography.Text>
        ),
      action: (
        <Link to={`/order/${order._id}`}>
          <EyeFilled />
        </Link>
      ),
    });
  });

  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'id',
      key: 'id',
      width: '30%',
    },
    {
      title: 'Number of Items',
      dataIndex: 'numOfItems',
      key: 'numOfItems',
      width: '20%',
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
    <Row>
      <Col span={16} offset={4} style={{ height: '50px' }}>
        <Typography.Title>MY Orders</Typography.Title>
      </Col>
      <Col span={16} offset={4}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <MetaData title='My Orders' />
            <Table columns={columns} dataSource={data} bordered />
          </>
        )}
      </Col>
    </Row>
  );
};

export default OrderListPage;
