import React, { useState, useEffect } from 'react';
import { api } from '../../components/Api/api';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { Table, Button, Switch, message, Popconfirm, Space, Image } from 'antd';
import { EyeFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const host = 'https://cdn.anvui.vn/';

function NewsList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [switchLoading, setSwitchLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(location.pathname);
      const procData = res.data.map((item, index) => ({
        ...item,
        stt: index + 1,
        key: index,
        language: item.id_lang === 11 ? "Tiếng Việt" : "Tiếng Anh"
      }));

      setData(procData);
    }
    catch (err) {
      navigate('/error');
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleEditNews = (record) => {
    navigate(`/news/create-news?id=${record.id}`);
  }

  const handleDeleteNews = async (record) => {
    const query = `?id=${record.id}`;
    setLoading(true);
    await api.delete(location.pathname + query).then(res => {
      fetchData();
      message.success('Successfully deleted.');
    })
      .catch(err => navigate('/error'));
  }

  // Define the table columns...
  const columns = [
    { title: 'Stt', dataIndex: 'stt', key: 'stt', sorter: (a, b) => a.stt - b.stt, width: 50 },
    {
      title: 'Ảnh đại diện', dataIndex: 'img', key: 'img', width: 125,
      render: (imgUrl, record) => {
        return imgUrl ? (
          <Image src={host + imgUrl} width={100} height={100} alt={`Image ${record.key}`} />
        ) : (
          <div>No Image</div>
        );
      },
    },
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title', width: 300 },
    { title: 'Ngôn ngữ', dataIndex: 'language', key: 'language', width: 125 },
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
              let update = [...data];

              let item = update.find(item => item.id === record.id);
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
            onClick={() => handleEditNews(record)}
          />
          <Popconfirm
            title="Bạn chắc chắn muốn xóa tin này?"
            okText="Yes"
            cancelText="No"
            placement="topRight"
            onConfirm={() => handleDeleteNews(record)}
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

export default NewsList