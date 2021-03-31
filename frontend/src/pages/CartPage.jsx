import React from 'react';
import {
  Row,
  Col,
  List,
  Image,
  Typography,
  Button,
  Space,
  notification,
  Card,
  Divider,
} from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addItemToCart,
  removeItemFromCart,
} from '../reudx/actions/cartActions';
//

const { Text, Title } = Typography;

const CartPage = ({ history }) => {
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increaseQty = (id, qty, stock) => {
    const newQty = qty + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, qty) => {
    const newQty = qty - 1;

    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty));
  };

  const handleRemoveItemFromCart = (id) => {
    dispatch(removeItemFromCart(id));
    notification.success({
      title: 'Item removed successfully',
      description: 'Item removed successfully',
      placement: 'bottomLeft',
    });
  };

  const handleShipping = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col span={22} offset={1}>
        <Title level={2}>Your Cart: {cartItems.length} Items</Title>
      </Col>
      <Col span={14} offset={1}>
        {cartItems.length === 0 ? (
          <p>No Items</p>
        ) : (
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

                  <Title
                    level={3}
                    style={{
                      color: 'orangered',
                      flexBasis: '100px',
                      textAlign: 'left',
                    }}>
                    ${item.price}
                  </Title>
                  <Space>
                    <Button
                      size='small'
                      type='danger'
                      onClick={() => decreaseQty(item.product, item.quantity)}>
                      -
                    </Button>
                    <Text>{item.quantity}</Text>
                    <Button
                      size='small'
                      type='primary'
                      onClick={() =>
                        increaseQty(item.product, item.quantity, item.stock)
                      }>
                      +
                    </Button>
                  </Space>
                  <DeleteFilled
                    style={{ color: 'red' }}
                    onClick={() => handleRemoveItemFromCart(item.product)}
                  />
                </List.Item>
              );
            }}
          />
        )}
      </Col>
      <Col span={6} offset={2}>
        <Card>
          <Title level={3}>Order Summary</Title>
          <Divider />

          <List.Item>
            <Text>Subtotal :</Text>
            <Text strong>
              {cartItems.reduce((a, c) => a + Number(c.quantity), 0)} (Unit)
            </Text>
          </List.Item>
          <List.Item>
            <Text>Est. total :</Text>
            <Text strong>
              $
              {cartItems
                .reduce((a, c) => a + c.quantity * c.price, 0)
                .toFixed(2)}
            </Text>
          </List.Item>

          <Divider />
          <Button
            size='large'
            block
            type='primary'
            shape='round'
            onClick={handleShipping}>
            Checkout
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
