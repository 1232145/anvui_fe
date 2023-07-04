import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css'
import { Form, Input, Button, Checkbox } from 'antd';

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
    showSeatId: -1
  });

  const fetchData = async () => {
    await axios.get('http://localhost:5000/home/1877').then(res => console.log(res.data));
  }

  useEffect(() => {
    fetchData();
  }, [])

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Form onFinish={onFinish}>
      <div className='form'>
        <div className='inner-form'>
          <Form.Item label="Tên công ty" name="business" initialValue="">
            <Input className='form-input' />
          </Form.Item>

          <Form.Item label="Giấy chứng nhận DKKD" name="dkkd" initialValue="">
            <Input className='form-input' />
          </Form.Item>
          <Form.Item label="Đường dẫn DK BCT" name="bct_link" initialValue="">
            <Input className='form-input' />
          </Form.Item>
          <Form.Item label="Giới thiệu chung" name="short_intro" initialValue="">
            <Input className='form-input' />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone" initialValue="">
            <Input className='form-input' />
          </Form.Item>
          <Form.Item label="Hotline" name="hotline" initialValue="">
            <Input className='form-input' />
          </Form.Item>
          <Form.Item label="Email" name="email" initialValue="">
            <Input className='form-input' />
          </Form.Item>
          <Form.Item label="Map" name="map" initialValue="">
            <Input.TextArea className='form-input' rows={4} />
          </Form.Item>


          <Form.Item label="Hiển thị mã ghế" name="showSeatId" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </div>

        <div className='inner-form'>
          <Form.Item label="Meta Title" name="meta_title" initialValue="">
            <Input className='form-input' />
          </Form.Item>
          <Form.Item label="Meta Keyword" name="meta_keyword" initialValue="">
            <Input className='form-input' />
          </Form.Item>
          <Form.Item label="Meta Description" name="meta_description" initialValue="">
            <Input className='form-input' />
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className='form-button'>
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}

export default Home