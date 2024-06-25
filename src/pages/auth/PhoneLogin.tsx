import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { setCustOrderId, setCustomerData, setCustomerToken } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
const CrmSwal = withReactContent(Swal);
import OTPInput, { ResendOTP } from "otp-input-react";

export const PhoneLogin = ({ table_code }) => {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isPhone, setIsPhone] = useState(true);
    const [isBtnLoading, setIsBtnLoading] = useState(false);

    const defaultParams = { phone: '', name: '', table_code: table_code };
    const [errors, setErros] = useState<any>({});
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, name } = e.target;

        const [fieldName, fieldIndex] = name.split("_");

        if (fieldName == 'otp') {
            setErros({ ...errors, otp: '' });
            if (value) {
                let a = document.querySelector(`input[name=otp_${parseInt(fieldIndex, 10) + 1}]`)
                if (a) a.focus()
            }
            const aa = document.querySelectorAll('.otp');
            let otp = '';
            aa.forEach(element => {
                otp += element.value;
            });
            setParams({ ...params, otp: otp });

        } else {
            setErros({ ...errors, [name]: '' });
            setParams({ ...params, [name]: value });

        }

        console.table(params)

    };

    const validate = () => {
        setErros({});
        let errors = {};
        if (isPhone) {
            if (!params.phone) {
                errors = { ...errors, phone: 'The Phone field is required.' };
            }

            if (!params.name) {
                errors = { ...errors, name: 'The Name field is required.' };
            }
        } else {
            if (!params.otp) {
                errors = { ...errors, otp: 'The OTP field is required.' };
            } else if (params.otp.length != 4) {
                errors = { ...errors, otp: 'OTP should be 6 digits' };
            }
        }

        console.log(errors)
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const loginApi = async (data: any) => {
        setIsBtnLoading(true)
        try {
            const url = isPhone ? window.location.origin + "/api/restaurant/customers/check-phone" : window.location.origin + "/api/restaurant/customers/otp-verify"
            const response = await axios({
                method: 'post',
                url: url,
                data,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("check phone", response.data);
            if (response.data.status === 'success') {

                if (response.data.action == 'otp') {
                    setIsPhone(false)
                } else if (response.data.action == 'home') {
                    dispatch(setCustomerToken(response.data.token))
                    dispatch(setCustomerData(response.data.customer))
                    dispatch(setCustOrderId(response.data.order_id))
                    navigate('/');
                }

            } else {
                if (response.data.action == 're-scan') {
                    alert('please re-scan your table')
                }
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

    const login = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("name", params.name);
        data.append("otp", params.otp);
        data.append("phone", params.phone);
        data.append("table_code", table_code);
        console.log(data)
        loginApi(data);
    };

    return (
        <>

            <div className='bg-[#1b2e4b]'>
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400 }} className='bg-white min-h-[400px]  rounded-3xl shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)]'>

                    <div className='text-center '>
                        <h1 className='text-3xl font-extrabold py-2 text-[#3b3f5c]'>Login</h1>
                        <img src="https://www.piftechnologies.com/wp-content/uploads/secure-icon-300x300.gif" alt="Login" className='w-20 h-20 m-auto' />
                    </div>



                    <div className='px-5 mt-5'>
                        {isPhone ? (<>
                            <div className='mb-4'>
                                <div className="flex ">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        <FaUser />
                                    </div>
                                    <input type="text" value={params.name} name='name' onChange={(e) => changeValue(e)} placeholder="Enter Your Name" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                </div>
                                {errors.name ? <b className="text-danger font-semibold text-sm p-2">{errors.name}</b> : ''}
                            </div>

                            <div className='mb-4'>
                                <div className="flex ">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        <FaPhone />
                                    </div>
                                    <input type="tel" value={params.phone} name='phone' onChange={(e) => changeValue(e)} placeholder="Enter Phone Number" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                </div>
                                {errors.phone ? <b className="text-danger font-semibold text-sm p-2">{errors.phone}</b> : ''}
                            </div>

                        </>) : (
                            <>
                                <label htmlFor="">Enter OTP</label>
                                <div className='flex gap-4 justify-around'>
                                    <input type="tel" name='otp_0' onChange={(e) => changeValue(e)} className="form-input px-4 text-center otp" maxLength={1} />
                                    <input type="tel" name='otp_1' onChange={(e) => changeValue(e)} className="form-input px-4 text-center otp" maxLength={1} />
                                    <input type="tel" name='otp_2' onChange={(e) => changeValue(e)} className="form-input  px-4 text-center otp" maxLength={1} />
                                    <input type="tel" name='otp_3' onChange={(e) => changeValue(e)} className="form-input px-4 text-center otp" maxLength={1} />
                                </div>
                                {errors.otp ? <b className="text-danger font-semibold text-sm p-2">{errors.otp}</b> : ''}
                            </>
                        )}


                        <div className='mt-5 '>
                            <button className='btn btn-dark w-40 m-auto' disabled={isBtnLoading} onClick={() => login()}>
                                {isBtnLoading ? 'Please Waite ...' : isPhone ? 'Generate OTP' : 'Verify OTP'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )



};

