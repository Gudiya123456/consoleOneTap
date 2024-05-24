// import React, { useState } from 'react'
// import ResetPassword from './ResetPassword';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import { Link } from 'react-router-dom';
// import IconMail from '../../components/Icon/IconMail';

// import logo from '../../../../../../public/restaurant/dashboard/assets/images/auth/logo.svg'
// import reset from '../../../../../../public/restaurant/dashboard/assets/images/auth/reset-password.svg'

// const CrmSwal = withReactContent(Swal);
// export default function ForgotPassword() {

//     const [isResetPassword, setIsResetPassword] = useState(false);
//     const [isUserExist, setIsUserExist] = useState(false);

//     const defaultParams = { email: '', otp: '' };
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

//         if (isUserExist) {
//             if (!params.otp) {
//                 errors = { ...errors, otp: 'OTP is required!' };
//             }
//         } else {
//             if (!params.email) {
//                 errors = { ...errors, email: 'email is required!' };
//             }
//         }
//         console.log(errors)
//         setErros(errors);
//         return { totalErrors: Object.keys(errors).length };
//     };

//     const [btnLoading, setBtnLoading] = useState(false);
//     const[isLoading, setIsLoading]=useState(false);

//     const ForgotPasswordApi = async (data: any) => {

//         setBtnLoading(true)

//         try {
//             let url = '';
//             isUserExist ? url = window.location.origin + '/api/dashboard/verify-otp' : url = window.location.origin + '/api/dashboard/forgot-password';
//             const response = await axios({
//                 method: 'post',
//                 url: url,
//                 data,
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 },
//             });

//             if (response.data.status === 'success') {

//                 if (isUserExist) setIsResetPassword(true)
//                 else setIsUserExist(true)

//                 // setParams(JSON.parse(JSON.stringify(defaultParams)))
//                 // dispatch(setCrmToken(response.data.token))
//                 // dispatch(setUserData(response.data.user))
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
//             setBtnLoading(false);

//         }
//     };

//     const handleForgotPassword = () => {
//         const isValid = validate();
//         if (isValid.totalErrors) return false;
//         const data = new FormData();
//         data.append("email", params.email);
//         data.append("otp", params.otp);
//         ForgotPasswordApi(data);
        
//     }


//     return (
//         <>
//         {
//             isLoading ? <div>Loading .....</div>:(
//                 <div>
//                 <div className="relative flex min-h-screen items-center justify-center  bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
//                     <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
//                         <div className="relative hidden w-full items-center justify-center bg-primary-light p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
//                             <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
//                             <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">

//                                 <div className="mt-24 hidden w-full max-w-[430px] lg:block">
//                                     <img src={reset} alt="Cover Image" className="w-full" />
//                                 </div>
//                             </div>
//                         </div>
//                        {
//                         isResetPassword? <ResetPassword email={params.email}  />:(
//                             <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
//                             <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
//                                 <Link to="/" className="w-8 block lg:hidden">
//                                     <img src={logo} alt="Logo" className="mx-auto w-10" />
//                                 </Link>
//                             </div>
//                             <div className="w-full max-w-[440px] lg:mt-16">
//                                 <div className="mb-7">
//                                     <h1 className="mb-3 text-2xl font-bold !leading-snug dark:text-white">Forgot Password</h1>
//                                     <p>Enter your email to recover your ID</p>
//                                 </div>
//                                 {isUserExist && (<span>
//                             <b> OTP Sent to {params.email}</b> <br />
//                         </span>)}

//                                 <div className="space-y-5">
//                                     <div>
//                                         <label htmlFor="Email">Email</label>
//                                         <div className="relative text-white-dark">
//                                             <input 
//                                             value={params.email}
//                                              name='email'
//                                               disabled={isUserExist}
//                                                onChange={(e) => changeValue(e)} 
//                                                id="Email"
//                                                type="email"
//                                                 placeholder="Enter Email"
//                                                  className="form-input pl-10 placeholder:text-white-dark" />
//                                             <span className="absolute left-4 top-1/2 -translate-y-1/2">
//                                                 <IconMail fill={true} />
//                                             </span>

//                                         </div>
//                                 <span className="text-danger font-semibold text-sm p-2">{errors.email}</span><br />

//                                     </div>
//                                     {isUserExist && (<>
//                             <input type="text" value={params.otp} name='otp' onChange={(e) => changeValue(e)} placeholder='Enter Otp' className='form-input pl-2 placeholder:text-white-dark' /><br />
//                             <span className="text-danger font-semibold text-sm p-2">{errors.otp}</span><br />
//                         </>)}

//                         <button className='btn bg-black text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]' onClick={() => handleForgotPassword()}>
//                             {btnLoading ? 'Please Wait...' : isUserExist ? 'Verfy OTP' : 'Get OTP'}
//                         </button>
//                                 </div>
//                             </div>
//                         </div>
//                         )
//                        }

//                     </div>
//                 </div>
//             </div>
//             )
//         }


//         </>
//     )
// }
