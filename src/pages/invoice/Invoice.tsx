import React from "react";
import PieChart from "../billing/Piechart";
import { NavLink } from "react-router-dom";

const Invoice = () => {
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
    <div className=" mx-3 mt-2  font-semibold text-black dark:text-white">
      <div className=" flex flex-wrap items-center xl:ml-3 gap-4">
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

      <div className=" mt-10 dark:[#000000]  dark:bg-[#000000] bg-[#FFFFFF] p-2 rounded-xl">
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
                <NavLink to='/invoice/overview'>
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
    </div>
  );
};

export default Invoice;
