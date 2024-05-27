import React from "react";
import Piechart from "./Piechart";

const Billing = () => {
  const bill = [
    {
      sl: 1,
      name: "A2B Restaurant",
      status: "pending",
    },
    {
      sl: 2,
      name: "Thalaserry Restaurant",
      status: "paid",
    },
    {
      sl: 3,
      name: "Thalapakatti Biriyani",
      status: "paid",
    },
    {
      sl: 4,
      name: "Shiv Sagar Restaurant",
      status: "paid",
    },
  ];
  return (
    <div className=" mx-10 mt-10  font-semibold text-black dark:text-white">
      <div className=" flex items-center ml-3">
        <div  className="relative w-[152px] h-[152px]">
          <Piechart completed={75} pending={25} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className=" text-sm font-bold">Total</span>
            <span className=" text-sm font-bold">Restaurants</span>
            <span className=" text-2xl font-bold">4</span>
          </div>
        </div>
        <div className=" w-[347px] h-[107px] bg-[#FFFFFF] dark:bg-[#000000] rounded-lg ml-10 px-4 py-4 flex flex-col  border-b-2 border-[#4AB541]">
          <h3 className=" text-[#4AB541] text-[18px] font-semibold">
            Payment Completed Restaurants
          </h3>
          <h3 className="text-[#4AB541] text-4xl font-bold ml-3 ">3</h3>
        </div>
        <div className=" w-[347px] h-[107px] dark:bg-[#000000] bg-[#FFFFFF] rounded-lg ml-3 px-4 py-4 flex flex-col  border-b-2 border-[#BD8800]">
          <h3 className=" text-[#BD8800] text-[18px] font-semibold">
            Payment pending Restaurants
          </h3>
          <h3 className="text-[#BD8800] text-4xl font-bold ml-3 ">1</h3>
        </div>
      </div>

      <div className=" mt-10 dark:[#000000]  dark:bg-[#000000] bg-[#FFFFFF] p-2 rounded-xl">
        <div className=" grid grid-cols-4  bg-[#DDDDDD] h-[53px] items-center rounded-lg dark:bg-[#35373B] text-black dark:text-white">
          <div className="  flex justify-center">
            <h1>Sl:No</h1>
          </div>
          <div className=" ">
            <h1>Restaurant Name</h1>
          </div>
          <div className="flex justify-center">
            <h1>Payment Status</h1>
          </div>
          <div className="flex justify-center"></div>
        </div>
        {bill.map((i) => (
          <div
            key={i.sl}
            className=" grid grid-cols-4 bg-[#F2F2F2] h-[53px] items-center rounded-lg dark:bg-[#202125] text-black dark:text-white mt-1"
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
                  i.status == "pending" ? "bg-[#BD8800]" : "bg-[#4AB541]"
                } text-center w-[90px] h-[28px] rounded-lg text-white`}
              >
                Pending
              </button>
            </div>
            <div className="flex justify-center  font-normal text-sm">
              <button className=" bg-[#DDDDDD] text-center w-[141px] h-[26px] rounded-xl dark:bg-[#000000] text-black  dark:text-white">
                View Payments
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Billing;