import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const ErrorLogin = ({msg, setError}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status="error"
        title="Đăng nhập thất bại"
        subTitle={msg}
        extra={
          <Link to="/home">
            <Button type="primary" onClick={() => setError(false)}>Quay về</Button>
          </Link>
        }
      />
    </div>
  );
};

export default ErrorLogin;
