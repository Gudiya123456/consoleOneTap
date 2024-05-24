import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { IRootState } from '../../store/index';
import { useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import Phone from '../profile/Phone';
import Email from '../profile/Email';
// import Password from '../profile/Password';

import PageLoader from "../../components/Layouts/PageLoader";

const Profile = () => {

    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const userData = useSelector((state: IRootState) => state.themeConfig.userData);
    const [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile] = useState([]);
    const [modal2, setModal2] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const [phoneModal, setPhoneModal] = useState(false)


    useEffect(() => {
        fetchProfile();
    }, []);
    const fetchProfile = async () => {
        setIsLoading(true)
        try {
            const response = await axios({
                url: window.location.origin + '/api/dashboard/profile',
                method: 'get',
                data: {},
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                }
            })
            console.log(response.data);
            if (response.data.status == 'success') {
                // setProfile(userData)
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false);
        }
    }



    return (

        <>
            {isLoading ? <PageLoader /> : (
                <div>
                    <div className="pt-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="col-span-2 pl-10">
                            <h4 className="font-semibold text-3xl tracking-tight">Basic information</h4>
                            <div className="flex-1 py-3.5 text-center md:text-start">
                                <h3 className=" dark:text-white font-medium text-black/90 pb-2">Name</h3>
                                <div className="text-[20px] pl-2 font-bold pl-2">{userData?.name}</div>
                            </div>
                            <div className="flex-1 py-3.5 text-center md:text-start">
                                <h3 className=" dark:text-white font-medium text-black/90 pb-2">Email Address</h3>
                                <div className="text-[20px] font-bold pl-2">{userData?.email}</div>
                                <div onClick={() => { { setEmailModal(true) } }} className="text-sm pl-2 text-primary mt-1">Change Email Address</div>
                            </div>
                            <div className="flex-1 py-3.5 text-center md:text-start">
                                <h3 className=" dark:text-white font-medium text-black/90 pb-2">Phone Number</h3>
                                <div className="text-[20px] font-bold pl-2">+91 {userData?.phone}</div>
                                <div onClick={() => { { setPhoneModal(true) } }} className="text-sm pl-2 text-primary mt-1">Change Phone Number</div>
                            </div>
                            <h4 className="font-semibold mt-4 text-2xl tracking-tight">Password & Security</h4>
                            <div className="flex-1 py-3.5 text-center md:text-start">
                                <h3 className=" dark:text-white font-semibold text-black/90">Password</h3>
                                <div onClick={() => setModal2(true)} className="text-sm text-primary mt-1">Change Password</div>
                            </div>
                        </div>
                        <div className="mb-20 flex items-center justify-center">
                            <div className="max-w-[30rem] w-full bg-white shadow-md  rounded-lg border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                <div className="py-7 px-6">
                                    <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Need Help ?</h5>
                                    <p className="text-white-dark">We're here to make things easy for you.Let us Know if there's anything we can do to help</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* change password  */}
                    <div className="mb-5">
                        <Transition appear show={modal2} as={Fragment}>
                            <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
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
                                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                                    <div className="flex min-h-screen items-center justify-center px-4">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel as="div" className="panel my-8 w-full max-w-[25rem] overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                                {/* <Password setModal2={setModal2} /> */}
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>

                    {/* phone no change  */}
                    <div className="mb-5">
                        <Transition appear show={phoneModal} as={Fragment}>
                            <Dialog as="div" open={phoneModal} onClose={() => setPhoneModal(false)}>
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
                                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                                    <div className="flex min-h-screen items-center justify-center px-4">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel as="div" className="panel my-8 w-full max-w-[25rem] overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">

                                                <Phone setPhoneModal={setPhoneModal} />
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>

                    {/* email chanegs  */}
                    <div className='mb-5'>
                        <Transition appear show={emailModal} as={Fragment}>
                            <Dialog as="div" open={emailModal} onClose={() => setEmailModal(true)}>
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
                                <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                                    <div className="flex min-h-screen items-center justify-center px-4">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="panel my-8 w-full max-w-[25rem] overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                                <Email setEmailModal={setEmailModal} />
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>


                </div>
            )}
        </>

    );
};

export default Profile;

