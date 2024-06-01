import React, { useState } from "react";
import Piechart from "./Piechart";
import { IoIosArrowDown } from "react-icons/io";
const Billing = () => {
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
    <div className="   font-semibold text-black dark:text-white">
      <div className=" flex flex-wrap items-center 2xl:ml-3 gap-4">
        <div className="relative w-full flex justify-center  xl:w-[152px] h-[152px] ">
          <Piechart completed={3} pending={1} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className=" text-sm font-bold">Total</span>
            <span className=" text-sm font-bold">Branches</span>
            <span className=" text-2xl font-bold">3</span>
          </div>
        </div>
        <div className=" flex justify-center gap-3 w-full  xl:w-auto ">
          <div className=" lg:w-[347px] md:h-[107px] bg-[#FFFFFF] dark:bg-[#000000] lg:ml-10 rounded-lg  px-4 py-4 flex flex-col  border-b-2 border-[#4AB541]">
            <h3 className=" text-[#4AB541] text-[18px] font-semibold">
              Payment Completed Branches
            </h3>
            <h3 className="text-[#4AB541] text-4xl font-bold ml-3 ">2</h3>
          </div>
          <div className=" lg:w-[347px] md:h-[107px] dark:bg-[#000000] bg-[#FFFFFF] rounded-lg  px-4 py-4 flex flex-col  border-b-2 border-[#BD8800]">
            <h3 className=" text-[#BD8800] text-[18px] font-semibold">
              Payment pending Branches
            </h3>
            <h3 className="text-[#BD8800] text-4xl font-bold ml-3 ">1</h3>
          </div>
        </div>
      </div>

      <div className="mt-5 md:mt-10 flex justify-end text-sm gap-2 text-black dark:text-white">
        <div className="relative  inline-block  font-semibold text-sm justify-center">
          <select className="bg-[#FFFFFF] dark:text-black dark:bg-black  appearance-none min-w-[81px] h-[22px] text-sm     pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between">
            <option selected disabled>
              Date
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-2 text-gray-700">
            <IoIosArrowDown size={17} />
          </div>
        </div>
        <div className="relative  inline-block  font-semibold text-sm justify-center">
          <select className="bg-[#FFFFFF] dark:text-black dark:bg-black  appearance-none min-w-[81px] h-[22px] text-sm     pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between">
            <option selected disabled>
              Month
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-2 text-gray-700">
            <IoIosArrowDown size={17} />
            {/* <img src={downarrow} alt="img" className=" w-[17px] h-[17px] " /> */}
            {/* <img src={downarrowwhite} alt="img" className=" w-[17px] h-[17px] " /> */}
          </div>
        </div>
        <div className="relative  inline-block  font-semibold text-sm justify-center">
          <select className="bg-[#FFFFFF] dark:text-black dark:bg-black  appearance-none min-w-[81px] h-[22px] text-sm     pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between">
            <option selected disabled>
              Year
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-2 text-gray-700">
            {/* <img src={downarrow} alt="img" className=" w-[17px] h-[17px] " /> */}
            {/* <img src={downarrowwhite} alt="img" className=" w-[17px] h-[17px] " /> */}
            <IoIosArrowDown size={17} />
          </div>
        </div>
      </div>
      <div className=" mt-3 dark:[#000000]  dark:bg-[#000000] bg-[#FFFFFF] p-2 rounded-xl">
        <div className=" flex flex-wrap justify-center md:justify-start mt-2 mb-3 text-black dark:text-white  ml-5 gap-5 text-sm items-center">
          <div
            className={`${
              payment == "paymentreceived"
                ? "bg-[#DDDDDD] dark:bg-[#35373B]"
                : "bg-[#F2F2F2] dark:bg-[#202125]"
            } h-[26px] px-4     rounded-full flex justify-center items-center cursor-pointer`}
            onClick={() => setPayment("paymentreceived")}
          >
            Payment Received
          </div>
          <div
            className={`${
              payment == "outstanding"
                ? "bg-[#DDDDDD] dark:bg-[#35373B]"
                : "bg-[#F2F2F2] dark:bg-[#202125]"
            } h-[26px] px-4     rounded-full flex  justify-center items-center cursor-pointer`}
            onClick={() => setPayment("outstanding")}
          >
            Outstanding Payment
          </div>
        </div>
        <div
          className={` ${payment === "paymentreceived" ? "grid" : "hidden"}`}
        >
          <div className=" overflow-x-auto ">
            {/* <div className="min-w-max md:min-w-full "> */}

            <div className="min-w-max md:min-w-full">
              <div className=" grid grid-cols-5  bg-[#DDDDDD] py-3 items-center rounded-lg dark:bg-[#35373B] text-black dark:text-white md:gap-3 break-all break-words">
                <div className="  flex justify-center">
                  <h1>Sl:No</h1>
                </div>
                <div className="  flex justify-center">
                  <h1>Branch Name</h1>
                </div>
                <div className="flex justify-center">
                  <h1>Date/Time</h1>
                </div>
                <div className="flex justify-center">
                  <h1>Payment Gateway</h1>
                </div>
                <div className="flex justify-center">Remarks</div>
              </div>
              {bill.map((i) => (
                <div
                  key={i.sl}
                  className=" grid grid-cols-5 bg-[#F2F2F2] py-3 items-center rounded-lg dark:bg-[#202125] text-black dark:text-white mt-1 text-sm md:gap-3 break-all break-words"
                >
                  <div className=" flex justify-center">
                    <h2>{i.sl}</h2>
                  </div>
                  <div className=" flex justify-center">
                    <h2>{i.name}</h2>
                  </div>
                  <div className="  flex justify-center ">
                    <h2>{i.dot}</h2>
                  </div>
                  <div className="  flex justify-center ">
                    <h2>{i.pg}</h2>
                  </div>
                  <div className="  flex justify-center ">
                    <h2>{i.remarks}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={` ${payment === "outstanding" ? "grid" : "hidden"}`}>
          <div className=" overflow-x-auto ">
            {/* <div className="min-w-max md:min-w-full "> */}

            <div className="min-w-max md:min-w-full">
              <div className=" grid grid-cols-6  bg-[#DDDDDD] py-3 items-center rounded-lg dark:bg-[#35373B] md:gap-3 text-black dark:text-white break-all">
                <div className="  flex justify-center">
                  <h1>Sl:No</h1>
                </div>
                <div className="  flex justify-center">
                  <h1>Branch Name</h1>
                </div>
                <div className="flex justify-center">
                  <h1>Due Date</h1>
                </div>
                <div className="flex justify-center">
                  <h1>Pending by Days</h1>
                </div>
                <div className="flex justify-center">Remarks</div>
                <div className="flex justify-center">Remind</div>
              </div>
              {outstanding.map((i) => (
                <div
                  key={i.sl}
                  className=" grid grid-cols-6 bg-[#F2F2F2] py-3 items-center rounded-lg dark:bg-[#202125] md:gap-3 text-black dark:text-white mt-1 text-sm break-all"
                >
                  <div className=" flex justify-center">
                    <h2>{i.sl}</h2>
                  </div>
                  <div className=" flex justify-center">
                    <h2>{i.name}</h2>
                  </div>
                  <div className="  flex justify-center ">
                    <h2>{i.due}</h2>
                  </div>
                  <div className="  flex justify-center text-[#F62929]">
                    <h2>{i.pd}</h2>
                  </div>
                  <div className="  flex justify-center ">
                    <h2>{i.remarks}</h2>
                  </div>
                  <div className="  flex justify-center text-[12px]">
                    <button className=" w-[115px] h-[26px] bg-[#DDDDDD] rounded-full dark:bg-[#000000] dark:text-white">
                      Send Reminder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
