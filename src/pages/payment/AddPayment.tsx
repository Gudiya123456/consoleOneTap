import React, { useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";


export default function AddPayment({ showDrawer, setShowDrawer,paymentGateways,stripe }) {
    console.log('drawer', stripe);
    return (
        <div>
            <div className={`${(showDrawer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} ></div>

            <nav
                className={`${(showDrawer && 'ltr:!right-0 rtl:!left-0') || ''
                    } bg-white fixed ltr:-right-[800px] rtl:-left-[800px] top-0 bottom-0 w-full max-w-[500px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-1000 z-[51] dark:bg-black p-4`}
            >
                <div className="flex flex-col h-screen overflow-hidden">
                    <div className="w-full text-center border-b border-grey p-4">
                        <button type="button" className="px-4 py-4 absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowDrawer(false)}>
                            <IoCloseSharp className=" w-5 h-5" />
                        </button>

                        <h4 className="mb-1 dark:text-white font-bold">Payment Integration</h4>
                    </div>

                    <section className="flex-1 overflow-y-auto overflow-x-hidden perfect-scrollbar mt-5">
                        <form action="" method="post" className='p-5'>
                            <div className='mb-4 poppins-font'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Gateway Name</label>
                                <input id="fullname" type="text" placeholder="Enter Gateway Name" className="input-form poppins-font placeholder-black " />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Key</label>
                                <input id="fullname" type="text" placeholder="Enter Key" className="input-form poppins-font placeholder-black" />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Secret Key</label>
                                <input id="fullname" type="text" placeholder="Enter Secret Key" className=" input-form poppins-font placeholder-black" />
                            </div>
                           
                              <div className="mb-3">
                          <label
                            htmlFor="name"
                            className="text-style roboto-light poppins-font"
                          >
                           Environment
                          </label>

                          <select
                            className="input-form h-[33px] poppins-font  dark:border-[#5E5E5E] dark:bg-transparent"
                            name="country"
                          >
                            <option className="poppins-font text-red-600" value="">
                              Select Environment
                            </option>
                            <option className="poppins-font" value="INDIA">
                            Live
                            </option>
                            <option className="poppins-font" value="USA">
                            Demo
                            </option>
                          
                          </select>
                         
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="name"
                            className="text-style roboto-light"
                          >
                            Status
                          </label>

                          <select
                            className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                            name="country"
                          >
                            <option className="" value="">
                              Select Status
                            </option>
                            <option className="" value="INDIA">
                             Active
                            </option>
                            <option className="" value="USA">
                             Disable
                            </option>
                           
                          </select>
                         
                        </div>
                       
                        </form>
                    </section>
                    <footer className="w-full text-center border-t border-grey p-4">
                        <div className='flex justify-end gap-5 py-2'>
                            <button className='btn shadow' onClick={() => setShowDrawer(false)}>Cancel</button>
                            <button className='btn btn-dark'>Submit</button>
                        </div>
                    </footer>
                </div>
            </nav>
        </div>
    )
}