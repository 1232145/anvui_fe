import React, { useState, useEffect } from 'react';
import { api } from '../../components/Api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { Table, Button, Switch, message, Popconfirm, Space, Image } from 'antd';
import { EyeFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons';

function NewsCategory() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [switchLoading, setSwitchLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(location.pathname);
      setData(res.data);
    }
    catch (err) {
      message.error(err.response.data.err);
      navigate('/error');
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  // Define the table columns...
  const columns = [
    { title: 'Stt', dataIndex: 'stt', key: 'stt', sorter: (a, b) => a.stt - b.stt, width: 50 },
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title', width: 250 },
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
              console.log(checked);
            }}
          />
        )
      },
      width: 75,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            style={{ backgroundColor: 'orange' }}
            size="small"
            icon={<EyeFilled />}
            onClick={() => console.log("View")}
          />
          <Button
            type="primary"
            ghost
            size="small"
            icon={<EditOutlined />}
            onClick={() => console.log(record)}
          />
          <Popconfirm
            title="Bạn chắc chắn muốn xóa tin này?"
            okText="Yes"
            cancelText="No"
            placement="topRight"
            onConfirm={() => console.log(record)}
          >
            <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
      width: 75
    },
  ];

  return (
    <div>
      {
        loading ?
          (
            <Loading />
          )
          :
          (
            <div>
              <Table
                dataSource={data}
                columns={columns}
                pagination={{
                  pageSize: 10,
                  showQuickJumper: true,
                  showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                }}
                bordered
                size="middle"
                style={{ margin: '10px 0px' }}
              />
            </div>
          )
      }
    </div>
  )
}

export default NewsCategory