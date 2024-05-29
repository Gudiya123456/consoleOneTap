import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageLoader from '../../components/PageLoader';
import { RiLockPasswordFill } from "react-icons/ri";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import logo1 from '../../assets/images/auth/Logo 1.svg'
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';

const CrmSwal = withReactContent(Swal);
export default function Activation() {
    const location = useLocation()
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const token = query.get('token')
    console.log('token', token)
    console.log('query', query)
    const path = window.location.pathname
    console.log(path)


    useEffect(() => {
        if (token) checkUser();
    }, [])

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState([]);

    const checkUser = async () => {
        setIsLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url:"https://cdn.onetapdine.com/api/check-activation",
                params: { activation_code: token },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);

            if (response.data.status == 'success') {
                setUser(response.data.user);
            } else {
                alert(response.data.message)
            }

        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }


    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const defaultParams = { password: '', password_confirmation: '', token: token };
    const [errors, setErros] = useState<any>({});
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    console.log(crmToken);

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: '' });
        setParams({ ...params, [name]: value });
        console.table(params)
    };

    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.password) {
            errors = { ...errors, password: 'The password field is required.' };
        }
        if (!params.password_confirmation) {
            errors = { ...errors, password_confirmation: 'The password confirmation field is required.' };
        }
        else if (params.password != params.password_confirmation) {
            errors = { ...errors, password: 'The password field confirmation does not match.' };
        }
        console.log(errors)
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };



    const activateApi = async (data: any) => {
        setIsBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
               
                url:'https://cdn.onetapdine.com/api/activate',
                data,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status === 'success') {
                navigate('/login');
            }

        } catch (error: any) {
            console.log(error)
            if (error?.response?.status === 422) {
                const serveErrors = error.response.data.errors;
                for (var key in serveErrors) {
                    setErros({ ...errors, [key]: serveErrors[key][0] });
                }
                CrmSwal.fire({
                    title: "Server Validation Error! Please solve",
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    showCancelButton: false,
                    width: 450,
                    timer: 2000,
                    customClass: {
                        popup: "color-danger"
                    }
                });
            }
        } finally {
            setIsBtnLoading(false)
        }
    };

    const activate = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("password", params.password);
        data.append("password_confirmation", params.password_confirmation);
        data.append("activation_code", token);
        console.log(data)
        activateApi(data);
    };
    return (
        <div>{
            !token ? <><h1>Invalid Token</h1></> : isLoading ? <PageLoader /> : user?.name ? (


                <>
                  
                     <div className="relative flex min-h-screen items-center justify-center bg-cover bg-[url(/restaurant/kot/images/auth/forgot-bg.jpeg)] bg-[#050100] bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                    <div className="relative flex w-full max-w-[1502px] flex-col justify-between bg-cover bg-center bg-no-repeat overflow-hidden rounded-md    dark:bg-black/50   lg:flex-row lg:gap-10 xl:gap-0">

                        <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6

                            ">
                             <div className='w-full max-w-[440px] bg-white rounded-xl lg:mt-16 p-10' >

                             <form className="space-y-1 dark:text-white h-full rounded-xl">
            <h1 className="text-2xl mt-1 font-bold  !leading-snug text-black md:text-2xl text-center">
                <img className='text-center ml-20 mb-2 items-center w-1/2' src={logo1} alt="" />
            </h1>

            <div style={{fontFamily:'Roboto', fontWeight:200, fontStyle:'normal', fontSize:'14px'}}>
                <input type="password" value={params.password} name='password' onChange={(e) => changeValue(e)} placeholder='Create New Password' className="w-full rounded-lg border border-black bg-white px-4 py-2 text-sm font-normal  text-black mb-1 " />

                <span className="text-danger font-semibold text-sm p-2">{errors.password}</span>
            </div>
            <div style={{fontFamily:'Roboto', fontWeight:200, fontStyle:'normal', fontSize:'14px'}}>
                <input type="password" value={params.password_confirmation} name='password_confirmation'  onChange={(e) => changeValue(e)} placeholder='Confirm Password' className="w-full rounded-lg border border-black bg-white px-4 py-2 text-sm focus font-normal text-black mb-1 " />

                <span className="text-danger font-semibold text-sm p-2">{errors.password_confirmation}</span>
            </div>
            <button type="button" onClick={() => activate()} disabled={isBtnLoading} style={{fontFamily:'Roboto', fontWeight:600, fontStyle:'normal', fontSize:'14px'}} className="btn bg-black text-white  w-full rounded-lg border-0 !mt-2 ">
                {isBtnLoading ? 'Please Wait...' : 'Create Password'}
            </button>
            <div className='mt-5 '>
                                   
                                </div>
            
                            </form>

                             </div>
                        </div>
                    </div>
                </div>

                </>
            ) : <>Invalid Token</>
        }</div>
    )
}

