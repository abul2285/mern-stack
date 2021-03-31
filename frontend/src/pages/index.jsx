import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {
  Layout,
  Row,
  notification,
  Col,
  Input,
  Button,
  Typography,
  Space,
  Badge,
  Menu,
  Dropdown,
} from 'antd';
import HomePage from './HomePage';
import ProductDetailsPage from './ProductDetailsPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import store from '../reudx/store';
import {
  userLoad,
  userLogout,
  clearErrors,
} from '../reudx/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePage from './ProfilePage';
import ProtectedRoute from '../routes/ProtectedRoute';
import UpdateProfile from './UpdateProfile';
import UpdatePasswordPage from './UpdatePasswordPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import ResetPasswordPage from './ResetPasswordPage';
import CartPage from './CartPage';
import ShippingPage from './ShippingPage';
import OrderConfirmPage from './OrderConfirmPage';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import PaymentPage from './PaymentPage';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccessPage from './OrderSuccessPage';
import OrderListPage from './OrderListPage';
import OrderDetailsPage from './OrderDetailsPage';
import Dashboard from './Dashboard';
import ProductList from './ProductList';
import ProductCreate from './ProductCreatePage';
import ProductUpdatePage from './ProductUpdatePage';
import OrderList from './OrderList';
import OrderUpdatePage from './UpdateOrderPage';
import UserList from './UserList';
import UpdateUser from './UpdateUser';
import ReviewList from './ReviewList';
const { Header, Footer, Content } = Layout;
const { Search } = Input;
const { Text } = Typography;

const Pages = () => {
  const [keyword, setKeyword] = useState('');
  const [stripeApiKey, setStripeApiKey] = useState('');
  const { user, loading, error } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(userLoad());
    async function getStripeApi() {
      const { data } = await axios.get('api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApi();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    notification.success({
      title: 'Logout Success',
      description: 'Logout Success',
      placement: 'bottomLeft',
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key='0'>
        {user && user.role === 'admin' && !loading && (
          <Link to='/dashboard'>Dashboard</Link>
        )}
      </Menu.Item>
      <Menu.Item key='1'>
        <Link to='/orders/me'>Orders</Link>
      </Menu.Item>
      <Menu.Item key='2'>
        <Link to='/me'>Profile</Link>
      </Menu.Item>
      <Menu.Item key='3'>
        <Link to='' onClick={handleLogout}>
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <Row justify='space-between' className='header-wrapper'>
            <Col className='header-logo'>
              <Link to='/'>
                <img src='/header-logo.jpg' alt='logo' />
              </Link>
            </Col>
            <Col span={12}>
              <Search
                placeholder='Enter Product Name'
                enterButton
                onSearch={setKeyword}
              />
            </Col>
            <Col>
              <Space size='large'>
                <Badge count={cartItems.length} offset={[6, -5]}>
                  <Link to='/cart'>
                    <Text style={{ color: 'white' }}>Cart</Text>
                  </Link>
                </Badge>
                {user && user.role ? (
                  <Dropdown overlay={menu} trigger={['click']}>
                    <div>
                      <img
                        src={user.avatar.url}
                        alt='avatar'
                        width='40'
                        height='40'
                      />
                      <Text>{user.name}</Text>
                    </div>
                  </Dropdown>
                ) : (
                  <Link to='/login'>
                    <Button type='primary'>Login</Button>
                  </Link>
                )}
              </Space>
            </Col>
          </Row>
        </Header>
        <Content>
          <Switch>
            <Route path='/product/:id' component={ProductDetailsPage} exact />
            <Route path='/login' component={LoginPage} exact />
            <Route path='/register' component={RegisterPage} exact />
            <Route path='/cart' component={CartPage} exact />
            <ProtectedRoute
              path='/dashboard'
              isAdimn={true}
              component={Dashboard}
              exact
            />
            <Route
              path='/password/forgot'
              component={ForgotPasswordPage}
              exact
            />
            <Route
              path='/password/reset/:token'
              component={ResetPasswordPage}
              exact
            />
            <ProtectedRoute path='/me' component={ProfilePage} exact />
            <ProtectedRoute path='/update/me' component={UpdateProfile} exact />
            <ProtectedRoute path='/shipping' component={ShippingPage} exact />
            <ProtectedRoute path='/orders/me' component={OrderListPage} exact />
            <ProtectedRoute
              path='/admin/products'
              isAdmin={true}
              component={ProductList}
              exact
            />
            <ProtectedRoute
              isAdmin={true}
              path='/admin/product'
              component={ProductCreate}
              exact
            />
            <ProtectedRoute
              isAdmin={true}
              path='/admin/orders'
              component={OrderList}
              exact
            />
            <ProtectedRoute
              isAdmin={true}
              path='/admin/product/:id'
              component={ProductUpdatePage}
              exact
            />
            <ProtectedRoute
              path='/order/:id'
              isAdmin={true}
              component={OrderDetailsPage}
              exact
            />
            <ProtectedRoute
              path='/admin/order/:id'
              isAdmin={true}
              component={OrderUpdatePage}
              exact
            />
            <ProtectedRoute
              path='/admin/users'
              isAdmin={true}
              component={UserList}
              exact
            />
            <ProtectedRoute
              path='/admin/user/:id'
              isAdmin={true}
              component={UpdateUser}
              exact
            />
            <ProtectedRoute
              path='/admin/reviews'
              isAdmin={true}
              component={ReviewList}
              exact
            />
            <ProtectedRoute
              path='/success'
              component={OrderSuccessPage}
              exact
            />
            <ProtectedRoute
              path='/order/confirm'
              component={OrderConfirmPage}
              exact
            />
            <ProtectedRoute
              path='/password/update'
              component={UpdatePasswordPage}
              exact
            />
            <Route
              path='/'
              exact
              render={(props) => <HomePage {...props} keyword={keyword} />}
            />
            {stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute path='/payment' component={PaymentPage} />
              </Elements>
            )}
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Shopping Cart - 2020-2021 all rights reserved
        </Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default Pages;
