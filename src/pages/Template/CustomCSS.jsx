import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading';
import { api } from '../../components/Api/api';
import { Form, Input, Button, message } from 'antd';
import { useAuth } from '../../components/Auth';

const { Item } = Form;

function CSSCustom() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(location.pathname);
      setData(res.data);
    }
    catch (err) {
      if (err === 401) {
        auth.signOut(() => navigate('/login'));
      }
      else {
        navigate('/error');
      }
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    await api.put(location.pathname, values)
      .then(res => {
        fetchData();
        message.success(res.data.msg);
      })
      .catch(err => {
        navigate('/error');
      });
  }

  const cancel = () => {
    form.resetFields();
    window.scrollTo(0, 0);
  }

  return (
    <div>
      {
        loading ?
          (
            <Loading />
          )
          :
          (
            <Form
              form={form}
              initialValues={data} name='dynamic_form_nest_item'
              onFinish={onFinish}
              style={{ maxWidth: '100%', fontSize: '16px', fontWeight: 500 }}
            >
              <Item name='custom_css'>
                <Input.TextArea style={{ width: '100%' }} rows={20} />
              </Item>


              <Item style={{ marginLeft: '45.5%' }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: 5, marginBottom: 5 }}>
                  Lưu
                </Button>
                <Button type="primary" onClick={() => cancel()}>
                  Huỷ
                </Button>
              </Item>
            </Form>
          )
      }

    </div>
  )
}

export default CSSCustom