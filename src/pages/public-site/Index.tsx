import React from "react";
import logo from "../../assets/images/onelogo.png";
import { IoIosArrowDown } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
export default function Index() {
  return (
    <div className=" dark:text-white">
      <div>
        <h1 className=" font-[600] text-[20px]">General Settings</h1>
      </div>
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
            className=" bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] rounded-full text-[12px] font-[500]  border-[#4E4E4E] w-[301px] h-[30px] px-2"
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
      <div className=" mt-5">
        <h1 className=" font-[600] text-[20px] mb-2">Contact Details</h1>
        <div className=" 2xl:w-3/4 mt-3 grid md:grid-cols-2 xl:grid-cols-3 ml-2 gap-4">
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Facebook
            </label>
            <div className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Facebook URL "
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              LinkedIn
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter LinkedIn URL "
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              X
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] rounded-full dark:bg-[#202125] border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter X URL "
                className=" text-[12px] font-[500]  bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Instagram
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] rounded-full dark:bg-[#202125] border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Instagram URL "
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Pinterest
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Pinterest URL "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Youtube
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Youtube URL "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className=" ml-4 mt-6 flex flex-wrap gap-8">
        <div>
          <div className=" flex items-center mt-5">
            <input
              type="radio"
              name="status"
              className=" form-radio border-black dark:border-white w-4 h-4 text-black peer"
            />

            <span className="text-[16px] font-[400]">India</span>
          </div>

          <div className=" flex mt-4 items-center">
            <input
              type="radio"
              name="status"
              className=" form-radio border-black dark:border-white w-4 h-4 text-black peer"
            />

            <span className="text-[16px] font-[400]">UAE</span>
          </div>
          <div className=" flex mt-4 items-center">
            <input
              type="radio"
              name="status"
              className=" form-radio border-black dark:border-white   w-4 h-4 text-black peer"
            />

            <span className="text-[16px] font-[400]">USA</span>
          </div>
        </div>
        <div>
          <div className=" flex gap-6 flex-wrap">
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Email
              </label>
              <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder=" Enter Email"
                  className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Alternative Email
              </label>
              <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=" Enter  Alternative Email "
                  className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
          </div>
          <div className=" flex flex-wrap gap-6 mt-4">
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Phone
              </label>
              <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=" Enter Phone Number "
                  className=" text-[12px] font-[500]  bg-transparent flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Alternative Phone
              </label>
              <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=" Enter  Alternative Phone "
                  className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
          </div>
          <div className=" flex gap-6 mt-4">
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Whatsapp
              </label>
              <div className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=" Enter  Whatsapp  Number "
                  className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-6">
        <h1 className=" font-[600] text-[20px] mb-2">Email Settings</h1>
        <div className=" mt-3 2xl:w-3/4 grid md:grid-cols-2 xl:grid-cols-3 ml-2 gap-4">
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              User Name
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter User Name "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Password
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] rounded-full dark:bg-[#202125] border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Password "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Port
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Port "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Encryption
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Encryption "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Mailer
            </label>
            <div className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Mailer"
                className=" text-[12px] font-[500]  bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Name
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Name "
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Address
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Address"
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
