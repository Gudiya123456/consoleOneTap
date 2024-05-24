import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import { IRootState } from '../store';
import { useDispatch, useSelector } from "react-redux";
import PageLoader from '../components/PageLoader'
const Index = () => {

    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);

    const navigate = useNavigate();


    const [isLoading, setIsLoading] = useState(true);

    const fetchHomeData = async () => {
        try {
            setIsLoading(true)
            const response = await axios({
                method: 'get',
                url:"https://cdn.onetapdine.com/api/home-data",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            console.log(response)
        } catch (error) {
            if (error.response.status == 401) navigate('/login')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchHomeData()
    }, [crmToken])
    return (
        <div>
            <h1>{isLoading ? <PageLoader /> : <div>Console Home</div>}</h1>
        </div>
    );
};

export default Index;
