import React, { Fragment, useEffect, useState } from "react";

import { MdEdit, MdDelete } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosArrowBack } from "react-icons/io";
import { RiHome4Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
const Pricing = () => {
  const [selectedplan, setSelectedPlan] = useState("monthly");
  const [packages, setPackages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [durations, setDuration] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const [selecteddurations, setSelectedDuration] = useState(null);
  const [selectedCountriy, setSelectedCountry] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [modal, setModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);

  const crmToken = useSelector(
    (state: IRootState) => state.themeConfig.crmToken
  );
  useEffect(() => {
    fetchPackages();
  }, []);
  useEffect(() => {
    let c = packages;
    if (selectedCountriy) {
      c = c.filter((a) => a.country == selectedCountriy);
    }
    if (selecteddurations) {
      c = c.filter((a) => a.duration == selecteddurations);
    }
    console.log(c);
    setFilteredPackages(c);
  }, [selectedCountriy, selecteddurations]);
  const fetchPackages = async () => {
    setisLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: "https://cdn.onetapdine.com/api/packages",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crmToken,
        },
      });
      console.log(response.data);
      if (response.data.status == "success") {
        setPackages(response.data.packages);
        setCountries(response.data.countries);
        setDuration(response.data.durations);
      }

      if (response.data.status == "error") {
        alert(99999);
      }
    } catch (error: any) {
      if (error.response.status == 401) {
        // ErrorHandle();
      } else console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  const plans = [
    {
      back: "#04B84D",
      second: "#000000c7",
      planname: "Basic plan",
      rs: 18,
      cs: [{ status: "true", name: "Customer support" }],
      Lm: [{ status: "true", name: "Live Monitoring" }],
      os: [{ status: "true", name: "Onboarding Setup" }],
      ms: [{ status: "true", name: "Menu Setup" }],
      pos: [{ status: "true", name: "Pos System" }],
      om: [{ status: "true", name: "Order Manager" }],
      t: [{ status: "false", name: "Takeaway" }],
      kd: [{ status: "false", name: "KOT Dashboard" }],
      pg: [{ status: "false", name: "Payment gateway" }],
      m: [{ status: "false", name: "Menus" }],
    },
    {
      back: "#BAB200",
      second: "#000000c7",
      planname: "Pro plan",
      rs: 50,
      cs: [{ status: "true", name: "Customer support" }],
      Lm: [{ status: "true", name: "Live Monitoring" }],
      os: [{ status: "true", name: "Onboarding Setup" }],
      ms: [{ status: "true", name: "Menu Setup" }],
      pos: [{ status: "true", name: "Pos System" }],
      om: [{ status: "true", name: "Order Manager" }],
      t: [{ status: "true", name: "Takeaway" }],
      kd: [{ status: "true", name: "KOT Dashboard" }],
      pg: [{ status: "true", name: "Payment gateway" }],
      m: [{ status: "true", name: "Menus" }],
    },
  ];
  return (
    <div>
       <div className="panel flex flex-col md:flex-row justify-between items-center overflow-x-auto whitespace-nowrap p-1.5 rounded-none">
                <div className="flex items-center overflow-x-auto whitespace-nowrap mb-2 md:mb-0">
                  <div className="rounded-full p-1.5 ltr:mr-3 rtl:ml-3">
                    <RiHome4Line className='opacity' size={20} color='gray' />
                  </div>
                  <IoIosArrowForward className='ltr:mr-3 opacity-25 font-thin' color='gray' />
                  <a href="/" className="block hover:underline text-gray-600 ltr:mr-3 rtl:ml-3 poppins-font" rel="noreferrer" >
                    Home
                  </a>
                  <IoIosArrowForward className='font-thin ml-3 mr-3 opacity-25' color='gray' />
                 
                  <p className='ltr:ml-3 text-blue-700 poppins-font' >Pricing</p>
                </div>
                <div className="flex gap-2 items-center overflow-x-auto">
                  <button type="button" className="btn flex items-center gap-3 btn-sm btn-outline-info">Add Pricing</button>
                  <NavLink to='/features' >
                  <button type="button" className="btn flex items-center gap-3 btn-sm btn-outline-primary">Add Features</button>
                  </NavLink>
                </div>
              </div>
 
    <div className="dark:bg-[#202125] bg-[#F2F2F2] dark:text-[#FFFFFF] text-[#000000] p-2 px-8">
   

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
    </div>
  );
};

export default Pricing;
