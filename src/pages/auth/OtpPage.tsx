import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {setCustomerToken,setCustomerData, setCustOrderId} from '../../store/themeConfigSlice'
import { IRootState } from '../../store';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import OTPInput, { ResendOTP } from "otp-input-react";

const CrmSwal = withReactContent(Swal);
export default function OtpPage() {
    const location=useLocation()
    // console.log(location.state.phone);
    // console.log(location.state.table_code);

    const table_code=location.state.table_code;
    const phone=location.state.phone;


    const dispatch = useDispatch();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.customerToken);
    const navigate = useNavigate();
    useEffect(() => {
        if (crmToken) navigate('/')
    }, [crmToken])
    const defaultParams = { otp: '',phone:phone, table_code:table_code };
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

        if (!params.otp) {
            errors = { ...errors, otp: 'Otp required.' };
        }
        console.log(errors)
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };
    const [btnLoading, setBtnLoading] = useState(false);
    const otpApi = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: window.location.origin + "/api/restaurant/customers/otp-verify",
                data,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            if (response.data.status === 'success') {
                // setParams(JSON.parse(JSON.stringify(defaultParams)))
                dispatch(setCustomerToken(response.data.token))
                dispatch(setCustomerData(response.data.customer))
                dispatch(setCustOrderId(response.data.order_id))

                navigate('/');
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
    const otp = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("otp", params.otp);
        data.append("phone", params.phone);
        data.append("table_code", params.table_code);

        console.log(data)
        otpApi(data);
    };
    return (
        <form className="space-y-5 dark:text-white h-full">

            <div>
                <label htmlFor="otp">Otp rttttt</label>
      {/* <OTPInput  name='otp' value={otp} onChange={(e) => changeValue(e)} autoFocus OTPLength={6} otpType="number" disabled={false} className="form-input"  /> */}

                <input type="otp"  value={params.otp} name='otp' onChange={(e) => changeValue(e)} placeholder='Enter Otp' className="form-input" />
                <span className="text-danger font-semibold text-sm p-2">{errors.otp}</span>
            </div>

            <button type="button" onClick={() => otp()} disabled={btnLoading} className="btn bg-black text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                {btnLoading ? 'Please Wait...' : 'Login'}
            </button>
        </form>
    )
}
