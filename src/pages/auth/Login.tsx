import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import React, { useEffect, useState } from 'react';
import { setCrmToken, setPageTitle, setUserData } from '../../store/themeConfigSlice';
import axios from 'axios';
import PageLoader from '../../components/PageLoader';
import EmailLogin from './EmailLogin';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    console.log('crm tokennnn', crmToken);
    const crmData = useSelector((state: IRootState) => state.themeConfig.crmData);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        if(crmToken) navigate('/');
        else navigate('/login')
    },[crmToken]);

    const [isEmailLogin, setIsEmailLogin] = useState(true);
    return (
        <>
          
                <div>
                    <div style={{  fontFamily: 'Poppins'}} className="relative flex min-h-screen items-center justify-center bg-cover bg-[url(/restaurant/kot/images/auth/login-bg.jpeg)] bg-[#323232] bg-center bg-no-repeat py-10 dark:bg-[#060818] sm:px-16">
                        {/* <div className="relative flex w-full max-w-[1502px] flex-col justify-between bg-cover bg-center bg-no-repeat overflow-hidden rounded-md    dark:bg-black/50  lg:flex-row lg:gap-10 xl:gap-0"> */}

                            <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6">
                                <div className="w-full max-w-[440px] bg-white rounded-xl lg:mt-16 p-3 lg:p-10 ">
                                    {isEmailLogin && <EmailLogin />}

                                </div>
                            </div>
                        {/* </div> */}
                    </div>
                </div>
        
        </>
    )
};

export default Login;
