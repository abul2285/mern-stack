import React from 'react';
import { Spin, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
//

const Loader = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  return (
    <Row justify='center' style={{ height: '100vh' }} align='middle'>
      <Col>
        <Spin indicator={antIcon} />
      </Col>
    </Row>
  );
};

export default Loader;
