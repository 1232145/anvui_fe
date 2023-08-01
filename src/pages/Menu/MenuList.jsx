import React, { useState, useEffect } from 'react';
import { Table, Alert, Button, Modal, Form, Input, Select, Row, Col, Space, Switch, InputNumber, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { api } from '../../components/Api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const { Option } = Select;
const { Item } = Form;

const MenuList = () => {
  const [createMenu, setCreateMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState({});
  const [disable, setDisable] = useState(false);
  const [switchLoading, setSwitchLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(location.pathname);
      const data = res.data;

      const temp = data.reduce((result, item, index) => {
        const { id_lang, type, parent_id } = item;
        const langKey = id_lang === 11 ? 'vietnam' : 'english';
        const sectionKey = type === 1 ? 'top' : 'bottom';

        const position = langKey + sectionKey;
        const sectionItems = result[langKey][sectionKey];

        if (parent_id) {
          item.stt = "--";
          // find correct position
          const parentIndex = data.findIndex((item) => item.id === parent_id);

          //for display which to change menu (only menus without children)
          result.exclude.push(data[parentIndex]);

          sectionItems.splice(parentIndex + 1, 0, item);
        }
        else {
          if (!result[position]) {
            result[position] = 0;
          }

          item.stt = ++result[position];
          sectionItems.push(item);
          result.parent.push(item);
        }

        item.key = index;
        //for easy table data display
        item.language = id_lang === 11 ? "Tiếng Việt" : "Tiếng Anh"

        return result;
      }, {
        vietnam: {
          top: [],
          bottom: [],
        },
        english: {
          top: [],
          bottom: [],
        },
        parent: [],
        exclude: [],
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

  // Define the table columns...
  const columns = [
    { title: 'Stt', dataIndex: 'stt', key: 'stt', sorter: (a, b) => a.stt - b.stt },
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
            loading={switchLoading}
            onChange={async (checked) => {
              let update = { ...menuData };

              const lang = record.id_lang === 11 ? 'vietnam' : 'english';
              const position = record.type === 1 ? 'top' : 'bottom';

              let item = update[lang][position].find(item => item.id === record.id);
              item.status = checked;

              setSwitchLoading(true);
              await api.patch(location.pathname, item).then(res => {
                setMenuData(update);
                setSwitchLoading(false);
              })
                .catch(err => navigate('/error'));
            }}
          />
        )
      },
    },
    { title: 'Sắp xếp', dataIndex: 'sort', key: 'sort', sorter: (a, b) => a.sort - b.sort },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            ghost
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditMenu(record)}
          />
          <Popconfirm
            title="Bạn chắc chắn muốn xóa! Điều này sẽ xóa cả menu con của menu này."
            okText="Yes"
            cancelText="No"
            placement="topRight"
            onConfirm={() => handleDeleteMenu(record)}
          >
            <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  //disable language and position option if is child of one menu
  const handleParentIdChange = (value) => {
    if (value === 0) {
      setDisable(false);
    }
    else {
      const selectedMenu = menuData.parent.find(item => item.id === value);
      if (selectedMenu) {
        setDisable(true);
        form.setFieldsValue({ type: selectedMenu.type, id_lang: selectedMenu.id_lang });
      }
    }
  };

  const handleEditMenu = (record) => {
    form.setFieldsValue(record);

    if (record.parent_id !== 0) {
      setDisable(true);
    }

    setCreateMenu(true);
  }

  const handleCreateMenu = () => {
    form.resetFields();
    setCreateMenu(true);
  }

  const handleSubmit = async () => {
    // Close the modal after handling the submission
    const data = form.getFieldsValue();

    if (!data || !data.namemenu) {
      message.error('Vui lòng nhập tiêu đề.');
    }
    else if (!data.link) {
      message.error('Vui lòng nhập đường dẫn.');
    }
    else {
      if (!data.sort) {
        data.sort = 0;
      }

      setLoading(true);
      await api.post(location.pathname, data).then(res => {
        setCreateMenu(false);
        setDisable(false);
        fetchData();
        message.success(res.data.msg);
      })
        .catch(error => {
          navigate('/error');
          message.error(error.response.data.err);
        });
    }
  };

  const handleDeleteMenu = async (record) => {
    const query = `?id=${record.id}`;
    setLoading(true);
    await api.delete(location.pathname + query).then(res => {
      fetchData();
      message.success('Successfully deleted.');
    })
      .catch(err => navigate('/error'));
  }

  const handleCancel = () => {
    form.resetFields();
    setCreateMenu(false);
    setDisable(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const getTable = (lang, menuTopData, menuBotData) => {
    return (
      <>
        <Row gutter={[16, 16]}><h2 style={{ marginBottom: '16px' }}>{lang}</h2></Row>
        <Row gutter={[16, 16]} xs={1} sm={2} md={2} lg={2}>
          <Col span={12}>
            <div>
              <h3>Menu trên</h3>
              <Table dataSource={menuTopData} columns={columns} pagination={false} />
            </div>
          </Col>
          <Col span={12}>
            <div>
              <h3>Menu dưới</h3>
              <Table dataSource={menuBotData} columns={columns} pagination={false} />
            </div>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <>
      {
        loading ?
          <Loading />
          :
          <div style={{ padding: '24px' }}>
            <Alert message="Sử dụng menu mặc định của giao diện khi menu không được nhập." type="warning" />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', marginTop: '16px' }}>
              <Button type="dashed" onClick={handleCreateMenu} icon={<PlusOutlined />}>
                Create Menu
              </Button>
            </div>
            {
              getTable('Tiếng Việt', menuData.vietnam?.top, menuData.vietnam?.bottom)
            }
            {
              getTable('Tiếng Anh', menuData.english?.top, menuData.english?.bottom)
            }
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
                <Item name="id" hidden />
                <Item name="namemenu" label="Tiêu đề"
                  rules={[
                    {
                      required: true,
                      message: 'Xin vui lòng điền tiêu đề!',
                    },
                  ]}
                >
                  <Input />
                </Item>
                <Item name="link" label="Đường dẫn"
                  rules={[
                    {
                      required: true,
                      message: 'Xin vui lòng điền đường dẫn!',
                    },
                  ]}
                >
                  <Input />
                </Item>
                <Item name="id_lang" label="Ngôn ngữ" initialValue={11}>
                  <Select disabled={disable}>
                    <Option value={11}>Tiếng Việt</Option>
                    <Option value={12}>English</Option>
                  </Select>
                </Item>
                <Item name="status" label="Hiển thị" valuePropName="checked">
                  <Switch />
                </Item>
                {
                  !menuData.exclude?.some(item => item.namemenu === form.getFieldValue("namemenu")) &&
                  (
                    <Item name="parent_id" label="Menu cha" initialValue={0}>
                      <Select onChange={handleParentIdChange}>
                        <Option value={0}>Menu cha</Option>
                        {
                          menuData.parent?.map(item => {
                            if (item.namemenu !== form.getFieldValue('namemenu')) {
                              const position = item.type === 1 ? "Menu trên" : "Menu dưới";

                              return (
                                <Option key={item.id} value={item.id}>{item.namemenu}-{position}</Option>
                              )
                            }
                            else {
                              return null;
                            }
                          })
                        }
                      </Select>
                    </Item>
                  )
                }
                <Item name="type" label="Vị trí" initialValue={1}>
                  <Select disabled={disable}>
                    <Option value={1}>Trên</Option>
                    <Option value={2}>Dưới</Option>
                  </Select>
                </Item>
                <Item name="sort" label="Sắp xếp">
                  <InputNumber min={0} />
                </Item>
              </Form>
            </Modal>
          </div>
      }
    </>
  );
};

export default MenuList;
