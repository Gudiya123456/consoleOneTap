import React, { useState, Fragment, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconSearch from '../../components/Icon/IconSearch';
import IconX from '../../components/Icon/IconX';
import axios from 'axios';
import { IRootState } from '../../store/index';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PageLoader from '../../components/PageLoader';
import { IoCloseCircle } from 'react-icons/io5';

import darkview from "../../assets/images/darkview.png"
import view from "../../assets/images/view.png"
import { t } from "i18next";
import PlusDark from '../../assets/images/PlusDark.svg'
import Plus from '../../assets/images/Plus (1).svg'
import leftarrow from '../../assets/images/leftarrow.png'
import leftDark from '../../assets/images/Chevron Left (1).svg'

const CrmSwal = withReactContent(Swal);
const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Restaurant'));
        fetchAuthorization();
    }, []);
    const [permissionmodal, setpermissionModal] = useState(false);
    const [status, setStatus] = useState("");
    const [model, setModal] = useState<any>(false);
    const [authList, setAuthList] = useState<any>([]);
    const [rules, setRules] = useState<any>([]);
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [imagePriview, setImagePriview] = useState<any>('https://dummyimage.com/600x400/000/fff');
    const fileImageRef = useRef<HTMLInputElement>(null);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);


    // fetch Restaurant datta
    const fetchAuthorization = async () => {
        setIsLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + '/api/dashboard/authorizations',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            console.log(response.data)

            if (response.data.status == 'success') {
                setAuthList(response.data.users);
                setRules(response.data.rules);
            }
            else {
                console.log(errors)
            }

        } catch (error: any) {
            if (error.response.status == 401) navigate('/login')
            if (error.response.status === 422) {
                const serveErrors = error.response.data.errors;
                for (var key in serveErrors) {
                    setErros({ ...errors, [key]: serveErrors[key][0] });
                }
            }
            else console.log(error)
        }
        finally {
            setIsLoading(false)

        }
    };
    const [search, setSearch] = useState<any>('');
    const [filteredItems, setFilteredItems] = useState<any>(authList);

    useEffect(() => {
        setFilteredItems(() => {
            return authList.filter((item: any) => {
                return item.name.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, authList]);


    const [defaultParams] = useState({
        id: '',
        avatar: '',
        country: '',
        email: '',
        name: '',
        phone: '',
        rule_id: '',
        status: '1',
    });
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [errors, setErros] = useState<any>({});
    const [btnLoading, setBtnLoading] = useState(false)
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

        if (!params.name) {
            errors = { ...errors, name: 'name is required!' };
        }
        // else if (params.name.length <= 5) {
        //     errors = { ...errors, name: 'name should be minimum 5 character!' };
        // }

        // if (!params.avatar) {
        //     errors = { ...errors, avatar: 'avatar is required' };
        // }
        if (!params.country) {
            errors = { ...errors, country: 'country is required' };
        }
        if (!params.email) {
            errors = { ...errors, email: 'email is required' };
        }
        if (!params.phone) {
            errors = { ...errors, phone: 'phone is required' };
        }

        if (!params.country) {
            errors = { ...errors, country: 'country is required' };
        }
        if (!params.rule_id) {
            errors = { ...errors, rule_id: 'rules is required' };
        }

        if (!params.status) {
            errors = { ...errors, status: 'Please select status!' };
        }

        console.log(errors)
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const storeOrUpdateApi = async (data: any) => {



        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: window.location.origin + "/api/dashboard/authorizations",
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
                    fetchAuthorization()
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
        data.append("avatar", params.avatar);
        data.append("country", params.country);
        data.append("email", params.email);
        data.append("name", params.name);
        data.append("phone", params.phone);
        data.append("rule_id", params.rule_id);
        data.append("status", params.status);
        storeOrUpdateApi(data);
    };

    const storeOrUpdate = (data) => {
        setErros({});
        if (data) {
            setParams({
                id: data.id,
                avatar: '',
                status: data.status,
                country: data.country,
                email: data.email,
                name: data.name,
                phone: data.phone,
                rule_id: data.rule_id,
            });

            data.avatar ?
                setImagePriview(window.location.origin + '/storage/' + data.avatar) :
                setImagePriview('https://dummyimage.com/600x400/000/fff');
        } else {
            const defaltData = JSON.parse(JSON.stringify(defaultParams));
            setImagePriview('https://dummyimage.com/600x400/000/fff');
            setParams(defaltData);
        }
        setModal(true)
    }

    const distroy = (user: any) => {
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
                        url: window.location.origin + "/api/dashboard/authorizations/" + user.id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + crmToken,
                        },
                    });
                    if (response.data.status === "success") {
                        // setCategories(categories.filter((d: any) => d.id !== id))
                        Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });
                        fetchAuthorization()
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
                // <div className='p-4' >
                //     <div className="flex items-center justify-between flex-wrap gap-4">
                //         <h2 className="text-2xl font-semibold">Authorizations</h2>
                //         <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                //             <div className="flex gap-3">

                //                 <div className="relative">
                //                     <input type="text" placeholder="Search Authorizations" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                //                     <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                //                         <IconSearch className="mx-auto" />
                //                     </button>
                //                 </div>
                //                 <div>
                //                     <button type="button" className="btn btn-dark btn-sm" onClick={() => storeOrUpdate()}>
                //                         Add Authorizations
                //                     </button>
                //                 </div>
                //                 <NavLink to='/authorization/roles' >
                //                     <button type="button" className="btn btn-gradient btn-sm" >
                //                         Rules
                //                     </button>
                //                 </NavLink>
                //             </div>

                //         </div>
                //     </div>

                //     <div className="mt-5 panel p-0 border-0 overflow-hidden shadow-lg">
                //         <div className="table-responsive">
                //             <table className="table-striped table-hover">
                //                 <thead className='bg-primary-light'>
                //                     <tr>
                //                         <th>Name</th>
                //                         <th>Email</th>
                //                         <th>Location</th>
                //                         <th>Phone</th>
                //                         <th className="!text-center">Actions</th>
                //                     </tr>
                //                 </thead>
                //                 <tbody>
                //                     {!filteredItems.length ? "no data" : filteredItems.map((contact: any) => {
                //                         return (
                //                             <tr key={contact.id}>
                //                                 <td>
                //                                     <div className="flex items-center w-max">

                //                                         <div>{contact.name}</div>
                //                                     </div>
                //                                 </td>
                //                                 <td>{contact.email}</td>
                //                                 <td className="whitespace-nowrap">{contact.country}</td>
                //                                 <td className="whitespace-nowrap">{contact.phone}</td>
                //                                 <td>
                //                                     <div className="flex gap-4 items-center justify-center">
                //                                         <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => storeOrUpdate(contact)}>
                //                                             Edit
                //                                         </button>
                //                                         {
                //                                             contact.id == 1 ? '' : (<button type="button" className="btn btn-sm btn-outline-danger" onClick={() => distroy(contact)}>
                //                                                 Delete
                //                                             </button>)
                //                                         }

                //                                     </div>
                //                                 </td>
                //                             </tr>
                //                         );
                //                     })}
                //                 </tbody>
                //             </table>
                //         </div>
                //     </div>
                // </div>

               <div>
                 <div className='flex justify-between mb-2'>

<div>
</div>
<div className='flex gap-1' onClick={() => { setModal(true) }}  >
    <img src={themeConfig.theme == 'dark' ? PlusDark : Plus} />
    <button type="button" className=' text-black dark:text-white font-extrabold text-[15px]' >
        Add Authoriation
    </button>
</div>

</div>
<div className="panel p-0 dark:bg-black dark:text-white bg-white text-black rounded-xl mt-2">
{filteredItems.length ? (
    <div className="table-responsive mb-5 p-3 ">
        <>
            <div className=" dark:bg-[#202125] bg-[#DDDDDD] text-black dark:text-white grid grid-cols-8 p-2 rounded-lg">
                <div className=" flex items-center justify-center">
                    <h3>Id</h3>
                </div>
                <div className=" flex items-center justify-center">
                    <h3>Name</h3>
                </div>
                <div className=" flex items-center justify-center">
                    <h3>Email</h3>
                </div>
                <div className=" flex items-center justify-center">
                    <h3>Role</h3>
                </div>
                <div className=" flex items-center justify-center">
                    <h3>Phone</h3>
                </div>
                <div className=" flex items-center justify-center">
                    <h3>Status</h3>
                </div>
                <div className=" flex items-center justify-center">
                    <h3>Permission</h3>
                </div>
                <div className=" flex items-center justify-center">
                    <h3>Action</h3>
                </div>
            </div>

            {filteredItems.map((auth, index) => {
                return (
                    <div
                        className=" dark:bg-[#202125] bg-[#F2F2F2] dark:text-white text-black grid grid-cols-8 p-2 rounded-lg mt-1"
                        key={auth.id}
                    >
                        <div className=" flex items-center justify-center">
                            <h3> {auth.id}</h3>
                        </div>
                        <div className=" flex items-center justify-center">
                            <h3>{auth.name}</h3>
                        </div>
                        <div className=" flex items-center justify-center">
                            <h3>{auth.email}</h3>
                        </div>
                        <div className=" flex items-center justify-center">
                            <h3>{auth.name}</h3>
                        </div>
                        <div className=" flex items-center justify-center">
                            <h3>{auth.country}</h3>
                        </div>
                        <div className=" flex items-center justify-center">
                            <div
                                className={`badge text-center w-20 rounded-lg h-6 text-[#12DD00] ${auth.Status == "1"
                                        ? " dark:bg-[#000000] bg-[#FFFFFF] text-[#12DD00] text-center"
                                        : "text-[#FF0000] bg-[#FFFFFF] dark:bg-[#000000] text-center"
                                    }`}
                            >
                                {auth.Status == 1 ? "Active" : "Blocked"}
                            </div>
                        </div>
                        <div className=" flex items-center justify-center " onClick={()=>{setpermissionModal(true)}}>
                            <img
                                src={themeConfig.theme == 'dark' ? darkview : view}
                                alt=""
                                srcset=""
                                className=" object-contain w-4 h-4 cursor-pointer"
                            />

                        </div>
                        <div className=" flex items-center justify-center">
                            <button onClick={() => storeOrUpdate(auth)} className=" w-[56px] h-[26px] bg-[#DDDDDD] rounded-2xl text-[#000000] dark:bg-[#000000] dark:text-[#FFFFFF]">
                                Edit
                            </button>
                        </div>
                    </div>
                );
            })}
        </>
    </div>
) : (
    <>
        <b>No Details Found</b>
    </>
)}
</div>
               </div>
            )}

            <Transition appear show={model} as={Fragment}>
                <Dialog as="div" open={model} onClose={() => setModal(false)} className="relative z-[51]">
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
                                        {params.id ? 'Edit Authorization' : 'Add Authorization'}
                                    </div>
                                    <div className="p-5">
                                        <form>

                                            <div className="mb-5">
                                                <label htmlFor="name">Name</label>
                                                <input id="name" type="text" placeholder="Enter Name" className="form-input" name='name' value={params.name} onChange={(e) => changeValue(e)} />
                                                {errors?.name ? <div className="text-danger mt-1">{errors.name}</div> : ''}
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="email" placeholder="Enter Email" className="form-input" name='email' value={params.email} onChange={(e) => changeValue(e)} />
                                                {errors?.email ? <div className="text-danger mt-1">{errors.email}</div> : ''}
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="number">Phone Number</label>
                                                <input id="phone" type="text" placeholder="Enter Phone Number" className="form-input" name='phone' value={params.phone} onChange={(e) => changeValue(e)} />
                                                {errors?.phone ? <div className="text-danger mt-1">{errors.phone}</div> : ''}
                                            </div>


                                            {params?.id != 1 ? (<div className="mb-5">
                                                <label htmlFor="number">
                                                    Rules
                                                </label>
                                                <select className="form-select  text-white-dark"
                                                    name='rule_id' value={params.rule_id} onChange={(e) => changeValue(e)}
                                                >
                                                    <option>
                                                        Select Rules....
                                                    </option>

                                                    {rules.map((rule) => (
                                                        <option key={rule.id} value={rule.id}>{rule.rule}</option>
                                                    ))}

                                                </select>
                                                {errors?.rule_id ? <div className="text-danger mt-1">{errors.rule_id}</div> : ''}

                                            </div>) : ('')}


                                            <div className="mb-5">
                                                <label htmlFor="number">
                                                    Country
                                                </label>
                                                <select className="form-select  text-white-dark"
                                                    name='country' value={params.country} onChange={(e) => changeValue(e)}
                                                >
                                                    <option>
                                                        Select....
                                                    </option>
                                                    <option>
                                                        INDIA
                                                    </option>
                                                    <option>USA</option>
                                                    <option>UAE</option>
                                                </select>
                                                {errors?.country ? <div className="text-danger mt-1">{errors.country}</div> : ''}

                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="avatar">Image</label>
                                                <input ref={fileImageRef} name="avatar" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
                                                <span className="w-full h-20 relative">
                                                    <img className="w-20 h-20  overflow-hidden object-cover" id="category_image" onClick={() => {
                                                        fileImageRef.current!.click()
                                                    }} src={imagePriview} alt="img" />
                                                </span>
                                                {/* <span className="text-danger font-semibold text-sm p-2">{errors.avatar}</span> */}
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="number">Status</label>
                                                <label className="inline-flex">
                                                    <input
                                                        id="status5"
                                                        name="status"
                                                        type="radio"
                                                        className="form-radio text-success peer"
                                                        defaultChecked={params.status == '1' ? true : false}
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
                                                        defaultChecked={params.status == '0' ? true : false}
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
                                                    {btnLoading ? 'Loading...' : params.id ? 'Update' : 'Add'}
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

            <Transition appear show={permissionmodal} as={Fragment}>
                <Dialog
                    as="div"
                    open={permissionmodal}
                    onClose={() => setpermissionModal(true)}
                >
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
                    <div
                        className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
                        onClick={() => {
                            setpermissionModal(false);
                        }}
                    >
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className=" border-0   overflow-hidden  my-8 text-black dark:text-white ">
                                    {/* <div className="  bg-white  dark:bg-[#202125]"> */}
                                    <div className=" bg-white dark:bg-[#202125] p-4 px-6 rounded-2xl w-[595px]">
                                        <div className=" flex items-center">
                                            <img
                                            onClick={()=>{setpermissionModal(false)}}
                                                src={ themeConfig.theme=='dark'? leftDark: leftarrow}
                                                alt=""
                                                srcset=""
                                                className=" object-contain w-4 h-4 "
                                            />
                                            <h3 className=" font-bold dark:text-white text-lg">
                                                Permissions
                                            </h3>
                                        </div>

                                        <div className=" dark:bg-[#121212] bg-[#DDDDDD] text-black dark:text-white grid grid-cols-5  rounded-lg mt-2 h-[28px]">
                                            <div className=" flex items-center justify-center">
                                                <h3 className=" font-bold dark:text-white text-sm">
                                                    Name
                                                </h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <h3 className=" font-bold dark:text-white text-sm">
                                                    View
                                                </h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <h3 className=" font-bold dark:text-white text-sm">
                                                    Create
                                                </h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <h3 className=" font-bold dark:text-white text-sm">
                                                    Edit
                                                </h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <h3 className=" font-bold dark:text-white text-sm">
                                                    Delete
                                                </h3>
                                            </div>
                                        </div>
                                        <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                                            <div className=" flex items-center ml-2">
                                                <h3>Profile</h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" class="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                        </div>
                                        <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                                            <div className=" flex items-center ml-2">
                                                <h3>Restaurant</h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                        </div>
                                        <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                                            <div className=" flex items-center ml-2">
                                                <h3 className="">Authorization</h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                        </div>
                                        <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                                            <div className=" flex items-center ml-2">
                                                <h3>Payments</h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                        </div>
                                        <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                                            <div className=" flex items-center ml-2">
                                                <h3>Pricing</h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                        </div>
                                        <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                                            <div className=" flex items-center ml-2">
                                                <h3>Invoice</h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center"></div>
                                            <div className=" flex items-center justify-center"></div>
                                            <div className=" flex items-center justify-center"></div>
                                        </div>
                                        <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white  grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                                            <div className=" flex items-center ml-2">
                                                <h3>Billing</h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center"></div>
                                            <div className=" flex items-center justify-center"></div>
                                            <div className=" flex items-center justify-center"></div>
                                        </div>
                                        <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                                            <div className=" flex items-center ml-2">
                                                <h3>Settings</h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center"></div>
                                            <div className=" flex items-center justify-center">
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className=" flex items-center justify-center"></div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-end">
                                            <button
                                                type="button"
                                                className="btn  btn-dark btn-sm w-[85px] h-[28px] rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm"
                                            >
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

export default Index;
