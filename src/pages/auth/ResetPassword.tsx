// import axios from 'axios';
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import IconMail from '../../components/Icon/IconMail';
// const CrmSwal = withReactContent(Swal);
// import IconLockDots from '../../components/Icon/IconLockDots';

// export default function ResetPassword({ email }) {

//     const navigate = useNavigate();
//     const defaultParams = { email: email, password: '', password_confirmation: '' };
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
//             errors = { ...errors, password: 'password is required!' };
//         }
//         if (!params.password_confirmation) {
//             errors = { ...errors, password_confirmation: 'confirm password is required!' };
//         } else if (params.password_confirmation != params.password) {
//             errors = { ...errors, password_confirmation: 'confirm password miss match!' };
//         }
//         console.log(errors)
//         setErros(errors);
//         return { totalErrors: Object.keys(errors).length };
//     };

//     const [btnLoading, setBtnLoading] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);



//     const resetPasswordApi = async (data: any) => {
//         setBtnLoading(true);

//         try {
//             const response = await axios({
//                 method: 'post',
//                 url: window.location.origin + '/api/dashboard/reset-password',
//                 data,
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 },
//             });
//             if (response.data.status === 'success') {
//                 navigate('/login')
//             } else {
//                 alert("Error")
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

//     const resetPassword = () => {
//         const isValid = validate();
//         if (isValid.totalErrors) return false;
//         const data = new FormData();
//         data.append("password_confirmation", params.password_confirmation);
//         data.append("password", params.password);
//         data.append("email", params.email);
//         resetPasswordApi(data);
//     }
//     return (
//         <>
//         {
//             isLoading ? <div>Loading....</div>:(
//                 <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
//                 <div className="w-full max-w-[440px] lg:mt-16">
//                     <div className="mb-7">
//                         <h1 className="mb-3 text-2xl font-bold !leading-snug dark:text-white">Password Reset</h1>
//                         <p>Enter your password to unlock your ID</p>
//                     </div>
//                      <span>
//                      </span>

//                                         <div className="space-y-5">
//                                             <div>
//                                             <label htmlFor="Password">Password</label>
//                                             <div className="relative text-white-dark">
//                                                 <input id="Password" value={params.password} name='password' onChange={(e) => changeValue(e)} type="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" />
//                                                 <span className="absolute start-4 top-1/2 -translate-y-1/2">
//                                                     <IconLockDots fill={true} />
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     <span className="text-danger font-semibold text-sm p-2">{errors.password}</span><br />


//                                     <div>
//                                             <label htmlFor="Password">ReEnter-Password</label>
//                                             <div className="relative text-white-dark">
//                                                 <input id="Password" value={params.password_confirmation} name='password_confirmation' onChange={(e) => changeValue(e)} type="password" placeholder="Enter Password Again" className="form-input ps-10 placeholder:text-white-dark" />
//                                                 <span className="absolute start-4 top-1/2 -translate-y-1/2">
//                                                     <IconLockDots fill={true} />
//                                                 </span>
//                                             </div>
//                                     <span className="text-danger font-semibold text-sm p-2">{errors.password_confirmation}</span><br />
//                                         </div>

//                              <button className='btn bg-black text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]' onClick={() => resetPassword()} >
//             {btnLoading ? 'Please Wait...' : 'Reset Password'}
//             </button>
//                     </div>
//                 </div>
//                  </div>
//             )
//         }

//         </>

//     )
// }
