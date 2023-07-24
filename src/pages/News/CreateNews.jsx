import React, { useState } from 'react';
import { Form, Input, Switch, Select, Button, Row, Col, Collapse } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useLocation } from 'react-router-dom';
import QuillForm from '../../utility/QuillForm';

const { Option } = Select;
const { Item } = Form;
const { Panel } = Collapse;

function CreateNews() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [quillData, setQuillData] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const handleQuillChange = (e) => {
    setQuillData(e);
  }

  return (
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
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input />
          </Item>

          <Item
            label="Mô tả"
            name="short"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea rows={5} />
          </Item>

          <Item
            label="Nội dung"
            name="content"
            rules={[{ required: true, message: 'Please enter content' }]}
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
            bordered={false}
            expandIconPosition="right"
          >
            <Panel header="Thông tin" key="1">
              <Item label="Ngày đăng">
                <Input disabled value={new Date().toLocaleDateString('vi-VN')} />
              </Item>

              <Item label="Hiện/Ẩn" valuePropName="checked" initialValue>
                <Switch />
              </Item>

              <Item label="Ngôn ngữ" name="id_lang" initialValue={11}>
                <Select>
                  <Option value={11}>Tiếng Việt</Option>
                  <Option value={12}>English</Option>
                </Select>
              </Item>

              {/* Add other fields for information section */}
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
  );
}

export default CreateNews;
