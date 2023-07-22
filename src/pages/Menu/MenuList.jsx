import React, { useState, useEffect } from 'react';
import { Table, Alert, Button, Modal, Form, Input, Select, Row, Col, Space, Switch, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { api } from '../../components/Api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const { Option } = Select;

const MenuList = () => {
  const [createMenu, setCreateMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState({});
  const [form] = Form.useForm();

  // Define the table columns...
  const columns = [
    { title: 'Stt', dataIndex: 'stt', key: 'stt' },
    { title: 'Tiêu đề', dataIndex: 'namemenu', key: 'namemenu' },
    { title: 'Ngôn ngữ', dataIndex: 'language', key: 'language' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return (
          <Switch
            checked={record.status}
            onChange={(checked) => {
              let update = { ...menuData };
              update[record.position][record.stt - 1].status = checked;
              setMenuData(update);
            }}
          />
        )
      },
    },
    { title: 'Sắp xếp', dataIndex: 'sort', key: 'sort' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" type="primary"
            onClick={() => {
              form.setFieldsValue(record);
              setCreateMenu(true);
            }}
          />
          <Button icon={<DeleteOutlined />} size="small" type="primary" danger />
        </Space>
      ),
    },
  ];

  const handleSubmit = () => {
    // Close the modal after handling the submission
    console.log("Created menu", form.getFieldValue);
    setCreateMenu(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setCreateMenu(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(location.pathname);
        const data = res.data;

        const temp = data.reduce((result, item, index) => {
          const { id_lang, type, parent_id } = item;
          const langKey = id_lang === 11 ? 'vietnam' : 'english';
          const sectionKey = type === 1 ? 'MenuTop' : 'MenuBottom';

          const position = `${langKey}${sectionKey}`;
          const sectionItems = result[position];

          if (parent_id) {
            item.stt = "--";
            // find correct position
            const parentIndex = sectionItems.findIndex((item) => item.id === parent_id);
            sectionItems.splice(parentIndex + 1, 0, item);
          } else {
            const lenKey = position + 'len';
            if (!result[lenKey]) {
              result[lenKey] = 0;
            }
            item.stt = ++result[lenKey];
            sectionItems.push(item);
          }

          item.key = index;
          item.position = position;

          return result;
        }, {
          vietnamMenuTop: [], vietnamMenuBottom: [],
          englishMenuTop: [], englishMenuBottom: [],
        });

        setMenuData(temp);
      }
      catch (err) {
        console.log(err);
        navigate('/error');
      }
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  return (
    <>
      {
        loading ?
          <Loading />
          :
          <div style={{ padding: '24px' }}>
            <Alert message="Sử dụng menu mặc định của giao diện khi menu không được nhập." type="warning" />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', marginTop: '16px' }}>
              <Button type="dashed" onClick={() => setCreateMenu(true)} icon={<PlusOutlined />}>
                Create Menu
              </Button>
            </div>
            <Row gutter={[16, 16]}><h2 style={{ marginBottom: '16px' }}>Tiếng Việt</h2></Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div>
                  <h3>Menu trên</h3>
                  {/* Use Ant Design Table component to display menu data */}
                  <Table dataSource={menuData.vietnamMenuTop} columns={columns} pagination={false} />
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <h3>Menu dưới</h3>
                  {/* Use Ant Design Table component to display menu data */}
                  <Table dataSource={menuData.vietnamMenuBottom} columns={columns} pagination={false} />
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}><h2 style={{ marginBottom: '16px' }}>Tiếng Anh</h2></Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div>
                  <h3>Menu trên</h3>
                  {/* Use Ant Design Table component to display menu data */}
                  <Table dataSource={menuData.englishMenuTop} columns={columns} pagination={false} />
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <h3>Menu dưới</h3>
                  {/* Use Ant Design Table component to display menu data */}
                  <Table dataSource={menuData.englishMenuBottom} columns={columns} pagination={false} />
                </div>
              </Col>
            </Row>
            {/* Modal for creating a new menu */}
            <Modal
              title="Create Menu"
              open={createMenu}
              onCancel={() => setCreateMenu(false)}
              footer={[
                <Button key="submit" type="primary" onClick={handleSubmit}>Submit</Button>,
                <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
              ]}
            >
              <Form form={form}>
                <Form.Item name="namemenu" label="Tiêu đề">
                  <Input />
                </Form.Item>
                <Form.Item name="link" label="Đường dẫn">
                  <Input />
                </Form.Item>
                <Form.Item name="language" label="Ngôn ngữ" initialValue="Tiếng Việt">
                  <Select>
                    <Option value={11}>Tiếng Việt</Option>
                    <Option value={12}>English</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="status" label="Hiển thị" valuePropName="checked">
                  <Switch />
                </Form.Item>
                <Form.Item name="position" label="Vị trí" initialValue="Trên">
                  <Select>
                    <Option value="MenuTop">Trên</Option>
                    <Option value="MenuBottom">Dưới</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="sort" label="Sắp xếp">
                  <InputNumber />
                </Form.Item>
              </Form>
            </Modal>
          </div>
      }
    </>
  );
};

export default MenuList;
