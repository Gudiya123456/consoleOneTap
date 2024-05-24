import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleTheme, toggleSidebar,  setUserData, setColors, setCrmToken, toggleRTL } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
// import { onMessageListener, requestForToken } from '../../firebase'ss
import home from '../../assets/images/Home.svg'
import bell from '../../assets/images/Service Bell.png'
import slash from '../../assets/images/Untitled.svg'
import doorbell from '../../assets/images/Doorbell.svg'
import arrow from '../../assets/images/arrow.svg'
import doorbellWhite from '../../assets/images/Doorbell-white.svg'
import serviceDark from '../../assets/images/Service Bell.svg'
import homedark from '../../assets/images/Home (1).svg'
import slashdark from '../../assets/images/slashdark.svg'
import user from '../../assets/images/usernew.svg'
import search from '../../assets/images/Search.svg';
import colorSetting from '../../assets/images/colorSetting.svg'
import logout1 from '../../assets/images/shutdown 1.svg'
import colorSettings from '../../assets/images/colorSettings.svg'
import lightlogo from '../../assets/images/lightlogo.svg'


import { Dialog, Transition } from "@headlessui/react";


// import user from "../../assets/images/user1.png";
import pen from "../../assets/images/pen.png";
import email from "../../assets/images/email.png";
import phone from "../../assets/images/phone.png";
import wpen from "../../assets/images/wpen.png";
import wemail from "../../assets/images/wemail.png";
import wphone from "../../assets/images/wphone.png";

const Header = () => {
    const location = useLocation();
    const path = window.location.pathname
    // console.log(path);
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const userData = useSelector((state: IRootState) => state.themeConfig.userData);
    const crmData = useSelector((state: IRootState) => state.themeConfig.crmData);
    const permissions = useSelector((state: IRootState) => state.themeConfig.permissions);

    console.log(permissions)
    const [isOpen, setIsOpen] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        // const a=   document.querySelector('button.active');
        // if(a){
        //     a.classList.remove('active')
        // }
        // const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]')?.firstChild;
        // console.log("selecter", selector)

        // // if (selector) {
        //     selector.classList.add('active');
        //     console.log("selecter", selector)

        //     // for (let i = 0; i < all.length; i++) {
        //     //     all[0]?.classList.remove('active');
        //     // }

        // // }
    }, [location]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    function createMarkup(messages: any) {
        return { __html: messages };
    }
    const [messages, setMessages] = useState([

    ]);

    // const removeMessage = (value: number) => {
    //     setMessages(messages.filter((user) => user.id !== value));
    // };

    const [notifications, setNotifications] = useState([

    ]);

    // const removeNotification = (value: number) => {
    //     setNotifications(notifications.filter((user) => user.id !== value));
    // };

    const [search, setSearch] = useState(false);

    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

    const { t } = useTranslation();

    const logout = () => {
        dispatch(setCrmToken(''))
        dispatch(setUserData(''))
    }

    useEffect(() => {
        if (!crmToken) navigate('/login')
    }, [crmToken])

    const toggleSubMenu = () => {

    }

const[modal,setModal]=useState(false);
    // Color Setting Functionalities

    const [selectedcolor, setselectedcolor] = useState("");
    // console.log('themeConfig', themeConfig.theme);
    const colors = [
        "#C65BCF", "#03AED2", "#344C64", "#0A6847",
        //  'white', 'black'
        ];

    const [defaultcol, setDefault] = useState("white");
    const setColor = () => {
        // if (selectedcolor) {
        //     setDefault(selectedcolor);
        //     localStorage.setItem("selcolor", selectedcolor);
        //     dispatch(setColors(selectedcolor))


        // }
        //  else {
            if(themeConfig.theme=='dark'){
                setDefault("black");
                dispatch(setColors(defaultcol))
                // dispatch(setColors(defaultcol?defaultcol:colors))

            }
            else{
                setDefault("white");
                dispatch(setColors(defaultcol))

            }

            // localStorage.setItem("selcolor", "white");
        // }
        setModal(false);
    };
    // const getColor = () => {
    //     try {
    //         const col = localStorage.getItem("selcolor");
    //         setDefault(col);

    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    // useEffect(() => {
    //     getColor();
    // }, []);

    console.log('defaultcol', defaultcol);

    const[profileModal,setProfileModal]=useState(false);


    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="">
                <div className="relative bg-[#F2F2F2] flex w-full items-center px-5 py-2.5 dark:bg-[#202125]">
                    <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                        {/* <Link to="/dashboard" className="main-logo flex items-center shrink-0">
                            <img className="w-10 h-8 ltr:-ml-1 rtl:-mr-1 inline" src={lightlogo} alt="logo" />
                        </Link> */}
                        <button
                            type="button"
                            className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    {/* <div className="ltr:mr-2 rtl:ml-2 hidden sm:block">
                        <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                            <li>
                                <button className='badge bg-black text-sm'>{currentTime}</button>
                            </li>
                        </ul>
                    </div> */}
                    <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-white">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto">

                            <div>
                                <div className='flex gap-1 mb-2' >
                                    <img src={arrow} />
                                    <button type="button" className=' font-extrabold text-[20px]' >

                                        {
                                            path == "/dashboard" ? 'Dashboard'
                                                : path == "/dashboard/restaurant" || path == "/dashboard/restaurant/view" ? 'Restaurants'
                                                    : path == "/dashboard/authentication" ? ' Authentication'
                                                        : path == "/dashboard/payment" ? ' Payment'
                                                            : path == "/dashboard/invoice" ? ' Invoice'
                                                                : path == "/dashboard/billing" ? ' Billing'
                                                                    : path == "/dashboard/support" ? ' Support'
                                                                        : path == "/dashboard/settings" ? 'Settings'
                                                                            : ''
                                        }
                                    </button>
                                </div>

                                <div className='flex gap-2' >
                                    <div className='flex gap-1' >
                                        <img className='w-4' src={themeConfig.theme == 'dark' ? homedark : home} />
                                        <button type="button" className='  text-[14px]' >
                                            Home
                                        </button>
                                    </div>
                                    <img src={themeConfig.theme == 'dark' ? slashdark : slash} className='ml-2' />
                                    <div className='flex gap-1' >
                                        <img className='w-4' src={themeConfig.theme == 'dark' ? serviceDark : bell} />
                                        <button type="button" className='  text-[14px]' >
                                            Restaurants
                                        </button>
                                    </div>
                                </div>

                                {/* <ul className="flex space-x-2 rtl:space-x-reverse">
                            <li>
                                <Link to="/" className="text-primary hover:underline">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                                <span>Sales</span>
                            </li>
                        </ul> */}

                            </div>

                        </div>



                        {/* <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                            <li>
                                <select defaultValue={currentBranch.branch_name} disabled={userData.branch_id ? true : false} onChange={(e) => {

                                    dispatch(setCurrentBranch(branches.find((b) => {
                                        return b.branch_name == e.target.value
                                    })))

                                }} className="form-select w-auto form-select-sm text-white-dark me-4 font-extrabold" style={{ paddingRight: '2rem' }}>
                                    {branches?.map((branch) => (
                                        <option key={branch.id} >{branch.branch_name}</option>
                                    ))}
                                </select>
                            </li>
                        </ul> */}


                        <div>
                            {themeConfig.theme === 'light' ? (
                                <button
                                    className={`${themeConfig.theme === 'light' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
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
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
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


                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
                            <div style={{ width: '300px' }} className='bg-[#FFFFFF] gap-2 flex px-1 py-2 rounded-3xl' >

                                {/* <IconSearch  className='mt-1 text-black'  /> */}

                                {/* <img src={search} alt="" className='ml-2' /> */}
                                <img src={search} alt="" />

                                <div className='bg-[#EDEDED]'>
                                    <input style={{ fontFamily: 'Roboto', fontWeight: 400, fontStyle: 'normal' }} className='bg-[#FFFFFF] font-semibold text-[#9A9A9A] outline-0 ' type='text' placeholder='Search for restaurants' />
                                </div>
                            </div>


                        </div>
                        <div>
                            <img src={themeConfig.theme == 'dark' ? doorbellWhite : doorbell} alt="" />
                        </div>


                        <div className="dropdown  shrink-0 flex ">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative group block"
                                button={<img className="w-9 h-9 rounded-full  object-cover  group-hover:saturate-100" src={user} alt={userData.name} />}

                            >

                                <ul className="text-dark dark:text-white-dark !rounded-2xl dark:!bg-[#202125] !bg-white !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                    {/* <li>
                                        <div className="flex items-center px-4 py-4">
                                            <img className="rounded-md w-10 h-10 object-cover" src={`https://ui-avatars.com/api/?background=000&color=fff&name=${userData.name}`} alt={userData.name} />
                                            <div className="ltr:pl-4 rtl:pr-4 truncate">
                                                <h4 className="text-base">
                                                    {userData.name}
                                                </h4>

                                                <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                                                    {userData.email}
                                                </button>
                                            </div>
                                        </div>
                                    </li> */}
                                    <li>
                                        <NavLink to="#" onClick={()=>{setProfileModal(true)}} className="dark:text-white text-black">
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

            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" open={modal} onClose={() => setModal(true)}>
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
                            setModal(false);
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
                                    {/* <div className="  bg-white  dark:bg-[#202125]"> */}
                                    <div className=" bg-white dark:bg-[#202125] p-4 rounded-2xl w-[350px]">
                                        <h5 className="text-lg font-bold dark:text-white text-black mb-2 ">
                                            Color Settings
                                        </h5>


                                        <div>
                                            <h5 className='text-black dark:text-white text-md' >Sidebar Navigation</h5>
                                            <div className=" flex ">
                                                {colors.map((color, index) => (
                                                    <div
                                                        style={{
                                                            borderColor:
                                                                selectedcolor == color ? color : "transparent",
                                                        }}
                                                        className=" w-5 h-5 flex justify-center items-center  rounded-full  mr-3   "
                                                    >
                                                        <div
                                                            key={index}
                                                            style={{ background: color }}
                                                            className={`w-3 h-3  rounded-full `}
                                                            onClick={() => {{
                                                                dispatch(setColors(color))
                                                                // setselectedcolor(color)
                                                            }}}
                                                        ></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-end">
                                            <button
                                                type="button"
                                                className="btn  btn-dark btn-sm px-6 py-1 rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm"
                                                onClick={setColor}
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

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
                  {/* <div className="  bg-white  dark:bg-[#202125]"> */}
                  <div className=" dark:bg-[#202125] bg-white text-black px-9 rounded-2xl w-[421px] pt-6 pb-5 dark:text-white font-[500]">
                    <h5 className="text-lg font-bold  ">Profile Details</h5>

                    <form>
                      <div className="ml-1 ">
                        <div className=" mt-2 ">
                          <label
                            className="text-style roboto-light  text-[16px] font-semibold ml-12"
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
                              <input
                                type="text"
                                className=" bg-transparent flex-1 focus:outline-none pr-[5px]"
                              />
                              <img
                                src={ themeConfig.theme=='dark'? wpen:pen}
                                alt=""
                                
                                className=" object-contain w-4 "
                              />

                            </div>
                          </div>
                        </div>

                        <div className=" mt-2">
                          <label
                            className="text-style roboto-light  text-[16px] font-semibold ml-12"
                            htmlFor="status"
                          >
                            Contact Number
                          </label>
                          <div className="flex items-center">
                            <div>
                              <img
                                src={ themeConfig.theme=='dark'? wphone:phone}

                                alt=""
                                
                                className=" object-contain w-[29px] h-[29px]"
                              />

                            </div>
                            <div className="flex  flex-1 border border-[#ADADAD] rounded-3xl ml-2 px-[15px] h-[36px] items-center">
                              <input
                                type="text"
                                className="bg-transparent flex-1 focus:outline-none pr-[5px]"
                              />
                              <img
                                src={ themeConfig.theme=='dark'? wpen:pen}

                                alt=""
                                
                                className=" object-contain w-4 "
                              />

                            </div>
                          </div>
                        </div>
                        <div className=" mt-2">
                          <label
                            className="text-style roboto-light  text-[16px] font-semibold ml-12"
                            htmlFor="status"
                          >
                            Email Address
                          </label>
                          <div className="flex items-center">
                            <div>
                              <img
                                src={themeConfig.theme=='dark'?wemail:email}


                                alt=""
                                
                                className=" object-contain w-[29px] h-[29px] "
                              />
                              {/* <img
                                src={wemail}
                                alt=""
                                
                                className=" object-contain w-[29px] h-[29px] "
                              /> */}
                            </div>
                            <div className="flex  flex-1 border border-[#ADADAD] rounded-3xl ml-2 px-[15px] h-[36px] items-center">
                              <input
                                type="text"
                                className=" bg-transparent flex-1 focus:outline-none pr-[5px]"
                              />
                              <img
                             src={ themeConfig.theme=='dark'? wpen:pen}
                                alt=""
                                
                                className=" object-contain w-4 "
                              />

                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="mt-5 flex items-center justify-end">
                      <button
                        type="button"
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


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { IRootState } from '../../store';
// import { toggleRTL, toggleTheme, toggleSidebar, setCrmToken, setUserData } from '../../store/themeConfigSlice';
// import { useTranslation } from 'react-i18next';
// import i18next from 'i18next';
// import Dropdown from '../Dropdown';
// import { LuLayoutDashboard } from 'react-icons/lu';
// import { MdOutlineRestaurant } from 'react-icons/md';
// import { RiAdminLine } from 'react-icons/ri';
// import { MdPayment } from 'react-icons/md';
// import { IoMdSettings } from 'react-icons/io';
// import { ImPriceTag } from 'react-icons/im';
// import { IoNotifications } from 'react-icons/io5';
// import { BsFillFileEarmarkRuledFill } from 'react-icons/bs';
// import { MdFeaturedPlayList } from 'react-icons/md';
// import { IoIosArrowDown } from "react-icons/io";

// const Header = () => {
    // const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    // const userData = useSelector((state: IRootState) => state.themeConfig.userData);
    // const crmData = useSelector((state: IRootState) => state.themeConfig.crmData);
    // const permissions = useSelector((state: IRootState) => state.themeConfig.permissions);

    // console.log(permissions)
    // const [isOpen, setIsOpen] = useState('')
    // const navigate = useNavigate();
    // const location = useLocation();
    // useEffect(() => {
    //     // const a=   document.querySelector('button.active');
    //     // if(a){
    //     //     a.classList.remove('active')
    //     // }
    //     // const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]')?.firstChild;
    //     // console.log("selecter", selector)

    //     // // if (selector) {
    //     //     selector.classList.add('active');
    //     //     console.log("selecter", selector)

    //     //     // for (let i = 0; i < all.length; i++) {
    //     //     //     all[0]?.classList.remove('active');
    //     //     // }

    //     // // }
    // }, [location]);

    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    // const dispatch = useDispatch();

    // function createMarkup(messages: any) {
    //     return { __html: messages };
    // }
    // const [messages, setMessages] = useState([

    // ]);

    // // const removeMessage = (value: number) => {
    // //     setMessages(messages.filter((user) => user.id !== value));
    // // };

    // const [notifications, setNotifications] = useState([

    // ]);

    // // const removeNotification = (value: number) => {
    // //     setNotifications(notifications.filter((user) => user.id !== value));
    // // };

    // const [search, setSearch] = useState(false);

    // const setLocale = (flag: string) => {
    //     setFlag(flag);
    //     if (flag.toLowerCase() === 'ae') {
    //         dispatch(toggleRTL('rtl'));
    //     } else {
    //         dispatch(toggleRTL('ltr'));
    //     }
    // };
    // const [flag, setFlag] = useState(themeConfig.locale);

    // const { t } = useTranslation();

    // const logout = () => {
    //     dispatch(setCrmToken(''))
    //     dispatch(setUserData(''))
    // }

    // useEffect(() => {
    //     if (!crmToken) navigate('/login')
    // }, [crmToken])

    // const toggleSubMenu = () => {

    // }
//     return (
//         <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
//             <div className="shadow-sm">
//                 <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
//                     <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
//                         <Link to="/" className="main-logo flex items-center shrink-0" style={{ maxWidth: "100px" }}>
//                             <img className="ltr:-ml-1 rtl:-mr-1 inline" src={LOGO} alt="logo" />
//                         </Link>
//                         <button
//                             type="button"
//                             className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
//                             onClick={() => {
//                                 dispatch(toggleSidebar());
//                             }}
//                         >
//                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                                 <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                                 <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                             </svg>
//                         </button>
//                     </div>


//                     <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
//                         <div className="sm:ltr:mr-auto sm:rtl:ml-auto">

//                         </div>
//                         <div>
//                             {themeConfig.theme === 'light' ? (
//                                 <button
//                                     className={`${themeConfig.theme === 'light' &&
//                                         'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
//                                         }`}
//                                     onClick={() => {
//                                         dispatch(toggleTheme('dark'));
//                                     }}
//                                 >
//                                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
//                                         <path d="M12 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                                         <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                                         <path d="M4 12L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                                         <path d="M22 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                                         <path opacity="0.5" d="M19.7778 4.22266L17.5558 6.25424" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                                         <path opacity="0.5" d="M4.22217 4.22266L6.44418 6.25424" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                                         <path opacity="0.5" d="M6.44434 17.5557L4.22211 19.7779" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                                         <path opacity="0.5" d="M19.7778 19.7773L17.5558 17.5551" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                                     </svg>
//                                 </button>
//                             ) : (
//                                 ''
//                             )}
//                             {themeConfig.theme === 'dark' && (
//                                 <button
//                                     className={`${themeConfig.theme === 'dark' &&
//                                         'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
//                                         }`}
//                                     onClick={() => {
//                                         dispatch(toggleTheme('light'));
//                                     }}
//                                 >
//                                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <path
//                                             d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z"
//                                             fill="currentColor"
//                                         />
//                                     </svg>
//                                 </button>
//                             )}

//                         </div>

//                         <div className="dropdown shrink-0 flex">
//                             <Dropdown
//                                 offset={[0, 8]}
//                                 placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
//                                 btnClassName="relative group block"
//                                 button={<img className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src={`https://ui-avatars.com/api/?background=000&color=fff&name=${userData?.name}`} alt="userProfile" />}
//                             >
//                                 <ul className="text-dark dark:text-white-dark !py-0 w-[300px] font-semibold dark:text-white-light/90">
//                                     <li>
//                                         <div className="flex items-center px-4 py-4">
//                                             <img className="rounded-md w-10 h-10 object-cover" src={`https://ui-avatars.com/api/?background=000&color=fff&name=${userData?.name}`} alt="userProfile" />
//                                             <div className="ltr:pl-4 rtl:pr-4 truncate">
//                                                 <h4 className="text-base">
//                                                     {userData?.name}
//                                                 </h4>
//                                                 <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
//                                                     {userData?.email}
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </li>
//                                     <li>
//                                         <Link to="/profile" className="dark:hover:text-white">
//                                             <svg className="ltr:mr-2 rtl:ml-2 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                 <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
//                                                 <path
//                                                     opacity="0.5"
//                                                     d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
//                                                     stroke="currentColor"
//                                                     strokeWidth="1.5"
//                                                 />
//                                             </svg>
//                                             Profile
//                                         </Link>
//                                     </li>


//                                     <li className="border-t border-white-light dark:border-white-light/10">
//                                         <button className="text-danger !py-3" onClick={() => logout()}>
//                                             <svg className="ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                 <path
//                                                     opacity="0.5"
//                                                     d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
//                                                     stroke="currentColor"
//                                                     strokeWidth="1.5"
//                                                     strokeLinecap="round"
//                                                 />
//                                                 <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                             </svg>
//                                             Sign Out
//                                         </button>
//                                     </li>
//                                 </ul>
//                             </Dropdown>
//                         </div>
//                     </div>

//                 </div>


//                 {/* horizontal menu */}
//                 <div className="">
//                     <ul className="horizontal-menu   hidden py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-black text-black dark:text-white-dark">


//                         <li className="menu nav-item relative  ">
//                             <NavLink to='/'>
//                                 <button type="button" className=" p-2 rounded focus:ring-violet-300 focus:bg-[#eee] ">
//                                     <div className="flex items-center">
//                                         <LuLayoutDashboard />
//                                         <span className="px-1">{t('Dashboard')}</span>
//                                     </div>
//                                 </button>
//                             </NavLink>

//                         </li>
//                         {permissions?.restaurant?.view ? (
//                             <li className="menu nav-item relative   ">
//                                 <NavLink to='/restaurants'>
//                                     <button type="button" className=" p-2 rounded focus:ring-violet-300 focus:bg-[#eee]  ">
//                                         <div className="flex items-center">
//                                             <MdOutlineRestaurant />
//                                             <span className="px-1">{t('Restaurant')}</span>
//                                         </div>
//                                     </button>
//                                 </NavLink>

//                             </li>) :


//                             ''}
//                         {/* <li>
//                             <button className="bg-red-500  focus:ring-violet-300 focus:text-white ">
//                                 Save 1
//                             </button>
//                         </li>
//                         <li>
//                             <button className="bg-red-500  focus:ring-violet-300 focus:text-blue-200 ">
//                                 Save 2
//                             </button>

//                         </li> */}

//                         {permissions?.authorization?.view ? (<li className="menu nav-item relative">
//                             <NavLink to='/authorization'>
//                                 <button type="button" className=" p-2 rounded focus:ring-violet-300 focus:bg-[#eee] ">
//                                     <div className="flex items-center">
//                                         <RiAdminLine />
//                                         <span className="px-1">{t('Authorizations')}</span>
//                                     </div>
//                                 </button>
//                             </NavLink>
//                         </li>) : ''}


//                         {permissions?.packages?.view ? (<li className="menu nav-item relative">
//                             <NavLink to="/pricing">
//                                 <button type="button" className=" p-2 rounded focus:ring-violet-300 focus:bg-[#eee] ">
//                                     <div className="flex items-center">
//                                         <ImPriceTag />
//                                         <span className="px-1">{t('Packages')}</span>
//                                     </div>
//                                 </button>
//                             </NavLink>
//                         </li>) : ''}


//                         {permissions?.payments?.view ? (<li className="menu nav-item relative">
//                             <NavLink to='/payments' >
//                                 <button type="button" className=" p-2 rounded focus:ring-violet-300 focus:bg-[#eee] ">
//                                     <div className="flex items-center">
//                                         <MdPayment />
//                                         <span className="px-1">{t('Payments')}</span>
//                                     </div>
//                                 </button></NavLink>
//                         </li>) : ''}



//                         <li className="menu nav-item relative">
//                             <NavLink to="/settings">
//                                 <button type="button" className=" p-2 rounded focus:ring-violet-300 focus:bg-[#eee] ">
//                                     <div className="flex items-center">
//                                         <IoNotifications />
//                                         <span className="px-1">Settings</span>
//                                     </div>
//                                 </button>
//                             </NavLink>
//                         </li>

//                     </ul>
//                 </div>


//             </div>
//         </header >
//     );
// };

// export default Header;
