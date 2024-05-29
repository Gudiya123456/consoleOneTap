import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleTheme, toggleSidebar, setUserData, setCrmToken, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../Dropdown';
import bell from '../../assets/images/Service Bell.png'
import doorbell from '../../assets/images/Doorbell.svg'
import arrow from '../../assets/images/arrow.svg'
import doorbellWhite from '../../assets/images/Doorbell-white.svg'
import serviceDark from '../../assets/images/Service Bell.svg'
import user from '../../assets/images/usernew.svg'
import colorSetting from '../../assets/images/colorSetting.svg'
import logout1 from '../../assets/images/shutdown 1.svg'
import { Dialog, Transition } from "@headlessui/react";
import pen from "../../assets/images/pen.png";
import email from "../../assets/images/email.png";
import phone from "../../assets/images/phone.png";
import wpen from "../../assets/images/wpen.png";
import wemail from "../../assets/images/wemail.png";
import wphone from "../../assets/images/wphone.png";
import IconSearch from '../Icon/IconSearch';
import lightmode from "../../assets/images/lightmode.svg";
import darkmode from "../../assets/images/darkmode.svg";
import { FaSearch } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineSpaceDashboard } from "react-icons/md"
import { IoNotifications } from "react-icons/io5";
import { HiMiniHome } from "react-icons/hi2";

import { MdOutlineLightMode } from "react-icons/md";
import axios from 'axios';
import { ErrorHandle } from '../../pages/common/ErrorHandle';
import Swal from 'sweetalert2';


const Header = () => {
  const path = window.location.pathname
  const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
  const userData = useSelector((state: IRootState) => state.themeConfig.userData);
  // const profileData = useSelector((state: IRootState) => state.themeConfig.profileData);

  const [clicked, setClicked] = useState(false);
  console.log(userData)
  console.log(crmToken)
  // console.log('profileData', profileData)

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

  console.log('userDatte', userData);

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

  const storeOrUpdate = (data) => {
    setErros({});
    if (data) {
      setParams({
        id: data.id,
        restaurant_name: data.restaurant_name,
        branches: data.branches,
        admin_name: data.admin_name,
        admin_email: data.admin_email,
        admin_phone: data.admin_phone,
        mode: data.mode ? '1' : '0',
        status: data.status ? '1' : '0',
      });
    }
    setProfileModal(true)
  }
  const profileUpdate = () => {
    alert(9999)
  }


  const navigate = useNavigate();
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const colors = useSelector((state: IRootState) => state.themeConfig.colors);

  console.log('colers', colors)
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setCrmToken(''))
    dispatch(setUserData(''))
  }

  useEffect(() => {
    if (!crmToken) navigate('/login')
  }, [crmToken])

  const [modal, setModal] = useState(false);

  const colors1 = [
    "#C65BCF", "#03AED2", "#344C64", "#0A6847",
  ];

  const setColor = () => {
    console.log('*******')
    console.log(themeConfig.theme)

    console.log('*******')
    if (themeConfig.theme == 'dark') {

      dispatch(setColors("black"))
    }
    else {

      dispatch(setColors('white'))
    }
    setModal(false);
  };



  const [profileModal, setProfileModal] = useState(false);


  return (
    <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>

      <div className="relative bg-[#F2F2F2]  flex w-full items-center px-5 py-2.5 dark:bg-[#202125]">
        <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">

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
        <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:grid-cols-2 sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-white">
          <div className="sm:ltr:mr-auto sm:rtl:ml-auto">

            <div>
              <div className='flex gap-1 mb-2' >
                <img src={arrow} />
                <button type="button" className=' font-extrabold text-[20px]' >

                  {
                    path == "/" ? 'Dashboard'
                      : path == "/restaurants" ? 'Restaurants'
                        : path == "/restaurant/view" ? 'Restaurant View'
                          : path == "/authorization" ? ' Authorization'
                            : path == "/payment" ? ' Payment'
                              : path == "/invoice" ? ' Invoice'
                                : path == "/billing" ? ' Billing'
                                  : path == '/pricing' ? 'Pricing'
                                    : path == "/support" ? ' Support'
                                      : path == "/settings" ? 'Settings'
                                        : ''
                  }
                </button>
              </div>

              <ul className="flex space-x-2 rtl:space-x-reverse">
                <li className='flex gap-1' >
                  <HiMiniHome />
                  <Link to="/" className="text-black dark:text-white hover:underline">
                    Home
                  </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2 flex gap-1">
                  <img className='w-4' src={themeConfig.theme == 'dark' ? serviceDark : bell} />
                  <span>  Restaurants</span>
                </li>
              </ul>

            </div>

          </div>


          <div className="flex items-center bg-white border border-white py-1 rounded-2xl w-[300px]">
            <FaSearch className="h-5 w-5 text-black mr-2 ml-3" />
            <input
              style={{ fontFamily: 'Roboto', fontWeight: 500, fontStyle: 'normal' }}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Search for restaurants"
              aria-label="Search"
            />
          </div>

          <div>
            {themeConfig.theme === 'light' ? (
              <button
                className={`${themeConfig.theme === 'light' &&
                  'flex items-center rounded-full'
                  }`}
                onClick={() => {
                  dispatch(toggleTheme('dark'));
                }}
              >
                {/* <img className='w-7 h-7' src={lightmode} alt="" /> */}
                <MdOutlineDarkMode className='w-7 h-7' />
              </button>
            ) : (
              ''
            )}
            {themeConfig.theme === 'dark' && (
              <button
                className={`${themeConfig.theme === 'dark' &&
                  'flex items-center  rounded-full '
                  }`}
                onClick={() => {
                  dispatch(toggleTheme('light'));
                }}
              >
                {/* <img className='w-7 h-7' src={darkmode} alt="" /> */}
                <MdOutlineLightMode className='w-7 h-7' />
              </button>
            )}



          </div>
          <div className='w-7 h-7'>
            {/* {themeConfig.theme == 'dark' ? <IoNotifications /> : "hhh"} */}
            <IoNotifications className='w-7 h-7' />
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
                        {colors1.map((color, index) => (
                          <div
                            style={{
                              borderColor:
                                colors == color ? color : "transparent",
                            }}
                            className=" w-5 h-5 flex justify-center items-center  rounded-full  mr-3   "
                          >
                            <div
                              key={index}
                              style={{ background: color }}
                              className={`w-3 h-3  rounded-full `}
                              onClick={() => {
                                {

                                  console.log('#########')
                                  console.log('selected color', color)
                                  console.log('#########')
                                  dispatch(setColors(color))
                                  // setselectedcolor(color)
                                }
                              }}
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
                          <span className="text-danger font-semibold text-sm  ml-8">{errors.name}</span>

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
                              {/* <img
                                src={wemail}
                                alt=""
                                
                                className=" object-contain w-[29px] h-[29px] "
                              /> */}
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
                              onClick={()=>{setClicked(true)}}
                                src={themeConfig.theme == 'dark' ? wpen : pen}
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
