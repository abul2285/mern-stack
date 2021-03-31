import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Rate,
  Typography,
  Layout,
  notification,
  Pagination,
  List,
  Slider,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../components/MetaData';
import { getProducts } from '../reudx/actions/productActions';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const { Title, Text } = Typography;
const { Sider, Content } = Layout;

const HomePage = ({ keyword }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    filteredProductsCount,
    productsCount,
    productPerPage,
  } = useSelector((state) => state.products);
  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }
  useEffect(() => {
    if (error) {
      return notification.error({
        message: 'An Error has occurred',
        duration: 10,
        placement: 'bottomLeft',
        description: error,
      });
    }
    dispatch(getProducts(keyword, price, currentPage, category, rating));
  }, [dispatch, error, currentPage, keyword, price, category, rating]);

  function formatter(value) {
    return `$${value}`;
  }

  const marks = {
    0: {
      style: {
        color: '#f50',
      },
      label: <strong>$0</strong>,
    },
    100000: {
      style: {
        color: '#f50',
      },
      label: <strong>$100000</strong>,
    },
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Layout>
            {keyword && (
              <Sider style={{ padding: '30px' }}>
                <Slider
                  onChange={setPrice}
                  range
                  defaultValue={price}
                  max={100000}
                  tipFormatter={formatter}
                  marks={marks}
                />
                <Title level={3} type='secondary' style={{ color: 'white' }}>
                  Categories
                </Title>

                <List
                  dataSource={categories}
                  className='product-list'
                  renderItem={(item) => (
                    <List.Item onClick={() => setCategory(item)}>
                      <Text strong>{item}</Text>
                    </List.Item>
                  )}
                />
                <br />
                <br />
                <Title level={3} type='secondary' style={{ color: 'white' }}>
                  Ratings
                </Title>

                <Rate value={rating} onChange={setRating} allowHalf />
              </Sider>
            )}
            <Content>
              <MetaData title='Buy Best Products online' />

              <Title>Latest Products</Title>
              <Row justify='center' gutter={[30, 20]}>
                {products &&
                  products.map((product, i) => {
                    return (
                      <React.Fragment key={i}>
                        <Col>
                          <Card
                            className='product-card'
                            actions={[
                              <div style={{ padding: '0 24px' }}>
                                <Link to={`/product/${product._id}`}>
                                  <Button type='primary' block size='large'>
                                    View Details
                                  </Button>
                                </Link>
                              </div>,
                            ]}>
                            <img
                              src={
                                product.images[0]?.url ||
                                'https://picsum.photos/50/50'
                              }
                              alt='al'
                            />
                            <pre>{JSON.stringify(product.images[0]?.url)}</pre>
                            <div className='card-content'>
                              <Link to={`/product/${product._id}`}>
                                <Text>{product.name}</Text>
                              </Link>
                              <br />
                              <Rate
                                allowHalf
                                value={product.rating}
                                allowClear
                              />{' '}
                              <Text>( {product.numOfReviews} Review)</Text>
                              <br />
                            </div>
                            <Text strong>${product.price}</Text>
                          </Card>
                        </Col>
                      </React.Fragment>
                    );
                  })}
                <Col
                  span={24}
                  style={{ display: 'flex', justifyContent: 'center' }}>
                  {productPerPage <= count && (
                    <Pagination
                      current={currentPage}
                      total={count}
                      pageSize={productPerPage}
                      itemRender={itemRender}
                      onChange={setCurrentPage}
                    />
                  )}
                </Col>
              </Row>
            </Content>
          </Layout>
        </>
      )}
    </>
  );
};

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <Text>Previous</Text>;
  }
  if (type === 'next') {
    return <Text>Next</Text>;
  }
  return originalElement;
}

const categories = [
  'Electronics',
  'Camaras',
  'Laptop',
  'Accessories',
  'Headphone',
  'Foods',
  'Books',
  'Beauty/Health',
  'Clothes/Shoes',
  'Sports',
  'Outdoor',
  'Home',
];

export default HomePage;
