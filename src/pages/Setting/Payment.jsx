import { Form, Checkbox, Button } from 'antd';
import React, { useState } from 'react';
import './payment.css';

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

function Payment() {
  const { Item } = Form;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  const onFinish = (values) => {
    console.log(values);
  }

  const refreshPage = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <Form
        {...formItemLayout}
        style={{ maxWidth: '85%', fontSize: '16px', fontWeight: 500 }}
        name='dynamic_form_nest_item'
        onFinish={onFinish}
        form={form}
      >
        <Item label="Thanh toán tại quầy " valuePropName="checked">
          <Checkbox />
        </Item>
        <Item label="Chuyển khoản " valuePropName="checked">
          <Checkbox />
        </Item>




        <Item style={{ marginLeft: '50%' }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 5, marginBottom: 5 }}>
            Lưu
          </Button>
          <Button type="primary" onClick={() => refreshPage()}>
            Huỷ
          </Button>
        </Item>
      </Form>
    </div >
  )
}

export default Payment