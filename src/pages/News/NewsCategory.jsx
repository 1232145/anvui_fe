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
      const resData = res.data;

      const procData = resData.reduce((result, item, index) => {
        const { parent_id } = item;
        item.key = index;

        if (parent_id !== 0) {
          item.stt = "-";

          const parent = resData.find(item => item.id === parent_id);

          if (!parent.children) {
            parent.children = [];
          }

          parent.children.push(item);
        }
        else {
          result.push(item);
          item.stt = result.length;
        }

        return result;
      }, []);

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
    fetchData();
  }, [])

  const handleEdit = (record) => {
    navigate(`/news/create-news-category?id=${record.id}`);
  }

  const handleDelete = async (record) => {
    setLoading(true);
    await api.delete(`${location.pathname}?id=${record.id}`).then(res => {
      fetchData();
      message.success(res.data.msg);
    })
      .catch(err => {
        message.error(err?.response.data.err);
        navigate('/error');
      })
  }

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
              const { parent_id, id } = record;
              let update = [...data];
              let item = null;

              if (parent_id !== 0) {
                let parent = update.find(item => item.id === parent_id);
                item = parent.children.find(item => item.id === id);
              }
              else {
                item = update.find(item => item.id === id);
              }

              item.status = checked;

              setSwitchLoading(true);
              await api.patch(location.pathname, item).then(res => {
                setData(update);
                setSwitchLoading(false);
              })
                .catch(err => navigate('/error'));
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
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn chắc chắn muốn xóa. Các danh mục con của sanh mục này cũng sẽ bị xóa !"
            okText="Yes"
            cancelText="No"
            placement="topRight"
            onConfirm={() => handleDelete(record)}
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