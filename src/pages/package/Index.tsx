import React, { useState } from "react";

import { MdEdit, MdDelete } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import {NavLink} from 'react-router-dom'
const Pricing = () => {
  const [selectedplan, setSelectedPlan] = useState("monthly");
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
    <div className="dark:bg-[#202125] bg-[#F2F2F2] dark:text-[#FFFFFF] text-[#000000] p-2 px-8">
      <div className=" flex justify-center md:justify-end">
        <div className="mt-1 flex items-center">
          <AiFillPlusCircle size={18} />

          <h5 className=" text-[14px] font-semibold">Add Pricing</h5>
        </div>
        <NavLink to="/pricing/features">
        <div className="mt-1 flex items-center ml-3">
          <AiFillPlusCircle size={18} />
          <h5 className="  text-[14px]  font-semibold">Add Features</h5>
        </div>
        </NavLink>
      </div>
      <div className=" flex justify-center md:justify-end mt-5 flex-wrap  gap-3">
        <div className=" flex bg-[#FFFFFF] dark:bg-[#000000] w-[170px] h-[27px] items-center font-semibold text-sm  rounded-full justify-center">
          <div
            className={`${
              selectedplan == "monthly"
                ? "bg-[#F2F2F2] dark:bg-[#202125]"
                : "bg-[#FFFFFF] dark:bg-[#000000]"
            }  w-[78px] h-[18px] flex items-center justify-center rounded-full cursor-pointer`}
            onClick={() => setSelectedPlan("monthly")}
          >
            <h6 className=" text-sm ">Monthly</h6>
          </div>
          <div
            className={`${
              selectedplan == "yearly"
                ? "bg-[#F2F2F2] dark:bg-[#202125]"
                : "bg-[#FFFFFF] dark:bg-[#000000]"
            }  w-[78px] h-[18px] flex items-center justify-center rounded-full cursor-pointer`}
            onClick={() => setSelectedPlan("yearly")}
          >
            <h6 className=" text-sm ">Yearly</h6>
          </div>
        </div>
        <div className="relative  inline-block w-[147px] font-semibold text-sm">
          <select className="bg-[#FFFFFF] dark:text-black dark:bg-black  appearance-none w-[147px] text-sm     pl-3 rounded-full py-1 pr-5   leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between">
            <option>Select Currency</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 4</option>
            <option>Option 5</option>
            <option>Option 6</option>
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
                  <div className=" gap-2 text-white flex justify-center text-[10px] mt-11">
                    <button className=" w-[68px] h-[25px] flex bg-[#407BFF] rounded-full justify-center items-center gap-1 ">
                      <MdEdit size={12} />
                      <h1>Edit</h1>
                    </button>
                    <button className=" w-[68px] h-[25px] flex bg-[#D60000] rounded-full justify-center items-center gap-1 ">
                      <MdDelete size={12} />
                      <h1>Delete</h1>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;