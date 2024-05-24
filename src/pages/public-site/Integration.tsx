import axios from 'axios';
import React, { useEffect, useState, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IRootState } from '../../store/index';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconSearch from '../../components/Icon/IconSearch';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PageLoader from '../../components/PageLoader'
import { IoCloseCircle } from 'react-icons/io5';
const CrmSwal = withReactContent(Swal);

const Integrations = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [integrations, setIntegrations] = useState<any>([]);
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const [isLoading, setIsLoading] = useState(true)
    const [modal, setModal] = useState<any>(false);

    useEffect(() => {
        dispatch(setPageTitle('Integration'));
        fetchIntegrations();
    }, []);

    // fetch Restaurant data
    const fetchIntegrations = async () => {
        setIsLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + "/api/dashboard/public-site/integrations",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            if (response.data.status == 'success') {
                setIntegrations(response.data.integrations)
            }
        } catch (error) {
            console.log(error)
            if (error.response.status == 401) navigate('/login')
        } finally {
            setIsLoading(false)
        }
    }
    const [search, setSearch] = useState<any>('');
    const [filteredItems, setFilteredItems] = useState<any>(integrations);

    useEffect(() => {
        setFilteredItems(() => {
            return integrations.filter((item: any) => {
                return item.integration_name
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
        });
    }, [search, integrations]);
    const fileImageRef = useRef<HTMLInputElement>(null);
    const [imagePriview, setImagePriview] = useState<any>('https://dummyimage.com/600x400/000/fff');

    const [defaultParams] = useState({
        id: '',
        integration_name: '',
        image: '',
        status: '1',
    });
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [errors, setErros] = useState<any>({});

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: '' });
        setParams({ ...params, [name]: value });
    };
    const setImage = (e: any) => {
        const { name } = e.target;
        setErros({ ...errors, [name]: '' });
        if (e.target.files[0]) {
            if (e.target.files[0].type && e.target.files[0].type.indexOf('image') === -1) {
                setErros({ ...errors, [name]: 'file is not a valid image' });
                return;
            }
            const maxSizeInBytes = 2 * 1024 * 1024;
            if (e.target.files[0].size > maxSizeInBytes) {
                setErros({ ...errors, [name]: 'maximum file size is 2 mb' });
                return;
            }
            const reader = new FileReader();
            reader.onload = function (event: any) {
                setImagePriview(reader.result)
                setParams({ ...params, [name]: e.target.files[0] });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.integration_name) {
            errors = { ...errors, integration_name: 'integration_name is required' };
        }
        console.log(errors)
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };



    const [btnLoading, setBtnLoading] = useState(false);

    const storeOrUpdateApi = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: window.location.origin + "/api/dashboard/public-site/integrations",
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

                if (response.data.status == "success") {
                    fetchIntegrations()
                    setModal(false)
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
        data.append("integration_name", params.integration_name);
        data.append("image", params.image);
        data.append("status", params.status);
        storeOrUpdateApi(data);
    };

    const storeOrUpdate = (data) => {
        setErros({});
        if (data) {
            setParams({
                id: data.id,
                integration_name: data.integration_name,
                image: '',
                status: data.status
            });

            data.image ?
                setImagePriview(window.location.origin + '/storage/' + data.image) :
                setImagePriview('https://dummyimage.com/600x400/000/fff');

        } else {
            const defaltData = JSON.parse(JSON.stringify(defaultParams));
            setParams(defaltData);
            setImagePriview('https://dummyimage.com/600x400/000/fff');
        }
        setModal(true)
    }

    const distroy = (banner: any) => {

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
                        url: window.location.origin + "/api/dashboard/public-site/integrations/" + banner.id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "Bearer " + crmToken,
                        },
                    });
                    if (response.data.status === "success") {
                        // setCategories(categories.filter((d: any) => d.id !== id))
                        Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });

                        fetchIntegrations()
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
                <div className="pt-5 grid xl:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel">
                        <div className="flex items-center justify-between flex-wrap gap-4 px-4 pb-3">
                            <div className="mb-5">
                                <h5 className="font-bold text-lg dark:text-white-light">Integrations</h5>
                            </div>
                            <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                                <div className="flex gap-3">
                                    <div>
                                        <button type="button" className="btn btn-dark btn-sm" onClick={() => storeOrUpdate()}>
                                            Add Integration
                                        </button>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input type="text" placeholder="Search Restaurant" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                                    <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                                        <IconSearch className="mx-auto" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 lg:grid-cols-2">

                            {filteredItems.length ? (
                                filteredItems.map((integration) => {
                                    return (
                                        <>

                                            <div>
                                                <div className="mb-5 flex items-center justify-center">
                                                    <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                                        <div className="py-7 px-6">

                                                            <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[215px] overflow-hidden border-2">
                                                                <img className=" rounded-md  object-cover" src={window.location.origin + '/storage/' + integration.image} alt="image" />

                                                            </div>
                                                            <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">{integration.integration_name}</h5>

                                                            <div className="flex justify-between gap-3">
                                                                <button type="button" className="btn btn-outline-primary mt-6" onClick={() => { storeOrUpdate(integration) }} >
                                                                    Edit
                                                                </button>
                                                                <button type="button" className="btn btn-outline-danger mt-6" onClick={() => { distroy(integration) }} >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            ) : 'No Banner found'

                            }




                        </div>
                    </div>
                </div>
            )}
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
                                    {/* <button
                                        type="button"
                                        onClick={() => setModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button> */}
                                    <button
                                                    onClick={() =>
                                                        setModal(false)
                                                    }
                                                    type="button"
                                                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                                >
                                                    <IoCloseCircle size={30} color="#b53e3e" />
                                                </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {params.id ? 'Edit Integration' : 'Add Integration'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">Integration Name</label>
                                                <input id="name" type="text" placeholder="Enter Name" className="form-input" name='integration_name' value={params.integration_name} onChange={(e) => changeValue(e)} />
                                                {errors?.integration_name ? <div className="text-danger mt-1">{errors.integration_name}</div> : ''}

                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="image">Image</label>
                                                <input ref={fileImageRef} name="image" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
                                                <span className="w-full h-20 relative">
                                                    <img className="w-20 h-20  overflow-hidden object-cover" id="image" onClick={() => {
                                                        fileImageRef.current!.click()
                                                    }} src={imagePriview} alt="img" />
                                                </span>
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="number">Status</label>
                                                <label className="inline-flex">
                                                    <input
                                                        id="status5"
                                                        name="status"
                                                        type="radio"
                                                        className="form-radio text-success peer"
                                                        defaultChecked={params.status == 1 ? true : false}
                                                        value={1}
                                                        onClick={(e) => changeValue(e)}
                                                    />

                                                    <span className="peer-checked:text-success">Active</span>
                                                </label>

                                                <label className="inline-flex ml-3">
                                                    <input
                                                        id="status4"
                                                        name="status"
                                                        type="radio"
                                                        defaultChecked={params.status == 0 ? true : false}
                                                        value={0}
                                                        onClick={(e) => changeValue(e)}
                                                        className="form-radio text-danger peer"
                                                    />
                                                    <span className="peer-checked:text-danger">Blocked</span>
                                                </label>
                                                {errors?.status ? <div className="text-danger mt-1">{errors.status}</div> : ''}
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
    );
};

export default Integrations;
