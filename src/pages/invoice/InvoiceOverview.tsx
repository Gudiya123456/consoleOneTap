import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { HiShare } from "react-icons/hi";
import { IoIosDownload } from "react-icons/io";
import { NavLink } from "react-router-dom";
const InvoiceOverview = () => {
  const bill = [
    {
      sl: 1,
      Invoiceid: "#54624M",
      name: "BTM Layout",
      dot: "12/05/2024-11:00am",
    },
    {
      sl: 2,
      Invoiceid: "#54624M",
      name: "JP Nagar",
      dot: "18/05/2024-1:00am",
    },
    {
      sl: 3,
      name: "Hosa Road",
      dot: "18/05/2024-1:00am",
      Invoiceid: "#54624M",
    },
    {
      sl: 4,
      name: "Mejestic",
      dot: "11/05/2024-1:00am",
      Invoiceid: "#54624M",
    },
  ];

  return (
    <div className="  font-semibold text-black dark:text-white">
      <div className=" flex ml-3 gap-3 text-sm  text-black dark:text-white justify-center items-center md:justify-between flex-wrap">
        <div className=" flex gap-2 ">
          <div className="relative  inline-block  font-semibold text-sm justify-center">
            <select className="bg-[#FFFFFF]  dark:bg-[#000000]  appearance-none min-w-[81px] h-[22px] text-sm     pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between">
              <option selected disabled>
                Date
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-2 text-gray-700">
              <IoIosArrowDown size={13} />
            </div>
          </div>
          <div className="relative  inline-block  font-semibold text-sm justify-center">
            <select className="bg-[#FFFFFF]  dark:bg-[#000000]  appearance-none min-w-[81px] h-[22px] text-sm     pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between">
              <option selected disabled>
                Month
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-2 text-gray-700">
              <IoIosArrowDown size={13} />
            </div>
          </div>
          <div className="relative  inline-block  font-semibold text-sm justify-center">
            <select className="bg-[#FFFFFF]  dark:bg-[#000000]  appearance-none min-w-[81px] h-[22px] text-sm     pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between">
              <option selected disabled>
                Year
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-2 text-gray-700">
              <IoIosArrowDown size={13} />
            </div>
          </div>
        </div>
        <div className=" flex gap-2 text-sm">
          <div className=" bg-[#FFFFFF] dark:bg-[#000000] px-4 rounded-full py-[2px] flex justify-center items-center">
            <h3>View invoice Statement {">"}</h3>
          </div>
          <div className=" bg-[#FFFFFF] px-4 rounded-full py-[2px] dark:bg-[#000000] flex justify-center items-center">
            <h3> invoice Format {">"}</h3>
          </div>
        </div>
      </div>

      <div className=" mt-3 dark:[#000000]  dark:bg-[#000000] bg-[#FFFFFF] p-2 rounded-xl">
        <div className=" flex mt-1 mb-1 text-black dark:text-white  ml-7 gap-5 text-sm items-center">
          <div className=" text-lg">Invoice Overview</div>
        </div>
        <div className=" overflow-x-auto ">
          <div className=" min-w-max md:min-w-full">
            <div className=" grid grid-cols-7  bg-[#DDDDDD] py-3 items-center rounded-lg dark:bg-[#35373B] text-black dark:text-white break-all gap-3">
              <div className="  flex justify-center">
                <h1>Sl:No</h1>
              </div>
              <div className="  flex justify-center">
                <h1>Invoice ID</h1>
              </div>
              <div className="flex justify-center">
                <h1>Date/Time</h1>
              </div>
              <div className="flex justify-center">
                <h1>Branch Name</h1>
              </div>
              <div className="flex justify-center">View</div>
              <div className="flex justify-center">Share</div>
              <div className="flex justify-center">Download</div>
            </div>
            {bill.map((i) => (
              <div
                key={i.sl}
                className=" grid grid-cols-7 bg-[#F2F2F2] py-3 items-center rounded-lg dark:bg-[#202125] text-black dark:text-white mt-1 text-sm break-all gap-3"
              >
                <div className=" flex justify-center">
                  <h2>{i.sl}</h2>
                </div>
                <div className=" flex justify-center">
                  <h2>{i.Invoiceid}</h2>
                </div>

                <div className="  flex justify-center ">
                  <h2>{i.dot}</h2>
                </div>
                <div className=" flex justify-center">
                  <h2>{i.name}</h2>
                </div>

                    <NavLink to='/invoice/view'>
                    <div  className="  flex justify-center ">
                    <IoMdEye size={22} />
                    </div>
                    </NavLink>
               
                <div className="  flex justify-center ">
                  <HiShare size={22} />
                </div>
                <div className="  flex justify-center ">
                  <IoIosDownload size={22} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceOverview;