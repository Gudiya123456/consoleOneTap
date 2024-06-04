import React, { Fragment, useState } from "react";
import PieChart from "../billing/Piechart";
import { NavLink } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
const Invoice = () => {
  const [modal, setModal] = useState(false);

  const bill = [
    {
      sl: 1,
      name: "A2B Restauransssssssssssssssssssssssssssssssssssssssssssssssstddddd",
      status: "Pending",
    },
    {
      sl: 2,
      name: "Thalaserry Restaurant",
      status: "Received",
    },
    {
      sl: 3,
      name: "Thalapakatti Biriyani",
      status: "Received",
    },
    {
      sl: 4,
      name: "Shiv Sagar Restaurant",
      status: "Received",
    },
  ];
  return (
    <div className="  mt-2  font-semibold text-black dark:text-white">
      <div className=" flex flex-wrap items-center 2xl:ml-3 gap-4">
        <div className="relative w-full flex justify-center  xl:w-[152px] h-[152px] ">
          <PieChart completed={3} pending={1} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className=" text-sm font-bold">Total</span>
            <span className=" text-sm font-bold">Branches</span>
            <span className=" text-2xl font-bold">3</span>
          </div>
        </div>
        <div className=" flex justify-center gap-3 w-full  xl:w-auto ">
          <div className=" lg:w-[347px] md:h-[107px] bg-[#FFFFFF] dark:bg-[#000000] lg:ml-10 rounded-lg  px-4 py-4 flex flex-col  border-b-2 border-[#4AB541]">
            <h3 className=" text-[#4AB541] text-[18px] font-semibold">
              Invoice Received Restaurants
            </h3>
            <h3 className="text-[#4AB541] text-4xl font-bold ml-3 ">3</h3>
          </div>
          <div className=" lg:w-[347px] md:h-[107px] dark:bg-[#000000] bg-[#FFFFFF] rounded-lg  px-4 py-4 flex flex-col  border-b-2 border-[#BD8800]">
            <h3 className=" text-[#BD8800] text-[18px] font-semibold">
              Invoice pending Restaurants
            </h3>
            <h3 className="text-[#BD8800] text-4xl font-bold ml-3 ">1</h3>
          </div>
        </div>
      </div>

      <div className=" flex justify-end mt-7 mb-3">
        <button
          className=" bg-[#D9D9D9] font-[500] rounded-full dark:bg-[#35373B] text-[12px] w-[168px] h-[26px]"
          onClick={() => {
            setModal(true);
          }}
        >
          Create Invoice
        </button>
      </div>
      <div className="  dark:[#000000]  dark:bg-[#000000] bg-[#FFFFFF] p-2 rounded-xl">
        <div className=" overflow-x-auto ">
          <div className=" w-screen md:w-full">
            <div className=" grid grid-cols-4  bg-[#DDDDDD] py-3 items-center rounded-lg dark:bg-[#35373B] text-black dark:text-white break-all">
              <div className="  flex justify-center">
                <h1>Sl:No</h1>
              </div>
              <div className=" ">
                <h1>Restaurant Name</h1>
              </div>
              <div className="flex justify-center">
                <h1>Invoice Status</h1>
              </div>
              <div className="flex justify-center"></div>
            </div>
            {bill.map((i) => (
              <div
                key={i.sl}
                className=" grid grid-cols-4 bg-[#F2F2F2] py-3 items-center rounded-lg dark:bg-[#202125] text-black dark:text-white mt-1 break-all"
              >
                <div className=" flex justify-center">
                  <h2>{i.sl}</h2>
                </div>
                <div className=" ">
                  <h2>{i.name}</h2>
                </div>
                <div className="  flex justify-center font-normal text-sm">
                  <button
                    className={` ${
                      i.status == "Pending" ? "bg-[#BD8800]" : "bg-[#4AB541]"
                    } text-center w-[90px] h-[28px] rounded-lg text-white`}
                  >
                    {i.status}
                  </button>
                </div>
                <NavLink to="/invoice/overview">
                  <div className="flex justify-center  font-normal text-sm">
                    <button className=" bg-[#DDDDDD] text-center w-[141px] h-[26px] rounded-xl dark:bg-[#000000] text-black  dark:text-white">
                      View Invoices
                    </button>
                  </div>
                </NavLink>
              </div>
            ))}
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
  );
};

export default Invoice;
