// import axios from 'axios';
// import React, { useEffect, useState, Fragment, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
// import { IRootState } from '../../store/index';
// import { setPageTitle, setCrmData } from '../../store/themeConfigSlice';
// import IconSearch from '../../components/Icon/IconSearch';
// import { Dialog, Transition } from '@headlessui/react';
// import IconX from '../../components/Icon/IconX';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import PageLoader from '../../components/PageLoader'
// import { Link } from "react-router-dom";
// import IconBellBing from "../../components/Icon/IconBellBing";
// import { IoMdPerson } from "react-icons/io";
// import { MdEmail } from "react-icons/md";
// import { FaPhoneAlt } from "react-icons/fa";
// const CrmSwal = withReactContent(Swal);

// const Settings = () => {

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [setting, setSetting] = useState<any>({});
//     const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
//     const [isLoading, setIsLoading] = useState(true)

//     useEffect(() => {
//         fetchSettings();
//     }, [])

//     const fetchSettings = async () => {
//         setIsLoading(true)
//         try {
//             const response = await axios({
//                 method: 'get',
//                 url: window.location.origin + "/api/dashboard/public-site/settings",
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: 'Bearer ' + crmToken,
//                 },
//             });

//             if (response.data.status == 'success') {
//                 if (response.data.settings) storeOrUpdate(response.data.settings)
//                 else storeOrUpdate()
//             }


//             console.log(response)
//         } catch (error) {
//             if (error.response.status == 401) navigate('/login')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const fileLogoRef = useRef<HTMLInputElement>(null);
//     const fileIconRef = useRef<HTMLInputElement>(null);
//     const [logoPriview, setLogoPriview] = useState<any>('https://dummyimage.com/600x400/000/fff');
//     const [iconPriview, setIconPriview] = useState<any>('https://dummyimage.com/600x400/000/fff');

//     const [defaultParams] = useState({
//         id: '',
//         logo: '',
//         fav_icon: '',
//         mode: '',
//         facebook_link: '',
//         linkedin_link: '',
//         x_link: '',
//         pinterest_link: '',
//         youtube_link: '',
//         instagram_link: '',
//         whatsapp_number: '',
//         seo_title: '',
//         site_name: '',
//         email: '',
//         phone: ''
//     });


//     const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
//     const [errors, setErros] = useState<any>({});

//     const changeValue = (e: any) => {
//         const { value, name } = e.target;
//         setErros({ ...errors, [name]: '' });
//         setParams({ ...params, [name]: value });
//         console.table(params)
//     };

//     const setImage = (e: any) => {
//         const { name } = e.target;
//         setErros({ ...errors, [name]: '' });
//         if (e.target.files[0]) {
//             if (e.target.files[0].type && e.target.files[0].type.indexOf('image') === -1) {
//                 setErros({ ...errors, [name]: 'file is not a valid image' });
//                 return;
//             }
//             const maxSizeInBytes = 2 * 1024 * 1024;
//             if (e.target.files[0].size > maxSizeInBytes) {
//                 setErros({ ...errors, [name]: 'maximum file size is 2 mb' });
//                 return;
//             }
//             const reader = new FileReader();
//             reader.onload = function (event: any) {

//                 if (name == 'logo') setLogoPriview(reader.result)
//                 else setIconPriview(reader.result)

//                 setParams({ ...params, [name]: e.target.files[0] });
//             };
//             reader.readAsDataURL(e.target.files[0]);
//         }
//     }


//     const validate = () => {
//         setErros({});
//         let errors = {};
//         if (!params.site_name) {
//             errors = { ...errors, site_name: 'site name is required' };
//         }
//         console.log(errors)
//         setErros(errors);
//         return { totalErrors: Object.keys(errors).length };
//     };

//     const [btnLoading, setBtnLoading] = useState(false);

//     const storeOrUpdateApi = async (data: any) => {
//         setBtnLoading(true)
//         try {
//             const response = await axios({
//                 method: 'post',
//                 url: window.location.origin + "/api/dashboard/public-site/settings",
//                 data,
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     Authorization: "Bearer " + crmToken,
//                 },
//             });

//             if (response.data.status == 'success') {
//                 Swal.fire({
//                     icon: response.data.status,
//                     title: response.data.title,
//                     text: response.data.message,
//                     padding: '2em',
//                     customClass: 'sweet-alerts',
//                 });


//                 dispatch(setCrmData({ logo: response.data.setting.logo, fav_icon: response.data.setting.fav_icon, mode: response.data.setting.mode }))
//                 fetchSettings()

//             } else {

//                 alert("Failed")
//             }

//         } catch (error: any) {
//             console.log(error)
//             if (error.response.status == 401) navigate('/login')
//             if (error?.response?.status === 422) {
//                 const serveErrors = error.response.data.errors;
//                 let serverErrors = {};
//                 for (var key in serveErrors) {
//                     serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
//                     console.log(serveErrors[key][0])
//                 }
//                 setErros(serverErrors);
//                 CrmSwal.fire({
//                     title: "Server Validation Error! Please solve",
//                     toast: true,
//                     position: 'top',
//                     showConfirmButton: false,
//                     showCancelButton: false,
//                     width: 450,
//                     timer: 2000,
//                     customClass: {
//                         popup: "color-danger"
//                     }
//                 });
//             }
//         } finally {
//             setBtnLoading(false)
//         }
//     };

//     const formSubmit = () => {
//         const isValid = validate();
//         if (isValid.totalErrors) return false;
//         const data = new FormData();
//         data.append("id", params.id);
//         data.append("logo", params.logo);
//         data.append("fav_icon", params.fav_icon);
//         data.append("mode", params.mode);
//         data.append("facebook_link", params.facebook_link);
//         data.append("linkedin_link", params.linkedin_link);
//         data.append("x_link", params.x_link);
//         data.append("pinterest_link", params.pinterest_link);
//         data.append("youtube_link", params.youtube_link);
//         data.append("instagram_link", params.instagram_link);
//         data.append("whatsapp_number", params.whatsapp_number);
//         data.append("seo_title", params.seo_title);
//         data.append("site_name", params.site_name);
//         data.append("email", params.email);
//         data.append("phone", params.phone);
//         storeOrUpdateApi(data);
//     };


//     const storeOrUpdate = (data) => {
//         setErros({});
//         if (data) {
//             setParams({
//                 id: data.id,
//                 logo: '',
//                 fav_icon: '',
//                 mode: data.mode,
//                 facebook_link: data.facebook_link ? data.facebook_link : '',
//                 linkedin_link: data.linkedin_link ? data.linkedin_link : '',
//                 x_link: data.x_link ? data.x_link : '',
//                 pinterest_link: data.pinterest_link ? data.pinterest_link : '',
//                 youtube_link: data.youtube_link ? data.youtube_link : '',
//                 instagram_link: data.instagram_link ? data.instagram_link : '',
//                 whatsapp_number: data.whatsapp_number ? data.whatsapp_number : '',
//                 seo_title: data.seo_title ? data.seo_title : '',
//                 site_name: data.site_name ? data.site_name : '',
//                 email: data.email ? data.email : '',
//                 phone: data.phone ? data.phone : '',
//             });

//             data.logo ?
//                 setLogoPriview(window.location.origin + '/storage/' + data.logo) :
//                 setLogoPriview('https://dummyimage.com/600x400/000/fff');

//             data.fav_icon ?
//                 setIconPriview(window.location.origin + '/storage/' + data.fav_icon) :
//                 setIconPriview('https://dummyimage.com/600x400/000/fff');

//         } else {
//             const defaltData = JSON.parse(JSON.stringify(defaultParams));
//             setParams(defaltData);
//             setLogoPriview('https://dummyimage.com/600x400/000/fff');
//             setIconPriview('https://dummyimage.com/600x400/000/fff');
//         }

//     }




//     return (
//         <div>

//             {isLoading ? (<PageLoader />) : (
//                 <div className="container">
//                     <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5 mb-5">
//                         <div className="panel lg:col-span-2 xl:col-span-3">
//                             <div className="mb-5">
//                                 <h5 className="font-semibold text-lg dark:text-white-light">
//                                     General Settings
//                                 </h5>
//                             </div>


//                             <div className="mb-5">
//                                 <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
//                                     <form>
//                                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

//                                             <div>
//                                                 <label
//                                                     htmlFor="inputDefault"
//                                                     className="text-black"
//                                                 >
//                                                     Site Name
//                                                 </label>
//                                                 <div className="flex">
//                                                     <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
//                                                         <IoMdPerson className="text-white-dark" />
//                                                     </div>
//                                                     <input
//                                                         type="text"
//                                                         placeholder="Enter Site Name"
//                                                         name='site_name'
//                                                         className="form-input ltr:rounded-l-none rtl:rounded-r-none"
//                                                         value={params.site_name}
//                                                         onChange={(e) =>
//                                                             changeValue(e)
//                                                         }
//                                                     />
//                                                 </div>
//                                                 {errors?.site_name ? <div className="text-danger mt-1">{errors.site_name}</div> : ''}
//                                             </div>

//                                             <div>
//                                                 <label
//                                                     htmlFor="inputDefault"
//                                                     className="text-black"
//                                                 >
//                                                     Email
//                                                 </label>
//                                                 <div className="flex">
//                                                     <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
//                                                         <IoMdPerson className="text-white-dark" />
//                                                     </div>
//                                                     <input
//                                                         type="text"
//                                                         name='email'
//                                                         placeholder="Enter Email Address"
//                                                         className="form-input ltr:rounded-l-none rtl:rounded-r-none"
//                                                         value={params.email}
//                                                         onChange={(e) =>
//                                                             changeValue(e)
//                                                         }
//                                                     />
//                                                 </div>
//                                                 {errors?.email ? <div className="text-danger mt-1">{errors.email}</div> : ''}
//                                             </div>

//                                             <div>
//                                                 <label htmlFor="inputDefault">
//                                                     Phone
//                                                 </label>
//                                                 <div className="flex">
//                                                     <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
//                                                         <MdEmail className="text-white-dark" />
//                                                     </div>
//                                                     <input
//                                                         type="tel"
//                                                         placeholder="Enter Phone Number"
//                                                         name='phone'
//                                                         maxLength={10}
//                                                         className="form-input ltr:rounded-l-none rtl:rounded-r-none"
//                                                         value={params.phone}
//                                                         onChange={(e) =>
//                                                             changeValue(e)
//                                                         }
//                                                     />
//                                                 </div>
//                                                 {errors?.phone ? <div className="text-danger mt-1">{errors.phone}</div> : ''}
//                                             </div>




//                                             <div>
//                                                 <label htmlFor="inputDefault">
//                                                     Facebook URL
//                                                 </label>
//                                                 <div className="flex">
//                                                     <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
//                                                         <MdEmail className="text-white-dark" />
//                                                     </div>
//                                                     <input
//                                                         type="url"
//                                                         placeholder="facebook_link"
//                                                         name='facebook_link'
//                                                         className="form-input ltr:rounded-l-none rtl:rounded-r-none"
//                                                         value={params.facebook_link}
//                                                         onChange={(e) =>
//                                                             changeValue(e)
//                                                         }
//                                                     />
//                                                 </div>
//                                                 {errors?.facebook_link ? <div className="text-danger mt-1">{errors.facebook_link}</div> : ''}
//                                             </div>

//                                             <div>
//                                                 <label htmlFor="inputDefault">
//                                                     Linkedin URL
//                                                 </label>
//                                                 <div className="flex">
//                                                     <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
//                                                         <MdEmail className="text-white-dark" />
//                                                     </div>
//                                                     <input
//                                                         type="url"
//                                                         placeholder="linkedin_link"
//                                                         className="form-input ltr:rounded-l-none rtl:rounded-r-none"
//                                                         name='linkedin_link'
//                                                         value={params.linkedin_link}
//                                                         onChange={(e) =>
//                                                             changeValue(e)
//                                                         }
//                                                     />
//                                                 </div>
//                                                 {errors?.linkedin_link ? <div className="text-danger mt-1">{errors.linkedin_link}</div> : ''}
//                                             </div>

//                                             <div>
//                                                 <label htmlFor="inputDefault">
//                                                     X URL
//                                                 </label>
//                                                 <div className="flex">
//                                                     <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
//                                                         <MdEmail className="text-white-dark" />
//                                                     </div>
//                                                     <input
//                                                         type="url"
//                                                         placeholder="x_link"
//                                                         className="form-input ltr:rounded-l-none rtl:rounded-r-none"
//                                                         value={params.x_link}
//                                                         name='x_link'
//                                                         onChange={(e) =>
//                                                             changeValue(e)
//                                                         }
//                                                     />
//                                                 </div>
//                                                 {errors?.x_link ? <div className="text-danger mt-1">{errors.x_link}</div> : ''}
//                                             </div>

//                                             <div>
//                                                 <label htmlFor="inputDefault">
//                                                     YouTube URL
//                                                 </label>
//                                                 <div className="flex">
//                                                     <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
//                                                         <MdEmail className="text-white-dark" />
//                                                     </div>
//                                                     <input
//                                                         type="url"
//                                                         placeholder="youtube_link"
//                                                         className="form-input ltr:rounded-l-none rtl:rounded-r-none"
//                                                         value={params.youtube_link}
//                                                         name='youtube_link'
//                                                         onChange={(e) =>
//                                                             changeValue(e)
//                                                         }
//                                                     />

//                                                 </div>
//                                                 {errors?.youtube_link ? <div className="text-danger mt-1">{errors.youtube_link}</div> : ''}
//                                             </div>

//                                             <div>
//                                                 <label htmlFor="inputDefault">
//                                                     Instagram URL
//                                                 </label>
//                                                 <div className="flex">
//                                                     <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
//                                                         <MdEmail className="text-white-dark" />
//                                                     </div>
//                                                     <input
//                                                         type="url"
//                                                         placeholder="instagram_link"
//                                                         className="form-input ltr:rounded-l-none rtl:rounded-r-none"
//                                                         value={params.instagram_link}
//                                                         name='instagram_link'
//                                                         onChange={(e) =>
//                                                             changeValue(e)
//                                                         }

//                                                     />
//                                                 </div>
//                                                 {errors?.instagram_link ? <div className="text-danger mt-1">{errors.instagram_link}</div> : ''}
//                                             </div>

//                                             <div>
//                                                 <label htmlFor="inputDefault">
//                                                     Pinterest URL
//                                                 </label>
//                                                 <div className="flex">
//                                                     <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
//                                                         <MdEmail className="text-white-dark" />
//                                                     </div>
//                                                     <input
//                                                         type="url"
//                                                         placeholder="pinterest_link"
//                                                         className="form-input ltr:rounded-l-none rtl:rounded-r-none"
//                                                         value={params.pinterest_link}
//                                                         name='pinterest_link'
//                                                         onChange={(e) =>
//                                                             changeValue(e)
//                                                         }
//                                                     />
//                                                 </div>
//                                                 {errors?.pinterest_link ? <div className="text-danger mt-1">{errors.pinterest_link}</div> : ''}
//                                             </div>

//                                             <div>
//                                                 <label htmlFor="inputDefault">
//                                                     Whatsapp Number
//                                                 </label>
//                                                 <div className="flex">
//                                                     <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
//                                                         <MdEmail className="text-white-dark" />
//                                                     </div>
//                                                     <input
//                                                         type="tel"
//                                                         placeholder="whatsapp_number"
//                                                         className="form-input ltr:rounded-l-none rtl:rounded-r-none"
//                                                         value={params.whatsapp_number}
//                                                         maxLength={10}
//                                                         name='whatsapp_number'
//                                                         onChange={(e) =>
//                                                             changeValue(e)
//                                                         }
//                                                     />
//                                                 </div>
//                                                 {errors?.whatsapp_number ? <div className="text-danger mt-1">{errors.whatsapp_number}</div> : ''}
//                                             </div>

//                                             <div>
//                                                 <label htmlFor="mode">Site Mode</label>
//                                                 <select id="mode" className="form-select text-white-dark" name='mode' value={params.mode}
//                                                     onChange={(e) =>
//                                                         changeValue(e)
//                                                     }>
//                                                     <option>Select Site Mode</option>
//                                                     <option value="LIVE">LIVE</option>
//                                                     <option value="MAINTENANCE">MAINTENANCE</option>
//                                                     <option value="COMMING SOON">COMMING SOON</option>
//                                                 </select>
//                                                 {errors?.mode ? <div className="text-danger mt-1">{errors.mode}</div> : ''}
//                                             </div>


//                                         </div>
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">


//                                             <div>
//                                                 <label htmlFor="seo_title">
//                                                     SEO Title
//                                                 </label>
//                                                 <textarea
//                                                     rows={3}
//                                                     className="form-textarea"
//                                                     placeholder="SEO Title"
//                                                     name='seo_title'
//                                                     value={params.seo_title}
//                                                     onChange={(e) =>
//                                                         changeValue(e)
//                                                     }
//                                                 ></textarea>
//                                                 {errors?.seo_title ? <div className="text-danger mt-1">{errors.seo_title}</div> : ''}
//                                             </div>
//                                             <div>
//                                                 <label htmlFor="seo_description">
//                                                     SEO Description
//                                                 </label>
//                                                 <textarea
//                                                     rows={3}
//                                                     className="form-textarea"
//                                                     placeholder="SEO Description"
//                                                     name='seo_description'
//                                                     value={params.seo_description}
//                                                     onChange={(e) =>
//                                                         changeValue(e)
//                                                     }
//                                                 ></textarea>
//                                                 {errors?.seo_description ? <div className="text-danger mt-1">{errors.seo_description}</div> : ''}
//                                             </div>


//                                             <div className="mb-5">
//                                                 <label htmlFor="image">Logo</label>
//                                                 <input ref={fileLogoRef} name="logo" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
//                                                 <span className="w-full h-20 relative">
//                                                     <img className="w-40 h-20  overflow-hidden object-cover" id="logo" onClick={() => {
//                                                         fileLogoRef.current!.click()
//                                                     }} src={logoPriview} alt="logo" />
//                                                 </span>
//                                                 {errors?.logo ? <div className="text-danger mt-1">{errors.logo}</div> : ''}
//                                             </div>

//                                             <div className="mb-5">
//                                                 <label htmlFor="fav_icon">Fave Icon</label>
//                                                 <input ref={fileIconRef} name="fav_icon" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
//                                                 <span className="w-full h-20 relative">
//                                                     <img className="w-20 h-20  overflow-hidden object-cover" id="fav_icon" onClick={() => {
//                                                         fileIconRef.current!.click()
//                                                     }} src={iconPriview} alt="fav_icon" />
//                                                 </span>
//                                                 {errors?.fav_icon ? <div className="text-danger mt-1">{errors.fav_icon}</div> : ''}
//                                             </div>
//                                         </div>

//                                         <div>
//                                             <button className='btn btn-dark btn-sm float-end' type='button' disabled={btnLoading} onClick={() => formSubmit()}>
//                                                 {btnLoading ? 'Loading...' : 'Update'}
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>



//                 </div>
//             )}

//         </div>
//     );
// };

// export default Settings;

import React from 'react'

export default function Settings() {
  return (
    <div>Settings</div>
  )
}
