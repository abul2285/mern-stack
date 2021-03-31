import React, { useEffect } from 'react';
import { Row, Col, Typography, notification, Table, Space, Layout } from 'antd';
import Loader from '../components/Loader';
import MetaData from '../components/MetaData';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../reudx/actions/userActions';
import SideBar from '../components/SideBar';
import { DELETE_USER } from '../reudx/types/userTypes';

const { Content } = Layout;

const UserList = () => {
  const { loading, error, users = [] } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    if (error) {
      notification.error({
        title: error,
        description: error,
      });
    }
    if (isDeleted) {
      notification.success({
        title: 'User Deleted Successfully',
        description: 'User Deleted Successfully',
        placement: 'bottomLeft',
      });
      dispatch({ type: DELETE_USER.RESET });
    }
  }, [dispatch, error, isDeleted]);

  const data = [];
  users.forEach((user, i) => {
    data.push({
      key: i,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      action: (
        <Space>
          <Link to={`/admin/user/${user._id}`}>
            <EditOutlined
              style={{
                width: '30px',
                height: '30px',
                color: 'green',
              }}
            />
          </Link>
          <DeleteOutlined
            onClick={() => dispatch(deleteUser(user._id))}
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
      title: 'User ID',
      dataIndex: 'id',
      key: 'id',
      width: '30%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
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
        <Content>
          <Row>
            <MetaData title='All Users' />
            <Col span={16} offset={4} style={{ height: '50px' }}>
              <Typography.Title>All Users</Typography.Title>
            </Col>
            <Col span={16} offset={4}>
              {loading ? (
                <Loader />
              ) : (
                <>
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

export default UserList;
