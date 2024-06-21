import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleRTL, toggleTheme, toggleSidebar, setCrmToken, setUserData } from '../../store/themeConfigSlice';
import Dropdown from '../Dropdown';
import IconMenu from '../Icon/IconMenu';
import IconSearch from '../Icon/IconSearch';
import Select from 'react-select';
import colorSetting from '../../assets/images/colorSetting.svg'
import user from '../../assets/images/usernew.svg'
import logo1 from "../../assets/images/auth/logo.svg"
import logout1 from '../../assets/images/shutdown 1.svg'
import { Dialog, Transition } from "@headlessui/react";
import { IoMdNotifications } from 'react-icons/io';
import pen from "../../assets/images/pen.png";
import email from "../../assets/images/email.png";
import phone from "../../assets/images/phone.png";
import wpen from "../../assets/images/wpen.png";
import wemail from "../../assets/images/wemail.png";
import wphone from "../../assets/images/wphone.png";
import axios from 'axios';
import Swal from 'sweetalert2';
import { ErrorHandle } from '../../pages/common/ErrorHandle';
const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const options3 = [
        { value: 'Outlet One', label: 'Outlet One' },
        { value: 'Outlet Two', label: 'Outlet Two' },
    ];
    const logout = () => {
        dispatch(setCrmToken(null));
        navigate("/login");
    }

    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [location]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const [search, setSearch] = useState(false);
    const path = window.location.pathname
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    // const crmToken='8|wE3Mh4SVxwrcXeqKDcQIMZYC6RDVZ4IKGQcSTF5d937ad76e';

    const userData = useSelector((state: IRootState) => state.themeConfig.userData);
    const [clicked, setClicked] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    // profile functionalitiess

    const [defaultParams] = useState({
        name: userData.name,
        email: userData.email,
        phone: userData.phone


    });

    const [params, setParams] = useState<any>(
        JSON.parse(JSON.stringify(defaultParams))
    );
    const [errors, setErros] = useState<any>({});
    const [modal, setModal] = useState(false)
    const [profileModal, setProfileModal] = useState(false);
    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: "" });
        setParams({ ...params, [name]: value });
    };
    console.table(params)

    const validate = () => {
        setErros({});
        let errors = {};

        if (!params.name) {
            errors = {
                ...errors,
                name: "name is required",
            };
        }
        if (!params.email) {
            errors = {
                ...errors,
                email: "email is required",
            };
        }
        if (!params.phone) {
            errors = {
                ...errors,
                phone: " phone is required",
            };
        }


        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const storeOrUpdateApi = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: "https://cdn.onetapdine.com/api/update-profile",
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

                setProfileModal(false)
                dispatch(setUserData(JSON.parse(response.data.user)))
                setClicked(false);

            } else {
                alert("Failed")
            }

        } catch (error: any) {
            console.log(error)
            if (error.response.status === 401) {
                ErrorHandle();
            }
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
        data.append("name", params.name);
        data.append("email", params.email);
        data.append("phone", params.phone);
        storeOrUpdateApi(data);
    };


    useEffect(() => {
        if (!crmToken) navigate('/login')
    }, [crmToken])

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                        <Link to="/" className="main-logo flex items-center shrink-0">
                            <img className="text-2xl ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300" src={logo1} alt="logo" />
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                        >
                            <IconMenu className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
                            <form
                                className={`${search && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                                onSubmit={() => setSearch(false)}
                            >
                                <div style={{ letterSpacing: '1px', fontFamily: 'Poppins', fontSize: '0.85rem', fontWeight: '400', lineHeight: '25px' }} className="w-[230px] ">
                                    <Select

                                        placeholder="Select Restaurants" options={options3} />
                                </div>
                            </form>
                            {/* <button
                                type="button"
                                onClick={() => setSearch(!search)}
                                className="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
                            </button> */}
                        </div>
                        <div>
                            {themeConfig.theme === 'light' ? (
                                <button
                                    className={`${themeConfig.theme === 'light' &&
                                        'flex items-center p-2 rounded-full ml-2  hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                        }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('dark'));
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M12 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M4 12L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M22 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M19.7778 4.22266L17.5558 6.25424" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M4.22217 4.22266L6.44418 6.25424" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M6.44434 17.5557L4.22211 19.7779" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M19.7778 19.7773L17.5558 17.5551" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </button>
                            ) : (
                                ''
                            )}
                            {themeConfig.theme === 'dark' && (
                                <button
                                    className={`${themeConfig.theme === 'dark' &&
                                        'flex items-center p-2 rounded-full  hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                        }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('light'));
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                            )}



                        </div>

                        <div className='p-1.5'>
                            <IoMdNotifications className='w-5 h-5' />
                        </div>

                        <div className="dropdown  shrink-0 flex ">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative group block"
                                button={<img className="w-7 h-7 rounded-full  object-cover  group-hover:saturate-100" src={user} alt='' />}

                            >
                                <ul className="text-dark dark:text-white-dark !rounded-2xl dark:!bg-[#202125] !bg-white !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                    <li>
                                        <NavLink to="#" onClick={() => { setProfileModal(true) }} className="dark:text-white text-black">
                                            <img src={user} alt="" className='w-5 mr-2' />
                                            Profile Settings
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="#" onClick={() => { setModal(true) }} className="dark:text-white text-black">
                                            <img src={colorSetting} alt="" className='w-5 mr-2' />
                                            Color Settings
                                        </NavLink>
                                    </li>
                                    <li className=" dark:border-white-light/10">
                                        <button className="dark:text-white text-black !py-3" onClick={() => logout()}>
                                            <img src={logout1} alt="" className='w-5 mr-2' />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <Transition appear show={profileModal} as={Fragment}>
                <Dialog as="div" open={profileModal} onClose={() => setProfileModal(true)}>
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
                            setProfileModal(false);
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
                                <Dialog.Panel className=" border-0   overflow-hidden  my-8 text-black dark:text-white-dark ">
                                    <div className=" dark:bg-[#202125] bg-white text-black px-9 rounded-2xl w-[471px] pt-6 pb-5 dark:text-white font-[500]">
                                        <h5 className="text-lg font-bold  ">Profile Details</h5>

                                        <form>
                                            <div className="ml-1 ">
                                                <div className=" mt-2 ">
                                                    <label
                                                        className="text-style-profile roboto-light  text-[16px] font-semibold ml-5"
                                                        htmlFor="status"
                                                    >
                                                        Profile Name
                                                    </label>
                                                    <div className="flex items-center">
                                                        <div>
                                                            <img
                                                                src={user}
                                                                alt=""

                                                                className=" object-contain w-[29px] h-[29px]"
                                                            />
                                                        </div>
                                                        <div className="flex  flex-1 border border-[#ADADAD] rounded-3xl ml-2 px-[15px] h-[36px] items-center">

                                                            <div
                                                                className=" bg-transparent flex-1 focus:outline-none pr-[5px]"

                                                            >
                                                                {
                                                                    clicked == false ? <h1>{params.name}</h1> : <input
                                                                        type="text"
                                                                        className='focus:outline-none '
                                                                        value={params.name}
                                                                        name='name'
                                                                        onChange={(e) => changeValue(e)}
                                                                    />
                                                                }
                                                            </div>

                                                            <img
                                                                onClick={() => { setClicked(true) }}
                                                                src={themeConfig.theme == 'dark' ? wpen : pen}
                                                                alt=""

                                                                className=" object-contain w-4 "
                                                            />

                                                        </div>

                                                    </div>
                                                    <div className='ml-8'>
                                                        <span className='text-danger' >{errors.name}</span>
                                                    </div>
                                                </div>

                                                <div className=" mt-2">
                                                    <label
                                                        className="text-style-profile roboto-light  text-[16px] font-semibold ml-12"
                                                        htmlFor="status"
                                                    >
                                                        Contact Number
                                                    </label>
                                                    <div className="flex items-center">
                                                        <div>
                                                            <img
                                                                src={themeConfig.theme == 'dark' ? wphone : phone}

                                                                alt=""

                                                                className=" object-contain w-[29px] h-[29px]"
                                                            />

                                                        </div>
                                                        <div className="flex  flex-1 border border-[#ADADAD] rounded-3xl ml-2 px-[15px] h-[36px] items-center">


                                                            <div
                                                                className=" bg-transparent flex-1 focus:outline-none pr-[5px]"

                                                            >
                                                                {
                                                                    clicked == false ? <h1>{params.phone}</h1> : <input
                                                                        type="text"
                                                                        className='focus:outline-none '
                                                                        value={params.phone}
                                                                        name='phone'
                                                                        onChange={(e) => changeValue(e)}
                                                                    />
                                                                }
                                                            </div>
                                                            <img
                                                                onClick={() => { setClicked(true) }}
                                                                src={themeConfig.theme == 'dark' ? wpen : pen}
                                                                alt=""
                                                                className=" object-contain w-4 "
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className='ml-8'>
                                                        <span className='text-danger' >{errors.phone}</span>
                                                    </div>
                                                </div>
                                                <div className=" mt-2">
                                                    <label
                                                        className="text-style-profile roboto-light  text-[16px] font-semibold ml-12"
                                                        htmlFor="status"
                                                    >
                                                        Email Address
                                                    </label>
                                                    <div className="flex items-center">
                                                        <div>
                                                            <img
                                                                src={themeConfig.theme == 'dark' ? wemail : email}


                                                                alt=""

                                                                className=" object-contain w-[29px] h-[29px] "
                                                            />
                                                        </div>
                                                        <div className="flex  flex-1 border border-[#ADADAD] rounded-3xl ml-2 px-[15px] h-[36px] items-center">
                                                            <div
                                                                className=" bg-transparent flex-1 focus:outline-none pr-[5px]"

                                                            >
                                                                {
                                                                    clicked == false ? <h1>{params.email}</h1> : <input
                                                                        type="text"
                                                                        className='focus:outline-none '
                                                                        value={params.email}
                                                                        name='email'
                                                                        onChange={(e) => changeValue(e)}
                                                                    />
                                                                }
                                                            </div>
                                                            <img
                                                                onClick={() => { setClicked(true) }}
                                                                src={themeConfig.theme == 'dark' ? wpen : pen}
                                                                alt=""

                                                                className=" object-contain w-4 "
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='ml-8'>
                                                    <span className='text-danger' >{errors.email}</span>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="mt-5 flex items-center justify-end">
                                            <button
                                                type="button"
                                                onClick={() => { formSubmit() }}
                                                className="btn  btn-dark btn-sm w-[86px] h-[31px] rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm"
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
        </header>
    );
};

export default Header;

