import React, { useState } from 'react'
import ResetPassword from './ResetPassword';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const CrmSwal = withReactContent(Swal);
export default function ForgotPassword() {

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
                errors = { ...errors, email: 'email is required!' };
            }
        }
        console.log(errors)
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const [btnLoading, setBtnLoading] = useState(false);



    const ForgotPasswordApi = async (data: any) => {

        setBtnLoading(true)
        try {
            let url = '';
            isUserExist ? url = window.location.origin + '/api/dashboard/verify-otp' : url = window.location.origin + '/api/dashboard/forgot-password';
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
            setBtnLoading(false)
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
            {isResetPassword ? <ResetPassword email={params.email} /> : (
                <div className='text-center mt-16 '>
                    <h6 className='mt-16 mb-5 text-2xl font-extrabold'>Forgot Password</h6>

                    {isUserExist && (<span>
                        <b> OTP Sent to {params.email}</b> <br />
                    </span>)}
                    <input type="text" value={params.email} name='email' disabled={isUserExist} onChange={(e) => changeValue(e)} placeholder='Enter Email Address' className='bg-primary/10 w-[230px] mb-5 h-9' /><br />
                    <span className="text-danger font-semibold text-sm p-2">{errors.email}</span><br />
                    {isUserExist && (<>
                        <input type="text" value={params.otp} name='otp' onChange={(e) => changeValue(e)} placeholder='Enter Otp' className='bg-primary/10 w-[230px] mb-5 h-9' /><br />
                        <span className="text-danger font-semibold text-sm p-2">{errors.otp}</span><br />
                    </>)}

                    <button className='btn btn-primary m-auto' onClick={() => handleForgotPassword()}>
                        {btnLoading ? 'Please Wait...' : isUserExist ? 'Verfy OTP' : 'Get OTP'}
                    </button>
                </div>
            )}
        </>
    )
}
