import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const ErrorPage = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary">
          <Link to="/">Back Home</Link>
        </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;
