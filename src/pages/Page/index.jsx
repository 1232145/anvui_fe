import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../components/Api/api";
import Loading from "../../components/Loading";

const url = '/page';

const Page = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get(url);
            setData(res.data)
        }
        catch(err) {
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
                    <div></div>
                )
            }
        </div>
    )
}

export default Page;