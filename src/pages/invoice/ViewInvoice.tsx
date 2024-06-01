import { NavLink } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
const Invoicesearch = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  return (
    <div className=" px-3 text-[15px] font-[500] dark:text-white">
      <div className="  text-lg font-[600]">
        <h1>Search by date range</h1>
        <div className="flex items-center mt-3 space-x-2 text-[12px] font-medium">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="w-[20px] h-[20px] text-black dark:text-white" />

            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-[96px] h-[29px] dark:bg-[#000000] text-center bg-[#DDDDDD] rounded dark:text-white"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className=" text-[15px] font-medium">to</div>
          <div className="flex items-center space-x-2 ">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="w-[96px] h-[29px] dark:bg-[#000000] text-center bg-[#DDDDDD] rounded dark:text-white"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
      </div>
      <div className=" mt-5 text-lg font-[600]">
        <h1>Search by branch</h1>
      </div>
      <div className="relative  inline-block mt-3 font-semibold text-sm justify-center">
        <select className="bg-[#DDDDDD] dark:text-white dark:bg-[#000000]  appearance-none min-w-[163px] h-[29px] text-[12px]     pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between">
          <option selected disabled>
            Choose Branch
          </option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-2 text-gray-700">
          <IoIosArrowDown size={17} className=" text-black dark:text-white" />
        </div>
      </div>

      <div className=" mt-5 text-lg font-[600]">Search by month</div>
      <div className=" mt-3 ml-12 text-[15px] font-[500] flex flex-wrap lg:gap-10 gap-2 md:gap-5">
        <div className=" flex items-center gap-1">
          <input type="radio" name="month" id="" />
          <span htmlFor="">Last Month</span>
        </div>
        <div className=" flex items-center gap-1">
          <input type="radio" name="month" id="" />
          <span htmlFor="">Last 3 Month</span>
        </div>
        <div className=" flex items-center gap-1">
          <input type="radio" name="month" id="" />
          <span htmlFor="">Last 6 Month</span>
        </div>
        <div className=" flex items-center gap-1">
          <input type="radio" name="month" id="" />
          <span htmlFor="">Last financial year</span>
        </div>
      </div>

      <div className=" flex flex-wrap justify-center mt-4 md:mt-12 gap-5">
        <NavLink to="/invoice/view/statement">
          <button className=" w-[211px] h-[35px] flex justify-center items-center dark:bg-[#000000] bg-[#DDDDDD] rounded-full">
            View Statement
          </button>
        </NavLink>
        {/* <NavLink to="/invoice/email"> */}
        <button
          className=" w-[211px] h-[35px] flex justify-center items-center dark:bg-[#000000] bg-[#DDDDDD] rounded-full"
          onClick={() => setModal(true)}
        >
          Email Statement
        </button>
        {/* </NavLink> */}

        <NavLink to="/invoice/download">
          <button className=" w-[211px] h-[35px] flex justify-center dark:bg-[#000000] items-center bg-[#DDDDDD] rounded-full">
            Download Statement
          </button>
        </NavLink>
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
                  {/* <div className="  bg-white  dark:bg-[#202125]"> */}
                  <div className=" bg-white px-6 pt-6 pb-[2px] rounded-2xl dark:text-white dark:bg-[#202125] max-w-[360px] font-[400]">
                    <div>
                      <h1 className=" text-[16px] font-bold">Confirm Email</h1>
                    </div>
                    <h1 className=" text-[12px] font-semibold mt-2 -mb-[1px]">
                      Email ID
                    </h1>
                    <input
                      type="email"
                      name=""
                      id=""
                      className="border-b border-b-[1px]   border-[#636363] w-full focus:outline-none bg-transparent"
                    />
                    <div className=" flex  items-center mt-2">
                      <input type="checkbox" name="" id="" className="" />
                      <h3 className=" ml-1 text-[12px] text-[#7C7C7C]">
                        I confirm that the above Email ID is correct.
                      </h3>
                    </div>
                    <div className="mt-5 font-bold flex items-center justify-end mb-4">
                      <button
                        type="button"
                        className=" w-[91px] h-[25px] rounded-full dark:bg-white dark:text-black bg-[#000000] font-semibold text-white text-[12px] ml-2"
                      >
                        Send
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
  );
};

export default Invoicesearch;
