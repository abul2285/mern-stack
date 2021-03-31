import React, { useEffect } from 'react';
import {
  Card,
  Col,
  Layout,
  Row,
  Button,
  Typography,
  PageHeader,
  notification,
} from 'antd';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAdminProducts } from '../reudx/actions/productActions';
import SideBar from '../components/SideBar';
import { getAllOrders } from '../reudx/actions/orderActions';
const { Title } = Typography;

const { Content } = Layout;

const Dashboard = () => {
  const { error, adminProducts = [] } = useSelector((state) => state.products);
  const { orders, totalAmount } = useSelector((state) => state.orders);
  const { users } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    if (error) {
      notification.error({
        title: error,
        description: error,
      });
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  let outOfStock = 0;
  adminProducts.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });
  return (
    <Layout>
      <SideBar />
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <Row gutter={[5, 10]}>
            <Title>Dashboard</Title>
            <Col span={24}>
              <PageHeader ghost={false}>
                <div className='dashboard-article'>
                  <article>Total Amount</article>
                  <article>${totalAmount && totalAmount}</article>
                </div>
              </PageHeader>
            </Col>
            <Col span={6}>
              <Card
                className='dashboard-card'
                actions={[
                  <Link to='/'>
                    <Button block type='primary' size='large'>
                      View details
                    </Button>
                  </Link>,
                ]}>
                <div className='dashboard-article'>
                  <article>Products</article>
                  <article>{adminProducts.length}</article>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className='dashboard-card'
                actions={[
                  <Link to='/'>
                    <Button block type='primary' size='large'>
                      View details
                    </Button>
                  </Link>,
                ]}>
                <div className='dashboard-article'>
                  <article>Orders</article>
                  <article>{orders && orders.length}</article>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className='dashboard-card'
                actions={[
                  <Link to='/'>
                    <Button block type='primary' size='large'>
                      View details
                    </Button>
                  </Link>,
                ]}>
                <div className='dashboard-article'>
                  <article>Users</article>
                  <article>{users && users.length}</article>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className='dashboard-card'
                actions={[
                  <Link to='/'>
                    <Button block type='primary' size='large'>
                      View details
                    </Button>
                  </Link>,
                ]}>
                <div className='dashboard-article'>
                  <article>Out of stock</article>
                  <article>{outOfStock}</article>
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
