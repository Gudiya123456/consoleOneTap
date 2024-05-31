import React from "react";
import { NavLink } from "react-router-dom";

const Invoicesearch = () => {
  return (
    <div className=" px-5">
      <div className=" mt-5 text-lg font-bold">
        <h1>Search by date range</h1>
      </div>
      <div className=" mt-5 text-lg font-bold">
        <h1>Search by branch</h1>
      </div>
      <select name="" id="" className=" mt-3 text-sm px-3 rounded-full ">
        <option value="" selected disabled>
          Choose Branch
        </option>
      </select>
      <div className=" mt-5 text-lg font-bold">Search by month</div>
      <div className=" mt-3 ml-9 text-sm flex flex-wrap lg:gap-10 gap-2 md:gap-5">
        <div className=" flex items-center gap-1">
          <input type="radio" name="month" id="" />
          <label htmlFor="">Last Month</label>
        </div>
        <div className=" flex items-center gap-1">
          <input type="radio" name="month" id="" />
          <label htmlFor="">Last 3 Month</label>
        </div>
        <div className=" flex items-center gap-1">
          <input type="radio" name="month" id="" />
          <label htmlFor="">Last 6 Month</label>
        </div>
        <div className=" flex items-center gap-1">
          <input type="radio" name="month" id="" />
          <label htmlFor="">Last financial year</label>
        </div>
      </div>

      <div className=" flex flex-wrap justify-center mt-4 md:mt-12 gap-5">
        <NavLink to='/invoice/view/statement'>
        <button className=" w-[211px] h-[35px] flex justify-center items-center bg-[#ffffff] rounded-full">
          View Statement
        </button>
        </NavLink>
        <NavLink to='/invoice/email' >
        <button className=" w-[211px] h-[35px] flex justify-center items-center bg-[#ffffff] rounded-full">
          Email Statement
        </button>
        </NavLink>
       
       <NavLink to='/invoice/download' >
       <button className=" w-[211px] h-[35px] flex justify-center items-center bg-[#ffffff] rounded-full">
          Download Statement
        </button>
       </NavLink>
       
      </div>
    </div>
  );
};

export default Invoicesearch;