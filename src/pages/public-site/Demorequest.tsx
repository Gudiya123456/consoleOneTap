import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import React, { useState, Fragment, useEffect } from "react";
import { FaEye } from 'react-icons/fa';
import { Dialog, Transition } from '@headlessui/react';
import IconX from "../../components/Icon/IconX";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import axios from "axios";
import PageLoader from "../../components/PageLoader";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const CrmSwal = withReactContent(Swal);



const Demorequest = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        fetchDemoRequests()
    }, [])


    const [demoRequests, setDemoRequests] = useState([]);
    const fetchDemoRequests = async () => {

        setIsLoading(true)
        try {

            const response = await axios({
                method: 'get',
                url: window.location.origin + "/api/dashboard/public-site/demo-requests",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });

            if (response.data.status == "success") setDemoRequests(response.data.demorequests)

        } catch (error) {
            if (error.response.status == 401) navigate('/login')
        } finally {
            setIsLoading(false)
        }

    }

    const [showDemo, setShowDemo] = useState({});
    const viewDemo = (demo) => {
        setShowDemo(demo)
        setModal(true);
    }

    const [modal, setModal] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [defaultParams] = useState({
        message: '',
        demorequest_id: ''
    });
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [errors, setErros] = useState<any>({});

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: '' });
        setParams({ ...params, [name]: value });
    };

    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.message) {
            errors = { ...errors, message: 'message is required' };
        }
        console.log(errors)
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };


    const storeApi = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: window.location.origin + "/api/dashboard/public-site/demo-requests",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + crmToken,
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
                setParams(JSON.parse(JSON.stringify(defaultParams)))
                fetchDemoRequests()
                setModal(false)
            } else {

                alert("Failed")
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
        data.append("message", params.message);
        data.append("demorequest_id", showDemo.id)
        storeApi(data);
    };


    return (
        <>
            {isLoading ? (<PageLoader />) : (
                <div>
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">
                                Demo Request
                            </h5>
                        </div>

                        {demoRequests.length ? (<>
                            <div className="table-responsive mb-5">
                                <table className="table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>email</th>
                                            <th>phone</th>
                                            <th>Restaurant Name</th>
                                            <th>Locations</th>
                                            <th>Message</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {demoRequests.map((demo) => {
                                            return (
                                                <tr key={demo.id}>
                                                    <td>
                                                        <div className="whitespace-nowrap">
                                                            {demo.name}
                                                        </div>
                                                    </td>
                                                    <td>{demo.email}</td>
                                                    <td>{demo.phone}</td>
                                                    <td>{demo.business_name}</td>
                                                    <td>{demo.number_of_locations}</td>
                                                    <td>{demo.message}</td>
                                                    <td className="text-center">
                                                        <Tippy content="edit"  >
                                                            <button type="button" onClick={() => { viewDemo(demo) }} >
                                                                <FaEye className="m-auto" />
                                                            </button>
                                                        </Tippy>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>

                                </table>
                            </div></>) : (<>
                                <div>
                                    <b>No Demo request found!</b>
                                </div>

                            </>)}


                    </div>

                    <Transition appear show={modal} as={Fragment}>
                        <Dialog as="div" open={modal} onClose={() => setModal(false)} className="relative z-[51]">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <div className="fixed inset-0 bg-[black]/60" />
                            </Transition.Child>
                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center px-4 py-8">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                            <button
                                                type="button"
                                                onClick={() => setModal(false)}
                                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                            >
                                                <IconX />
                                            </button>
                                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                                Remarks
                                            </div>
                                            <div className="p-5">
                                                <form>

                                                    {showDemo?.updates?.length ? (<>
                                                        <div className="mb-5">
                                                            {
                                                                showDemo.updates.map((update) => (
                                                                    <div className="badge bg-dark mb-2">
                                                                        <b>{update.message}</b>
                                                                    </div>
                                                                ))
                                                            }

                                                        </div>
                                                    </>) : ('')}

                                                    <div className="mb-5">
                                                        <label htmlFor="name">New Remark</label>
                                                        <input id="name" type="text" placeholder="Enter New Remark" className="form-input" name='message' value={params.message} onChange={(e) => changeValue(e)} />
                                                        {errors?.message ? <div className="text-danger mt-1">{errors.message}</div> : ''}
                                                    </div>

                                                    <div className="flex justify-end items-center mt-8">
                                                        <button type="button" className="btn btn-outline-danger" onClick={() => setModal(false)}>
                                                            Cancel
                                                        </button>
                                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" disabled={btnLoading} onClick={() => formSubmit()}>
                                                            {btnLoading ? 'Loading..' : params.id ? 'Update' : 'Add'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            )}
        </>
    );
};

export default Demorequest;
