import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import { Form, Input, Button, Checkbox, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const socialOptions = [
  "Facebook", "Youtube"
]

function Home() {
  //socials is set up first for JSON.parse because the fetched socials is not considered array by Form.List
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/home/1877');
      setData(processData(res.data));
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  }

  //process data
  const processData = (data) => {
    data.address = JSON.parse(data.address);

    //convert all first letter to uppercase: facebook -> Facebook
    data.socials = JSON.parse(data.socials).map(item => {
      const capitalizedKey = item.key.charAt(0).toUpperCase() + item.key.slice(1);
      return { ...item, key: capitalizedKey };
    });
    return data;
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
            <Form
              {...formItemLayout}
              form={form}
              initialValues={data} name='dynamic_form_nest_item'
              onFinish={onFinish}
              style={{ maxWidth: '70%' }}
            >
              <Form.Item label="Tên công ty" name='business'>
                <Input />
              </Form.Item>

              <Form.Item label="Giấy chứng nhận DKKD" name='dkkd'>
                <Input />
              </Form.Item>
              <Form.Item label="Đường dẫn DK BCT" name='bct_link'>
                <Input />
              </Form.Item>
              <Form.Item label="Giới thiệu chung" name='short_intro'>
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item label="Số điện thoại" name='phone'>
                <Input />
              </Form.Item>
              <Form.Item label="Hotline" name='hotline'>
                <Input />
              </Form.Item>
              <Form.Item label="Email" name='email'>
                <Input />
              </Form.Item>
              <Form.Item label="Map" name='map'>
                <Input.TextArea rows={5} />
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
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: '20%' }}></Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item label='Mạng xã hội'>
                <Form.List name="socials">
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
                            <Select placeholder='Chọn mạng xã hội'>
                              {
                                socialOptions.map((item, index) => <Option key={index} value={item}>{item}</Option>)
                              }
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'value']}
                          >
                            <Input placeholder="Link" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: '20%' }}></Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item label="Màu chủ đạo" name='color'>
                <Input className='form-input' type='color' />
              </Form.Item>

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


              <Form.Item label="Meta Title" name='meta_title'>
                <Input className='form-input' />
              </Form.Item>
              <Form.Item label="Meta Keyword" name='meta_keyword'>
                <Input className='form-input' />
              </Form.Item>
              <Form.Item label="Meta Description" name='meta_description'>
                <Input className='form-input' />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          )
      }
    </>

  )
}

export default Home 