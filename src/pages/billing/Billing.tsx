import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { RiHome4Line } from "react-icons/ri";
import BillingTable from "./BillingTable";
import box1 from "../../assets/images/box1.png";
import box2 from "../../assets/images/box2.png";
import box3 from "../../assets/images/box3.png";
import IconUsersGroup from "../../components/Icon/IconUsersGroup";
const Billing = () => {
  return (
    <div>
      <div className="panel poppins-font flex justify-between items-center overflow-x-auto whitespace-nowrap p-1.5 rounded-none ">
        <div className="flex  items-center overflow-x-auto whitespace-nowrap " >
          <div className="rounded-full p-1.5   ltr:mr-3 rtl:ml-3">
            <RiHome4Line className=' opacity' size={20} color='gray' />

          </div>
          <IoIosArrowForward className='ltr:mr-3 opacity-25 font-thin' color='gray' />

          <a href="/" className="block hover:underline text-gray-600  poppins-font ltr:mr-3 rtl:ml-3" rel="noreferrer">
            Home
          </a>
          <IoIosArrowForward className='font-thin opacity-25' color='gray' />

          <p  className='ltr:ml-3 text-blue-700 poppins-font' >Billing</p>

        </div>
        <div className="flex " >
             <a href="/restaurants"  className="flex  items-center hover:underline text-gray-600  poppins-font  ltr:mr-10 rtl:ml-3" rel="noreferrer">
                    <IoIosArrowBack
                      className='font-thin ml-2 mr-2 ' color='gray' />  Back
                  </a>
        </div>
      </div>
      <div className=" p-6 poppins-btn text-black dark:text-white">
        <div className="  grid xl:grid-cols-3 md:grid-cols-2 gap-10">
                <div className="panel h-full p-0">
                  <div className="flex p-5">
                    <div className="shrink-0 bg-primary/10 text-primary rounded-xl w-11 h-11 flex justify-center items-center dark:bg-primary dark:text-white-light">
                      {/* <IconUsersGroup className="w-5 h-5" /> */}
                      <img src={box1} alt='' />
                    </div>
                    <div className="ltr:ml-3 rtl:mr-3 ">
                      <p className="text-xl dark:text-white-light">1.6K</p>
                      <h5 className="text-[#506690] text-xs">Total Branches</h5>
                    </div>
                  </div>

                </div>

                <div className="panel h-full p-0">
                  <div className="flex p-5">
                    <div className="shrink-0 bg-success/10 text-success rounded-xl w-11 h-11 flex justify-center items-center dark:bg-danger dark:text-white-light">
                      {/* <img src={box2} alt='' /> */}
                      <IconUsersGroup className="w-5 h-5" />


                    </div>
                    <div className="ltr:ml-3 rtl:mr-3 ">
                      <p className="text-xl dark:text-white-light">900</p>
                      <h5 className="text-[#506690] text-xs"> Payment Completed Branches</h5>
                    </div>
                  </div>

                </div>

                <div className="panel h-full p-0">
                  <div className="flex p-5">
                    <div className="shrink-0 bg-success/10 text-danger rounded-xl w-11 h-11 flex justify-center items-center dark:bg-success dark:text-white-light">
                      <img src={box3} alt='' />


                    </div>
                    <div className="ltr:ml-3 rtl:mr-3 ">
                      <p className="text-xl  dark:text-white-light">800</p>
                      <h5 className="text-[#506690] text-xs"> Payment pending Branches
                      </h5>
                    </div>
                  </div>

                </div>
        </div>
       <BillingTable/>
      </div>
    </div>
  );
};

export default Billing;
