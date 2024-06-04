import { Link, NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import forgot from '../../assets/images/auth/forgot-password 1.svg'
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
const CrmSwal = withReactContent(Swal);

const NewForgot = () => {

    const navigate = useNavigate();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [isUserExist, setIsUserExist] = useState(false);

    const defaultParams = { email: '', otp: '' };
    const [errors, setErros] = useState<any>({});
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: '' });
        setParams({ ...params, [name]: value });
        console.table(params)
    };

    const validate = () => {
        setErros({});
        let errors = {};

        if (isUserExist) {
            if (!params.otp) {
                errors = { ...errors, otp: 'OTP is required!' };
            }
        } else {
            if (!params.email) {
                errors = { ...errors, email: 'Email is required!' };
            }
        }
        console.log(errors)
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const [btnLoading, setBtnLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const ForgotPasswordApi = async (data: any) => {

        setBtnLoading(true)

        try {
            let url = '';
            isUserExist ? url = 'https://cdn.onetapdine.com/api/forgot-password-otp-verify' : url = 'https://cdn.onetapdine.com/api/forgot-password';
            const response = await axios({
                method: 'post',
                url: url,
                data,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });

            if (response.data.status === 'success') {

                if (isUserExist) setIsResetPassword(true)
                else setIsUserExist(true)


        if(response.data.action=='reset'){
        navigate('/reset',{state:{ email:params.email, auth_token:response.data.auth_token}})


        }


                // setParams(JSON.parse(JSON.stringify(defaultParams)))
                // dispatch(setCrmToken(response.data.token))
                // dispatch(setUserData(response.data.user))

               
            } else {
                alert("Error")
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
                    timer: 2000,
                    customClass: {
                        popup: "color-danger"
                    }
                });
            }
        } finally {
            setBtnLoading(false);

        }
    };

    const handleForgotPassword = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("email", params.email);
        data.append("otp", params.otp);
        ForgotPasswordApi(data);
    }

    return (
        <>

            <div>
                <div className="relative flex min-h-screen items-center justify-center bg-cover bg-[url(/restaurant/kot/images/auth/forgot-bg.jpeg)] bg-[#050100] bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                    <div className="relative flex w-full max-w-[1502px] flex-col justify-between bg-cover bg-center bg-no-repeat overflow-hidden rounded-md lg:flex-row lg:gap-10 xl:gap-0">

                        <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6

                            ">
                            <div className="w-full max-w-[600px] bg-white rounded-xl lg:mt-16  px-6 py-7">
                                <div className='grid grid-cols-12' >
                                    <div className='col-span-3 flex justify-center text-center' >
                                        <img className='object-none object-center' src={forgot} />
                                    </div>

                                    <form className="space-y-1 col-span-9 dark:text-white h-full rounded-xl">
                                        <p style={{ fontFamily: 'Roboto', fontWeight: 700, fontStyle: 'normal' }} className="text-xl mb-0   !leading-snug text-black  ">
                                            Forgot Your Password?
                                        </p>
                                        <p style={{ fontFamily: 'Roboto', fontWeight: 400, fontStyle: 'normal' }} className='font-roboto !mb-2' >Enter email and get password link</p>

                                        <div>
                                            <input
                                                style={{ fontFamily: 'Roboto', fontWeight: 400, fontStyle: 'normal' }}
                                                value={params.email}
                                                name='email'
                                                disabled={isUserExist}
                                                onChange={(e) => changeValue(e)}
                                                id="Email"
                                                type="email"
                                                placeholder='Enter Email'
                                                className="w-full rounded-xl border border-black bg-white px-4 py-2 text-sm font-normal text-black" />
                                        <span className="text-danger font-semibold text-sm p-2">{errors.email}</span>

                                        </div>

                                        {isUserExist && (<>
                                           <div>
                                           <input
                                                style={{ fontFamily: 'Roboto', fontWeight: 400, fontStyle: 'normal' }}
                                                value={params.otp}
                                                name='otp'
                                                onChange={(e) => changeValue(e)}
                                                id="otp"
                                                type="text"
                                                placeholder='Enter Otp'
                                                className="w-full rounded-xl border border-black bg-white px-4 py-2 text-sm font-normal text-black" />
                                            <span className="text-danger font-semibold text-sm p-2">{errors.otp}</span>
                                           </div>
                                        </>)}


                                        <button
                                            type="button"
                                            onClick={() => { handleForgotPassword() }}
                                            className="btn bg-black font-roboto text-white !mt-2 w-full rounded-xl border-0 ">

                                            {btnLoading ? 'Please Wait...' : isUserExist ? 'Verfy OTP' : ' Send OTP'}

                                        </button>

                                        <NavLink to='/login'>
                                            <p style={{ fontFamily: 'Roboto', fontWeight: 600, fontStyle: 'normal' }} className='items-center text-center mt-4' >Back to login page</p>
                                        </NavLink>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )


};

export default NewForgot;
