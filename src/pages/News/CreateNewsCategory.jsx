import React, { useEffect, useState } from 'react';
import { Form, Input, Switch, Select, Button, Row, Col, Collapse, Upload, Image, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { api } from '../../components/Api/api';
import Loading from '../../components/Loading';
import { replaceSpecialCharacters, convertFormData } from '../../tools';

const { Item } = Form;
const { Panel } = Collapse;
const { Option } = Select;

function CreateNewsCategory() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [imageHolder, setImageHolder] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const url = location.pathname + `?id=${id}`;
  const previous = '/news/news-category';

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(url);
      const resData = res.data;

      setData(resData);
      setImageHolder(resData.img);
    }
    catch (err) {
      console.log(err);
      navigate('/error');
    }
    finally {
      setLoading(false);
    }
  }

  const handleFileUpload = async (file) => {
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

    setImageHolder(URL.createObjectURL(file));

    return false; // Prevent default upload behavior
  };

  const onFinish = async (values) => {
    values.img = values.img?.file;
    values.alias = replaceSpecialCharacters(values.title);
    values.status = values.status ? 1 : 0;

    if (!values.create_time) {
      values.create_time = Math.floor(Date.now() / 1000);
    }

    const formData = convertFormData(values);

    setLoading(true);
    await api.post(id ? url : location.pathname, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => {
      setLoading(false);
      message.success(res.data.msg);
      navigate(previous);
    })
      .catch(err => {
        navigate('/error');
        message.error(err.response.data.err);
      })
  }

  const reset = async () => {
    try {
      setLoading(true);
      const res = await api.get(previous);

      const initialFormData = {
        title: '',
        description: '',
        status: false,
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        img: null,
        parent_id: [...res.data, {id: 0, title: "Chọn danh mục cha"}]
      };
  
      form.setFieldsValue({...initialFormData, parent_id: 0});
      setImageHolder(null);
      setData(initialFormData);
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
    if (id) {
      fetchData();
    }
    else {
      reset();
    }
  }, [id])

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
              style={{ maxWidth: '100%', fontSize: '16px', fontWeight: 500 }}
              name='dynamic_form_nest_item'
              onFinish={onFinish}
              form={form}
              initialValues={data}
            >
              <Item name="create_time" hidden />
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                  >
                    <Input />
                  </Item>

                  <Item
                    label="Mô tả"
                    name="description"
                  >
                    <Input.TextArea rows={5} />
                  </Item>

                  {
                    !id &&
                    (
                      <Item name="parent_id" label="Danh mục cha">
                        <Select>
                          {
                            data.parent_id?.map(item => {
                              return (
                                <Option
                                  key={item.id}
                                  value={item.id}
                                >
                                  {item.title}
                                </Option>
                              )
                            })
                          }
                        </Select>
                      </Item>
                    )
                  }

                  <Item label="Hiện/Ẩn" valuePropName="checked" name="status">
                    <Switch />
                  </Item>
                </Col>

                <Col span={8}>
                  <Item label="Ảnh" name="img">
                    <Upload.Dragger
                      beforeUpload={(file) => handleFileUpload(file)}
                      showUploadList={false}
                    >
                      {
                        imageHolder ? (
                          <Image src={imageHolder} alt="" preview={false} style={{ width: '100%' }} />
                        )
                          :
                          (
                            <div style={{ textAlign: 'center', padding: '20px' }}>
                              <PlusOutlined style={{ fontSize: '24px', color: '#ccc' }} />
                            </div>
                          )
                      }
                    </Upload.Dragger>
                  </Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={15}>
                  <Collapse
                    bordered={true}
                    expandIconPosition="right"
                  >
                    <Panel header="SEO" key="1">
                      <Item label="Meta Title" name='meta_title'>
                        <Input />
                      </Item>
                      <Item label="Meta Keyword" name='meta_keyword'>
                        <Input />
                      </Item>
                      <Item label="Meta Description" name='meta_description'>
                        <Input />
                      </Item>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>

              <Item style={{ marginTop: '20px', textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                  Lưu
                </Button>
                <Button type="default" onClick={() => navigate(previous)}>Hủy</Button>
              </Item>
            </Form>
          )
      }
    </div>
  )
}

export default CreateNewsCategory