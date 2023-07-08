import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import { Form, Input, Button, Checkbox, Space, Select, Row, Col, Upload, message, Image } from 'antd';
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
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
    md: { span: 12, offset: 8 },
    lg: { span: 12, offset: 8 },
  },
};

const socialOptions = [
  { key: "facebook", value: "Facebook" }, { key: "youtube", value: "Youtube" }
];

const appOptions = [
  { key: "chplay", value: "CHPlay (Google Play)" }, { key: "appstore", value: "AppStore" }
];

const imgOptions = [
  "icon", "logo_bottom", "img", "default_facebook_img"
];

const url = 'http://localhost:5000/home/1877';
const host = 'https://cdn.anvui.vn/';

function Home() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setData(processData(res.data, "in"));
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  }

  //process data
  const processData = (data, type) => {
    if (type === "in") {
      data.address = JSON.parse(data.address);
      data.apps = JSON.parse(data.apps);
      data.socials = JSON.parse(data.socials);

      imgOptions.forEach(item => data[item] = host + data[item]);
    }
    else if (type === "out") {
      data.address = JSON.stringify(data.address);
      data.apps = JSON.stringify(data.apps);
      data.socials = JSON.stringify(data.socials);
    }

    return data;
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month as it is zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
  }

  const handleFileUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG images!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
      return false;
    }

    const date = formatDate(new Date());
    const imageName = `upload/web/${date}/${file.name}`;
    console.log(imageName);
    // setData({ ...data, [name]: URL.createObjectURL(file) });
    return false; // Prevent default upload behavior
  };

  useEffect(() => {
    fetchData();
  }, [])

  const onFinish = async (values) => {
    await axios.put(url, processData(values, "out"))
      .then(res => {
        console.log(res.data);
        refreshPage();
      })
      .catch(err => console.log(err));
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
              style={{ maxWidth: '85%', fontSize: '16px', fontWeight: 500 }}
            >
              <Item label="Tên công ty" name='business'>
                <Input />
              </Item>

              <div className="form-upload">
                <Row gutter={[17, 17]} justify="center" align="center">
                  <Col span={4} />
                  <Col span={5}>
                    <Item name='img'>
                      <Upload.Dragger
                        beforeUpload={handleFileUpload}
                        showUploadList={false}
                        name='img'
                      >
                        <Image src={data.img} preview={false} />
                      </Upload.Dragger>
                      <div className='form-upload-label'><label>Logo trên</label></div>
                    </Item>
                  </Col>
                  <Col span={5}>
                    <Item name='logo_bottom'>
                      <Upload.Dragger
                        beforeUpload={handleFileUpload}
                        showUploadList={false}
                        name='logo_bottom'
                      >
                        <Image src={data.logo_bottom} preview={false} />
                      </Upload.Dragger>
                      <div className='form-upload-label'><label>Logo dưới</label></div>
                    </Item>
                  </Col>
                  <Col span={5}>
                    <Item name='icon'>
                      <Upload.Dragger
                        beforeUpload={handleFileUpload}
                        showUploadList={false}
                        name='icon'
                      >
                        <Image src={data.icon} preview={false} />
                      </Upload.Dragger>
                      <div className='form-upload-label'><label>favicon</label></div>
                    </Item>
                  </Col>
                  <Col span={5}>
                    <Item name='default_facebook_img'>
                      <Upload.Dragger
                        beforeUpload={handleFileUpload}
                        showUploadList={false}
                        name='default_facebook_img'
                      >
                        <Image src={data.default_facebook_img} preview={false} />
                      </Upload.Dragger>
                      <div className='form-upload-label'><label>Facebook share mặc định</label></div>
                    </Item>
                  </Col>
                </Row>
              </div>

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
                                socialOptions.map((item, index) => <Option key={index} value={item.key}>{item.value}</Option>)
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

              <Item label="Hiển thị hình ảnh tuyến trên app khách hàng" valuePropName="checked">
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
                                appOptions.map((item, index) => <Option key={index} value={item.key}>{item.value}</Option>)
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

              <Item {...tailFormItemLayout} style={{ marginLeft: '50%' }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: 5, marginBottom: 5 }}>
                  Lưu
                </Button>
                <Button type="primary" onClick={() => refreshPage()}>
                  Huỷ
                </Button>
              </Item>
            </Form>
          )
      }
    </>

  )
}

export default Home 