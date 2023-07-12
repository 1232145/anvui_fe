import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { api } from '../Api/api';

const { Title } = Typography;
const url = '/login';

const Login = ({setLogin}) => {
  const onFinish = async (values) => {
    // Handle form submission logic here
    await api.post(url, values)
    .then(res => {
      localStorage.setItem('accessToken', res.data.access_token);
      setLogin(true);
    })
    .catch(err => console.log(err))
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    // Display error messages or perform other actions
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: '100%',
          padding: 24,
          borderRadius: 4,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <Title level={3} style={{ textAlign: 'center' }}>
          Đăng Nhập
        </Title>
        <Form
          name="loginForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please enter your username!' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your password!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
  