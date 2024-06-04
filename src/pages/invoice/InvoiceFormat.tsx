import React, { useRef } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
const InvoiceFormat = () => {
  const fileLogoRef = useRef<HTMLInputElement>(null);

  return (
    <div className=" grid grid-cols-3 gap-5 dark:text-white">
      <div>
        <label
          htmlFor=""
          className=" text-[13px] font-[500] ml-3 leading-[12px]"
        >
          Name
        </label>
        <input
          type="text"
          name=""
          id=""
          className=" w-[289px] h-[34px] bg-transparent border-[1px] rounded-[15px] border-[#5E5E5E]"
        />
      </div>
      <div>
        <label
          htmlFor=""
          className=" text-[13px] font-[500] ml-3 leading-[12px]"
        >
          Address line
        </label>
        <input
          type="text"
          name=""
          id=""
          className=" w-[289px] h-[34px] bg-transparent border-[1px] rounded-[15px] border-[#5E5E5E]"
        />
      </div>
      <div>
        <label
          htmlFor=""
          className=" text-[13px] font-[500] ml-3 leading-[12px]"
        >
          City
        </label>
        <input
          type="text"
          name=""
          id=""
          className=" w-[289px] h-[34px] bg-transparent border-[1px] rounded-[15px] border-[#5E5E5E]"
        />
      </div>
      <div>
        <label
          htmlFor=""
          className=" text-[13px] font-[500] ml-3 leading-[12px]"
        >
          Pincode
        </label>
        <input
          type="text"
          name=""
          id=""
          className=" w-[289px] h-[34px] bg-transparent border-[1px] rounded-[15px] border-[#5E5E5E]"
        />
      </div>
      <div>
        <label
          htmlFor=""
          className=" text-[13px] font-[500] ml-3 leading-[12px]"
        >
          GST Number
        </label>
        <input
          type="text"
          name=""
          id=""
          className=" w-[289px] h-[34px] bg-transparent border-[1px] rounded-[15px] border-[#5E5E5E]"
        />
      </div>
      <div>
        <div className=" flex ">
          <input
            ref={fileLogoRef}
            name="logo"
            type="file"
            className="hidden"
            accept="image/*"
          />
          <div
            className="   flex items-center cursor-pointer"
            onClick={() => {
              fileLogoRef.current!.click();
            }}
          >
            <BsFillPlusCircleFill size={25} />
            <div className="ml-3 w-[95px] h-[63px] flex justify-center font-[500] text-[13px] dark:bg-[#343434] items-center bg-[#DDDDDD] rounded-lg">
              Add Logo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFormat;
