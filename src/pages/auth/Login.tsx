import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PhoneLogin } from './PhoneLogin';
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import PageLoader from '../PageLoader';
import Error from '../Error';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { error } from 'console';
const Login = () => {

    const location = useLocation()
    const navigate = useNavigate();
    console.log(location.state.table_code);
    const table_code = location.state.table_code;
    const dispatch = useDispatch();
    const customerToken = useSelector((state: IRootState) => state.themeConfig.customerToken);
    const custOrderId = useSelector((state: IRootState) => state.themeConfig.custOrderId);

    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState(false);

    useEffect(() => {
        if (customerToken && custOrderId) navigate('/')
        else if (table_code) checkTable();
    }, [customerToken])



    const checkTable = async () => {
        const response = await axios({
            method: 'post',
            url: window.location.origin + '/api/restaurant/customers/check-table',
            data: { table_code: table_code },
            headers: {
                'Content-Type': 'application/json',
                // Authorization:'Bearer'+table
            },
        });

        if (response.data.status == 'success') setIsLogin(true)
        else if (response.data.status == "error") {
            setErrors(response.data.message)
            setIsError(true)
        }

    }
    // 
    return (
        <>

            {isLogin ? <PhoneLogin table_code={table_code} /> :
                isError ? <Error error={errors} /> :
                    isLoading ? <PageLoader /> : ''}

        </>
    )



};

export default Login;
