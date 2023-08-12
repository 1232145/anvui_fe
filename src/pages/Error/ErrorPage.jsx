import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const ErrorPage = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status="500"
        title="500"
        subTitle="Xin lỗi, đã có 1 sự cố khi truy cập :("
        extra={
          <Button type="primary">
          <Link to="/home">Quay lại trang chủ</Link>
        </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;
