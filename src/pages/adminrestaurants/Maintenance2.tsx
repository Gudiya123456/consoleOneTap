import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';

const Maintenence = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Maintenance'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20">
                <div className="relative">
                    <img
                        src={isDark ? '/assets/images/error/maintenence-dark.svg' : '/assets/images/error/maintenence-light.svg'}
                        alt="maintenence"
                        className="mx-auto w-full max-w-xs object-cover md:-mt-20 md:max-w-lg"
                    />
                    <div className=" font-semibold dark:text-white">
                        <h1 className="bg-gradient-to-r from-[#0038FF] to-[#FF0000] inline-block text-transparent text-4xl bg-clip-text">Under Maintenance</h1>

                        {/* <h2 className=" text-3xl font-bold text-primary md:text-5xl">Under Maintenance</h2> */}
                        <p className="text-base mt-2">
                            We are currently working on making some improvements <br className="hidden sm:block" />
                            to give you better user experience. <br /><br />

                            Please visit us again shortly.
                        </p>
                    </div>
                    <button className="mt-6 px-8 py-1 text-lg font-semibold text-white bg-gradient-to-r from-[#0038FF] to-[#FF0000] rounded-3xl">
                        Go Back to home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Maintenence;
