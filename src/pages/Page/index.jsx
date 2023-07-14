import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../components/Api/api";
import Loading from "../../components/Loading";
import { Table, Input, Select, Row, Col, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

const url = '/page';

const columns = [
    {
        title: 'Stt',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        sorter: (a, b) => a.id - b.id,
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
    },
];

const { Option } = Select;

const Page = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setfilteredData] = useState(data);

    const handlePageSizeChange = (size) => {
        setPageSize(size);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);

        const filteredData = data.filter(
            (item) =>
                item.title.toLowerCase().includes(value.toLowerCase()) ||
                String(item.id).toLowerCase().includes(value.toLowerCase())
        );
        setfilteredData(filteredData);
    };

    const handleAddEntry = () => {
        console.log(data);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get(url);
            const pages = res.data.map((item, index) => ({ ...item, id: index + 1 }));
            setData(pages);
            setfilteredData(pages);
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