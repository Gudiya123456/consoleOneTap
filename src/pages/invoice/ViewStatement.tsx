import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import logo from "../../assets/images/onelogo.png";
const ViewStatement = () => {
  const [modal, setModal] = useState(false);
  const invoicec = [
    {
      sl: 1,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 2,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 3,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 4,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 5,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 6,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 7,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 8,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 9,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 10,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 11,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 12,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 13,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 14,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 15,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
    {
      sl: 16,
      Invoiceid: "#54624M",
      dot: "12/05/2024-11:00am",
      perticulars: "UPI/76786855651/UPI YES Bank",
      bname: "BTM Layout",
      amount: "12000",
    },
  ];

  return (
    <div className=" mx-5  font-semibold text-black dark:text-white ">
      <div className=" flex md:justify-start justify-center items-center flex-wrap w-full">
        <div className=" md:flex-1">
          <h1 className=" text-lg font-bold">Invoice Statement</h1>
        </div>
        <div className=" font-semibold flex-wrap text-sm justify-center flex gap-4">
          <div>
            <button
              className="dark:bg-[#000000] bg-[#DDDDDD] w-[211px] h-[39px] rounded-full"
              onClick={() => {
                setModal(true);
              }}
            >
              Email Statement
            </button>
          </div>
          <div>
            <button className="dark:bg-[#000000] bg-[#DDDDDD] w-[211px] h-[39px] rounded-full">
              Download Statement
            </button>
          </div>
        </div>
      </div>
      <div className=" mt-3    bg-[#FFFFFF] px-6 pt-3 rounded-xl">
        <div className=" flex  justify-center">
          <img src={logo} className=" w-[100px] h-[26px]" alt="" />
        </div>
        <div className=" text-center text-[#000000] font-bold font[13px] mt-3">
          <h4>
            Invoice statement Account No:987654321234 for the period of time
            25-04-2024 To 26-04-2024
          </h4>
        </div>

        <div className=" mt-3 px-3">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-[#000000] ">
              <thead className="text-[14px] bg-[#FFFFFF]    font-bold ">
                <tr className="bg-[#FFFFFF]   ">
                  <th className="bg-[#FFFFFF] text-[14px] font-bold text-[#000000]  ltr:text-center border-[1px] border-[#000000]">
                    Sl:NO
                  </th>
                  <th className="bg-[#FFFFFF] text-[14px] text-[#000000]  font-bold  ltr:text-center border-[1px] border-[#000000]">
                    Invoice Id
                  </th>
                  <th className="bg-[#FFFFFF] text-[14px] text-[#000000] font-bold t ltr:text-center border-[1px] border-[#000000]">
                    Date/Time
                  </th>
                  <th className="bg-[#FFFFFF] text-[14px] text-[#000000] font-bold  ltr:text-center border-[1px] border-[#000000]">
                    Particulars
                  </th>
                  <th className="bg-[#FFFFFF] text-[14px] text-[#000000] font-bold  ltr:text-center border-[1px] border-[#000000]">
                    Branch Name
                  </th>
                  <th className="bg-[#FFFFFF] text-[14px] text-[#000000] font-bold  ltr:text-center border-[1px] border-[#000000]">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className=" text-[12px]">
                {invoicec.map((i) => (
                  <tr key={i.sl} className="bg-white  text-[12px]">
                    <th
                      scope="row"
                      className="px-6 py-1 text-[12px]  ltr:text-center border-[1px] border-[#000000]  whitespace-nowrap"
                    >
                      {i.sl}
                    </th>
                    <td className="px-6 py-1  ltr:text-center  text-[12px] border-[1px] border-[#000000]">
                      {i.Invoiceid}
                    </td>
                    <td className="px-6  py-1 text-[12px] border-[1px] border-[#000000]  ltr:text-center">
                      {i.dot}
                    </td>
                    <td className="px-6 py-1 text-[12px] border-[1px] border-[#000000]  ltr:text-center">
                      {i.perticulars}
                    </td>
                    <td className="px-6 py-1 text-[12px] border-[1px] border-[#000000]  ltr:text-center">
                      {i.bname}
                    </td>
                    <td className="px-6 py-1 text-[12px] border-[1px] border-[#000000]  ltr:text-center">
                      {i.amount}
                    </td>
                  </tr>
                ))}
                <tr className=" ">
                  <td
                    colSpan={4}
                    className=" border-b border-b-transparent"
                  ></td>
                  <td className="px-6 py-1 text-[12px]  font-bold border-[1px] border-[#000000]  ltr:text-center">
                    Total Amount
                  </td>
                  <td className="px-6 py-1 text-[12px] font-bold  border-[1px] border-[#000000]  ltr:text-center">
                    19200
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-black text-center mt-3 text-[12px] font-semibold">
              <h3>*****End of Statement*****</h3>
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" open={modal} onClose={() => setModal(true)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div
            className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
            onClick={() => {
              setModal(false);
            }}
          >
            <div className="flex items-center justify-center min-h-screen px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" border-0   overflow-hidden  my-8 text-black dark:text-white ">
                  {/* <div className="  bg-white  dark:bg-[#202125]"> */}
                  <div className=" bg-white px-6 pt-6 pb-[2px] rounded-2xl dark:text-white dark:bg-[#202125] max-w-[360px] font-[400]">
                    <div>
                      <h1 className=" text-[16px] font-bold">Confirm Email</h1>
                    </div>
                    <h1
                      htmlFor=""
                      className=" text-[12px] font-semibold mt-2 -mb-[1px]"
                    >
                      Email ID
                    </h1>
                    <input
                      type="email"
                      name=""
                      id=""
                      className="border-b border-b-[1px]   border-[#636363] w-full focus:outline-none bg-transparent"
                    />
                    <div className=" flex  items-center mt-2">
                      <input type="checkbox" name="" id="" className="" />
                      <h3 className=" ml-1 text-[12px] text-[#7C7C7C]">
                        I confirm that the above Email ID is correct.
                      </h3>
                    </div>
                    <div className="mt-5 font-bold flex items-center justify-end mb-4">
                      <button
                        type="button"
                        className=" w-[91px] h-[25px] rounded-full dark:bg-white dark:text-black bg-[#000000] font-semibold text-white text-[12px] ml-2"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ViewStatement;
