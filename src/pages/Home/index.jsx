import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import { Form, Input, Button, Checkbox, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 5,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

function Home() {
  const [data, setData] = useState({
    id: -1,
    idw: -1,
    business: "",
    img: "u",
    icon: "",
    phone: "",
    address: [],
    email: "",
    short_intro: "",
    hotline: "",
    map: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    color: "",
    dkkd: "",
    bct_link: "",
    showSeatId: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/home/1877');
      setData({ ...res.data, address: JSON.parse(res.data.address) });
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const refreshPage = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  }

  return (
    <>
      {
        loading ?
          (
            <div>Loading</div>
          )
          :
          (
            <div>
              <Form onFinish={onFinish} initialValues={data} name='dynamic_form_nest_item' {...formItemLayout}>
                <div className='form'>
                  <div className='inner-form'>
                    <Form.Item label="Tên công ty" name='business'>
                      <Input className='form-input' />
                    </Form.Item>

                    <Form.Item label="Giấy chứng nhận DKKD" name='dkkd'>
                      <Input className='form-input' />
                    </Form.Item>
                    <Form.Item label="Đường dẫn DK BCT" name='bct_link'>
                      <Input className='form-input' />
                    </Form.Item>
                    <Form.Item label="Giới thiệu chung" name='short_intro'>
                    <Input.TextArea className='form-input' rows={4} />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name='phone'>
                      <Input className='form-input' />
                    </Form.Item>
                    <Form.Item label="Hotline" name='hotline'>
                      <Input className='form-input' />
                    </Form.Item>
                    <Form.Item label="Email" name='email'>
                      <Input className='form-input' />
                    </Form.Item>
                    <Form.Item label="Map" name='map'>
                      <Input.TextArea className='form-input' rows={5} />
                    </Form.Item>

                    <Form.Item label='Địa chỉ'>
                      <Form.List name="address">
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
                                <Form.Item
                                  {...restField}
                                  name={[name, 'key']}
                                >
                                  <Input placeholder="Tên" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'value']}
                                >
                                  <Input placeholder="Nội dung" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                              </Space>
                            ))}
                            <Form.Item>
                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{width: '20%'}}></Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>

                    <Form.Item label="Màu chủ đạo" name='color'>
                      <Input className='form-input' type='color' />
                    </Form.Item>

                    <div className='form-checkbox'>
                      <Form.Item label="Hiển thị mã ghế" valuePropName="checked" name='showSeatId'>
                        <Checkbox />
                      </Form.Item>
                      <Form.Item label="Sử dụng iframe" valuePropName="checked" >
                        <Checkbox />
                      </Form.Item>
                      <Form.Item label="Sử dụng đa ngôn ngữ" valuePropName="checked" >
                        <Checkbox />
                      </Form.Item>
                      <Form.Item label="Ẩn box đặt vé web, app khách hàng" valuePropName="checked" >
                        <Checkbox />
                      </Form.Item>
                      <Form.Item label="Hiển thị ảnh tuyến trên app khách hàng" valuePropName="checked" >
                        <Checkbox />
                      </Form.Item>
                    </div>

                  </div>

                  <div className='inner-form'>
                    <Form.Item label="Meta Title" name='meta_title'>
                      <Input className='form-input' />
                    </Form.Item>
                    <Form.Item label="Meta Keyword" name='meta_keyword'>
                      <Input className='form-input' />
                    </Form.Item>
                    <Form.Item label="Meta Description" name='meta_description'>
                      <Input className='form-input' />
                    </Form.Item>
                  </div>
                </div>
                <div className='form-submit-buttons'>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className='form-button'>
                      Lưu
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" className='form-button' onClick={() => refreshPage()}>
                      Huỷ
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          )
      }
    </>

  )
}

export default Home 