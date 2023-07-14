import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../components/Api/api';

const CreatePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
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

    return (
        <div>
            <h1>Create Page</h1>
            <p>ID: {id}</p>
        </div>
    );
};

export default CreatePage;
