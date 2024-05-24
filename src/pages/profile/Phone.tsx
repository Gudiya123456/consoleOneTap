import React, { useState } from 'react'
import { IoCloseCircle } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { IRootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import { setUserData } from '../../store/themeConfigSlice';
const CrmSwal = withReactContent(Swal);

export default function Phone({ setPhoneModal }) {

    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const userData = useSelector((state: IRootState) => state.themeConfig.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const defaultParams = {
        phone: '',
        otp: '',
        token: ''
    };

    const [params, setParams] = useState<any>(defaultParams);
    const [errors, setErros] = useState<any>({});

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: '' });
        setParams({ ...params, [name]: value });
        console.table(params)
    };

    const [btnLoading, setBtnLoading] = useState(false)
    const [phoneToken, setPhoneToken] = useState('')

    const phoneUpdateApi = async (data: any) => {
        setBtnLoading(true)
        try {
            let url = '';
            phoneToken ? url = window.location.origin + '/api/dashboard/profile/update-phone-otp-verify' :
                url = window.location.origin + '/api/dashboard/profile/update-phone'

            const response = await axios({
                method: 'post',
                url: url,
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            if (response.data.status == 'success') {
                if (response.data.token) setPhoneToken(response.data.token)
                else {
                    dispatch(setUserData({ ...userData, phone: params.phone }))
                    setPhoneModal(false);
                    Swal.fire({
                        icon: response.data.status,
                        title: response.data.title,
                        text: response.data.message,
                        padding: '2em',
                        customClass: 'sweet-alerts',
                    });
                }
            } else {
                alert(response.data.message);
            }

        } catch (error: any) {
            console.log(error)
            if (error.response.status === 401) navigate('/login')
            if (error?.response?.status === 422) {
                const serveErrors = error.response.data.errors;
                let serverErrors = {};
                for (var key in serveErrors) {
                    serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
                    console.log(serveErrors[key][0])
                }
                setErros(serverErrors);
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

    const validate = () => {
        setErros({});
        let errors = {};
        if (!phoneToken && !params.phone) errors = { ...errors, phone: 'phone field is required.' };
        if (phoneToken && !params.otp) errors = { ...errors, otp: 'OTP field is required.' };
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const formSubmit = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("phone", params.phone);
        data.append("otp", params.otp);
        data.append("token", phoneToken);
        phoneUpdateApi(data);
    };

    return (
        <div>
            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="font-semibold text-2xl">Change Your Phone No</h5>
                {!phoneToken && (
                    <button
                        onClick={() =>
                            setPhoneModal(false)
                        }
                        type="button"
                        className="text-white-dark hover:text-dark"
                    >
                        <IoCloseCircle size={30} color="#b53e3e" />
                    </button>

                )}

            </div>

            <div className="p-5">
                <form>
                    <label htmlFor="fullname">
                        Phone<span className="text-danger">*</span>
                    </label>
                    <input id="fullname" type="text" placeholder="phone" className="form-input" name='phone' value={params?.phone} onChange={(e) => changeValue(e)} />
                    {errors?.phone ? <div className="text-danger mt-1">{errors.phone}</div> : ''}



                    {phoneToken && (<>
                        <input type="text" value={params.otp} name='otp' onChange={(e) => changeValue(e)} placeholder='Enter Otp' className='form-input pl-2 mt-2 placeholder:text-white-dark' /><br />
                        <span className="text-danger font-semibold text-sm p-2">{errors.otp}</span><br />
                    </>)}

                </form>
                <div className="mt-8 flex items-center justify-end">
                    <button type="button" className="btn btn-sm btn-dark ltr:ml-4 rtl:mr-4" onClick={() => { formSubmit() }}>
                        {btnLoading ? 'Please Wait' : phoneToken ? ' Verify OTP' : 'Send OTP'}
                    </button>
                </div>
            </div>
        </div>
    )
}
