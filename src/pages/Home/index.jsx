import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import { Form, Input, Button, Checkbox, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Loading from '../../components/Loading';

const { Option } = Select;
const { Item } = Form;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 8 },
    lg: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 12 },
    lg: { span: 12 },
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
    md: { span: 12, offset: 8 },
    lg: { span: 12, offset: 8 },
  },
};

const socialOptions = [
  "Facebook", "Youtube"
]

const appOptions = ["CHPlay (Google Play)", "AppStore"]

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

    //handle app data
    data.apps = JSON.parse(data.apps).map(item => {
      if (item.key === 'chplay') {
        return { ...item, key: appOptions[0] }
      }
      else if (item.key === 'appstore') {
        return { ...item, key: appOptions[1] }
      }
      else {
        return item;
      }
    });

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
            <Loading />
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
              <Item label="Tên công ty" name='business'>
                <Input />
              </Item>

              <Item label="Giấy chứng nhận DKKD" name='dkkd'>
                <Input />
              </Item>
              <Item label="Đường dẫn DK BCT" name='bct_link'>
                <Input />
              </Item>
              <Item label="Giới thiệu chung" name='short_intro'>
                <Input.TextArea rows={4} />
              </Item>

              <Item label="Số điện thoại" name='phone'>
                <Input />
              </Item>
              <Item label="Hotline" name='hotline'>
                <Input />
              </Item>
              <Item label="Email" name='email'>
                <Input />
              </Item>
              <Item label="Map" name='map'>
                <Input.TextArea rows={5} />
              </Item>

              <Item label='Địa chỉ'>
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
                          <Item
                            {...restField}
                            name={[name, 'key']}
                          >
                            <Input placeholder="Tên" />
                          </Item>
                          <Item
                            {...restField}
                            name={[name, 'value']}
                          >
                            <Input placeholder="Nội dung" />
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

              <Item label='Mạng xã hội'>
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
                          <Item
                            {...restField}
                            name={[name, 'key']}
                          >
                            <Select placeholder='Chọn mạng xã hội'>
                              {
                                socialOptions.map((item, index) => <Option key={index} value={item}>{item}</Option>)
                              }
                            </Select>
                          </Item>
                          <Item
                            {...restField}
                            name={[name, 'value']}
                          >
                            <Input placeholder="Link" />
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

              <Item label="Màu chủ đạo" name='color'>
                <Input className='form-input' type='color' />
              </Item>

              <Item label="Hiển thị mã ghế" valuePropName="checked" name='showSeatId'>
                <Checkbox />
              </Item>
              <Item label="Sử dụng iframe" valuePropName="checked" >
                <Checkbox />
              </Item>
              <Item label="Sử dụng đa ngôn ngữ" valuePropName="checked" >
                <Checkbox />
              </Item>
              <Item label="Ẩn box đặt vé web, app khách hàng" valuePropName="checked">
                <Checkbox />
              </Item>
              <Item label="Hiển thị ảnh tuyến trên app khách hàng" valuePropName="checked">
                <Checkbox />
              </Item>

              <Item label='App'>
                <Form.List name="apps">
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
                            name={[name, 'key']}
                          >
                            <Select placeholder='Chọn mạng xã hội'>
                              {
                                appOptions.map((item, index) => <Option key={index} value={item}>{item}</Option>)
                              }
                            </Select>
                          </Item>
                          <Item
                            {...restField}
                            name={[name, 'value']}
                          >
                            <Input placeholder="Link app" />
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


              <Item label="Meta Title" name='meta_title'>
                <Input className='form-input' />
              </Item>
              <Item label="Meta Keyword" name='meta_keyword'>
                <Input className='form-input' />
              </Item>
              <Item label="Meta Description" name='meta_description'>
                <Input className='form-input' />
              </Item>

              <Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Item>
            </Form>
          )
      }
    </>

  )
}

export default Home 