import React, { useState, useEffect } from 'react'
import { api } from '../../components/Api/api';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading';
import { Alert, Form, Input, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function Domain() {
  const { Item } = Form;
  const [form] = Form.useForm();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(location.pathname);
      const arrayData = processData(res.data.domain, "in");
      setData({ domain: arrayData });
    }
    catch (err) {
      console.log(err);
      navigate('/error')
    }
    finally {
      setLoading(false);
    }
  }

  const processData = (data, type) => {
    if (type === "in") {
      data = data.split(",").filter(Boolean).map(name => ({ name }));
    }
    else if (type === "out") {
      data = "," + data.map(obj => obj.name).join(",") + ",";
    }

    return data;
  }

  useEffect(() => {
    fetchData();
  }, [])

  const onFinish = async (values) => {
    const out = {domain: processData(values.domain, "out")};
    await api.put(location.pathname, out)
    .then(res => {
      console.log(res.data);
      refreshPage();
    })
    .catch(err => console.log(err));
  }

  const refreshPage = () => {
    navigate(0);
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
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Alert
                type="warning"
                message=""
                description={
                  <div>
                    <p>Sau khi trỏ domain thành công hãy cung cấp các domain theo form bên dưới.</p>
                    <p>Nếu bạn có nhiều domain hãy đặt domain ưu tiên ở đầu tiên.</p>
                    <p>Domain không chứa http://, www.</p>
                  </div>
                }
              />
              <Form
                style={{ maxWidth: '100%', fontSize: '16px', fontWeight: 500, marginTop: '15px' }}
                name='dynamic_form_nest_item'
                onFinish={onFinish}
                form={form}
                initialValues={data}
              >
                <Item label="Danh sách tên miền">
                  <Form.List name="domain">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: 'flex',
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Item
                              {...restField}
                              name={[name, 'name']}
                            >
                              <Input placeholder="Tên miền VD: anvui.vn" />
                            </Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: '20%' }}></Button>
                        </Item>
                      </>
                    )}
                  </Form.List>
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
            </div>
          )
      }
    </div>
  )
}

export default Domain