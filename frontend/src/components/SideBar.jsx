import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DropboxOutlined,
  FileAddOutlined,
  ProjectOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const SideBar = () => {
  return (
    <Sider
      trigger={null}
      style={{ minHeight: '100vh' }}
      breakpoint='lg'
      collapsedWidth='0'
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}>
      <div className='logo' />
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']}>
        <Menu.SubMenu title='Products' key='sub1' icon={<DropboxOutlined />}>
          <Menu.Item key='1' icon={<ProjectOutlined />}>
            <Link to='/admin/products'>All</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<FileAddOutlined />}>
            <Link to='/admin/product'>Create</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key='3' icon={<ShoppingCartOutlined />}>
          <Link to='/admin/orders'>Orders</Link>
        </Menu.Item>
        <Menu.Item key='4' icon={<UsergroupAddOutlined />}>
          <Link to='/admin/users'>Users</Link>
        </Menu.Item>
        <Menu.Item key='5' icon={<StarOutlined />}>
          <Link to='/admin/reviews'>Reviews</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
