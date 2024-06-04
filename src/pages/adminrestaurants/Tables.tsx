import React, { useState, Fragment } from 'react'
import PlusDark from '../../assets/images/PlusDark.svg'
import Plus from '../../assets/images/Plus (1).svg'
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { TfiReload } from "react-icons/tfi";
import { Dialog, Transition } from "@headlessui/react";
import { RiArrowLeftWideFill } from 'react-icons/ri';
import { Tab } from '@headlessui/react';
import IconHome from '../../components/Icon/IconHome';
import IconUser from '../../components/Icon/IconUser';
import IconPhone from '../../components/Icon/IconPhone';
import { PiDotOutlineFill } from "react-icons/pi";
import { RxDotFilled } from "react-icons/rx";


export default function Tables() {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [modal, setModal] = useState(false);

    return (
        <div className=''>
            <div className='flex px-5 pt-5 pb-2 justify-between mb-2'>
                <div>
                    Table View
                </div>
                <div className='flex gap-2'  >
                    <button>
                        <TfiReload color='black' className=' ' />

                    </button>
                    <button type="button" className=' text-white bg-black rounded py-1 px-2 font-extrabold text-[15px]' >
                        Delivery
                    </button>
                    <button type="button" className=' text-white bg-black rounded py-1 px-2 font-extrabold text-[15px]' >
                        Take Away
                    </button>
                </div>

            </div>
            <hr />
            
            <div className='flex px-5 pt-5 pb-2 justify-between mb-2'>
                <button onClick={() => { setModal(true) }} type="button" className=' text-white bg-black rounded py-1 px-2 font-extrabold text-[15px]' >
                    + Table Reservation
                </button>
                <div className='flex gap-2'  >
                <Tab.Group>
                                <Tab.List className=" flex flex-wrap gap-2">
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? 'bg-[#ECECEC] text-black !outline-none' : ''}
                                                    before:inline-block' -mb-[1px] flex items-center rounded pr-3 hover:bg-[#ECECEC] hover:text-black`}
                                            >
                                                {/* <IconHome className="ltr:mr-2 rtl:ml-2" /> */}
                                                <RxDotFilled color='black' size={40} />
                                              <div>Move KOT / Items</div>
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? 'bg-[#ECECEC] text-black !outline-none' : ''}
                                                    before:inline-block' -mb-[1px] flex items-center rounded pr-3 hover:bg-[#ECECEC] hover:text-black`}
                                            >
                                                {/* <IconHome className="ltr:mr-2 rtl:ml-2" /> */}
                                                <RxDotFilled color='grey' size={40} />
                                              <div>Blank Table</div>
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? 'bg-[#ECECEC] text-black !outline-none' : ''}
                                                    before:inline-block' -mb-[1px] flex items-center rounded pr-3 hover:bg-[#ECECEC] hover:text-black`}
                                            >
                                                {/* <IconHome className="ltr:mr-2 rtl:ml-2" /> */}
                                                <RxDotFilled color='red' size={40} />
                                              <div>Printed Table</div>
                                            </button>
                                        )}
                                    </Tab>

                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? 'bg-[#ECECEC] text-black !outline-none' : ''}
                                                    before:inline-block' -mb-[1px] flex items-center rounded pr-3 hover:bg-[#ECECEC] hover:text-black`}
                                            >
                                                {/* <IconHome className="ltr:mr-2 rtl:ml-2" /> */}
                                                <RxDotFilled color='blue' size={40} />
                                              <div>Paid Table</div>
                                            </button>
                                        )}
                                    </Tab>

                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? 'bg-[#ECECEC] text-black !outline-none' : ''}
                                                    before:inline-block' -mb-[1px] flex items-center rounded pr-3 hover:bg-[#ECECEC] hover:text-black`}
                                            >
                                                {/* <IconHome className="ltr:mr-2 rtl:ml-2" /> */}
                                                <RxDotFilled color='orange' size={40} />
                                              <div>Running KOT Table</div>
                                            </button>
                                        )}
                                    </Tab>
                                </Tab.List>
                             
                            </Tab.Group>

                </div>

            </div>

            <div className="px-5 pt-5 pb-2">
                <h1>AC</h1>
                    <div className=" m-5 grid grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 justify-items-center gap-3">
                       
                            <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                                <h1 className="text-black sm:text-3xl text-xl text-center">A1</h1>
                            </div>
                            {/* <div className='bg-red-200 w-14 h-14 flex justify-center flex-col'>
                                <h1 className='text-center' >ffff</h1>
                            </div> */}
                       
                     
                            <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                                <h1 className="text-black sm:text-3xl text-xl text-center">A2</h1>
                            </div>
                            <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                                <h1 className="text-black sm:text-3xl text-xl text-center">A3</h1>
                            </div>
                            <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                                <h1 className="text-black sm:text-3xl text-xl text-center">A4</h1>
                            </div>
                            <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                                <h1 className="text-black sm:text-3xl text-xl text-center">A4</h1>
                            </div>
                            <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                                <h1 className="text-black sm:text-3xl text-xl text-center">A4</h1>
                            </div>
                            <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                                <h1 className="text-black sm:text-3xl text-xl text-center">A4</h1>
                            </div>
                            <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                                <h1 className="text-black sm:text-3xl text-xl text-center">A4</h1>
                            </div>
                            
                       
                    </div>
                <h1>Non Ac</h1>
                    <div className="m-5 mx-4 grid grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 justify-items-center gap-3">
                       
                       <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                           <h1 className="text-black sm:text-3xl text-xl text-center">A1</h1>
                       </div>
                  
                
                       <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                           <h1 className="text-black sm:text-3xl text-xl text-center">A2</h1>
                       </div>
                 
                  
                       <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                           <h1 className="text-black sm:text-3xl text-xl text-center">A3</h1>
                       </div>
                      
                  
                       <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                           <h1 className="text-black sm:text-3xl text-xl text-center">A4</h1>
                       </div>
                       <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                           <h1 className="text-black sm:text-3xl text-xl text-center">A4</h1>
                       </div>
                       <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                           <h1 className="text-black sm:text-3xl text-xl text-center">A4</h1>
                       </div>
                       <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                           <h1 className="text-black sm:text-3xl text-xl text-center">A4</h1>
                       </div>
                       <div className="w-14 h-14 bg-[#F1F1F1] sm:w-[100px] sm:h-[100px] rounded border-dashed border-[1px] border-[#000000]  flex justify-center flex-col">
                           <h1 className="text-black sm:text-3xl text-xl text-center">A4</h1>
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
                                <Dialog.Panel className=" border-0   overflow-hidden  my-8 text-black dark:text-white ">
                                    <div className=" bg-white px-6 pt-6 pb-[2px] rounded-2xl dark:text-white dark:bg-[#202125] w-[460px] font-[400]">
                                        <div className='flex justify-start gap-1' >
                                        <div onClick={() => { setModal(false) }}><RiArrowLeftWideFill size={20}  /></div>
                                            <div className=" text-[16px] font-bold">Table Reservation</div>
                                        </div>

                                        <div className='grid grid-cols-12 mt-2'>
                                            <h1 className='grid col-span-4 text-[15px]' >Name</h1>
                                            <h1 className=' col-span-8'><input
                                                type="text"
                                                className="border px-2  border-[#C8C8C8] rounded-xl w-full focus:outline-none bg-transparent"
                                            /></h1>
                                        </div>

                                        <div className='grid grid-cols-12 mt-2'>
                                            <h1 className='grid col-span-4 text-[15px]' >Phone Number</h1>
                                            <h1 className=' col-span-8'><input
                                                type="text"
                                                className="border px-2  border-[#C8C8C8] rounded-xl w-full focus:outline-none bg-transparent"
                                            /></h1>
                                        </div>

                                        <div className='grid grid-cols-12 mt-2'>
                                            <h1 className='grid col-span-4 text-[15px]' >Count</h1>
                                            <h1 className=' col-span-8'><input
                                                type="text"
                                                className="border px-2  border-[#C8C8C8] rounded-xl w-full focus:outline-none bg-transparent"
                                            /></h1>
                                        </div>




                                        <div className="mt-5 font-bold flex items-center justify-end mb-4">
                                            <button
                                                type="button"
                                                className=" w-[91px] h-[25px] rounded-md dark:bg-white dark:text-black bg-[#000000] font-semibold text-white text-[14px] "
                                            >
                                              Reserve
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
