import React from 'react'

export default function Support() {
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniCheckCircle } from "react-icons/hi2";
import PieChart from "../billing/Piechart";
import { WiTime8 } from "react-icons/wi";
import { RxCheck } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import india from "../../assets/images/india.png";
import { MdEmail } from "react-icons/md";
const Support = () => {
  const [payment, setPayment] = useState("paymentreceived");
  const bill = [
    {
      sl: 1,
      name: "BTM Layout",
      dot: "12/05/2024-11:00am",
      pg: "Google Pay",
      remarks: "xxxxxxxxxxx cccccccccc cccccccc",
    },
    {
      sl: 2,
      name: "JP Nagar",
      dot: "18/05/2024-1:00am",
      pg: "Phone Pay",
      remarks: "",
    },
    {
      sl: 3,
      name: "Hosa Road",
      dot: "18/05/2024-1:00am",
      pg: "Phone Pay",
      remarks: "",
    },
    {
      sl: 4,
      name: "Mejestic",
      dot: "11/05/2024-1:00am",
      pg: "Paytm",
      remarks: "",
    },
  ];
  const outstanding = [
    {
      sl: 1,
      name: "BTM Layout",
      due: "12/05/2024",
      pd: "7",
      remarks: "xxxxxxxxxxx ",
    },
    {
      sl: 2,
      name: "JP Nagar",
      due: "18/05/2024",

      pd: "7",
      remarks: "",
    },
    {
      sl: 3,
      name: "Hosa Road",
      due: "18/05/2024",

      pd: "4",
      remarks: "",
    },
    {
      sl: 4,
      name: "Mejestic",
      due: "18/05/2024",

      pd: "10",
      remarks: "",
    },
  ];
  return (
    <div className="dark:bg-[#202125] bg-[#F2F2F2] dark:text-[#FFFFFF] text-[#000000] p-2 px-8">
      <div className=" flex justify-center md:justify-end">
        <div className="mt-1 flex items-center">
          <AiFillPlusCircle size={18} onClick={() => setModal(true)} />

          <h5 className=" text-[14px] font-semibold">Add Pricing</h5>
        </div>
        <div className="mt-1 flex items-center ml-3">
          <AiFillPlusCircle size={18} />

          <h5 className="  text-[14px]  font-semibold">Add Features</h5>
        </div>
      </div>
      <div className=" flex justify-center md:justify-end mt-5 flex-wrap  gap-3">
        <div className=" flex bg-[#FFFFFF] dark:bg-[#000000] px-2 h-[27px] items-center font-semibold text-sm  rounded-full justify-center">
          {durations.map((duration) => (
            <div
              className={`${
                selecteddurations == duration
                  ? "bg-[#F2F2F2] dark:bg-[#202125]"
                  : "bg-[#FFFFFF] dark:bg-[#000000]"
              } px-2 h-[18px] flex items-center justify-center rounded-full cursor-pointer`}
              onClick={() => setSelectedDuration(duration)}
            >
              <h6 className=" text-sm ">{duration}</h6>
            </div>
          ))}
        </div>

        <div className="relative  inline-block w-[158px] font-semibold text-sm">
          <select
            className="bg-[#FFFFFF] dark:text-white dark:bg-[#000000]  appearance-none w-[158px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center "
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option>Select Country</option>
            {countries.map((country) => (
              <option value={country}>{country}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-2 text-gray-700">
            <IoIosArrowDown size={17} />
          </div>
        </div>
      </div>

      <div className="mt-5 md:mt-10 flex justify-center">
        <div>
          <h1 className=" text-2xl font-bold">
            Find the perfect plans for your needs
          </h1>
          <div className=" grid md:grid-cols-2 mt-6 md:mt-10 gap-8  justify-center">
            {plans?.map((p, index) => (
              <div key={index}>
                <div className=" flex justify-center">
                  <div
                    style={{ background: p.back }}
                    className="  w-[173px] h-[55px] rounded-2xl flex justify-center items-center text-white -mb-7"
                  >
                    <h3 className=" text-lg font-semibold">{p.planname}</h3>
                  </div>
                </div>

                <div className="dark:bg-[#000000] bg-[#FFFFFF] border-[#D8D6D6] border-solid px-5 pt-10 pb-9 rounded-3xl w-[287px]">
                  <div className=" flex items-center border-b pb-2 border-[#606060]">
                    <div
                      style={{
                        background: `linear-gradient(110deg, ${p.back} 10%, ${p.second} 100%)`,
                      }}
                      className="  h-[32px] w-[32px] rounded-full flex justify-center  items-center text-white font-bold text-[28px] leading-tight "
                    >
                      $
                    </div>
                    <div className=" ml-1 ">
                      <span className=" text-4xl font-semibold">{p.rs}</span>
                      <span className=" text-lg font-semibold -top-3">
                        /month
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.Lm[0].status == "true" ? (
                        <FcCheckmark size={17} />
                      ) : (
                        <MdClose color="red" size={21} />
                      )}
                      <h3 className=" ml-3">{p.Lm[0].name}</h3>
                    </div>

                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.cs[0].status == "true" ? (
                        <FcCheckmark size={17} />
                      ) : (
                        <MdClose color="red" size={21} />
                      )}
                      <h3 className=" ml-3">{p.cs[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.os[0].status == "true" ? (
                        <FcCheckmark size={17} />
                      ) : (
                        <MdClose color="red" size={21} />
                      )}
                      <h3 className=" ml-3">{p.os[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.ms[0].status == "true" ? (
                        <FcCheckmark size={17} />
                      ) : (
                        <MdClose color="red" size={21} />
                      )}
                      <h3 className=" ml-3">{p.ms[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.pos[0].status == "true" ? (
                        <FcCheckmark size={17} />
                      ) : (
                        <MdClose color="red" size={21} />
                      )}
                      <h3 className=" ml-3">{p.pos[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.om[0].status == "true" ? (
                        <FcCheckmark size={17} />
                      ) : (
                        <MdClose color="red" size={21} />
                      )}
                      <h3 className=" ml-3">{p.pos[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.t[0].status == "true" ? (
                        <FcCheckmark size={17} />
                      ) : (
                        <MdClose color="red" size={21} />
                      )}
                      <h3 className=" ml-3">{p.t[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.kd[0].status == "true" ? (
                        <FcCheckmark size={17} />
                      ) : (
                        <MdClose color="red" size={21} />
                      )}
                      <h3 className=" ml-3">{p.kd[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.pg[0].status == "true" ? (
                        <FcCheckmark size={17} />
                      ) : (
                        <MdClose color="red" size={21} />
                      )}
                      <h3 className=" ml-3">{p.pg[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.m[0].status == "true" ? (
                        <FcCheckmark size={17} />
                      ) : (
                        <MdClose color="red" size={21} />
                      )}
                      <h3 className=" ml-3">{p.m[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                  </div>
                  <div className=" gap-2 text-white flex justify-center text-[12px] mt-11">
                    <button
                      className=" w-[68px] h-[25px] flex bg-[#407BFF] rounded-full justify-center items-center  "
                      onClick={() => setEditModal(true)}
                    >
                      <MdEdit size={12} />
                      <div className=" ml-1 mt-[1px]">
                        <h1>Edit</h1>
                      </div>
                    </button>
                    <button className=" w-[68px] h-[25px] flex bg-[#D60000] rounded-full justify-center items-center   ">
                      <div>
                        <MdDelete size={12} />
                      </div>
                      <div className=" ml-1 mt-[1px]">
                        <h1>Delete</h1>
                      </div>
                    </button>
                  </div>
                </div>
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
            // onClick={() => {
            //   setModal(false);
            // }}
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
                  <div className=" bg-white px-7 py-6 rounded-2xl dark:text-white dark:bg-[#202125] max-w-[924px] font-[400]">
                    <div className=" flex items-center">
                      <div
                        onClick={() => {
                          setModal(false);
                        }}
                        className=" cursor-pointer"
                      >
                        <IoIosArrowBack />
                      </div>
                      <div>
                        <h3 className=" font-bold  text-xl">Add Pricing</h3>
                      </div>
                    </div>
                    <div className=" ml-4 mt-3">
                      <h3 className=" font-bold  text-xl">Package Name</h3>
                      <div className=" flex flex-wrap mt-5 gap-4 ml-7">
                        <div className="relative  inline-block w-[194px] font-semibold text-sm">
                          <select className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none h-[26px] w-[194px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">
                            <option selected disabled>
                              Select Country
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
                            <IoIosArrowDown size={17} color="#B5B5B5" />
                          </div>
                        </div>
                        <div className="relative  inline-block w-[194px] font-semibold text-sm">
                          <select className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none h-[26px] w-[194px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">
                            <option selected disabled>
                              Duration
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
                            <IoIosArrowDown size={17} color="#B5B5B5" />
                          </div>
                        </div>
                        <div className="relative  inline-block w-[194px] font-semibold text-sm">
                          <select className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none h-[26px] w-[194px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">
                            <option selected disabled>
                              Package Name
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
                            <IoIosArrowDown size={17} color="#B5B5B5" />
                          </div>
                        </div>
                      </div>
                      <div className="  mt-3">
                        <h3 className=" font-bold  text-lg">Price</h3>
                        <div className="flex flex-wrap mt-2 gap-4 ml-7">
                          <div className=" text-sm">
                            <input
                              type="text"
                              placeholder=" Price"
                              className="bg-[#FFFFFF] text-[#B5B5B5] dark:bg-[#202125] dark:border-[#515151]  border border-[#D6D6D6]  h-[26px] w-[262px] text-sm    rounded-full px-4 "
                            />
                          </div>
                          <div>
                            <label className=" ml-5">
                              <input
                                type="radio"
                                name="status"
                                value="1"
                                className="form-radio text-success peer"
                              />
                              <span
                                style={{ color: "#32e01d", fontSize: "18px" }}
                                className="peer-checked:text-success  roboto-light"
                              >
                                Active
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className=" px-5">
                              <input
                                type="radio"
                                name="status"
                                value="0"
                                className=" form-radio border-danger  w-5 h-5 text-danger peer"
                              />
                              <span
                                style={{ color: "red", fontSize: "18px" }}
                                className="peer-checked:text-success  roboto-light"
                              >
                                Blocked
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="font-semibold  mt-5">
                        <h3 className=" font-bold  text-lg">Features</h3>
                        <div className=" mt-3  flex flex-wrap gap-5 ml-7">
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Live Monitoring</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Customer Support</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Onboarding Setup</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Menu Setup</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">POS System</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Order Manager</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Take away</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">KOT Dashbaord</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Payment Gateway</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Menus</h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 font-bold flex items-center justify-end mb-5">
                      <button
                        type="button"
                        className="  w-[107px] h-[26px] rounded-full  dark:border-white   border  border-black border-solid text-sm"
                        onClick={() => {
                          setModal(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className=" w-[107px] h-[26px] rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm ml-2"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={editmodal} as={Fragment}>
        <Dialog as="div" open={editmodal} onClose={() => setEditModal(true)}>
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
            // onClick={() => {
            //   setModal(false);
            // }}
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
                  <div className=" bg-white px-7 py-6 rounded-2xl dark:text-white dark:bg-[#202125] max-w-[924px] font-[400]">
                    <div className=" flex items-center">
                      <div
                        onClick={() => {
                          setEditModal(false);
                        }}
                        className=" cursor-pointer"
                      >
                        <IoIosArrowBack />
                      </div>
                      <div>
                        <h3 className=" font-bold  text-xl">Edit Plan</h3>
                      </div>
                    </div>
                    <div className=" ml-4 mt-3">
                      <h3 className=" font-bold  text-xl">Edit Package</h3>
                      <div className=" flex flex-wrap mt-4 gap-5 ml-7">
                        <div className="relative  inline-block w-[194px] font-semibold text-sm">
                          <select className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none h-[26px] w-[194px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">
                            <option selected disabled>
                              Select Country
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
                            <IoIosArrowDown size={17} color="#B5B5B5" />
                          </div>
                        </div>
                        <div className="relative  inline-block w-[194px] font-semibold text-sm">
                          <select className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none h-[26px] w-[194px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">
                            <option selected disabled>
                              Duration
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
                            <IoIosArrowDown size={17} color="#B5B5B5" />
                          </div>
                        </div>
                        <div className="relative  inline-block w-[194px] font-semibold text-sm">
                          <select className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none h-[26px] w-[194px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">
                            <option selected disabled>
                              Package Name
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
                            <IoIosArrowDown size={17} color="#B5B5B5" />
                          </div>
                        </div>
                      </div>
                      <div className="  mt-3">
                        <h3 className=" font-bold  text-lg">Edit Price</h3>
                        <div className="flex flex-wrap mt-2 gap-4 ml-7">
                          <div className=" text-sm">
                            <input
                              type="text"
                              placeholder=" Price"
                              className="bg-[#FFFFFF] text-[#B5B5B5] dark:bg-[#202125] dark:border-[#515151]  border border-[#D6D6D6]  h-[26px] w-[262px] text-sm    rounded-full px-4 "
                            />
                          </div>
                          <div>
                            <label className=" ml-5">
                              <input
                                type="radio"
                                name="status"
                                value="1"
                                className="form-radio text-success peer"
                              />
                              <span
                                style={{ color: "#32e01d", fontSize: "18px" }}
                                className="peer-checked:text-success  roboto-light"
                              >
                                Active
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className=" px-5">
                              <input
                                type="radio"
                                name="status"
                                value="0"
                                className=" form-radio border-danger  w-5 h-5 text-danger peer"
                              />
                              <span
                                style={{ color: "red", fontSize: "18px" }}
                                className="peer-checked:text-success  roboto-light"
                              >
                                Blocked
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="font-semibold  mt-5">
                        <h3 className=" font-bold  text-lg">Edit Features</h3>
                        <div className=" mt-3  flex flex-wrap gap-5 ml-7">
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Live Monitoring</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Customer Support</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Onboarding Setup</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Menu Setup</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">POS System</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Order Manager</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Take away</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">KOT Dashbaord</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Payment Gateway</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Menus</h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 font-bold flex items-center justify-end mb-5">
                      <button
                        type="button"
                        className="  w-[107px] h-[26px] rounded-full  dark:border-white   border  border-black border-solid text-sm"
                        onClick={() => {
                          setEditModal(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className=" w-[107px] h-[26px] rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm ml-2"
                      >
                        Add
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

export default Pricing;