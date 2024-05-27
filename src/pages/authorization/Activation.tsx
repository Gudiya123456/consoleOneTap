// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import PageLoader from '../../components/PageLoader';
// import { RiLockPasswordFill } from "react-icons/ri";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// const CrmSwal = withReactContent(Swal);
// export default function Activation() {
//     const location = useLocation()
//     const navigate = useNavigate();
//     const query = new URLSearchParams(location.search);
//     const token = query.get('token')

//     useEffect(() => {
//         if (token) checkUser();
//     }, [])

//     const [isLoading, setIsLoading] = useState(true);
//     const [user, setUser] = useState([]);

//     const checkUser = async () => {
//         setIsLoading(true)
//         try {
//             const response = await axios({
//                 method: 'get',
//                 url: window.location.origin + "/api/dashboard/authorizations/check-activation",
//                 params: { token: token },
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (response.data.status == 'success') {
//                 setUser(response.data.user);
//             } else {
//                 alert(response.data.message)
//             }

//         } catch (error) {

//         } finally {
//             setIsLoading(false)
//         }
//     }


//     const [isBtnLoading, setIsBtnLoading] = useState(false);
//     const defaultParams = { password: '', password_confirmation: '', token: token };
//     const [errors, setErros] = useState<any>({});
//     const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

//     const changeValue = (e: any) => {
//         const { value, name } = e.target;
//         setErros({ ...errors, [name]: '' });
//         setParams({ ...params, [name]: value });
//         console.table(params)
//     };

//     const validate = () => {
//         setErros({});
//         let errors = {};
//         if (!params.password) {
//             errors = { ...errors, password: 'The password field is required.' };
//         }
//         if (!params.password_confirmation) {
//             errors = { ...errors, password_confirmation: 'The password confirmation field is required.' };
//         }
//         else if (params.password != params.password_confirmation) {
//             errors = { ...errors, password: 'The password field confirmation does not match.' };
//         }
//         console.log(errors)
//         setErros(errors);
//         return { totalErrors: Object.keys(errors).length };
//     };



//     const activateApi = async (data: any) => {
//         setIsBtnLoading(true)
//         try {
//             const response = await axios({
//                 method: 'post',
//                 // url: window.location.origin + "/api/dashboard/authorizations/activation",
//                 url:'',
//                 data,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (response.data.status === 'success') {
//                 navigate('/login');
//             }

//         } catch (error: any) {
//             console.log(error)
//             if (error?.response?.status === 422) {
//                 const serveErrors = error.response.data.errors;
//                 for (var key in serveErrors) {
//                     setErros({ ...errors, [key]: serveErrors[key][0] });
//                 }
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
//             setIsBtnLoading(false)
//         }
//     };

//     const activate = () => {
//         const isValid = validate();
//         if (isValid.totalErrors) return false;
//         const data = new FormData();
//         data.append("password", params.password);
//         data.append("password_confirmation", params.password_confirmation);
//         data.append("token", token);
//         console.log(data)
//         activateApi(data);
//     };
//     return (
//         <div>{
//             !token ? <><h1>Invalid</h1></> : isLoading ? <PageLoader /> : user?.name ? (


//                 <>
//                     <div className='bg-[#1b2e4b]'>
//                         <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400 }} className='bg-white min-h-[400px]  rounded-3xl shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)]'>

//                             <div className='text-center '>
//                                 <h1 className='text-2xl font-extrabold py-4 text-[#3b3f5c]'>Create Password</h1>
//                                 <img src="https://www.piftechnologies.com/wp-content/uploads/secure-icon-300x300.gif" alt="Login" className='w-20 h-20 m-auto' />
//                             </div>



//                             <div className='px-5 mt-5'>

//                                 <div className='mb-4'>
//                                     <div className="flex ">
//                                         <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
//                                             <RiLockPasswordFill />
//                                         </div>
//                                         <input type="text" value={params.password} name='password' onChange={(e) => changeValue(e)} placeholder="Enter new password" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
//                                     </div>
//                                     {errors.password ? <b className="text-danger font-semibold text-sm p-2">{errors.password}</b> : ''}
//                                 </div>

//                                 <div className='mb-4'>
//                                     <div className="flex ">
//                                         <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
//                                             <RiLockPasswordFill />
//                                         </div>
//                                         <input type="tel" value={params.password_confirmation} name='password_confirmation' onChange={(e) => changeValue(e)} placeholder="Re-enter Password" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
//                                     </div>
//                                     {errors.password_confirmation ? <b className="text-danger font-semibold text-sm p-2">{errors.password_confirmation}</b> : ''}
//                                 </div>




//                                 <div className='mt-5 '>
//                                     <button className='btn btn-dark w-40 m-auto' disabled={isBtnLoading} onClick={() => activate()}>
//                                         {isBtnLoading ? 'Please Waite ...' : 'Submit'}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </>
//             ) : <>Invali</>
//         }</div>
//     )
// }

import React from 'react'

export default function Activation() {
  return (
    <div>Activation</div>
  )
}
