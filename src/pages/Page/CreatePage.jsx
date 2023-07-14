import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../components/Api/api'
import Loading from '../../components/Loading'
import { Form, Input, Button } from 'antd';

const { Item } = Form;

const CreatePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await api.get(location.pathname + `?id=${id}`);
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

    const onFinish = (values) => {
        console.log(values);
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
                                <Item></Item>
                            </Form>
                        </>
                    )
            }
        </div>
    );
};

export default CreatePage;
