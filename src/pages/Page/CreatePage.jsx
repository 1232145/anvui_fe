import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../components/Api/api'
import Loading from '../../components/Loading'
import { Form, Input, Button, message } from 'antd';
import QuillForm from '../../utility/QuillForm';

const { Item } = Form;
const specialCharacters = {
    'á': 'a',
    'à': 'a',
    'ả': 'a',
    'ã': 'a',
    'ạ': 'a',
    'ă': 'a',
    'ắ': 'a',
    'ằ': 'a',
    'ẳ': 'a',
    'ẵ': 'a',
    'ặ': 'a',
    'â': 'a',
    'ấ': 'a',
    'ầ': 'a',
    'ẩ': 'a',
    'ẫ': 'a',
    'ậ': 'a',
    'đ': 'd',
    'é': 'e',
    'è': 'e',
    'ẻ': 'e',
    'ẽ': 'e',
    'ẹ': 'e',
    'ê': 'e',
    'ế': 'e',
    'ề': 'e',
    'ể': 'e',
    'ễ': 'e',
    'ệ': 'e',
    'í': 'i',
    'ì': 'i',
    'ỉ': 'i',
    'ĩ': 'i',
    'ị': 'i',
    'ó': 'o',
    'ò': 'o',
    'ỏ': 'o',
    'õ': 'o',
    'ọ': 'o',
    'ô': 'o',
    'ố': 'o',
    'ồ': 'o',
    'ổ': 'o',
    'ỗ': 'o',
    'ộ': 'o',
    'ơ': 'o',
    'ớ': 'o',
    'ờ': 'o',
    'ở': 'o',
    'ỡ': 'o',
    'ợ': 'o',
    'ú': 'u',
    'ù': 'u',
    'ủ': 'u',
    'ũ': 'u',
    'ụ': 'u',
    'ư': 'u',
    'ứ': 'u',
    'ừ': 'u',
    'ử': 'u',
    'ữ': 'u',
    'ự': 'u',
    'ý': 'y',
    'ỳ': 'y',
    'ỷ': 'y',
    'ỹ': 'y',
    'ỵ': 'y',
};

const CreatePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const url = location.pathname + `?id=${id}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await api.get(url);
                setData(res.data);
            }
            catch (error) {
                navigate('/error')
            }
            finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, []);

    const handleInput = (e) => {
        const value = e.currentTarget.value;
        const slug = value.toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/./g, (char) => specialCharacters[char] || char) + '.html'; // Replace special characters

        setData({ ...data, title: value, alias: slug });
    }

    const cancel = () => {
        navigate('/page');
    }

    const onFinish = async () => {
        if (!data || !data.title) {
            message.error('Vui lòng nhập tiêu đề bài viết.');
        }
        else if (data.title.length < 7) {
            message.error('Tiêu đề dài hơn 6 kí tự.');
        }
        else {
            await api.post(url, data).then(res => {
                console.log(res.data);
                navigate('/page');
            }).catch(err => navigate('/error'));
        }
    }

    return (
        <div>
            {
                loading ?
                    (
                        <Loading />
                    )
                    :
                    (
                        <>
                            <Form
                                style={{ maxWidth: '100%', fontSize: '16px', fontWeight: 500, marginTop: '15px' }}
                                name='dynamic_form_nest_item'
                                onFinish={onFinish}
                                form={form}
                                initialValues={data}
                            >
                                <Item label="Tiêu đề" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                                        <Input
                                            value={data?.title}
                                            onChange={(e) => handleInput(e)}
                                            style={{ width: '60%', margin: '0px 0px 10px 0px' }}
                                        />
                                        <span>Đường dẫn: {data?.alias}</span>
                                    </div>
                                </Item>
                                <Item>
                                    <QuillForm
                                        data={data?.content}
                                        handleChange={value => setData({ ...data, content: value })}
                                    />
                                </Item>

                                <Item style={{ marginLeft: '45.5%' }}>
                                    <Button type="primary" htmlType="submit" style={{ marginRight: 5, marginBottom: 5 }}>
                                        Lưu
                                    </Button>
                                    <Button type="primary" onClick={() => cancel()}>
                                        Huỷ
                                    </Button>
                                </Item>
                            </Form>
                        </>
                    )
            }
        </div>
    );
};

export default CreatePage;
