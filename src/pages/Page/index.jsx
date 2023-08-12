import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../components/Api/api";
import Loading from "../../components/Loading";
import { Table, Input, Select, Row, Col, Button, Popconfirm, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAuth } from "../../components/Auth";

const { Option } = Select;

const Page = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setfilteredData] = useState(data);
    const auth = useAuth();

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get(location.pathname);
            const pages = res.data.map((item, index) => ({ ...item, stt: index + 1, key: index }));
            setData(pages);
            setfilteredData(pages);
        }
        catch (err) {
            if (err === 401) {
                auth.signOut(() => navigate('/login'));
              }
              else {
                navigate('/error');
              }
        }
        finally {
            setLoading(false);
        }
    }

    const columns = [
        {
            title: 'Stt',
            dataIndex: 'stt',
            key: 'stt',
            width: 100,
            sorter: (a, b) => a.stt - b.stt,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: 275,
        },
        {
            title: '',
            key: 'buttons',
            width: 225,
            render: (item) => {
                const handleEditEntry = (item) => {
                    navigate(location.pathname + `/create-page?id=${item.id}`);
                }

                const handleDeleteEntry = async (item) => {
                    const query = `?id=${item.id}&folder=${item.create_time}`;
                    setLoading(true);
                    await api.delete(location.pathname + query).then(res => {
                        fetchData();
                        message.success(res.data.msg);
                    })
                        .catch(err => {
                            navigate('/error');
                        });
                }

                return (
                    <div>
                        <Button
                            type="primary"
                            style={{ marginRight: 10 }}
                            ghost
                            icon={<EditOutlined />}
                            onClick={() => handleEditEntry(item)}
                        />
                        <Popconfirm
                            title="Are you sure to delete this entry?"
                            okText="Yes"
                            cancelText="No"
                            placement="topRight"
                            onConfirm={() => handleDeleteEntry(item)}
                        >
                            <Button type="primary" danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </div>
                )
            },
        },
    ];

    const handlePageSizeChange = (size) => {
        setPageSize(size);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);

        const filteredData = data.filter(
            (item) =>
                item.title.toLowerCase().includes(value.toLowerCase()) ||
                String(item.stt).toLowerCase().includes(value.toLowerCase())
        );
        setfilteredData(filteredData);
    };

    const handleAddEntry = () => {
        navigate(location.pathname + '/create-page');
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            {
                loading ?
                    (
                        <Loading />
                    )
                    :
                    (
                        <div style={{ margin: '24px' }}>
                            <Row gutter={[16, 16]} justify="end" align="middle" style={{ marginBottom: '15px' }}>
                                <Col>
                                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEntry}>
                                        Thêm trang
                                    </Button>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]} justify="space-between" align="middle">
                                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                                    <span>Show</span>
                                    <Select
                                        value={pageSize}
                                        onChange={handlePageSizeChange}
                                        style={{ width: '42%', margin: '0px 5px' }}
                                    >
                                        <Option value={10}>10</Option>
                                        <Option value={25}>25</Option>
                                        <Option value={50}>50</Option>
                                        <Option value={100}>100</Option>
                                    </Select>
                                    <span>entries</span>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                                    <Input
                                        prefix={<SearchOutlined />}
                                        placeholder="Search..."
                                        value={searchText}
                                        onChange={handleSearch}
                                    />
                                </Col>
                            </Row>
                            <Table
                                dataSource={data.length > 0 ? filteredData : []}
                                columns={columns}
                                pagination={{
                                    pageSize,
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

export default Page;