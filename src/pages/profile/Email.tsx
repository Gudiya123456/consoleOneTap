import React, { useState } from 'react'
import { IoCloseCircle } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import { setUserData } from '../../store/themeConfigSlice';
const CrmSwal = withReactContent(Swal);

export default function Email({ setEmailModal }) {

    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const userData = useSelector((state: IRootState) => state.themeConfig.userData);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const defaultParams = {
        email: '',
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
    const [emailToken, setEmailToken] = useState('')

    const validate = () => {
        setErros({});
        let errors = {};
        if (!emailToken && !params.email) errors = { ...errors, email: 'email field is required.' };
        if (emailToken && !params.otp) errors = { ...errors, otp: 'OTP field is required.' };
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const emailUpdateApi = async (data: any) => {
        setBtnLoading(true)
        try {
            let url = '';
            emailToken ? url = window.location.origin + '/api/dashboard/profile/update-email-otp-verify' :
                url = window.location.origin + '/api/dashboard/profile/update-email'

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
                if (response.data.token) setEmailToken(response.data.token)
                else {
                    dispatch(setUserData({ ...userData, email: params.email }))
                    setEmailModal(false);
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

    const formSubmit = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("email", params.email);
        data.append("otp", params.otp);
        data.append("token", emailToken);
        emailUpdateApi(data);
    };
    return (
        <div>
            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="font-semibold text-2xl">Change Your Email</h5>


                {!emailToken && (
                    <button
                        onClick={() =>
                            setEmailModal(false)
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
                        email<span className="text-danger">*</span>
                    </label>
                    <input id="fullname" type="text" placeholder="Enter New Email" className="form-input" name='email' value={params?.email} onChange={(e) => changeValue(e)} />
                    {errors?.email ? <div className="text-danger mt-1">{errors.email}</div> : ''}



                    {emailToken && (<>
                        <input type="text" value={params.otp} name='otp' onChange={(e) => changeValue(e)} placeholder='Enter Otp' className='form-input pl-2 mt-2 placeholder:text-white-dark' /><br />
                        <span className="text-danger font-semibold text-sm p-2">{errors.otp}</span><br />
                    </>)}

                </form>
                <div className="mt-8 flex items-center justify-end">

                    <button type="button" className="btn btn-sm btn-dark ltr:ml-4 rtl:mr-4" onClick={() => { formSubmit() }}>
                        {btnLoading ? 'please wait' : emailToken ? ' Verify OTP' : 'Send OTP'}
                    </button>
                </div>

            </div>
        </div>
    )
}
