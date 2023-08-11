import { Form, Checkbox, Button, Input, Space, message } from 'antd';
import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './payment.css';
import { api } from '../../components/Api/api';
import { useNavigate, useLocation } from 'react-router-dom';
import CKEditorForm from '../../utility/CKEditorForm';
import { cleanUnusedImages } from '../../tools';

const { Item } = Form;

function Payment() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [areaData, setAreaData] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const processDataIn = (data) => {
    data.payment_info = JSON.parse(data.payment_info);
    data.payments_method = JSON.parse(data.payments_method);

    //destructure the data for easier ant design Form

    //add arrayCk as array of payment info
    data.arrayCK = data.payment_info.ck;
    //add field as payment method for data
    data.payments_method.forEach(item => {
      data[item] = data[item] ? false : true;
    })

    return data;
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(location.pathname);
      const processedData = processDataIn(res.data);
      cleanUnusedImages(api, `${location.pathname}/clean-images`, processedData.paymentNote);
      setData(processedData);
      setAreaData(processedData.paymentNote);
    }
    catch (err) {
      console.log(err);
      navigate('/error');
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const onFinish = async (values) => {
    const params = { payment_info: "", payments_method: "", paymentNote: "" };

    params.payment_info = JSON.stringify({ ck: values.arrayCK });
    delete values.arrayCK;

    let array = [];
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        array.push(key);
      }
    })

    params.payments_method = JSON.stringify(array);
    params.paymentNote = areaData;

    setLoading(true);
    await api.put(location.pathname, params).then(res => {
      fetchData();
      message.success(res.data.msg);
    })
      .catch(err => {
        navigate('/error');
        message.error(err.response.data.err);
      });
  }

  const cancel = () => {
    setAreaData(data.paymentNote);
    form.resetFields();
    window.scrollTo(0, 0);
  }

  const handlePaymentCK = (e) => {
    const value = e.target.checked;
    setData({ ...data, paymentCK: value })
  }

  const handleAreaData = (e) => {
    setAreaData(e);
  }

  return (
    <div>
      {
        loading ? <Loading /> :
          (
            <Form
              style={{ maxWidth: '100%', fontSize: '16px', fontWeight: 500 }}
              name='dynamic_form_nest_item'
              onFinish={onFinish}
              form={form}
              initialValues={data}
            >
              <Item label="Thanh toán tại quầy " valuePropName="checked" name="cod">
                <Checkbox />
              </Item>
              <Item label="Chuyển khoản " valuePropName="checked" name="ck">
                <Checkbox onChange={(e) => handlePaymentCK(e)} />
              </Item>

              {
                data.ck && (
                  <Item>
                    <Form.List name="arrayCK">
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
                                name={[name, 'bank']}
                              >
                                <Input placeholder="Ngân hàng" />
                              </Item>
                              <Item
                                {...restField}
                                name={[name, 'name']}
                              >
                                <Input placeholder="Chủ tài khoản" />
                              </Item>
                              <Item
                                {...restField}
                                name={[name, 'number']}
                              >
                                <Input placeholder="Số tài khoản" />
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
                )
              }

              <Item label="VNpayQR " valuePropName="checked" name="vnpay">
                <Checkbox />
              </Item>
              <Item label="VNpay " valuePropName="checked" name="vnpayck">
                <Checkbox />
              </Item>
              <Item label="Momo " valuePropName="checked" name="momo">
                <Checkbox />
              </Item>
              <Item label="Zalopay  " valuePropName="checked" name="zalopay">
                <Checkbox />
              </Item>
              <Item label="Airpay " valuePropName="checked" name="airpayqr">
                <Checkbox />
              </Item>

              <Item label="Lưu ý khi đặt vé ">
                <CKEditorForm data={areaData} handleChange={handleAreaData} url='/setting/payment/upload-image'/>
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
    </div >
  )
}

export default Payment