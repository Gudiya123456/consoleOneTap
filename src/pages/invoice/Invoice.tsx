import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { RiHome4Line } from "react-icons/ri";
import InvoiceTable from "./InvoiceTable";
import IconUsersGroup from "../../components/Icon/IconUsersGroup";
import box1 from "../../assets/images/box1.png";
import box2 from "../../assets/images/box2.png";
import box3 from "../../assets/images/box3.png";
const Invoice = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <div className="panel flex justify-between items-center overflow-x-auto whitespace-nowrap p-1.5 rounded-none ">
        <div className="flex  items-center overflow-x-auto whitespace-nowrap " >
          <div className="rounded-full p-1.5   ltr:mr-3 rtl:ml-3">
            <RiHome4Line className=' opacity' size={20} color='gray' />

          </div>
          <IoIosArrowForward className='ltr:mr-3 opacity-25 font-thin' color='gray' />

          <a href="/"  className="block hover:underline text-gray-600  ltr:mr-3 rtl:ml-3 poppins-font" rel="noreferrer">
            Home
          </a>
          <IoIosArrowForward className='font-thin opacity-25' color='gray' />

          <p  className='ltr:ml-3 text-blue-700 poppins-font' >Invoice</p>

        </div>
        <div>
          <a href="/restaurants"  className="flex poppins-font  items-center hover:underline text-gray-600 text-[13px]  ltr:mr-10 rtl:ml-3" rel="noreferrer">
            <IoIosArrowBack
              className='font-thin ml-2 mr-2 ' color='gray' />  Back
          </a>
        </div>
      </div>

      <div className=" p-6  poppins-btn text-black dark:text-white">
        <div className="  grid xl:grid-cols-3 md:grid-cols-2 gap-10">
          <div className="panel h-full p-0">
            <div className="flex p-5">
              <div className="shrink-0 bg-primary/10 text-primary rounded-xl w-11 h-11 flex justify-center items-center dark:bg-primary dark:text-white-light">
                <img src={box1} alt='' />
              </div>
              <div className="ltr:ml-3 rtl:mr-3 ">
                <p className="text-xl dark:text-white-light">1.6K</p>
                <h5 className="text-[#506690] text-xs">Total Branches</h5>
              </div>
            </div>

          </div>

          <div className="panel h-full p-0">
            <div className="flex p-5">
              <div className="shrink-0 bg-success/10 text-success rounded-xl w-11 h-11 flex justify-center items-center dark:bg-danger dark:text-white-light">
                {/* <img src={box2} alt='' /> */}
                <IconUsersGroup className="w-5 h-5" />


              </div>
              <div className="ltr:ml-3 rtl:mr-3 ">
                <p className="text-xl dark:text-white-light">900</p>
                <h5 className="text-[#506690] text-xs">  Invoice Received Restaurants</h5>
              </div>
            </div>

          </div>

          <div className="panel h-full p-0">
            <div className="flex p-5">
              <div className="shrink-0 bg-success/10 text-danger rounded-xl w-11 h-11 flex justify-center items-center dark:bg-success dark:text-white-light">
                <img src={box3} alt='' />


              </div>
              <div className="ltr:ml-3 rtl:mr-3 ">
                <p className="text-xl  dark:text-white-light">800</p>
                <h5 className="text-[#506690] text-xs"> Invoice pending Restaurants
                </h5>
              </div>
            </div>

          </div>
        </div>
        <InvoiceTable />
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
                    <div className=" bg-white dark:bg-[#202125] py-6 px-6 rounded-2xl max-w-[1030px]">
                      <div className=" flex items-center">
                        <div
                          onClick={() => {
                            setModal(false);
                          }}
                        >
                          <MdArrowBackIosNew size={13} />
                        </div>
                        <h1 className=" text-[16px] font-[600]">
                          Create Invoice
                        </h1>
                      </div>
                      <div className="grid lg:grid-cols-3 md:grid-cols-2  mt-5 ml-1 gap-5">
                        <div>
                          <label className="ml-2 text-[15px] font-[500] leading-[14px]">
                            Select Restaurant
                          </label>
                          <div className="relative  inline-block  font-[400] text-[14px] text-[#BABABA] justify-center">
                            <select className="bg-transparent border-[0.2px] border-[#4E4E4E]  appearance-none w-[301px] h-[30px]     pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between">
                              <option selected disabled>
                                Select Restaurant
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
                              <IoIosArrowDown size={17} />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="ml-2 text-[15px] font-[500] leading-[14px]">
                            Select Package
                          </label>
                          <div className="relative  inline-block  font-[400] text-[14px] text-[#BABABA] justify-center">
                            <select className="bg-transparent border-[0.2px] border-[#4E4E4E]  appearance-none w-[301px] h-[30px]     pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between">
                              <option selected disabled>
                                Select Package
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
                              <IoIosArrowDown size={17} />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor=""
                            className="ml-2 text-[15px] font-[500] leading-[14px] "
                          >
                            Amount
                          </label>
                          <input
                            type="number"
                            name=""
                            id=""
                            placeholder="Enter Amount "
                            className=" w-[301px] h-[31px] bg-transparent border-[0.2px] border-[#4E4E4E] font-[400]  text-[14px] px-3 rounded-full"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor=""
                            className="ml-2 text-[15px] font-[500] leading-[14px] "
                          >
                            Discount
                          </label>
                          <input
                            type="number"
                            name=""
                            id=""
                            placeholder="Enter Discount "
                            className=" w-[301px] h-[31px] border-[0.2px] bg-transparent border-[#4E4E4E] font-[400]  text-[14px] px-3 rounded-full"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor=""
                            className="ml-2 text-[15px] font-[500] leading-[14px] "
                          >
                            % or amount
                          </label>
                          <input
                            type="number"
                            name=""
                            id=""
                            placeholder="Enter % or amount "
                            className=" w-[301px] h-[31px] border-[0.2px]  bg-transparent border-[#4E4E4E] font-[400]  text-[14px] px-3 rounded-full"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor=""
                            className="ml-2 text-[15px] font-[500] leading-[14px] "
                          >
                            Value
                          </label>
                          <input
                            type="number"
                            name=""
                            id=""
                            placeholder="Enter Value "
                            className=" w-[301px] h-[31px] border-[0.2px] bg-transparent border-[#4E4E4E] font-[400]  text-[14px] px-3 rounded-full"
                          />
                        </div>
                      </div>
                      <div className="mt-7 mb-2 flex items-center justify-end">
                        <button
                          type="button"
                          className=" w-[85px] h-[28px] rounded-full  bg-[#000000] text-white text-[13px] font-[500]"
                        >
                          Create
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
    </div>

  );
};

export default Invoice;
