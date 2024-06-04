import React, { useState } from "react";

import rozorpay from "../../assets/images/rozorpay.png";
import gpay from "../../assets/images/gpay.png";
import stripe from "../../assets/images/stripe.png";
import paypal from "../../assets/images/paypal.png";
import phonepe from "../../assets/images/phonepay.png";
import amazon from "../../assets/images/amazon.png";
const Payment = () => {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className=" text-black dark:text-white">
      <div className=" text-xl font-bold">
        <h1>Payment Gateway</h1>
      </div>
      <div className=" flex mt-10 flex-wrap mr-10 gap-10">
        <div className=" ">
          <div className=" flex items-center  text-lg font-[500]  md:justify-start justify-center">
            <div className=" flex items-center">
              <div className="  w-[51px]  h[38px] flex justify-center">
                <img
                  src={rozorpay}
                  alt=""
                  className=" w-[51px] h[38px] -mt-3"
                />
              </div>
              <div className="flex  ml-2">
                <h2 className=" w-40">Razorpay</h2>
                <input
                  type="radio"
                  name="payment"
                  id=""
                  value="razorpay"
                  className=" "
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className=" flex items-center gap-3 text-lg font-[500] flex-wrap md:justify-start justify-center mt-4">
            <div className=" flex items-center">
              <div className="  w-[51px]  h[38px] flex justify-center">
                <img src={gpay} alt="" className=" w-[39px] h[16px] " />
              </div>
              <div className="flex  ml-2">
                <h2 className=" w-40">Google Pay</h2>
                <input
                  type="radio"
                  name="payment"
                  id=""
                  value="googlepay"
                  className=" "
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className=" flex items-center gap-3 text-lg font-[500] flex-wrap md:justify-start justify-center mt-4">
            <div className=" flex items-center">
              <div className="  w-[51px]  h[38px] flex justify-center">
                <img src={stripe} alt="" className=" w-[51px] h[29px] " />
              </div>
              <div className="flex  ml-2">
                <h2 className=" w-40">Stripe</h2>
                <input
                  type="radio"
                  name="payment"
                  id=""
                  value="stripe"
                  className=""
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className=" flex items-center gap-3 text-lg font-[500] flex-wrap md:justify-start justify-center mt-4">
            <div className=" flex items-center">
              <div className="  w-[51px]  h[38px] flex justify-center">
                <img src={paypal} alt="" className=" w-[60px] h[30px] " />
              </div>
              <div className="flex  ml-2">
                <h2 className=" w-40">Paypal</h2>
                <input
                  type="radio"
                  name="payment"
                  id=""
                  value="paypal"
                  className=""
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className=" flex items-center gap-3 text-lg font-[500] flex-wrap md:justify-start justify-center mt-4">
            <div className=" flex items-center">
              <div className="  w-[51px]  h[38px] flex justify-center">
                <img src={amazon} alt="" className=" w-[32px] h[32px] " />
              </div>
              <div className="flex  ml-2">
                <h2 className=" w-40">Amazon Pay</h2>
                <input
                  type="radio"
                  name="payment"
                  id=""
                  value="amazon"
                  className=""
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className=" flex items-center gap-3 text-lg font-[500] flex-wrap md:justify-start justify-center mt-4">
            <div className=" flex items-center">
              <div className="  w-[51px]  h[38px] flex justify-center">
                <img src={phonepe} alt="" className=" w-[60px] h[30px] " />
              </div>
              <div className="flex  ml-2">
                <h2 className=" w-40">phonepe</h2>
                <input
                  type="radio"
                  name="payment"
                  id=""
                  value="phonepe"
                  className=""
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" ">
          <div className="">
            <div className=" flex gap-2 text-[13px] flex-wrap ">
              <div>
                <div className=" ml-3  f">
                  <h3 className="">Key Name</h3>
                </div>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
                  />
                </div>
              </div>
              <div>
                <div className=" ml-3">
                  <h3>Password</h3>
                </div>
                <input
                  type="text"
                  name=""
                  id=""
                  className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
                />
              </div>
            </div>
            <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">
              <div>
                <div className=" ml-3  f">
                  <h3 className="">Key Name</h3>
                </div>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
                  />
                </div>
              </div>
              <div>
                <div className=" ml-3">
                  <h3>Password</h3>
                </div>
                <input
                  type="text"
                  name=""
                  id=""
                  className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
                />
              </div>
            </div>
            <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">
              <div>
                <div className=" ml-3  f">
                  <h3 className="">Key Name</h3>
                </div>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" flex justify-center mt-4">
            <button className=" w-[97px] h-[27px] text-sm dark:bg-[#FFFFFF] dark:text-dark bg-[#000000] rounded-lg text-white">
              Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
