import React, { useEffect } from 'react';
import { Row, Col, Typography, notification, Table, Space, Layout } from 'antd';
import Loader from '../components/Loader';
import MetaData from '../components/MetaData';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../components/SideBar';
import { deleteReview, getAllReviews } from '../reudx/actions/productActions';
import { DELETE_REVIEW } from '../reudx/types/productsType';

const { Content } = Layout;

const ReviewList = () => {
  const { loading, error, allReviews } = useSelector(
    (state) => state.allReviews
  );
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.review
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReviews());
    if (error || deleteError) {
      notification.error({
        title: error || deleteError,
        description: error || deleteError,
      });
    }
    if (isDeleted) {
      notification.success({
        title: 'Review Deleted successfully',
        description: 'Review Deleted successfully',
        placement: 'bottomLeft',
      });
      dispatch({ type: DELETE_REVIEW.RESET });
    }
  }, [deleteError, dispatch, error, isDeleted]);

  const getData = (data = [], productId) => {
    return data.map((review) => ({
      key: review._id,
      id: review._id,
      rating: review.rating,
      comment: review.comment,
      user: review.name,
      action: (
        <Space>
          <DeleteOutlined
            onClick={() => dispatch(deleteReview(review._id, productId))}
            style={{
              width: '30px',
              height: '30px',
              color: 'red',
            }}
          />
        </Space>
      ),
    }));
  };

  const columns = [
    {
      title: 'Review ID',
      dataIndex: 'id',
      key: 'id',
      width: '30%',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: '20%',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
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
      <MetaData title='All Reviews' />
      <Layout>
        <Content>
          <Row justify='center'>
            {loading ? (
              <Loader />
            ) : (
              <>
                <Col>
                  <Typography.Title>All Reviews</Typography.Title>
                  {allReviews.length > 0 &&
                    allReviews.map((item) => {
                      if (item.reviews.length > 0) {
                        return (
                          <Table
                            key={item._id}
                            columns={columns}
                            dataSource={getData(item.reviews, item.productId)}
                            bordered
                          />
                        );
                      }
                      return null;
                    })}
                </Col>
              </>
            )}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ReviewList;
