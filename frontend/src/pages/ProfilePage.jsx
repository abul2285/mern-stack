import React from 'react';
import { Row, Col, Typography, Button, Card, Image } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
const ProfilePage = () => {
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <Row>
      <Col span={24}>
        <Title>My Profile</Title>
      </Col>

      <Col span={12}>
        <Card
          style={{ maxWidth: '250px', backgroundColor: 'transparent' }}
          bordered={false}
          size='small'
          type='inner'>
          <Image
            src={user.avatar.url}
            style={{
              width: '226px',
              height: '226px',
              objectFit: 'cover',
              objectPosition: '50% 0%',
              borderRadius: '50%',
            }}
          />
          <br />
          <br />
          <Link to='/update/me'>
            <Button type='primary' block size='large'>
              Edit Profile
            </Button>
          </Link>
        </Card>
      </Col>
      <Col span={12}>
        <Title level={3}>Name</Title>
        <Text>{user.name}</Text>
        <Title level={3}>Email Address</Title>
        <Text>{user.email}</Text>
        <Title level={3}>Joined On</Title>
        <Text>{String(user.createdAt).substring(0, 10)}</Text>
        <br />
        <br />
        <br />
        {user.role !== 'admin' && (
          <>
            <Button type='primary' block size='large'>
              {' '}
              My Orders
            </Button>
            <br />
            <br />
          </>
        )}

        <Link to='/password/update'>
          <Button size='large' type='primary' block>
            {' '}
            Change Password
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default ProfilePage;
