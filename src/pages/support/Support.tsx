import React from "react";
import PieChart from "../billing/Piechart";
import { BsCheck } from "react-icons/bs";
const Support = () => {
  return (
    <div className="  mt-2  font-semibold text-black dark:text-white">
      <div className=" flex flex-wrap items-center 2xl:ml-3 gap-5 ">
        <div className="relative w-full flex justify-center   lg:w-[152px] h-[152px] ">
          <PieChart completed={3} pending={1} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className=" text-sm font-bold">Total Email </span>
            <span className=" text-sm font-bold">Complaints</span>
            <span className=" text-2xl font-bold">3</span>
          </div>
        </div>
        <div className=" flex justify-center gap-3 w-full  lg:w-auto  ">
          <div className=" lg:w-[252px] md:h-[107px] bg-[#FFFFFF] dark:bg-[#000000]  rounded-lg  px-4 py-2 flex flex-col  border-b-2 border-[#4AB541]">
            <h3 className=" text-[#4AB541] text-[18px] font-semibold">
              Solved Complaints
            </h3>
            <div className=" h-full flex items-end ">
              <div className=" flex items-center justify-between flex-1">
                <div className=" ">
                  <h3 className="text-[#4AB541] text-4xl font-bold ml-3 ">3</h3>
                </div>
                <div className="h-[23px] w-[23px]   bg-[#50b456] border flex items-center justify-center border-[#0f883b] rounded-full">
                  <BsCheck size={45} className=" text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-[252px] md:h-[107px] dark:bg-[#000000] bg-[#FFFFFF] rounded-lg  px-4 py-2 flex flex-col  border-b-2 border-[#BD8800]">
            <h3 className=" text-[#FF8416] text-[18px] font-semibold">
              Pending Complaints
            </h3>
            <div className=" h-full flex items-end ">
              <div className=" flex items-center justify-between  flex-1 ">
                <div className="">
                  <h3 className="text-[#FF8416] text-4xl font-bold ml-3 ">1</h3>
                </div>
                <div className="h-[23px] w-[23px]    bg-[#FF8416] border flex items-center justify-center border-[#C25C00] rounded-full">
                  <BsCheck size={45} className=" text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
