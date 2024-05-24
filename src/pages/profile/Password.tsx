import axios from 'axios';
import React, { useState } from 'react'
import { IoCloseCircle } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export default function Password({ setModal2 }) {

    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const navigate = useNavigate();

    const [btnLoading, setBtnLoading] = useState(false);
    const defaultParams = {
        id: 1,
        password_old: '',
        password: '',
        password_confirmation: ''
    };

    const [params, setParams] = useState<any>(defaultParams);
    const [errors, setErros] = useState<any>({});

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: '' });
        setParams({ ...params, [name]: value });
        console.table(params)
    };

    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.password_old) errors = { ...errors, password_old: 'The password old is required.' };
        if (!params.password) errors = { ...errors, password: 'The password is required.' };
        if (!params.password_confirmation) errors = { ...errors, password_confirmation: 'The password confirmation is required.' };
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const passwordUpdate = async (data) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: window.location.origin + '/api/dashboard/profile/reset-password',
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: 'Bearer ' + crmToken,
                },
            });

            if (response.data.status == 'success') {
                setModal2(false)
                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });
            }

        } catch (error) {

            if (error.response.status == 401) navigate('/login')
            else if (error.response.status === 422) {
                const serveErrors = error.response.data.errors;
                for (var key in serveErrors) {
                    setErros({ ...errors, [key]: serveErrors[key][0] });
                }
            }

        }
        finally {
            setBtnLoading(false)
        }
    }

    const formSubmit = async () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("password_old", params.password_old);
        data.append("password", params.password);
        data.append("password_confirmation", params.password_confirmation);
        passwordUpdate(data);
    }
    return (
        <div>
            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="font-semibold text-2xl">Change Your Password</h5>
                <button
                    onClick={() =>
                        setModal2(false)
                    }
                    type="button"
                    className="text-white-dark hover:text-dark"
                >
                    <IoCloseCircle size={30} color="#b53e3e" />
                </button>
            </div>
            <div className="p-5">
                <form>
                    <label htmlFor="fullname">
                        Old Password<span className="text-danger">*</span>
                    </label>
                    <input id="fullname" type="text" placeholder="Current Password" className="form-input" name='password_old' value={params.password_old} onChange={(e) => changeValue(e)} />
                    {errors?.password_old ? <div className="text-danger mt-1">{errors.password_old}</div> : ''}
                    <label htmlFor="fullname" className="mt-3">
                        New Password<span className="text-danger">*</span>
                    </label>
                    <input id="fullname" type="text" placeholder="New Password" className="form-input" name='password' value={params.password} onChange={(e) => changeValue(e)} />
                    {errors?.password ? <div className="text-danger mt-1">{errors.password}</div> : ''}
                    <label htmlFor="fullname" className="mt-3">
                        Confirm new Password<span className="text-danger">*</span>
                    </label>
                    <input id="fullname" type="text" placeholder="Confirm new Password" className="form-input" name='password_confirmation' value={params.password_confirmation} onChange={(e) => changeValue(e)} />
                    {errors?.password_confirmation ? <div className="text-danger mt-1">{errors.password_confirmation}</div> : ''}
                </form>

                <div className="mt-8 flex items-center justify-end">
                    <button type="button" className="btn btn-dark ltr:ml-4 rtl:mr-4" onClick={() => formSubmit()} disabled={btnLoading}>
                        {btnLoading ? 'Please Waite....' : "Reset Password"}
                    </button>
                </div>
            </div>
        </div>
    )
}


