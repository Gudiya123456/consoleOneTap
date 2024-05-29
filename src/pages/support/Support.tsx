import React, { useState } from "react";
// import delet from "./images/delete.png";
// import plus from "./images/plus.png";
const AddFeatures = () => {
  const [inputvisible, setInputvisible] = useState(false);
  const features = [
    {
      slno: 1,
      fn: "Live Monitoring",
    },
    {
      slno: 2,
      fn: "Customer Support",
    },
    {
      slno: 3,
      fn: "Oboarding Setup",
    },
    {
      slno: 4,
      fn: "menu Setup",
    },
    {
      slno: 6,
      fn: "POS System",
    },
    {
      slno: 7,
      fn: "Takeaway",
    },
    {
      slno: 8,
      fn: "KOT Dashboard",
    },
    {
      slno: 9,
      fn: "Payment Gateway",
    },
    {
      slno: 10,
      fn: "Menus",
    },
  ];
  return (
    <div className=" mx-10 dark:[#000000]  bg-[#FFFFFF] p-2 rounded-xl">
      <div className=" overflow-x-auto ">
        <div className=" w-svw md:w-full">
          <div className=" grid grid-cols-12 bg-[#EEEEEE] py-3 items-center rounded-lg dark:bg-[#35373B] text-black dark:text-white break-all">
            <div className="  col-span-1 justify-center text-center font-semibold">
              SL:No
            </div>
            <div className="  justify-center text-center font-semibold">
              Features
            </div>
          </div>
          {features.map((f) => (
            <div
              key={f.slno}
              className=" grid grid-cols-12 bg-[#F2F2F2] py-3 items-center rounded-lg mt-1 dark:bg-[#202125] break-all"
            >
              <div className=" col-span-1 justify-center text-center font-semibold">
                {f.slno}
              </div>
              <div className=" col-span-2 justify-center ">
                <div>{f.fn}</div>
              </div>

              <div className=" col-span-9 flex justify-end items-center text-center ">
                <div className=" w-[64px] h-[26px] rounded-full text-white bg-black dark:bg-[#FFFFFF] dark:text-[black]">
                  Edit
                </div>
                <div className=" mx-9">
                  <img
                    // src={delet}
                    alt=""
                 
                    className=" w-[22px] h-[22px]"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className=" grid md:grid-cols-12 bg-[#F2F2F2] py-3 items-center rounded-lg mt-1">
            <div className=" col-span-1 justify-center text-center font-semibold"></div>
            <div className=" col-span-4 justify-center ">
              {!inputvisible ? (
                <div className=" flex items-center">
                  <div
                    className=" cursor-pointer "
                    onClick={() => setInputvisible(true)}
                  >
                    <img
                      // src={plus}
                      alt=""
                     
                      className=" w-[18px] h-[18px]"
                    />
                  </div>
                  Add new feature
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Type here"
                  className="input-form flex-1 focus:outline-none h-[34px]  rounded-3xl w-[289px] px-5 bg-[#FFFFFF]"
                />
              )}
            </div>

            <div className=" col-span-7 flex justify-end mr-12 items-center text-center ">
              <div className=" w-[64px] h-[26px] rounded-full text-white bg-black dark:bg-[#FFFFFF] dark:text-[black]">
                Add
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFeatures;