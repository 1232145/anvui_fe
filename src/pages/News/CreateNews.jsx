import React, { useState } from 'react';
import { Form, Input, Switch, Select, Button, Row, Col, Collapse, Upload, Image, message } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useLocation } from 'react-router-dom';
import QuillForm from '../../utility/QuillForm';
import { PlusOutlined } from '@ant-design/icons';
import Loading from '../../components/Loading';

const { Option } = Select;
const { Item } = Form;
const { Panel } = Collapse;

function CreateNews() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [quillData, setQuillData] = useState("");
  const [imageHolder, setImageHolder] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const handleQuillChange = (e) => {
    setQuillData(e);
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
                    <QuillForm data={quillData} handleChange={handleQuillChange} />
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

                      <Item label="Danh mục">

                      </Item>

                      <Item label="Ảnh" name="img">
                        <Upload.Dragger
                          beforeUpload={(file) => handleFileUpload(file)}
                          showUploadList={false}
                          style={{ width: '75%' }}
                        >
                          <PlusOutlined />
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
