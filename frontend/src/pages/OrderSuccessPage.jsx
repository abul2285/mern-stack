import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  return (
    <Result
      status='success'
      title='Your Order Has Been Placed Successfully'
      extra={[
        <Link to='/orders/me'>
          <Button type='primary' size='large' shape='round'>
            Go to Orders
          </Button>
        </Link>,
      ]}
    />
  );
};

export default OrderSuccessPage;
