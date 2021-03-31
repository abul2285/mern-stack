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
import { userRegister, clearErrors } from '../reudx/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { newProduct } from '../reudx/actions/productActions';
import { NEW_PRODUCT } from '../reudx/types/productsType';

const { Option } = Select;
const { TextArea } = Input;

const ProductCreate = ({ history }) => {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { error, loading, success } = useSelector((state) => state.newProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      notification.error({
        title: 'An Error Has Occurred',
        description: error,
      });
      dispatch(clearErrors());
    }

    if (success) {
      notification.success({
        title: 'Produc created successfully',
        description: 'Produc created successfully',
        placement: 'bottomLeft',
      });
      history.push('/admin/products');
      dispatch({ type: NEW_PRODUCT.RESET });
    }
  }, [dispatch, error, history, success]);
  const onFinish = (values) => {
    dispatch(newProduct({ ...values, images }));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prevImages) => [...prevImages, reader.result]);
          setImages((prevImages) => [...prevImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <Col span={8}>
        <Card hoverable>
          <Form
            name='normal_login'
            layout='vertical'
            className='login-form'
            initialValues={{ email: '', password: '' }}
            onFinish={onFinish}>
            <Form.Item
              name='name'
              label='Name'
              rules={[{ required: true, message: 'Please input your Email!' }]}>
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
                Create New Product
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

export default ProductCreate;
