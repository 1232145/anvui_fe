import React, { useState, useEffect } from 'react';
import { Table, Alert, Button, Modal, Form, Input, Select, Row, Col } from 'antd';

const { Option } = Select;

const MenuList = () => {
  const [createMenu, setCreateMenu] = useState(false);

  // Define the table columns
  const columns = [
    { title: 'Stt', dataIndex: 'stt', key: 'stt' },
    { title: 'Tiêu đề', dataIndex: 'namemenu', key: 'namemenu' },
    { title: 'Ngôn ngữ', dataIndex: 'language', key: 'language' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    { title: 'Sắp xếp', dataIndex: 'sort', key: 'sort' },
    { title: '', dataIndex: 'actions', key: 'actions' },
  ];

  // Sample menu data
  const menuData = [
    {
      stt: 1,
      namemenu: 'Menu 1',
      language: 'Tiếng Việt',
      status: 'Active',
      sort: 1,
      actions: (
        <div>
          <a href="#modalCreateMenu1">Edit</a>
          <span> | </span>
          <a href="#modalRemoveMenu1">Remove</a>
        </div>
      ),
    },
    // Add more menu items here...
  ];

  return (
    <div>
      <Alert message="Sử dụng menu mặc định của giao diện khi menu không được nhập." type="warning" />
      <div>
        <Button type="primary" onClick={() => setCreateMenu(true)}>Create Menu</Button>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h4>Tiếng Việt</h4>
          <div>
            <div>
              <h6>Menu trên</h6>
              {/* Use Ant Design Table component to display menu data */}
              <Table dataSource={menuData} columns={columns} pagination={false} />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <h4>Tiếng Việt</h4>
          <div>
            <div>
              <h6>Menu dưới</h6>
              {/* Use Ant Design Table component to display menu data */}
              <Table dataSource={menuData} columns={columns} pagination={false} />
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h4>Tiếng Anh</h4>
          <div>
            <div>
              <h6>Menu trên</h6>
              {/* Use Ant Design Table component to display menu data */}
              <Table dataSource={menuData} columns={columns} pagination={false} />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <h4>Tiếng Anh</h4>
          <div>
            <div>
              <h6>Menu dưới</h6>
              {/* Use Ant Design Table component to display menu data */}
              <Table dataSource={menuData} columns={columns} pagination={false} />
            </div>

          </div>
        </Col>
      </Row>
      {/* Add modals for create and edit menu options */}
      <Modal
        title="Create Menu"
        open={createMenu}
        onCancel={() => setCreateMenu(false)}
        footer={[
          <Button key="cancel" onClick={() => setCreateMenu(false)}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={() => { /* Handle modal submit here */ }}>
            Submit
          </Button>,
        ]}
      >
        <Form>
          {/* Add form fields for menu creation */}
        </Form>
      </Modal>
    </div>
  );
};

export default MenuList;
