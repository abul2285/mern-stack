import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Carousel,
  notification,
  Typography,
  Divider,
  Rate,
  Button,
  Space,
  Modal,
  Input,
  List,
  Avatar,
  Comment,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import {
  clearErrors,
  getProductDetails,
  newReview,
} from '../reudx/actions/productActions';
import { addItemToCart } from '../reudx/actions/cartActions';
import { PRODUCT_REVIEW } from '../reudx/types/productsType';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const ProductDetailsPage = ({ match }) => {
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { error: producrError, success } = useSelector(
    (state) => state.newReview
  );
  const [qty, setQty] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const productId = match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      notification.error({
        title: 'An Error Occured',
        description: error,
      });
      dispatch(clearErrors());
    }
    if (success) {
      notification.success({
        title: 'Review Posted successfully',
        description: 'Review Posted successfully',
      });
      dispatch({ type: PRODUCT_REVIEW.RESET });
    }
    dispatch(getProductDetails(productId));
  }, [dispatch, error, productId, success]);
  const contentStyle = {
    width: '100%',
    height: '300px',
    // objectFit: 'contain',
  };

  const addToCart = () => {
    dispatch(addItemToCart(productId, qty));
    notification.success({
      title: 'Item added successfully',
      description: 'Item added successfully',
      placement: 'bottomLeft',
    });
  };

  const handleReview = () => {
    dispatch(newReview({ rating, comment, productId }));
    setShowModal(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        product && (
          <Row gutter={[30, 20]} align='middle'>
            <Col span={12}>
              <Carousel autoplay>
                {product?.images?.map((img, i) => (
                  <div key={i} style={{ padding: '50px' }}>
                    <img style={contentStyle} src={img.url} alt='al' />
                  </div>
                ))}
              </Carousel>
            </Col>
            <Col span={12}>
              <Title level={2}>{product.name}</Title>
              <Text>Product # {product._id}</Text>
              <Divider />
              <Rate allowHalf allowClear value={product.rating} /> (
              {product.numOfReviews} Reviews)
              <Divider />
              <Title>${product.price}</Title>
              <Space>
                <Button
                  size='small'
                  type='danger'
                  onClick={() => (qty > 1 ? setQty((prev) => prev - 1) : null)}>
                  -
                </Button>
                <Text>{qty}</Text>
                <Button
                  size='small'
                  type='primary'
                  onClick={() =>
                    product.stock >= qty ? setQty((prev) => prev + 1) : null
                  }>
                  +
                </Button>

                <Button
                  size='large'
                  shape='round'
                  type='primary'
                  onClick={addToCart}>
                  Add to Cart
                </Button>
              </Space>
              <Divider />
              <Text strong>Status :</Text>{' '}
              {product.stock > 0 ? (
                <Text type='primary'>In Stock</Text>
              ) : (
                <Text type='danger'>Out of Stock</Text>
              )}
              <Divider />
              <Title level={3}>Description:</Title>
              <Paragraph>{product.description}</Paragraph>
              <Divider />
              <Text>Slod by: </Text>
              <Text strong>{product.seller}</Text>
              <br />
              <br />
              <br />
              {isAuthenticated ? (
                <>
                  <Button
                    size='large'
                    shape='round'
                    type='primary'
                    onClick={() => setShowModal(true)}>
                    Submit Your Review
                  </Button>
                  <Modal
                    title={<Title level={3}>Submit Review</Title>}
                    centered
                    visible={showModal}
                    onOk={() => setShowModal(false)}
                    onCancel={() => setShowModal(false)}
                    footer={[
                      <Button key='back' onClick={() => setShowModal(false)}>
                        Return
                      </Button>,
                      <Button
                        key='submit'
                        type='primary'
                        loading={loading}
                        onClick={handleReview}>
                        Submit
                      </Button>,
                    ]}>
                    <Rate
                      allowClear
                      allowHalf
                      value={rating}
                      onChange={setRating}
                    />
                    <TextArea
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Modal>
                </>
              ) : (
                <p>login first</p>
              )}
            </Col>
            <Col span={20} offset={2}>
              <List
                dataSource={product.reviews}
                renderItem={(review) => {
                  return (
                    <>
                      <Rate disabled value={review.rating} allowHalf />
                      <List.Item>
                        <Comment
                          author={<a>{review.name}</a>}
                          avatar={
                            <Avatar
                              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                              alt='Han Solo'
                            />
                          }
                          content={<Text>{review.comment}</Text>}
                        />
                      </List.Item>
                      <Divider />
                    </>
                  );
                }}
              />
            </Col>
          </Row>
        )
      )}
    </>
  );
};

export default ProductDetailsPage;
