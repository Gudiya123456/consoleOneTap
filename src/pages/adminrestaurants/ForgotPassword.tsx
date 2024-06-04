import {NavLink } from 'react-router-dom';
import React, { useState } from 'react'
import forgot from '../../assets/images/auth/forgot-password 1.svg'

const ForgotPassword = () => {
  const[isUserExist,setIsUserExist]=useState(false);

    return (
        <>
            <div>
                <div className="relative flex min-h-screen items-center justify-center bg-cover bg-[url(/restaurant/kot/images/auth/forgot-bg.jpeg)] bg-[#050100] bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                    <div className="relative flex w-full max-w-[1502px] flex-col justify-between bg-cover bg-center bg-no-repeat overflow-hidden rounded-md lg:flex-row lg:gap-10 xl:gap-0">

                        <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6

                            ">
                            <div className="w-full max-w-[600px] bg-white rounded-xl lg:mt-16  px-6 py-7">
                                <div className='grid grid-cols-12' >
                                    <div className='col-span-3 flex justify-center text-center' >
                                        <img className='object-none object-center' src={forgot} />
                                    </div>

                                    <form className="space-y-1 col-span-9 dark:text-white h-full rounded-xl">
                                        <p style={{ fontFamily: 'Roboto', fontWeight: 700, fontStyle: 'normal' }} className="text-xl mb-0   !leading-snug text-black  ">
                                            Forgot Your Password?
                                        </p>
                                        <p style={{ fontFamily: 'Roboto', fontWeight: 400, fontStyle: 'normal' }} className='font-roboto !mb-2' >Enter email and get password link</p>

                                        <div>
                                            <input
                                                style={{ fontFamily: 'Roboto', fontWeight: 400, fontStyle: 'normal' }}
                                                name='email'
                                                id="Email"
                                                type="email"
                                                placeholder='Enter Email'
                                                className="w-full rounded-xl border border-black bg-white px-4 py-2 text-sm font-normal text-black" />

                                        </div>

                                        {isUserExist && (<>
                                           <div>
                                           <input
                                                style={{ fontFamily: 'Roboto', fontWeight: 400, fontStyle: 'normal' }}
                                                name='otp'
                                                id="otp"
                                                type="text"
                                                placeholder='Enter Otp'
                                                className="w-full rounded-xl border border-black bg-white px-4 py-2 text-sm font-normal text-black" />
                                           </div>
                                        </>)}

                                        <button
                                            type="button"
                                            className="btn bg-black font-roboto text-white !mt-2 w-full rounded-xl border-0 ">
                                              Send OTP
                                        </button>

                                        <NavLink to='/login'>
                                            <p style={{ fontFamily: 'Roboto', fontWeight: 600, fontStyle: 'normal' }} className='items-center text-center mt-4' >Back to login page</p>
                                        </NavLink>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )


};

export default ForgotPassword;
