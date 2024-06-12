import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import logo from "../../assets/images/onelogo.png";

export default function SiteSettings() {
  return (
    <div>
         <div>
     <div className=" flex gap-5 xl:gap-10 flex-wrap ml-2 mt-3 items-center">
        <div>
          <label
            htmlFor=""
            className=" text-[15px] font-[400] leading-[14px] ml-2"
          >
            Name
          </label>
          <input
            type="text"
            name=""
            id=""
            placeholder=" Enter Name here "
            className=" bg-[#FFFFFF] dark:bg-[#202125] border-[0.1px] rounded-full text-[12px] font-[500]  w-[301px] h-[30px] px-2"
          />
        </div>
        <div className=" ">
          <h3 className="text-[15px] font-[400] mb-[3px]">Logo Light mode :</h3>
          <div className=" w-[119px] h-[40px] bg-[#ECECEC] flex justify-center dark:bg-[#D9D9D9] items-center rounded-[2px]">
            <img src={logo} alt="" className=" w-[100px] h-[26px]" />
          </div>
          <h5 className=" text-[8px] font-[500]">Dimension ( 100X26)</h5>
        </div>
        <div className=" ">
          <h3 className="text-[15px] font-[400] mb-[3px]">Logo Dark mode :</h3>
          <div className=" w-[119px] h-[40px] dark:bg-[#D9D9D9] bg-[#ECECEC] flex justify-center items-center rounded-[2px]">
            <img src={logo} alt="" className=" w-[100px] h-[26px]" />
          </div>
          <h5 className=" text-[8px] font-[500]">Dimension ( 100X26)</h5>
        </div>
        <div>
          <h3 className="text-[15px] font-[400] mb-[3px]">Favicon :</h3>
          <div className=" w-[119px] h-[40px] bg-[#ECECEC] dark:bg-[#D9D9D9] flex justify-center items-center rounded-[2px]">
            {/* <img src={logo} alt="" className=" w-[32px] h-[32px]" /> */}
          </div>
          <h5 className=" text-[8px] font-[500]">Dimension ( 32X32)</h5>
        </div>
      </div>
      <div className=" flex flex-wrap ml-2 gap-5 lg:gap-10 mt-3">
        <div>
          <h3 className="text-[15px] font-[400] mb-[3px]">Console mode</h3>
          <div className="relative  inline-block mt-[2px]  font-[400] text-[13px] justify-center">
            <select className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] border-[#4E4E4E]  appearance-none min-w-[117px] h-[30px]    pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline">
              <option selected disabled>
                Live
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
              <IoIosArrowDown size={17} className=" dark:text-white" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-[15px] font-[400] mb-[3px]">Restaurant mode</h3>
          <div className="relative  inline-block mt-[2px]  font-[400] text-[13px] justify-center">
            <select className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] border-[#4E4E4E]  appearance-none min-w-[117px] h-[30px]    pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline">
              <option selected disabled>
                Live
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
              <IoIosArrowDown size={17} className=" dark:text-white" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-[15px] font-[400] mb-[3px]">Public site mode</h3>
          <div className="relative  inline-block mt-[2px]  font-[400] text-[13px] justify-center">
            <select className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] border-[#4E4E4E]  appearance-none min-w-[117px] h-[30px]    pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline">
              <option selected disabled>
                Live
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
              <IoIosArrowDown size={17} className=" dark:text-white" />
            </div>
          </div>
        </div>
      </div>
      <button className=" px-2 py-1 rounded-xl float-right mr-20 bg-[#DDDDDD] text-black dark:bg-black dark:text-white" >Save changes</button>
     </div>
    </div>
  )
}
