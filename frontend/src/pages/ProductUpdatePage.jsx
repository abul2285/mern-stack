import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Card,
  Button,
  Input,
  notification,
  InputNumber,
  Select,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateProduct,
  clearErrors,
  getProductDetails,
} from '../reudx/actions/productActions';
import { UPDATE_PRODUCT } from '../reudx/types/productsType';

const { Option } = Select;
const { TextArea } = Input;

const ProductUpdatePage = ({ history, match }) => {
  const { error, product } = useSelector((state) => state.productDetails);
  const [images, setImages] = useState([]);
  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const productId = match.params.id;

  useEffect(() => {
    if (error || updateError) {
      notification.error({
        title: error || updateError,
        description: error || updateError,
      });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      notification.success({
        title: 'Produc Updated successfully',
        description: 'Produc Updated successfully',
        placement: 'bottomLeft',
      });
      history.push('/admin/products');
      dispatch({ type: UPDATE_PRODUCT.RESET });
    }
  }, [dispatch, error, history, isUpdated, updateError]);
  const onFinish = (values) => {
    dispatch(updateProduct(productId, { ...values, images }));
  };
  // if (product._id !== productId) {
  //   dispatch(getProductDetails(productId));
  // }

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prevImages) => [...prevImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Row
      justify='center'
      align='middle'
      style={{ minHeight: '100vh', margin: '50px 0' }}>
      <Col span={8}>
        <Card hoverable>
          <Form
            name='normal_login'
            layout='vertical'
            className='login-form'
            initialValues={{
              name: product?.name,
              price: product?.price,
              description: product?.description,
              category: product?.category,
              stock: product?.stock,
              seller: product?.seller,
            }}
            onFinish={onFinish}>
            <Form.Item
              name='name'
              label='Name'
              rules={[
                { required: true, message: 'Please Enter Product Name' },
              ]}>
              <Input placeholder='User Name' size='large' type='text' />
            </Form.Item>
            <Form.Item
              name='price'
              label='Price'
              rules={[
                { required: true, message: 'Please Enter Product Price' },
              ]}>
              <InputNumber size='large' />
            </Form.Item>
            <Form.Item
              name='description'
              label='Description'
              rules={[
                { required: true, message: 'Please Enter Product Description' },
              ]}>
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name='category'
              label='Category'
              required
              rules={[
                {
                  required: true,
                  message: 'Please Enter Product Category',
                },
              ]}
              hasFeedback>
              <Select placeholder='Please select a Category'>
                {categories.map((category) => (
                  <Option value={category} key={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name='stock'
              label='Stock'
              rules={[
                { required: true, message: 'Please Enter Product Stock' },
              ]}>
              <InputNumber size='large' />
            </Form.Item>

            <Form.Item
              name='seller'
              label='Seller Name'
              rules={[
                { required: true, message: 'Please Enter Product Seller Name' },
              ]}>
              <Input placeholder='Seller Name' size='large' type='text' />
            </Form.Item>

            <Form.Item>
              {/* <div>
                <figure>
                  <img
                    src={avatarPreview}
                    alt='avatar'
                    width='50'
                    height='50'
                  />
                </figure>
              </div> */}
              <Form.Item>
                <input
                  size='large'
                  name='images'
                  multiple
                  accept='image/*'
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='file'
                  onChange={onChange}
                />
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                size='large'
                block
                disabled={loading}
                htmlType='submit'
                className='login-form-button'>
                Update Product
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

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

export default ProductUpdatePage;
