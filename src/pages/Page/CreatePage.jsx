import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../components/Api/api'
import Loading from '../../components/Loading'
import { Form, Input, Button, message } from 'antd';
import CKEditorForm from '../../utility/CKEditorForm';
import { replaceSpecialCharacters, cleanUnusedImages } from '../../tools';

const { Item } = Form;

const CreatePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const folderName = useRef(Math.floor(Date.now() / 1000));
    const content = useRef(null);
    const [form] = Form.useForm();
    const url = location.pathname + `?id=${id}`;

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get(url);
            const resData = res.data;
            const create_time = resData.create_time;

            folderName.current = create_time;
            content.current = resData.content;

            setData(resData);
        }
        catch (error) {
            navigate('/error')
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchData();
        }

        return () => {
            cleanUnusedImages(api, `${location.pathname}/clean-images`, content.current, folderName.current);
        }
    }, []);

    const handleInput = (e) => {
        const value = e.currentTarget.value;

        setData({ ...data, title: value, alias: replaceSpecialCharacters(value) });
    }

    const handleCKEditorChange = (value) => {
        setData({...data, content: value});
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
            let values = data;
            values.status = 1;
            values.create_time = data.create_time ? data.create_time : folderName.current;
            content.current = values.content;

            setLoading(true);
            await api.post(id ? url : location.pathname, values).then(res => {
                setLoading(false);
                message.success(res.data.msg);
                navigate('/page');
            }).catch(err => {
                navigate('/error');
                message.error(err.response.data.err);
            });
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
                                    <CKEditorForm
                                        data={data.content}
                                        handleChange={value => handleCKEditorChange(value)}
                                        url='/page/create-page/upload-image'
                                        name={folderName.current}
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
