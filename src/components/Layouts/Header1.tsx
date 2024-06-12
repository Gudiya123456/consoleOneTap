// import React, { useEffect, useState, Fragment } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { IRootState } from '../../store';
// import { toggleRTL, toggleTheme, toggleSidebar, setColors, setUserData, setCrmToken } from '../../store/themeConfigSlice';
// import { useTranslation } from 'react-i18next';
// import i18next from 'i18next';
// import Dropdown from '../Dropdown';
// import IconMenu from '../Icon/IconMenu';
// import IconCalendar from '../Icon/IconCalendar';
// import IconEdit from '../Icon/IconEdit';
// import IconChatNotification from '../Icon/IconChatNotification';
// import IconSearch from '../Icon/IconSearch';
// import IconXCircle from '../Icon/IconXCircle';
// import IconSun from '../Icon/IconSun';
// import user from '../../assets/images/usernew.svg'
// import colorSetting from '../../assets/images/colorSetting.svg'
// import logout1 from '../../assets/images/shutdown 1.svg'
// import { Dialog, Transition } from "@headlessui/react";
// import pen from "../../assets/images/pen.png";
// import email from "../../assets/images/email.png";
// import phone from "../../assets/images/phone.png";
// import wpen from "../../assets/images/wpen.png";
// import wemail from "../../assets/images/wemail.png";
// import wphone from "../../assets/images/wphone.png";
// import IconMoon from '../Icon/IconMoon';
// import IconLaptop from '../Icon/IconLaptop';
// import IconMailDot from '../Icon/IconMailDot';
// import IconArrowLeft from '../Icon/IconArrowLeft';
// import IconInfoCircle from '../Icon/IconInfoCircle';
// import IconBellBing from '../Icon/IconBellBing';
// import IconUser from '../Icon/IconUser';
// import IconMail from '../Icon/IconMail';
// import IconLockDots from '../Icon/IconLockDots';
// import IconLogout from '../Icon/IconLogout';
// import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
// import IconCaretDown from '../Icon/IconCaretDown';
// import IconMenuApps from '../Icon/Menu/IconMenuApps';
// import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
// import IconMenuElements from '../Icon/Menu/IconMenuElements';
// import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
// import IconMenuForms from '../Icon/Menu/IconMenuForms';
// import IconMenuPages from '../Icon/Menu/IconMenuPages';
// import IconMenuMore from '../Icon/Menu/IconMenuMore';
// import { IoNotifications, IoSearchOutline } from 'react-icons/io5';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { ErrorHandle } from '../../pages/common/ErrorHandle';
// import { FaSearch } from 'react-icons/fa';
// import { HiMiniHome, HiOutlineNewspaper } from 'react-icons/hi2';
// import serviceDark from '../../assets/images/Service Bell.svg'
// import bell from '../../assets/images/Service Bell.png'
// import arrow from '../../assets/images/arrow.svg'
// import home from '../../assets/images//Home (2).svg'
// import homed from '../../assets/images//Home (3).svg'

// import lightlogo from '../../assets/images/lightlogo.svg'
// import llogo from "../../assets/images/Group 319 (1).svg";
// import { RiDashboardFill } from 'react-icons/ri';
// import { FaBellConcierge } from 'react-icons/fa6';
// import { IoIosFingerPrint, IoIosHome, IoMdEye, IoMdPricetags } from 'react-icons/io';
// import { LiaCoinsSolid } from 'react-icons/lia';
// import { BsCardHeading } from 'react-icons/bs';
// import { MdSupportAgent } from 'react-icons/md';
// import { FiSettings } from 'react-icons/fi';
// import logo1 from "../../assets/images/auth/logo.svg"
// import { GoHome } from "react-icons/go";

// import Select from 'react-select';

// const Header = () => {
//   console.log('************    Heder')

//   const location = useLocation();
//   const themeConfig = useSelector((state: IRootState) => state.themeConfig);

//   useEffect(() => {
//     const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
//     if (selector) {
//       selector.classList.add('active');
//       const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
//       for (let i = 0; i < all.length; i++) {
//         all[0]?.classList.remove('active');
//       }
//       const ul: any = selector.closest('ul.sub-menu');
//       if (ul) {
//         let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
//         if (ele) {
//           ele = ele[0];
//           setTimeout(() => {
//             ele?.classList.add('active');
//           });
//         }
//       }
//     }
//   }, [location]);

//   const [modal, setModal] = useState(false)
//   const [profileModal, setProfileModal] = useState(false);

//   const options3 = [
//     { value: 'Outlet One', label: 'Outlet One' },
//     { value: 'Outlet Two', label: 'Outlet Two' },

// ];
//   const dispatch = useDispatch();

//   function createMarkup(messages: any) {
//     return { __html: messages };
//   }
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       image: '<span className="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
//       title: 'Congratulations!',
//       message: 'Your OS has been updated.',
//       time: '1hr',
//     },
//     {
//       id: 2,
//       image: '<span className="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg g xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
//       title: 'Did you know?',
//       message: 'You can switch between artboards.',
//       time: '2hr',
//     },
//     {
//       id: 3,
//       image: '<span className="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
//       title: 'Something went wrong!',
//       message: 'Send Reposrt',
//       time: '2days',
//     },
//     {
//       id: 4,
//       image: '<span className="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
//       title: 'Warning',
//       message: 'Your password strength is low.',
//       time: '5days',
//     },
//   ]);

//   const removeMessage = (value: number) => {
//     setMessages(messages.filter((user) => user.id !== value));
//   };

//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       profile: 'user-profile.jpeg',
//       message: '<strong className="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
//       time: '45 min ago',
//     },
//     {
//       id: 2,
//       profile: 'profile-34.jpeg',
//       message: '<strong className="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
//       time: '9h Ago',
//     },
//     {
//       id: 3,
//       profile: 'profile-16.jpeg',
//       message: '<strong className="text-sm mr-1">Anna Morgan</strong>Upload a file',
//       time: '9h Ago',
//     },
//   ]);

//   const removeNotification = (value: number) => {
//     setNotifications(notifications.filter((user) => user.id !== value));
//   };

//   const [search, setSearch] = useState(false);

//   const setLocale = (flag: string) => {
//     setFlag(flag);
//     if (flag.toLowerCase() === 'ae') {
//       dispatch(toggleRTL('rtl'));
//     } else {
//       dispatch(toggleRTL('ltr'));
//     }
//   };
//   const [flag, setFlag] = useState(themeConfig.locale);

//   const { t } = useTranslation();

//   const path = window.location.pathname
//   const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
//   const userData = useSelector((state: IRootState) => state.themeConfig.userData);
//   // const profileData = useSelector((state: IRootState) => state.themeConfig.profileData);

//   const [clicked, setClicked] = useState(false);
//   // console.log(userData)
//   // console.log(crmToken)
//   // console.log('profileData', profileData)

//   const [btnLoading, setBtnLoading] = useState(false);


//   // profile functionalitiess

//   const [defaultParams] = useState({
//     name: userData.name,
//     email: userData.email,
//     phone: userData.phone


//   });

//   const [params, setParams] = useState<any>(
//     JSON.parse(JSON.stringify(defaultParams))
//   );
//   const [errors, setErros] = useState<any>({});

//   const changeValue = (e: any) => {
//     const { value, name } = e.target;
//     setErros({ ...errors, [name]: "" });
//     setParams({ ...params, [name]: value });
//   };
//   console.table(params)

//   const validate = () => {
//     setErros({});
//     let errors = {};

//     if (!params.name) {
//       errors = {
//         ...errors,
//         name: "name is required",
//       };
//     }
//     if (!params.email) {
//       errors = {
//         ...errors,
//         email: "email is required",
//       };
//     }
//     if (!params.phone) {
//       errors = {
//         ...errors,
//         phone: " phone is required",
//       };
//     }


//     console.log(errors);
//     setErros(errors);
//     return { totalErrors: Object.keys(errors).length };
//   };

//   // console.log('userDatte', userData);

//   const storeOrUpdateApi = async (data: any) => {
//     setBtnLoading(true)
//     try {
//       const response = await axios({
//         method: 'post',
//         url: "https://cdn.onetapdine.com/api/update-profile",
//         data,
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: "Bearer " + crmToken,
//         },
//       });
//       if (response.data.status == 'success') {
//         Swal.fire({
//           icon: response.data.status,
//           title: response.data.title,
//           text: response.data.message,
//           padding: '2em',
//           customClass: 'sweet-alerts',
//         });

//         setProfileModal(false)
//         dispatch(setUserData(JSON.parse(response.data.user)))
//         setClicked(false);

//       } else {
//         alert("Failed")
//       }

//     } catch (error: any) {
//       console.log(error)
//       if (error.response.status === 401) {
//         ErrorHandle();
//       }
//       if (error?.response?.status === 422) {
//         const serveErrors = error.response.data.errors;
//         let serverErrors = {};
//         for (var key in serveErrors) {
//           serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
//           console.log(serveErrors[key][0])
//         }
//         setErros(serverErrors);
//         CrmSwal.fire({
//           title: "Server Validation Error! Please solve",
//           toast: true,
//           position: 'top',
//           showConfirmButton: false,
//           showCancelButton: false,
//           width: 450,
//           timer: 2000,
//           customClass: {
//             popup: "color-danger"
//           }
//         });
//       }
//     } finally {
//       setBtnLoading(false)
//     }
//   };

//   const formSubmit = () => {
//     const isValid = validate();
//     if (isValid.totalErrors) return false;
//     const data = new FormData();
//     data.append("id", params.id);
//     data.append("name", params.name);
//     data.append("email", params.email);
//     data.append("phone", params.phone);
//     storeOrUpdateApi(data);
//   };


//   const navigate = useNavigate();
//   const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

//   const colors = useSelector((state: IRootState) => state.themeConfig.colors);
//   console.log('colers', colors)
//   const logout = () => {
//     dispatch(setCrmToken(''))
//     dispatch(setUserData(''))
//   }

//   useEffect(() => {
//     if (!crmToken) navigate('/login')
//   }, [crmToken])


//   const colors1 = [
//     "#C65BCF", "#03AED2", "#344C64", "#0A6847",
//   ];

//   const setColor = () => {
//     console.log('*******')
//     console.log(themeConfig.theme)

//     console.log('*******')
//     if (themeConfig.theme == 'dark') {

//       dispatch(setColors("black"))
//     }
//     else {

//       dispatch(setColors('white'))
//     }
//     setModal(false);
//   };


//   // search restaurants
// const[isLoading,setIsLoading]=useState(false)
// const[resList,setResList]=useState([])

//   const fetchRestaurantList = async () => {
//     setIsLoading(true);
//     try {
//         const response = await axios({
//             method: "get",
//             url: "https://cdn.onetapdine.com/api/restaurants",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: "Bearer " + crmToken,
//             },
//         });
//         console.log("kkjkjj",response.data.restaurants);

//         if (response.data.status == "success") {
//             setResList(response.data.restaurants);
//             console.log(response.data.restaurants);
//         }
//         console.log('restarants', response.data.restaurants)

//         if(response.data.status=='error'){
//             alert(99999)
//         }
//     } catch (error: any) {
//         if (error.response.status == 401) {
//             ErrorHandle();
//         }
//         else console.log(error);
//     } finally {
//         setIsLoading(false);
//     }
// };
// useEffect(()=>{
//   fetchRestaurantList()
// },[])
//   const[data,setData]=useState([]);
//   const[value,setValue]=useState();
//   const onChange=(e)=>{
//     setValue(e.target.value.toUpperCase());
//     fetchRestaurantList()
//     // const response=await fetch("https://jsonplaceholder.typicode.com/posts")
//     // const data=response.json()
//     setData(resList);
//   }
//   console.log('helloo search data', data);
//   console.log(value)

//   const clearSearch=()=>{
//     setValue('');
//   }
// const resto='/restaurant/view'
//   return (
//     <div>
//       <header className={`z-40 border-b-2 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
//       <div className="">
//         <div style={{height:'75px'}} className="relative bg-white flex w-full  items-center  lg:px-8   py-1  dark:bg-[#202125]">
//           <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
//           <button
//               type="button"
//               className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
//               onClick={() => {
//                 dispatch(toggleSidebar());
//               }}
//             >
//               <IconMenu className="w-5 h-5" />

//             </button>
//             <NavLink to="/" className="main-logo flex justify-between items-center shrink-0">
//               <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
//                 <img src={themeConfig.theme == 'dark' ? llogo : lightlogo} alt="" />

//               </span>
//             </NavLink>

//           </div>


//           <div className="ltr:mr-2 rtl:ml-2 mt-5 sm:hidden md:hidden hidden lg:block  ">
//             <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
//               <div>
//                 <div className='flex justify-center gap-2 mb-4' >
//                   {/* <img src={arrow} className='w-6 h-6' /> */}
//                   <NavLink to="/" className="main-logo flex items-center shrink-0">
//                             <span style={{letterSpacing:'1px'}} className=" ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
//                                 <img className='' src={themeConfig.theme == 'dark' ? logo1 : logo1} alt="" />
//                             </span>
//                         </NavLink>
//                   {/* <button style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'1rem', fontWeight:'400', lineHeight:'25px' }}  type="button" className=' text-[#373737] text-[20px]' >

//                     {
//                       path == "/" ? 'Dashboard'
//                         : path == "/restaurants" ? 'Restaurants'
//                           : path == "/restaurant/view" ? 'Restaurant View'
//                           :path=='/invoice/overview'?'Invoice Overview'
//                           :path=='/invoice/view'?'Invoice'
//                           :path=='/invoice/view/statement'?'Invoice'
//                             : path == "/authorization" ? ' Authorization'
//                               : path == "/payment" ? ' Payment'
//                                 : path == "/invoice" ? ' Invoice'
//                                   : path == "/billing" ? ' Billing'
//                                     : path == '/pricing' ? 'Pricing'
//                                     : path == '/pricing/features' ? 'Feature'
//                                       : path == "/support" ? ' Support'
//                                         : path == "/settings" ? 'Settings'
//                                           : ''
//                     }
//                   </button> */}
//                   <div></div>
//                 </div>


//               </div>
//             </ul>
//           </div>
//           <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
//             <div className="sm:ltr:mr-auto sm:rtl:ml-auto">

//               <button
//                 type="button"
//                 className="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
//               >
//                 <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
//               </button>
//             </div>

//             {/* <form
//               className={`${search && '!block'} sm:relative absolute inset-x-0  sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
//             >
//               <div className="relative bg-white   rounded-2xl w-[310px]  p-0 m-0 border-white">
//                 <input
//                   type="text"
//                   className="form-input text-[13px] border border-none bg-transparent ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent  placeholder:tracking-widest"
//                   placeholder="Search here..."
//                   value={value}
//                   onChange={onChange}
//                   defaultValue=""
//                 />
//                 <button type="button" className="absolute w-9 h-9 inset-0 ltr:ml-1 rtl:mr-1 appearance-none peer-focus:text-primary">
//                   <IoSearchOutline className="mx-auto" />
//                 </button>
//                 <button type="button" className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2" onClick={(e)=>{{setValue(item.restaurant_name), clearSearch()}}}>
//                   <IconXCircle />
//                 </button>
//               </div>
//               <div className=''>
//              {
//               value && data.length?(
//                 data.filter(item=>item.restaurant_name.startsWith(value) && item.restaurant_name !== value) .map(item=>(<div className='' key={item.id} onClick={(e)=>{{setValue(item.restaurant_name), clearSearch()}}}>
//                 <NavLink to='/restaurant/view' state={{restaurantId:item.id}} >
//                 <div>

//                     {
//                       !item.restaurant_name?"noooo re":item.restaurant_name
//                     }



//                 </div>
//                   </NavLink> 
//                   </div>))
//               ):''
//              }
//             </div>
//             </form> */}

//             <form
//                                 className={`${search && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
//                                 onSubmit={() => setSearch(false)}
//                             >
//                                 <div className="w-[230px]">
//                                     <Select placeholder="Select Restaurants" options={options3} />
//                                 </div>
//                             </form>

//             <div>
//               {themeConfig.theme === 'light' ? (
//                 <button
//                   className={`${themeConfig.theme === 'light' &&
//                     'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
//                     }`}
//                   onClick={() => {
//                     dispatch(toggleTheme('dark'));
//                   }}
//                 >
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
//                     <path d="M12 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                     <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                     <path d="M4 12L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                     <path d="M22 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                     <path opacity="0.5" d="M19.7778 4.22266L17.5558 6.25424" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                     <path opacity="0.5" d="M4.22217 4.22266L6.44418 6.25424" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                     <path opacity="0.5" d="M6.44434 17.5557L4.22211 19.7779" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                     <path opacity="0.5" d="M19.7778 19.7773L17.5558 17.5551" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                   </svg>
//                 </button>
//               ) : (
//                 ''
//               )}
//               {themeConfig.theme === 'dark' && (
//                 <button
//                   className={`${themeConfig.theme === 'dark' &&
//                     'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
//                     }`}
//                   onClick={() => {
//                     dispatch(toggleTheme('light'));
//                   }}
//                 >
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z"
//                       fill="currentColor"
//                     />
//                   </svg>
//                 </button>
//               )}



//             </div>
//             <div className='p-1.5'>
//               <IoNotifications className='w-5 h-5' />
//             </div>

//             <div className="dropdown  shrink-0 flex ">
//               <Dropdown
//                 offset={[0, 8]}
//                 placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
//                 btnClassName="relative group block"
//                 button={<img className="w-7 h-7 rounded-full  object-cover  group-hover:saturate-100" src={user} alt='' />}

//               >

//                 <ul className="text-dark dark:text-white-dark !rounded-2xl dark:!bg-[#202125] !bg-white !py-0 w-[230px] font-semibold dark:text-white-light/90">
//                   <li>
//                     <NavLink to="#" onClick={() => { setProfileModal(true) }} className="dark:text-white text-black">
//                       <img src={user} alt="" className='w-5 mr-2' />
//                       Profile Settings
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink to="#" onClick={() => { setModal(true) }} className="dark:text-white text-black">
//                       <img src={colorSetting} alt="" className='w-5 mr-2' />
//                       Color Settings
//                     </NavLink>
//                   </li>


//                   <li className=" dark:border-white-light/10">
//                     <button className="dark:text-white text-black !py-3" onClick={() => logout()}>
//                       <img src={logout1} alt="" className='w-5 mr-2' />
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               </Dropdown>
//             </div>
//           </div>
//         </div>
//         {/* <div className='border-b-2'></div> */}
//       </div>



//       <Transition appear show={modal} as={Fragment}>
//         <Dialog as="div" open={modal} onClose={() => setModal(true)}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0" />
//           </Transition.Child>
//           <div
//             className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
//             onClick={() => {
//               setModal(false);
//             }}
//           >
//             <div className="flex items-center justify-center min-h-screen px-4">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className=" border-0   overflow-hidden  my-8 text-black dark:text-white-dark ">
//                   {/* <div className="  bg-white  dark:bg-[#202125]"> */}
//                   <div className=" bg-white dark:bg-[#202125] p-4 rounded-2xl w-[350px]">
//                     <h5 className="text-lg font-bold dark:text-white text-black mb-2 ">
//                       Color Settings
//                     </h5>


//                     <div>
//                       <h5 className='text-black dark:text-white text-md' >Sidebar Navigation</h5>
//                       <div className=" flex ">
//                         {colors1.map((color, index) => (
//                           <div
//                             style={{
//                               borderColor:
//                                 colors == color ? color : "transparent",
//                             }}
//                             className=" w-5 h-5 flex justify-center items-center  rounded-full  mr-3   "
//                           >
//                             <div
//                               key={index}
//                               style={{ background: color }}
//                               className={`w-3 h-3  rounded-full `}
//                               onClick={() => {
//                                 {

//                                   console.log('#########')
//                                   console.log('selected color', color)
//                                   console.log('#########')
//                                   dispatch(setColors(color))
//                                   // setselectedcolor(color)
//                                 }
//                               }}
//                             ></div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="mt-4 flex items-center justify-end">
//                       <button
//                         type="button"
//                         className="btn  btn-dark btn-sm px-6 py-1 rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm"
//                         onClick={setColor}
//                       >
//                         Reset
//                       </button>
//                     </div>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>

//       <Transition appear show={profileModal} as={Fragment}>
//         <Dialog as="div" open={profileModal} onClose={() => setProfileModal(true)}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0" />
//           </Transition.Child>
//           <div
//             className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
//             onClick={() => {
//               setProfileModal(false);
//             }}
//           >
//             <div className="flex items-center justify-center min-h-screen px-4">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className=" border-0   overflow-hidden  my-8 text-black dark:text-white-dark ">
//                   {/* <div className="  bg-white  dark:bg-[#202125]"> */}
//                   <div className=" dark:bg-[#202125] bg-white text-black px-9 rounded-2xl w-[471px] pt-6 pb-5 dark:text-white font-[500]">
//                     <h5 className="text-lg font-bold  ">Profile Details</h5>

//                     <form>
//                       <div className="ml-1 ">
//                         <div className=" mt-2 ">
//                           <label
//                             className="text-style-profile roboto-light  text-[16px] font-semibold ml-5"
//                             htmlFor="status"
//                           >
//                             Profile Name
//                           </label>
//                           <div className="flex items-center">
//                             <div>
//                               <img
//                                 src={user}
//                                 alt=""

//                                 className=" object-contain w-[29px] h-[29px]"
//                               />
//                             </div>
//                             <div className="flex  flex-1 border border-[#ADADAD] rounded-3xl ml-2 px-[15px] h-[36px] items-center">

//                               <div
//                                 className=" bg-transparent flex-1 focus:outline-none pr-[5px]"

//                               >
//                                 {
//                                   clicked == false ? <h1>{params.name}</h1> : <input
//                                     type="text"
//                                     className='focus:outline-none '
//                                     value={params.name}
//                                     name='name'
//                                     onChange={(e) => changeValue(e)}
//                                   />
//                                 }
//                               </div>

//                               <img
//                                 onClick={() => { setClicked(true) }}
//                                 src={themeConfig.theme == 'dark' ? wpen : pen}
//                                 alt=""

//                                 className=" object-contain w-4 "
//                               />

//                             </div>

//                           </div>
//                           <div className='ml-8'>
//                             <span className='text-danger' >{errors.name}</span>
//                           </div>
//                           {/* <span className="text-danger font-semibold text-sm  ml-8">{errors.name}</span> */}
//                         </div>

//                         <div className=" mt-2">
//                           <label
//                             className="text-style-profile roboto-light  text-[16px] font-semibold ml-12"
//                             htmlFor="status"
//                           >
//                             Contact Number
//                           </label>
//                           <div className="flex items-center">
//                             <div>
//                               <img
//                                 src={themeConfig.theme == 'dark' ? wphone : phone}

//                                 alt=""

//                                 className=" object-contain w-[29px] h-[29px]"
//                               />

//                             </div>
//                             <div className="flex  flex-1 border border-[#ADADAD] rounded-3xl ml-2 px-[15px] h-[36px] items-center">


//                               <div
//                                 className=" bg-transparent flex-1 focus:outline-none pr-[5px]"

//                               >
//                                 {
//                                   clicked == false ? <h1>{params.phone}</h1> : <input
//                                     type="text"
//                                     className='focus:outline-none '
//                                     value={params.phone}
//                                     name='phone'
//                                     onChange={(e) => changeValue(e)}
//                                   />
//                                 }
//                               </div>
//                               <img
//                                 onClick={() => { setClicked(true) }}
//                                 src={themeConfig.theme == 'dark' ? wpen : pen}
//                                 alt=""
//                                 className=" object-contain w-4 "
//                               />

//                             </div>
//                           </div>
//                           <div className='ml-8'>
//                             <span className='text-danger' >{errors.phone}</span>
//                           </div>
//                         </div>
//                         <div className=" mt-2">
//                           <label
//                             className="text-style-profile roboto-light  text-[16px] font-semibold ml-12"
//                             htmlFor="status"
//                           >
//                             Email Address
//                           </label>
//                           <div className="flex items-center">
//                             <div>
//                               <img
//                                 src={themeConfig.theme == 'dark' ? wemail : email}


//                                 alt=""

//                                 className=" object-contain w-[29px] h-[29px] "
//                               />
//                               {/* <img
//                                 src={wemail}
//                                 alt=""

//                                 className=" object-contain w-[29px] h-[29px] "
//                               /> */}
//                             </div>
//                             <div className="flex  flex-1 border border-[#ADADAD] rounded-3xl ml-2 px-[15px] h-[36px] items-center">
//                               <div
//                                 className=" bg-transparent flex-1 focus:outline-none pr-[5px]"

//                               >
//                                 {
//                                   clicked == false ? <h1>{params.email}</h1> : <input
//                                     type="text"
//                                     className='focus:outline-none '
//                                     value={params.email}
//                                     name='email'
//                                     onChange={(e) => changeValue(e)}
//                                   />
//                                 }
//                               </div>
//                               <img
//                                 onClick={() => { setClicked(true) }}
//                                 src={themeConfig.theme == 'dark' ? wpen : pen}
//                                 alt=""

//                                 className=" object-contain w-4 "
//                               />

//                             </div>
//                           </div>
//                         </div>
//                         <div className='ml-8'>
//                           <span className='text-danger' >{errors.email}</span>
//                         </div>
//                       </div>
//                     </form>
//                     <div className="mt-5 flex items-center justify-end">
//                       <button
//                         type="button"
//                         onClick={() => { formSubmit() }}
//                         className="btn  btn-dark btn-sm w-[86px] h-[31px] rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm"
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>

//     </header>
//     <div className='ml-[260px] panel rounded-none p-2' >
//       <div className='flex justify-between' >
//       {/* <div className='flex gap-2' >
//       <button style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'1rem', fontWeight:'400', lineHeight:'25px' }}  type="button" className=' text-[#373737] text-[20px]' >

// {
//   path == "/" ? 'Dashboard'
//     : path == "/restaurants" ? 'Restaurants'
//       : path == "/restaurant/view" ? 'Restaurant View'
//       :path=='/invoice/overview'?'Invoice Overview'
//       :path=='/invoice/view'?'Invoice'
//       :path=='/invoice/view/statement'?'Invoice'
//         : path == "/authorization" ? ' Authorization'
//           : path == "/payment" ? ' Payment'
//             : path == "/invoice" ? ' Invoice'
//               : path == "/billing" ? ' Billing'
//                 : path == '/pricing' ? 'Pricing'
//                 : path == '/pricing/features' ? 'Feature'
//                   : path == "/support" ? ' Support'
//                     : path == "/settings" ? 'Settings'
//                       : ''
// }
// </button>
//        <h1>Restaurants</h1> 
//         </div>  */}

// <ul className="flex space-x-2 text-[14px] rtl:space-x-reverse">
//                 <li className='flex text-center gap-1' >
//                   <GoHome/>
//                     <Link to="/" className="text-primary hover:underline">
//                         Dashboard
//                     </Link>
//                 </li>
//                 <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
//                 <button type="button" className=' text-[#373737] ' >

// {

//      path == "/restaurants" ? 'Restaurants'
//       : path == "/restaurant/view" ? 'Restaurant View'
//       :path=='/invoice/overview'?'Invoice Overview'
//       :path=='/invoice/view'?'Invoice'
//       :path=='/invoice/view/statement'?'Invoice'
//         : path == "/authorization" ? ' Authorization'
//           : path == "/payment" ? ' Payment'
//             : path == "/invoice" ? ' Invoice'
//               : path == "/billing" ? ' Billing'
//                 : path == '/pricing' ? 'Pricing'
//                 : path == '/pricing/features' ? 'Feature'
//                   : path == "/support" ? ' Support'
//                     : path == "/settings" ? 'Settings'
//                       : ''
// }
// </button>
//                 </li>
//             </ul>
//         <div className='mr-[200px] text-[14px]'>
//           Back
//         </div>

//         </div>                      
//     </div>
//     </div>
//   );
// };

// export default Header;


// import React,{ useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, NavLink, useLocation } from 'react-router-dom';
// import { IRootState } from '../../store';
// import { toggleRTL, toggleTheme, toggleSidebar } from '../../store/themeConfigSlice';
// import { useTranslation } from 'react-i18next';
// import i18next from 'i18next';
// import Dropdown from '../Dropdown';
// import IconMenu from '../Icon/IconMenu';
// import IconCalendar from '../Icon/IconCalendar';
// import IconEdit from '../Icon/IconEdit';
// import IconChatNotification from '../Icon/IconChatNotification';
// import IconSearch from '../Icon/IconSearch';
// import IconXCircle from '../Icon/IconXCircle';
// import IconSun from '../Icon/IconSun';
// import IconMoon from '../Icon/IconMoon';
// import IconLaptop from '../Icon/IconLaptop';
// import IconMailDot from '../Icon/IconMailDot';
// import IconArrowLeft from '../Icon/IconArrowLeft';
// import IconInfoCircle from '../Icon/IconInfoCircle';
// import IconBellBing from '../Icon/IconBellBing';
// import IconUser from '../Icon/IconUser';
// import IconMail from '../Icon/IconMail';
// import IconLockDots from '../Icon/IconLockDots';
// import IconLogout from '../Icon/IconLogout';
// import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
// import IconCaretDown from '../Icon/IconCaretDown';
// import IconMenuApps from '../Icon/Menu/IconMenuApps';
// import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
// import IconMenuElements from '../Icon/Menu/IconMenuElements';
// import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
// import IconMenuForms from '../Icon/Menu/IconMenuForms';
// import IconMenuPages from '../Icon/Menu/IconMenuPages';
// import IconMenuMore from '../Icon/Menu/IconMenuMore';

// const Header = () => {
//     const location = useLocation();
//     useEffect(() => {
//         const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
//         if (selector) {
//             selector.classList.add('active');
//             const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
//             for (let i = 0; i < all.length; i++) {
//                 all[0]?.classList.remove('active');
//             }
//             const ul: any = selector.closest('ul.sub-menu');
//             if (ul) {
//                 let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
//                 if (ele) {
//                     ele = ele[0];
//                     setTimeout(() => {
//                         ele?.classList.add('active');
//                     });
//                 }
//             }
//         }
//     }, [location]);

//     const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

//     const themeConfig = useSelector((state: IRootState) => state.themeConfig);
//     const dispatch = useDispatch();

//     function createMarkup(messages: any) {
//         return { __html: messages };
//     }
//     const [messages, setMessages] = useState([
//         {
//             id: 1,
//             image: '<span className="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
//             title: 'Congratulations!',
//             message: 'Your OS has been updated.',
//             time: '1hr',
//         },
//         {
//             id: 2,
//             image: '<span className="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg g xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
//             title: 'Did you know?',
//             message: 'You can switch between artboards.',
//             time: '2hr',
//         },
//         {
//             id: 3,
//             image: '<span className="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
//             title: 'Something went wrong!',
//             message: 'Send Reposrt',
//             time: '2days',
//         },
//         {
//             id: 4,
//             image: '<span className="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
//             title: 'Warning',
//             message: 'Your password strength is low.',
//             time: '5days',
//         },
//     ]);

//     const removeMessage = (value: number) => {
//         setMessages(messages.filter((user) => user.id !== value));
//     };

//     const [notifications, setNotifications] = useState([
//         {
//             id: 1,
//             profile: 'user-profile.jpeg',
//             message: '<strong className="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
//             time: '45 min ago',
//         },
//         {
//             id: 2,
//             profile: 'profile-34.jpeg',
//             message: '<strong className="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
//             time: '9h Ago',
//         },
//         {
//             id: 3,
//             profile: 'profile-16.jpeg',
//             message: '<strong className="text-sm mr-1">Anna Morgan</strong>Upload a file',
//             time: '9h Ago',
//         },
//     ]);

//     const removeNotification = (value: number) => {
//         setNotifications(notifications.filter((user) => user.id !== value));
//     };

//     const [search, setSearch] = useState(false);

//     const setLocale = (flag: string) => {
//         setFlag(flag);
//         if (flag.toLowerCase() === 'ae') {
//             dispatch(toggleRTL('rtl'));
//         } else {
//             dispatch(toggleRTL('ltr'));
//         }
//     };
//     const [flag, setFlag] = useState(themeConfig.locale);

//     const { t } = useTranslation();

//     return (
//         <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
//             <div className="shadow-sm">
//                 <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
//                     <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
//                         <Link to="/" className="main-logo flex items-center shrink-0">
//                             <img className="w-8 ltr:-ml-1 rtl:-mr-1 inline" src="/assets/images/logo.svg" alt="logo" />
//                             <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300">VRISTO</span>
//                         </Link>
//                         <button
//                             type="button"
//                             className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
//                             onClick={() => {
//                                 dispatch(toggleSidebar());
//                             }}
//                         >
//                             <IconMenu className="w-5 h-5" />
//                         </button>
//                     </div>

//                     <div className="ltr:mr-2 rtl:ml-2 hidden sm:block">
//                         <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
//                             <li>
//                                 <Link to="/apps/calendar" className="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
//                                     <IconCalendar />
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/apps/todolist" className="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
//                                     <IconEdit />
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/apps/chat" className="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
//                                     <IconChatNotification />
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>
//                     <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
//                         <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
//                             <form
//                                 className={`${search && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
//                                 onSubmit={() => setSearch(false)}
//                             >
//                                 <div className="relative">
//                                     <input
//                                         type="text"
//                                         className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
//                                         placeholder="Search..."
//                                     />
//                                     <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
//                                         <IconSearch className="mx-auto" />
//                                     </button>
//                                     <button type="button" className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2" onClick={() => setSearch(false)}>
//                                         <IconXCircle />
//                                     </button>
//                                 </div>
//                             </form>
//                             <button
//                                 type="button"
//                                 onClick={() => setSearch(!search)}
//                                 className="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
//                             >
//                                 <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
//                             </button>
//                         </div>
//                         <div>
//                             {themeConfig.theme === 'light' ? (
//                                 <button
//                                     className={`${
//                                         themeConfig.theme === 'light' &&
//                                         'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
//                                     }`}
//                                     onClick={() => {
//                                         dispatch(toggleTheme('dark'));
//                                     }}
//                                 >
//                                     <IconSun />
//                                 </button>
//                             ) : (
//                                 ''
//                             )}
//                             {themeConfig.theme === 'dark' && (
//                                 <button
//                                     className={`${
//                                         themeConfig.theme === 'dark' &&
//                                         'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
//                                     }`}
//                                     onClick={() => {
//                                         dispatch(toggleTheme('system'));
//                                     }}
//                                 >
//                                     <IconMoon />
//                                 </button>
//                             )}
//                             {themeConfig.theme === 'system' && (
//                                 <button
//                                     className={`${
//                                         themeConfig.theme === 'system' &&
//                                         'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
//                                     }`}
//                                     onClick={() => {
//                                         dispatch(toggleTheme('light'));
//                                     }}
//                                 >
//                                     <IconLaptop />
//                                 </button>
//                             )}
//                         </div>
//                         <div className="dropdown shrink-0">
//                             <Dropdown
//                                 offset={[0, 8]}
//                                 placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
//                                 btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
//                                 button={<img className="w-5 h-5 object-cover rounded-full" src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="flag" />}
//                             >
//                                 <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
//                                     {themeConfig.languageList.map((item: any) => {
//                                         return (
//                                             <li key={item.code}>
//                                                 <button
//                                                     type="button"
//                                                     className={`flex w-full hover:text-primary rounded-lg ${i18next.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
//                                                     onClick={() => {
//                                                         i18next.changeLanguage(item.code);
//                                                         // setFlag(item.code);
//                                                         setLocale(item.code);
//                                                     }}
//                                                 >
//                                                     <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
//                                                     <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
//                                                 </button>
//                                             </li>
//                                         );
//                                     })}
//                                 </ul>
//                             </Dropdown>
//                         </div>
//                         <div className="dropdown shrink-0">
//                             <Dropdown
//                                 offset={[0, 8]}
//                                 placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
//                                 btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
//                                 button={<IconMailDot />}
//                             >
//                                 <ul className="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[375px] text-xs">
//                                     <li className="mb-5" onClick={(e) => e.stopPropagation()}>
//                                         <div className="hover:!bg-transparent overflow-hidden relative rounded-t-md p-5 text-white w-full !h-[68px]">
//                                             <div
//                                                 className="absolute h-full w-full bg-no-repeat bg-center bg-cover inset-0 bg-"
//                                                 style={{
//                                                     backgroundImage: `url('/assets/images/menu-heade.jpg')`,
//                                                     backgroundRepeat: 'no-repeat',
//                                                     width: '100%',
//                                                     height: '100%',
//                                                 }}
//                                             ></div>
//                                             <h4 className="font-semibold relative z-10 text-lg">Messages</h4>
//                                         </div>
//                                     </li>
//                                     {messages.length > 0 ? (
//                                         <>
//                                             <li onClick={(e) => e.stopPropagation()}>
//                                                 {messages.map((message) => {
//                                                     return (
//                                                         <div key={message.id} className="flex items-center py-3 px-5">
//                                                             <div dangerouslySetInnerHTML={createMarkup(message.image)}></div>
//                                                             <span className="px-3 dark:text-gray-500">
//                                                                 <div className="font-semibold text-sm dark:text-white-light/90">{message.title}</div>
//                                                                 <div>{message.message}</div>
//                                                             </span>
//                                                             <span className="font-semibold bg-white-dark/20 rounded text-dark/60 px-1 ltr:ml-auto rtl:mr-auto whitespace-pre dark:text-white-dark ltr:mr-2 rtl:ml-2">
//                                                                 {message.time}
//                                                             </span>
//                                                             <button type="button" className="text-neutral-300 hover:text-danger" onClick={() => removeMessage(message.id)}>
//                                                                 <IconXCircle />
//                                                             </button>
//                                                         </div>
//                                                     );
//                                                 })}
//                                             </li>
//                                             <li className="border-t border-white-light text-center dark:border-white/10 mt-5">
//                                                 <button type="button" className="text-primary font-semibold group dark:text-gray-400 justify-center !py-4 !h-[48px]">
//                                                     <span className="group-hover:underline ltr:mr-1 rtl:ml-1">VIEW ALL ACTIVITIES</span>
//                                                     <IconArrowLeft className="group-hover:translate-x-1 transition duration-300 ltr:ml-1 rtl:mr-1" />
//                                                 </button>
//                                             </li>
//                                         </>
//                                     ) : (
//                                         <li className="mb-5" onClick={(e) => e.stopPropagation()}>
//                                             <button type="button" className="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
//                                                 <div className="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
//                                                     <IconInfoCircle fill={true} className="w-10 h-10" />
//                                                 </div>
//                                                 No data available.
//                                             </button>
//                                         </li>
//                                     )}
//                                 </ul>
//                             </Dropdown>
//                         </div>
//                         <div className="dropdown shrink-0">
//                             <Dropdown
//                                 offset={[0, 8]}
//                                 placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
//                                 btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
//                                 button={
//                                     <span>
//                                         <IconBellBing />
//                                         <span className="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
//                                             <span className="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
//                                             <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
//                                         </span>
//                                     </span>
//                                 }
//                             >
//                                 <ul className="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
//                                     <li onClick={(e) => e.stopPropagation()}>
//                                         <div className="flex items-center px-4 py-2 justify-between font-semibold">
//                                             <h4 className="text-lg">Notification</h4>
//                                             {notifications.length ? <span className="badge bg-primary/80">{notifications.length}New</span> : ''}
//                                         </div>
//                                     </li>
//                                     {notifications.length > 0 ? (
//                                         <>
//                                             {notifications.map((notification) => {
//                                                 return (
//                                                     <li key={notification.id} className="dark:text-white-light/90" onClick={(e) => e.stopPropagation()}>
//                                                         <div className="group flex items-center px-4 py-2">
//                                                             <div className="grid place-content-center rounded">
//                                                                 <div className="w-12 h-12 relative">
//                                                                     <img className="w-12 h-12 rounded-full object-cover" alt="profile" src={`/assets/images/${notification.profile}`} />
//                                                                     <span className="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
//                                                                 </div>
//                                                             </div>
//                                                             <div className="ltr:pl-3 rtl:pr-3 flex flex-auto">
//                                                                 <div className="ltr:pr-3 rtl:pl-3">
//                                                                     <h6
//                                                                         dangerouslySetInnerHTML={{
//                                                                             __html: notification.message,
//                                                                         }}
//                                                                     ></h6>
//                                                                     <span className="text-xs block font-normal dark:text-gray-500">{notification.time}</span>
//                                                                 </div>
//                                                                 <button
//                                                                     type="button"
//                                                                     className="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
//                                                                     onClick={() => removeNotification(notification.id)}
//                                                                 >
//                                                                     <IconXCircle />
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                 );
//                                             })}
//                                             <li>
//                                                 <div className="p-4">
//                                                     <button className="btn btn-primary block w-full btn-small">Read All Notifications</button>
//                                                 </div>
//                                             </li>
//                                         </>
//                                     ) : (
//                                         <li onClick={(e) => e.stopPropagation()}>
//                                             <button type="button" className="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
//                                                 <div className="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
//                                                     <IconInfoCircle fill={true} className="w-10 h-10" />
//                                                 </div>
//                                                 No data available.
//                                             </button>
//                                         </li>
//                                     )}
//                                 </ul>
//                             </Dropdown>
//                         </div>
//                         <div className="dropdown shrink-0 flex">
//                             <Dropdown
//                                 offset={[0, 8]}
//                                 placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
//                                 btnClassName="relative group block"
//                                 button={<img className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src="/assets/images/user-profile.jpeg" alt="userProfile" />}
//                             >
//                                 <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
//                                     <li>
//                                         <div className="flex items-center px-4 py-4">
//                                             <img className="rounded-md w-10 h-10 object-cover" src="/assets/images/user-profile.jpeg" alt="userProfile" />
//                                             <div className="ltr:pl-4 rtl:pr-4 truncate">
//                                                 <h4 className="text-base">
//                                                     John Doe
//                                                     <span className="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">Pro</span>
//                                                 </h4>
//                                                 <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
//                                                     johndoe@gmail.com
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </li>
//                                     <li>
//                                         <Link to="/users/profile" className="dark:hover:text-white">
//                                             <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
//                                             Profile
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/apps/mailbox" className="dark:hover:text-white">
//                                             <IconMail className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
//                                             Inbox
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/auth/boxed-lockscreen" className="dark:hover:text-white">
//                                             <IconLockDots className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
//                                             Lock Screen
//                                         </Link>
//                                     </li>
//                                     <li className="border-t border-white-light dark:border-white-light/10">
//                                         <Link to="/auth/boxed-signin" className="text-danger !py-3">
//                                             <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
//                                             Sign Out
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </Dropdown>
//                         </div>
//                     </div>
//                 </div>

//                 {/* horizontal menu */}
//                 <ul className="horizontal-menu hidden py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-black text-black dark:text-white-dark">
//                     <li className="menu nav-item relative">
//                         <button type="button" className="nav-link">
//                             <div className="flex items-center">
//                                 <IconMenuDashboard className="shrink-0" />
//                                 <span className="px-1">{t('dashboard')}</span>
//                             </div>
//                             <div className="right_arrow">
//                                 <IconCaretDown />
//                             </div>
//                         </button>
//                         <ul className="sub-menu">
//                             <li>
//                                 <NavLink to="/">{t('sales')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/analytics">{t('analytics')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/finance">{t('finance')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/crypto">{t('crypto')}</NavLink>
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="menu nav-item relative">
//                         <button type="button" className="nav-link">
//                             <div className="flex items-center">
//                                 <IconMenuApps className="shrink-0" />
//                                 <span className="px-1">{t('apps')}</span>
//                             </div>
//                             <div className="right_arrow">
//                                 <IconCaretDown />
//                             </div>
//                         </button>
//                         <ul className="sub-menu">
//                             <li>
//                                 <NavLink to="/apps/chat">{t('chat')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/apps/mailbox">{t('mailbox')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/apps/todolist">{t('todo_list')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/apps/notes">{t('notes')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/apps/scrumboard">{t('scrumboard')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/apps/contacts">{t('contacts')}</NavLink>
//                             </li>
//                             <li className="relative">
//                                 <button type="button">
//                                     {t('invoice')}
//                                     <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>
//                                 <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
//                                     <li>
//                                         <NavLink to="/apps/invoice/list">{t('list')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/apps/invoice/preview">{t('preview')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/apps/invoice/add">{t('add')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/apps/invoice/edit">{t('edit')}</NavLink>
//                                     </li>
//                                 </ul>
//                             </li>
//                             <li>
//                                 <NavLink to="/apps/calendar">{t('calendar')}</NavLink>
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="menu nav-item relative">
//                         <button type="button" className="nav-link">
//                             <div className="flex items-center">
//                                 <IconMenuComponents className="shrink-0" />
//                                 <span className="px-1">{t('components')}</span>
//                             </div>
//                             <div className="right_arrow">
//                                 <IconCaretDown />
//                             </div>
//                         </button>
//                         <ul className="sub-menu">
//                             <li>
//                                 <NavLink to="/components/tabs">{t('tabs')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/components/accordions">{t('accordions')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/components/modals">{t('modals')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/components/cards">{t('cards')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/components/carousel">{t('carousel')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/components/countdown">{t('countdown')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/components/counter">{t('counter')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/components/sweetalert">{t('sweet_alerts')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/components/timeline">{t('timeline')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/components/notifications">{t('notifications')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/components/media-object">{t('media_object')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/components/list-group">{t('list_group')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/components/pricing-table">{t('pricing_tables')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/components/lightbox">{t('lightbox')}</NavLink>
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="menu nav-item relative">
//                         <button type="button" className="nav-link">
//                             <div className="flex items-center">
//                                 <IconMenuElements className="shrink-0" />
//                                 <span className="px-1">{t('elements')}</span>
//                             </div>
//                             <div className="right_arrow">
//                                 <IconCaretDown />
//                             </div>
//                         </button>
//                         <ul className="sub-menu">
//                             <li>
//                                 <NavLink to="/elements/alerts">{t('alerts')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/avatar">{t('avatar')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/badges">{t('badges')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/breadcrumbs">{t('breadcrumbs')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/buttons">{t('buttons')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/buttons-group">{t('button_groups')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/color-library">{t('color_library')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/dropdown">{t('dropdown')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/infobox">{t('infobox')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/jumbotron">{t('jumbotron')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/loader">{t('loader')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/pagination">{t('pagination')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/popovers">{t('popovers')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/progress-bar">{t('progress_bar')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/search">{t('search')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/tooltips">{t('tooltips')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/treeview">{t('treeview')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/elements/typography">{t('typography')}</NavLink>
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="menu nav-item relative">
//                         <button type="button" className="nav-link">
//                             <div className="flex items-center">
//                                 <IconMenuDatatables className="shrink-0" />
//                                 <span className="px-1">{t('tables')}</span>
//                             </div>
//                             <div className="right_arrow">
//                                 <IconCaretDown />
//                             </div>
//                         </button>
//                         <ul className="sub-menu">
//                             <li>
//                                 <NavLink to="/tables">{t('tables')}</NavLink>
//                             </li>
//                             <li className="relative">
//                                 <button type="button">
//                                     {t('datatables')}
//                                     <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>
//                                 <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
//                                     <li>
//                                         <NavLink to="/datatables/basic">{t('basic')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/datatables/advanced">{t('advanced')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/datatables/skin">{t('skin')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/datatables/order-sorting">{t('order_sorting')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/datatables/multi-column">{t('multi_column')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/datatables/multiple-tables">{t('multiple_tables')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/datatables/alt-pagination">{t('alt_pagination')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/datatables/checkbox">{t('checkbox')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/datatables/range-search">{t('range_search')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/datatables/export">{t('export')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/datatables/column-chooser">{t('column_chooser')}</NavLink>
//                                     </li>
//                                 </ul>
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="menu nav-item relative">
//                         <button type="button" className="nav-link">
//                             <div className="flex items-center">
//                                 <IconMenuForms className="shrink-0" />
//                                 <span className="px-1">{t('forms')}</span>
//                             </div>
//                             <div className="right_arrow">
//                                 <IconCaretDown />
//                             </div>
//                         </button>
//                         <ul className="sub-menu">
//                             <li>
//                                 <NavLink to="/forms/basic">{t('basic')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/input-group">{t('input_group')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/layouts">{t('layouts')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/validation">{t('validation')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/input-mask">{t('input_mask')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/select2">{t('select2')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/touchspin">{t('touchspin')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/checkbox-radio">{t('checkbox_and_radio')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/switches">{t('switches')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/wizards">{t('wizards')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/file-upload">{t('file_upload')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/quill-editor">{t('quill_editor')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/markdown-editor">{t('markdown_editor')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/date-picker">{t('date_and_range_picker')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/forms/clipboard">{t('clipboard')}</NavLink>
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="menu nav-item relative">
//                         <button type="button" className="nav-link">
//                             <div className="flex items-center">
//                                 <IconMenuPages className="shrink-0" />
//                                 <span className="px-1">{t('pages')}</span>
//                             </div>
//                             <div className="right_arrow">
//                                 <IconCaretDown />
//                             </div>
//                         </button>
//                         <ul className="sub-menu">
//                             <li className="relative">
//                                 <button type="button">
//                                     {t('users')}
//                                     <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>
//                                 <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
//                                     <li>
//                                         <NavLink to="/users/profile">{t('profile')}</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/users/user-account-settings">{t('account_settings')}</NavLink>
//                                     </li>
//                                 </ul>
//                             </li>
//                             <li>
//                                 <NavLink to="/pages/knowledge-base">{t('knowledge_base')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/pages/contact-us-boxed" target="_blank">
//                                     {t('contact_us_boxed')}
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/pages/contact-us-cover" target="_blank">
//                                     {t('contact_us_cover')}
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/pages/faq">{t('faq')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/pages/coming-soon-boxed" target="_blank">
//                                     {t('coming_soon_boxed')}
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/pages/coming-soon-cover" target="_blank">
//                                     {t('coming_soon_cover')}
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/pages/maintenence" target="_blank">
//                                     {t('maintenence')}
//                                 </NavLink>
//                             </li>
//                             <li className="relative">
//                                 <button type="button">
//                                     {t('error')}
//                                     <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>
//                                 <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
//                                     <li>
//                                         <NavLink to="/pages/error404" target="_blank">
//                                             {t('404')}
//                                         </NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/pages/error500" target="_blank">
//                                             {t('500')}
//                                         </NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/pages/error503" target="_blank">
//                                             {t('503')}
//                                         </NavLink>
//                                     </li>
//                                 </ul>
//                             </li>
//                             <li className="relative">
//                                 <button type="button">
//                                     {t('login')}
//                                     <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>
//                                 <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
//                                     <li>
//                                         <NavLink to="/auth/cover-login" target="_blank">
//                                             {t('login_cover')}
//                                         </NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/auth/boxed-signin" target="_blank">
//                                             {t('login_boxed')}
//                                         </NavLink>
//                                     </li>
//                                 </ul>
//                             </li>
//                             <li className="relative">
//                                 <button type="button">
//                                     {t('register')}
//                                     <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>
//                                 <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
//                                     <li>
//                                         <NavLink to="/auth/cover-register" target="_blank">
//                                             {t('register_cover')}
//                                         </NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/auth/boxed-signup" target="_blank">
//                                             {t('register_boxed')}
//                                         </NavLink>
//                                     </li>
//                                 </ul>
//                             </li>
//                             <li className="relative">
//                                 <button type="button">
//                                     {t('password_recovery')}
//                                     <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>
//                                 <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
//                                     <li>
//                                         <NavLink to="/auth/cover-password-reset" target="_blank">
//                                             {t('recover_id_cover')}
//                                         </NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/auth/boxed-password-reset" target="_blank">
//                                             {t('recover_id_boxed')}
//                                         </NavLink>
//                                     </li>
//                                 </ul>
//                             </li>
//                             <li className="relative">
//                                 <button type="button">
//                                     {t('lockscreen')}
//                                     <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
//                                         <IconCaretDown />
//                                     </div>
//                                 </button>
//                                 <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
//                                     <li>
//                                         <NavLink to="/auth/cover-lockscreen" target="_blank">
//                                             {t('unlock_cover')}
//                                         </NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="/auth/boxed-lockscreen" target="_blank">
//                                             {t('unlock_boxed')}
//                                         </NavLink>
//                                     </li>
//                                 </ul>
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="menu nav-item relative">
//                         <button type="button" className="nav-link">
//                             <div className="flex items-center">
//                                 <IconMenuMore className="shrink-0" />
//                                 <span className="px-1">{t('more')}</span>
//                             </div>
//                             <div className="right_arrow">
//                                 <IconCaretDown />
//                             </div>
//                         </button>
//                         <ul className="sub-menu">
//                             <li>
//                                 <NavLink to="/dragndrop">{t('drag_and_drop')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/charts">{t('charts')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/font-icons">{t('font_icons')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/widgets">{t('widgets')}</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="https://vristo.sbthemes.com" target="_blank">
//                                     {t('documentation')}
//                                 </NavLink>
//                             </li>
//                         </ul>
//                     </li>
//                 </ul>
//             </div>
//         </header>
//     );
// };

// export default Header;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleRTL, toggleTheme, toggleSidebar } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
import IconMenu from '../Icon/IconMenu';
import IconSearch from '../Icon/IconSearch';
import IconXCircle from '../Icon/IconXCircle';
import logo1 from "../../assets/images/auth/logo.svg"


import { RiDashboardFill, RiHome4Line } from 'react-icons/ri';
import { IoIosArrowForward, IoIosFingerPrint, IoIosHome, IoMdEye, IoMdPricetags } from 'react-icons/io';
import { IoNotifications } from 'react-icons/io5';
import user from '../../assets/images/usernew.svg'
import colorSetting from '../../assets/images/colorSetting.svg'
import logout1 from '../../assets/images/shutdown 1.svg'
import Select from 'react-select';

const Header = () => {
    const location = useLocation();
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
    const [flag, setFlag] = useState(themeConfig.locale);
    const { t } = useTranslation();
    const options3 = [
        { value: 'Outlet One', label: 'Outlet One' },
        { value: 'Outlet Two', label: 'Outlet Two' },
    
    ];
    return (
        <div>
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
                        <form
                                className={`${search && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                                onSubmit={() => setSearch(false)}
                            >
                                <div style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }} className="w-[230px] ">
                                    <Select 
                                    
                                    placeholder="Select Restaurants" options={options3} />
                                </div>
                            </form>

                        <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                            <div className="sm:ltr:mr-auto sm:rtl:ml-auto">

                                <button
                                    type="button"
                                    onClick={() => setSearch(!search)}
                                    className="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                                >
                                    <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
                                </button>
                            </div>
                            
                            {/* <form
                                className={`${search && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                                onSubmit={() => setSearch(false)}
                            >
                                <div className="relative">
                                    <input
                                    style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }}
                                        type="text"
                                        className="form-input p-1 ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                        placeholder="Search ..."
                                    />
                                    <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                                        <IconSearch className="mx-auto" />
                                    </button>
                                    <button type="button" className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2" onClick={() => setSearch(false)}>
                                        <IconXCircle />
                                    </button>
                                </div>
                            </form> */}
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
                                <IoNotifications className='w-5 h-5' />
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
            </header>
            

            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-1.5 rounded-none ">
                <div className="rounded-full p-1.5   ltr:mr-3 rtl:ml-3">
                <RiHome4Line className=' opacity' size={20} color='gray' />

                </div>
                <IoIosArrowForward className='ltr:mr-3 opacity-25 font-thin' color='gray' />

                <a href="/" style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }}  className="block hover:underline text-gray-600  ltr:mr-3 rtl:ml-3" rel="noreferrer">
                    Home
                </a>
                <IoIosArrowForward className='font-thin opacity-25' color='gray' />

                <p style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }} className='ltr:ml-3 text-red-700' >Restaurants</p>
            </div> */}
        </div>

    );
};

export default Header;



