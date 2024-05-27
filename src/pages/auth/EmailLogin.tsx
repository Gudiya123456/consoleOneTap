import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { IRootState } from '../../store';
import { NavLink, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/images/auth/Logo 1.svg'
import {  setCrmToken, setUserData } from '../../store/themeConfigSlice';

const CrmSwal = withReactContent(Swal);
export default function EmailLogin() {
    const dispatch = useDispatch();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    console.log('object........', crmToken);
    const navigate = useNavigate();
    useEffect(() => {
        if (crmToken) navigate('/')
    }, [crmToken])
    const defaultParams = { email: '', password: '' };
    const [errors, setErros] = useState<any>({});
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: '' });
        setParams({ ...params, [name]: value });
    };
    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.email) {
            errors = { ...errors, email: 'The email field is required.' };
        }
        if (!params.password) {
            errors = { ...errors, password: 'The password field is required.' };
        }
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };
    const [btnLoading, setBtnLoading] = useState(false);

    const loginApi = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url:"https://cdn.onetapdine.com/api/login",
                data,
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            console.log(response.data)
            console.log(response.data.token)

            if (response.data.status === 'success') {
                navigate('/');
                // setParams(JSON.parse(JSON.stringify(defaultParams)))
                // dispatch(setPermissions(JSON.parse(response.data.permissions)))
                dispatch(setCrmToken(response.data.token))
                dispatch(setUserData(response.data.user))
                // dispatch(setCrmData(response.data.crmData))
            } else {
                alert("Error")
            }
        } catch (error: any) {
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
            setBtnLoading(false)
        }
    };
    const login = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("email", params.email);
        data.append("password", params.password);
        loginApi(data);
    };

    const [view,setView]=useState(false)
    return (
        <form className="space-y-1 dark:text-white h-full rounded-xl">
            <h1 className="text-2xl mt-1 font-bold  !leading-snug text-black md:text-2xl text-center">
                <img className='text-center ml-20 mb-2 items-center w-1/2' src={logo1} alt="" />
            </h1>

            <div style={{fontFamily:'Roboto', fontWeight:200, fontStyle:'normal', fontSize:'14px'}}>
                <input type="email" value={params.email} name='email' onChange={(e) => changeValue(e)} placeholder='User Id' className="w-full rounded-lg border border-black bg-white px-4 py-2 text-sm font-normal  text-black mb-1 " />

                <span className="text-danger font-semibold text-sm p-2">{errors.email}</span>
            </div>
            <div style={{fontFamily:'Roboto', fontWeight:200, fontStyle:'normal', fontSize:'14px'}}>
                <input type="password" value={params.password} name='password' onChange={(e) => changeValue(e)} placeholder='Password' className="w-full rounded-lg border border-black bg-white px-4 py-2 text-sm focus font-normal text-black mb-1 " />

                <span className="text-danger font-semibold text-sm p-2">{errors.password}</span>
            </div>
            <button type="button" onClick={() => login()} disabled={btnLoading} style={{fontFamily:'Roboto', fontWeight:600, fontStyle:'normal', fontSize:'14px'}} className="btn bg-black text-white  w-full rounded-lg border-0 !mt-2 ">
                {btnLoading ? 'Please Wait...' : 'Login'}
            </button>
            <div className='flex justify-between mt-1 ' style={{  fontFamily: 'Nunito, sans-serif'}} >
                <div className="flex items-center gap-1 mb-4">
              <input type='checkbox' />
                    <p style={{fontFamily:'Roboto', fontWeight:400, fontStyle:'normal', fontSize:'14px', color:'black'}} >Remember me?</p>
                </div>

                <NavLink to='/forgotpassword' >
                <p style={{fontFamily:'Roboto', fontWeight:400, fontStyle:'normal', fontSize:'14px',color:'black'}}>Forgot password?</p>

                </NavLink>

            </div>
        </form>
    )
}
