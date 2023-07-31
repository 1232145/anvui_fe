import React, { useEffect, useState } from 'react';
import { Form, Input, Switch, Select, Button, Row, Col, Collapse, Upload, Image, message, Checkbox } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import CKEditorForm from '../../utility/CKEditorForm';
import { PlusOutlined } from '@ant-design/icons';
import { api } from '../../components/Api/api';
import Loading from '../../components/Loading';

const { Option } = Select;
const { Item } = Form;
const { Panel } = Collapse;
const host = 'https://cdn.anvui.vn/';

function CreateNews() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [areaData, setAreaData] = useState("");
  const [imageHolder, setImageHolder] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const url = location.pathname + `?id=${id}`;

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(url);
      const category = await api.get('/news/news-category');

      let procData = res.data;
      const cat_ids = procData.cat_id.split('|').filter(item => item !== "").map(Number);

      procData.cat_id = category.data.map(item => ({
        title: item.title,
        checked: cat_ids.find(id => id === item.id) ? true : false,
        id: item.id
      }));

      const date = new Date(procData.create_time * 1000).toLocaleDateString('vi-VN');
      procData.create_time = date;

      setImageHolder(host + procData.img);
      setAreaData(procData.details);
      setData(procData);
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
  }, [])

  const onFinish = async (values) => {
    console.log('Form values:', values);
  };

  const handleAreaData = (e) => {
    setAreaData(e);
  }

  const handleCatId = (id, checked) => {
    let update = { ...data };
    update.cat_id.find(item => item.id === id).checked = checked;
    setData(update);
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

    return false; // Prevent default upload behavior
  };

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
              <Row gutter={20}>
                <Col xs={24} md={16}>
                  <Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                  >
                    <Input />
                  </Item>

                  <Item
                    label="Mô tả"
                    name="short"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                  >
                    <Input.TextArea rows={5} />
                  </Item>

                  <Item
                    label="Nội dung"
                    name="details"
                    rules={[{ required: true, message: 'Vui lòng nhập thông tin' }]}
                  >
                    <CKEditorForm data={areaData} handleChange={handleAreaData} />
                  </Item>

                  <Item style={{ marginTop: '10px' }}>
                    <Collapse
                      accordion
                      expandIcon={({ isActive }) => <p rotate={isActive ? 90 : 0} />}
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
                  </Item>
                </Col>

                <Col xs={24} md={8}>
                  <Collapse
                    bordered={true}
                    expandIconPosition="right"
                  >
                    <Panel header="Thông tin" key="1">
                      <Item
                        name="create_time"
                        label="Ngày đăng"
                        initialValue={new Date().toLocaleDateString('vi-VN')}
                      >
                        <Input disabled />
                      </Item>

                      <Item label="Hiện/Ẩn" valuePropName="checked" name="status">
                        <Switch />
                      </Item>

                      <Item label="Ngôn ngữ" name="id_lang" initialValue={11}>
                        <Select>
                          <Option value={11}>Tiếng Việt</Option>
                          <Option value={12}>English</Option>
                        </Select>
                      </Item>

                      <Item label="Danh mục" name="cat_id">
                        <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: 8 }}>
                          {data.cat_id?.map((item, index) => (
                            <Checkbox
                              key={index}
                              checked={item.checked}
                              onChange={(e) => handleCatId(item.id, e.target.checked)}>
                              {item.title}
                            </Checkbox>
                          ))}
                        </div>
                      </Item>

                      <Item label="Ảnh" name="img">
                        <Upload.Dragger
                          beforeUpload={(file) => handleFileUpload(file)}
                          showUploadList={false}
                          style={{ width: '75%' }}
                        >
                          {
                            imageHolder ? (
                              <Image src={imageHolder} alt="" />
                            )
                              :
                              (
                                <PlusOutlined />
                              )
                          }
                        </Upload.Dragger>
                      </Item>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>

              <Item style={{ marginTop: '10px' }}>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Button type="default">Hủy</Button>
              </Item>
            </Form>
          )
      }
    </div>
  );
}

export default CreateNews;
