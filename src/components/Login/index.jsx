import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { api } from '../Api/api';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import ErrorLogin from '../../pages/Error/ErrorLoginPage';

const { Title } = Typography;
const url = '/login';

const Login = ({ setLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await api.post(url, values);
      const data = res.data;

      if (!data.access_token) {
        setError(true);
        setErrMsg("Không thể đăng nhập.");
      }
      else {
        localStorage.setItem('accessToken', data.access_token);
        setLogin(true);
        navigate('/');
      }
    }
    catch (err) {
      if (err.response) {
        const errorMsg = err.response.data.error;
        setErrMsg(errorMsg);
      }
      else {
        setErrMsg("Không thể đăng nhập.");
      }

      setError(true);
    }
    finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    // Display error messages or perform other actions
  };

  if (error) {
    return (
      <>
        <ErrorLogin msg={errMsg} setError={setError} />
      </>
    )
  }

  return (
    <>
      {
        loading ?
          <><Loading /></>
          :
          <div>
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
          </div>
      }
    </>
  );
};

export default Login;
