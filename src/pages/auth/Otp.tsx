import { Link, useNavigate } from 'react-router-dom';
import React,{ useEffect, useState } from 'react';
import OtpPage from './OtpPage';

const Otp = () => {
    return (
        <>
                <div>
                    <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                        <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                            <div className="relative hidden w-full items-center justify-center bg-primary/10 p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                                <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                                <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                                    <Link to="/" className="w-48 block lg:w-72 ms-10">
                                        <img src="console/images/ONeTap.png" alt="Logo" className="w-full" />
                                    </Link>
                                    <div className="hidden w-full max-w-[430px] lg:block">
                                        <img src="console/images/auth/login.svg" alt="Cover Image" className="w-full" />
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                                <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                                    <Link to="/" className="w-8 block lg:hidden">
                                        <img src="console/images/logo.png" alt="Logo" className="mx-auto w-10" />
                                    </Link>
                                    <div className="dropdown ms-auto w-max"></div>
                                </div>

                                <div className="w-full max-w-[440px] lg:mt-16">
                                    <h1 className="text-2xl mb-5 font-bold  !leading-snug text-black md:text-2xl text-center">Welcome to OneTapDine</h1>
                                    <OtpPage />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )



};

export default Otp;
