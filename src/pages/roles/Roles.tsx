import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { Dialog, Transition } from '@headlessui/react';
import React, { useState, Fragment, useEffect } from 'react';
import IconX from '../../components/Icon/IconX';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { error } from 'console';
import axios from 'axios';
import PageLoader from '../../components/PageLoader';

import { MdDelete } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri'
import { BsEyeFill } from 'react-icons/bs';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const CrmSwal = withReactContent(Swal);

const Roles = () => {
    const navigate = useNavigate();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const [rules, setRules] = useState<any>({});
    const [permissions, setPermisions] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchRules();
    }, [])

    const fetchRules = async () => {
        setIsLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + "/api/dashboard/rules",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            if (response.data.status == 'success') {
                setRules(response.data.rules);

                setPermisions(response.data.permissions);
            }
            else {
                console.log()
            }

        } catch (error: any) {
            if (error.response.status == 401) navigate('/login')

            else console.log(error)
        }
        finally {
            setIsLoading(false)

        }
    }

    const [modal, setModal] = useState(false);

    const [btnLoading, setBtnLoading] = useState(false);
    const defaultParams = {
        id: '',
        rule: '',
        permissions: permissions
    };

    const [params, setParams] = useState<any>({});
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
        if (!params.rule) errors = { ...errors, attribute: 'The rule name field is required.' };
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };


    const storeOrUpdateApi = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: window.location.origin + "/api/dashboard/rules",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: 'Bearer ' + crmToken,
                },
            });

            if (response.data.status == 'success') {
                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });

                if (response.data.status == "success") {
                    const defaltData = JSON.parse(JSON.stringify(defaultParams));
                    setModal(false)
                    setParams(defaltData);
                    fetchRules()


                } else {
                    alert(9)
                }

            } else {

                alert("Failed")
            }

        } catch (error: any) {
            console.log(error)
            if (error.response.status == 401) navigate('/login')
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
        data.append("id", params.id);
        data.append("rule", params.rule);
        data.append("permissions", JSON.stringify(params.permissions));
        storeOrUpdateApi(data);

    };

    const storeOrUpdate = (data) => {
        setErros({});
        if (data) {
            setParams({
                id: data.id,
                rule: data.rule,
                permissions: data.permissions
            });
        } else {
            const defaltData = JSON.parse(JSON.stringify(defaultParams));
            setParams(defaltData);
        }
        setModal(true)
    }

    const distroy = (rule: any) => {

        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then(async (result) => {
            if (result.value) {
                try {
                    const response = await axios({
                        method: 'delete',
                        url: window.location.origin + "/api/dashboard/rules/" + rule.id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + crmToken,
                        },
                    });
                    if (response.data.status === "success") {
                        Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });
                        fetchRules()
                    }
                } catch (error: any) {
                    if (error.response.status == 401) navigate('/login')
                } finally {

                }
            }
        });

    }


    return (
        <div>

            {isLoading ? (<PageLoader />) : (

                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-2xl dark:text-white-light">Rules and Permissions</h5>
                        <div>
                            <button type="button" onClick={() => storeOrUpdate()} className="btn btn-primary">
                                Add Rules
                            </button>

                        </div>
                    </div>

                    <div className="table-responsive mb-5 text-xl">
                        <table>
                            <thead>
                                <tr>
                                    <th className="ltr:rounded-l-md rtl:rounded-r-md">#</th>
                                    <th>Rule</th>
                                    <th>Permisions</th>
                                    <th className="ltr:rounded-r-md rtl:rounded-l-md text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {rules.length ? (
                                    <>
                                        {rules.map((rule, index) => (
                                            <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group" key={rule.id}>
                                                <td><b>{index + 1}</b></td>
                                                <td className="text-primary"><b>{rule.rule}</b></td>
                                                <td >
                                                    <NavLink to="/authorization/roles/view" state={{ permissions: permissions, rule: rule }}>
                                                        <span className='badge bg-info'>
                                                            <b>Permissions</b>
                                                        </span>
                                                    </NavLink>
                                                </td>
                                                <td className="text-center">
                                                    <NavLink to="/authorization/roles/view" state={{ permissions: permissions, rule: rule }}>
                                                        <button type="button" className='me-3'>
                                                            <BsEyeFill className="text-secondary hover:text-gray-500 cursor-pointer text-2xl" />
                                                        </button>
                                                    </NavLink>

                                                    {rule.rule != 'SUPERADMIN' ? (<>

                                                        <button type="button" className='me-3' onClick={() => storeOrUpdate(rule)}>
                                                            <RiPencilFill className="text-warning hover:text-gray-500 cursor-pointer text-2xl" />
                                                        </button>
                                                        <button type="button" >
                                                            <MdDelete className="text-danger  cursor-pointer text-2xl" onClick={() => distroy(rule)} />
                                                        </button></>) : ''}


                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan={4} className='text-center '> <b>No rule found!</b></td>
                                    </tr>
                                )}



                            </tbody>
                        </table>
                    </div>
                </div>

            )}




            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" open={modal} onClose={() => setModal(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel my-8 w-full max-w-sm overflow-hidden  rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <h5 className="text-lg font-bold">Rules</h5>
                                        <button onClick={() => setModal(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <div>
                                            <label htmlFor="">Name</label>
                                            <input type="text" placeholder="Enter Rule Name" name='rule' value={params.rule} onChange={(e) => changeValue(e)} className="form-input" />
                                            <span className='text-sm font-nunito text-danger'>{errors.rule}</span>
                                        </div>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button onClick={() => setModal(false)} type="button" className="btn btn-outline-danger">
                                                Discard
                                            </button>
                                            <button onClick={() => formSubmit()} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>


        </div>
    );
};

export default Roles;
