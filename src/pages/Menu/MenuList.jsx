import React, { useState, useEffect } from 'react';
import { Table, Alert, Button, Modal, Form, Input, Select, Row, Col, Space, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const MenuList = () => {
  const [createMenu, setCreateMenu] = useState(false);
  const [menuData, setMenuData] = useState([
    {
      stt: 1,
      key: 0,
      namemenu: 'Menu 1',
      language: 'Tiếng Việt',
      status: true,
      sort: 1,
    },
  ])

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
            let curr = [...menuData];
            curr[record.key].status = checked;
            setMenuData(curr);
          }}
        />
      )},
    },
    { title: 'Sắp xếp', dataIndex: 'sort', key: 'sort' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" type="primary" href={`#modalCreateMenu${record.stt}`}/>
          <Button icon={<DeleteOutlined />} size="small" type="primary" href={`#modalRemoveMenu${record.stt}`} danger/>
        </Space>
      ),
    },
  ];

  const handleSubmit = () => {
    // Close the modal after handling the submission
    setCreateMenu(false);
  };

  return (
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
            <Table dataSource={menuData} columns={columns} pagination={false} />
          </div>
        </Col>
        <Col span={12}>
          <div>
            <h3>Menu dưới</h3>
            {/* Use Ant Design Table component to display menu data */}
            <Table dataSource={menuData} columns={columns} pagination={false} />
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}><h2 style={{ marginBottom: '16px' }}>Tiếng Anh</h2></Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div>
            <h3>Menu trên</h3>
            {/* Use Ant Design Table component to display menu data */}
            <Table dataSource={menuData} columns={columns} pagination={false} />
          </div>
        </Col>
        <Col span={12}>
          <div>
            <h3>Menu dưới</h3>
            {/* Use Ant Design Table component to display menu data */}
            <Table dataSource={menuData} columns={columns} pagination={false} />
          </div>
        </Col>
      </Row>
      {/* Modal for creating a new menu */}
      <Modal
        title="Create Menu"
        open={createMenu}
        onCancel={() => setCreateMenu(false)}
        footer={[
          <Button key="cancel" onClick={() => setCreateMenu(false)}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form>
          {/* Additional form fields for creating a new menu */}
        </Form>
      </Modal>
    </div>
  );
};

export default MenuList;
