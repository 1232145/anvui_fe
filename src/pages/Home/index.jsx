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
    showSeatId: 0
  });

  const tickBox = ['showSeatId'];

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/home/1877');
      setData({ ...res.data, address: JSON.parse(res.data.address) });
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const onFinish = () => {
    console.log('Form values:', data);
  };

  const handleChange = (e, type, index) => {
    //tickbox handle
    if (tickBox.includes(type)) {
      const value = e.target.checked;
      let num = value ? 1 : 0;
      setData(prev => ({ ...prev, [type]: num }));
    }
    //input field handle
    else {
      const value = e.currentTarget.value;

      //if handle address
      if (index >= 0) {
        let addresses = [...data.address];
        addresses[index][type] = value;
        setData(prev => ({ ...prev, address: addresses }));
      }
      //handle other
      else {
        setData(prev => ({ ...prev, [type]: value }));
      }
    }
  }

  const refreshPage = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  }

  const deleteAddress = (index) => {
    console.log("Deleting address: " + index);
  }

  return (
    <Form onFinish={onFinish}>
      <div className='form'>
        <div className='inner-form'>
          <Form.Item label="Tên công ty" initialValue="">
            <Input className='form-input' value={data.business} onChange={(e) => handleChange(e, 'business')} />
          </Form.Item>

          <Form.Item label="Giấy chứng nhận DKKD" initialValue="">
            <Input className='form-input' value={data.dkkd} onChange={(e) => handleChange(e, 'dkkd')} />
          </Form.Item>
          <Form.Item label="Đường dẫn DK BCT" initialValue="">
            <Input className='form-input' value={data.bct_link} onChange={(e) => handleChange(e, 'bct_link')} />
          </Form.Item>
          <Form.Item label="Giới thiệu chung" initialValue="">
            <Input className='form-input' value={data.short_intro} onChange={(e) => handleChange(e, 'short_intro')} />
          </Form.Item>

          <Form.Item label="Số điện thoại" initialValue="">
            <Input className='form-input' value={data.phone} onChange={(e) => handleChange(e, 'phone')} />
          </Form.Item>
          <Form.Item label="Hotline" initialValue="">
            <Input className='form-input' value={data.hotline} onChange={(e) => handleChange(e, 'hotline')} />
          </Form.Item>
          <Form.Item label="Email" initialValue="">
            <Input className='form-input' value={data.email} onChange={(e) => handleChange(e, 'email')} />
          </Form.Item>
          <Form.Item label="Map" initialValue="">
            <Input.TextArea className='form-input' rows={8} value={data.map} onChange={(e) => handleChange(e, 'map')} />
          </Form.Item>

          <Form.Item label="Địa chỉ">
            {
              data.address.map((item, index) => {
                return (
                  <div className='form-address-container' key={index}>
                    <Input className='form-input' value={item.key} onChange={(e) => handleChange(e, 'key', index)} />
                    <Input className='form-input' value={item.value} onChange={(e) => handleChange(e, 'value', index)} />
                    <Button type='primary' danger onClick={() => deleteAddress(index)}>-</Button>
                  </div>
                )
              })
            }
          </Form.Item>

          <div className='form-checkbox'>
            <Form.Item label="Hiển thị mã ghế" valuePropName="checked" >
              <Checkbox checked={data.showSeatId === 1} onChange={(e) => handleChange(e, 'showSeatId')} />
            </Form.Item>
            <Form.Item label="Sử dụng iframe" valuePropName="checked" >
              <Checkbox checked={data.showSeatId === 1} onChange={(e) => handleChange(e, 'showSeatId')} />
            </Form.Item>
            <Form.Item label="Sử dụng đa ngôn ngữ" valuePropName="checked" >
              <Checkbox checked={data.showSeatId === 1} onChange={(e) => handleChange(e, 'showSeatId')} />
            </Form.Item>
            <Form.Item label="Ẩn box đặt vé web, app khách hàng" valuePropName="checked" >
              <Checkbox checked={data.showSeatId === 1} onChange={(e) => handleChange(e, 'showSeatId')} />
            </Form.Item>
            <Form.Item label="Hiển thị ảnh tuyến trên app khách hàng" valuePropName="checked" >
              <Checkbox checked={data.showSeatId === 1} onChange={(e) => handleChange(e, 'showSeatId')} />
            </Form.Item>
          </div>

        </div>

        <div className='inner-form'>
          <Form.Item label="Meta Title" initialValue="">
            <Input className='form-input' value={data.meta_title} onChange={(e) => handleChange(e, 'meta_title')} />
          </Form.Item>
          <Form.Item label="Meta Keyword" initialValue="">
            <Input className='form-input' value={data.meta_keyword} onChange={(e) => handleChange(e, 'meta_keyword')} />
          </Form.Item>
          <Form.Item label="Meta Description" initialValue="">
            <Input className='form-input' value={data.meta_description} onChange={(e) => handleChange(e, 'meta_description')} />
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
  )
}

export default Home