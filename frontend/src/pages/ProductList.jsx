import React, { useEffect } from 'react';
import {
  Col,
  Layout,
  Menu,
  Row,
  Typography,
  notification,
  Table,
  Space,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from '../reudx/actions/productActions';
import Loader from '../components/Loader';
import MetaData from '../components/MetaData';
import { DELETE_PRODUCT } from '../reudx/types/productsType';
import SideBar from '../components/SideBar';
const { Title } = Typography;

const { Sider, Content } = Layout;

const ProductList = () => {
  const { loading, error, adminProducts = [] } = useSelector(
    (state) => state.products
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminProducts());
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
      dispatch({ type: DELETE_PRODUCT.RESET });
    }
  }, [deleteError, dispatch, error, isDeleted]);

  const data = [];
  adminProducts.forEach((product, i) => {
    data.push({
      key: i,
      id: product._id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      action: (
        <Space>
          <Link to={`/admin/product/${product._id}`}>
            <EditOutlined
              style={{
                width: '30px',
                height: '30px',
                color: 'green',
              }}
            />
          </Link>
          <DeleteOutlined
            onClick={() => dispatch(deleteProduct(product._id))}
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
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
                  <MetaData title='Products list' />
                  <Title level={2}>All Products:</Title>
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

export default ProductList;
