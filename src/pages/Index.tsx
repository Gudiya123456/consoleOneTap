import React, { useEffect, useState } from 'react'
import PageLoader from './PageLoader';
import Home from './Home';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import Scan from './Scan';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setCustOrderId, setCustomerToken } from '../store/themeConfigSlice';

export default function Index() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const customerToken = useSelector((state: IRootState) => state.themeConfig.customerToken);
    const customerData = useSelector((state: IRootState) => state.themeConfig.customerData);
    const custOrderId = useSelector((state: IRootState) => state.themeConfig.custOrderId);



    const [isLoading, setIsLoading] = useState(true);
    const [isNeedScan, setIsNeedScan] = useState(false);
    const [isHome, setIsHome] = useState(false);
    const query = new URLSearchParams(location.search);
    const table = query.get('table')

    useEffect(() => {

        if (table) navigate('/login', { state: { table_code: table } })
        else if (customerToken && custOrderId) getHomeData();
        // else if (customerToken) getHomeData();

        else {
            setTimeout(() => {
                setIsNeedScan(true)
                setIsLoading(false)
            }, 1500)
        }
    }, [custOrderId, customerToken])

    const [homeData, setHomeData] = useState(true);
    const getHomeData = async () => {
        setIsLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + "/api/restaurant/customers/home-data",
                headers: {
                    'Content-Type': 'application/json',
                    'current-order': custOrderId,
                    Authorization: `Bearer ${customerToken}`
                }
            });
            console.log('home daata', homeData);
            if (response.data.status == "success") {
                setTimeout(() => {
                    setIsLoading(false)
                    setIsHome(true)
                    setHomeData(response.data);
                }, 1000)
            } else if (response.data.status == "error") {
                if (response.data.action == "remove-order-token")
                    {
                        dispatch(setCustOrderId(''));

                        // getHomeData();
                    }
            }
        } catch (error) {
            if (error.response.status == 401) {
                dispatch(setCustomerToken(''));
            }
        }
    }



    return (
        <>

            {isLoading ? <PageLoader /> : isNeedScan ? <Scan /> : isHome ? <Home homeData={homeData} /> : ''}


        </>
    )
}
