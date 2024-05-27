
// import React, { useState, Fragment } from "react";

// import { Dialog, Transition } from "@headlessui/react";
// import leftarrow from "../../assets/images/leftarrow.png";
// import rupee from "../../assets/images/rupee.png";
// import dirham from "../../assets/images/dirahm.png";
// import pound from "../../assets/images/pound.png";


// const AddPricing = () => {
//   const [modal, setModal] = useState(false);

//   return (
//     <>
//       <div className="">
//         <div className="flex justify-between mb-2">
//           <div
//             className="flex gap-1"
//             onClick={() => {
//               setModal(true);
//             }}
//           >
//             <button
//               type="button"
//               className=" text-black dark:text-white font-extrabold text-[15px]"
//             >
//               openprice
//             </button>
//           </div>
//         </div>
//       </div>

//       <Transition appear show={modal} as={Fragment}>
//         <Dialog as="div" open={modal} onClose={() => setModal(true)}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0" />
//           </Transition.Child>
//           <div
//             className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
//             // onClick={() => {
//             //   setModal(false);
//             // }}
//           >
//             <div className="flex items-center justify-center min-h-screen px-4">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className=" border-0   overflow-hidden  my-8 text-black dark:text-white ">
//                   {/* <div className="  bg-white  dark:bg-[#202125]"> */}
//                   <div className=" bg-white px-7 py-6 rounded-2xl dark:text-white dark:bg-[#202125] w-[924px] font-[400]">
//                     <div className=" flex items-center">
//                       <img
//                         src={leftarrow}
//                         alt=""
//                         srcset=""
//                         className=" object-contain w-[15px] h-[15px] "
//                         onClick={() => {
//                           setModal(false);
//                         }}
//                       />
//                       <h3 className=" font-semibold  text-lg">Add Pricing</h3>
//                     </div>
//                     <div className=" ml-3 mt-3">
//                       <h3 className=" font-semibold  text-lg">Package Name</h3>
//                       <div className=" flex mt-3">
//                         <div className=" flex items-center ml-7">
//                           <input type="checkbox" name="" id="" />
//                           <h4 className=" ml-2">Basic Plan</h4>
//                         </div>
//                         <div className=" flex items-center ml-7">
//                           <input type="checkbox" name="" id="" />
//                           <h4 className=" ml-2">Pro Plan</h4>
//                         </div>
//                       </div>
//                       <div className="  mt-3">
//                         <h3 className=" font-semibold  text-lg">Currency</h3>
//                       </div>
//                       <div className="  mt-2 grid grid-cols-3 gap-5 ml-7">
//                         <div></div>
//                         <div>
//                           <h4 className=" ml-6">Monthly Price</h4>
//                         </div>
//                         <div>
//                           <h4 className=" ml-5">Yearly Price</h4>
//                         </div>
//                       </div>
//                       <div className=" mt-[4px]  grid grid-cols-3 gap-5 ml-7">
//                         <div className=" flex items-center">
//                           <div className=" flex  flex-1 items-center">
//                             <img
//                               src={rupee}
//                               alt=""
//                               srcset=""
//                               className=" w-[22px] h-[22px]"
//                             />
//                             <h4 className=" ml-3">Indian rupee</h4>
//                           </div>

//                           <div className="flex justify-self-end bg-black w-auto mr-3">
//                             <input type="checkbox" name="" id="" />
//                           </div>
//                         </div>
//                         <div className=" flex items-center">
//                           <div className="flex  flex-1 border border-[#D6D6D6] rounded-3xl ml-2 px-[15px] h-[26px] items-center">
//                             <input
//                               type="text"
//                               className=" bg-transparent flex-1 focus:outline-none "
//                             />
//                           </div>
//                         </div>
//                         <div className=" flex items-center">
//                           <div className="flex  flex-1 border border-[#D6D6D6] rounded-3xl ml-2 px-[15px] h-[26px] items-center">
//                             <input
//                               type="text"
//                               className=" bg-transparent flex-1 focus:outline-none "
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="  mt-5 grid grid-cols-3 gap-5 ml-7">
//                         <div></div>
//                         <div>
//                           <h4 className=" ml-6">Monthly Price</h4>
//                         </div>
//                         <div>
//                           <h4 className=" ml-5">Yearly Price</h4>
//                         </div>
//                       </div>
//                       <div className=" mt-[4px]  grid grid-cols-3 gap-5 ml-7">
//                         <div className=" flex items-center">
//                           <div className=" flex  flex-1 items-center">
//                             <img
//                               src={dirham}
//                               alt=""
//                               srcset=""
//                               className=" w-[22px] h-[22px]"
//                             />
//                             <h4 className=" ml-3">Dirham</h4>
//                           </div>

//                           <div className="flex justify-self-end bg-black w-auto mr-3">
//                             <input type="checkbox" name="" id="" />
//                           </div>
//                         </div>
//                         <div className=" flex items-center">
//                           <div className="flex  flex-1 border border-[#D6D6D6] rounded-3xl ml-2 px-[15px] h-[26px] items-center">
//                             <input
//                               type="text"
//                               className=" bg-transparent flex-1 focus:outline-none "
//                             />
//                           </div>
//                         </div>
//                         <div className=" flex items-center">
//                           <div className="flex  flex-1 border border-[#D6D6D6] rounded-3xl ml-2 px-[15px] h-[26px] items-center">
//                             <input
//                               type="text"
//                               className=" bg-transparent flex-1 focus:outline-none "
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="  mt-5 grid grid-cols-3 gap-5 ml-7">
//                         <div></div>
//                         <div>
//                           <h4 className=" ml-6">Monthly Price</h4>
//                         </div>
//                         <div>
//                           <h4 className=" ml-5">Yearly Price</h4>
//                         </div>
//                       </div>
//                       <div className=" mt-[4px]  grid grid-cols-3 gap-5 ml-7">
//                         <div className=" flex items-center">
//                           <div className=" flex  flex-1 items-center">
//                             <img
//                               src={pound}
//                               alt=""
//                               srcset=""
//                               className=" w-[22px] h-[22px]"
//                             />
//                             <h4 className=" ml-3">Pound</h4>
//                           </div>

//                           <div className="flex justify-self-end bg-black w-auto mr-3">
//                             <input type="checkbox" name="" id="" />
//                           </div>
//                         </div>
//                         <div className=" flex items-center">
//                           <div className="flex  flex-1 border border-[#D6D6D6] rounded-3xl ml-2 px-[15px] h-[26px] items-center">
//                             <input
//                               type="text"
//                               className=" bg-transparent flex-1 focus:outline-none "
//                             />
//                           </div>
//                         </div>
//                         <div className=" flex items-center">
//                           <div className="flex  flex-1 border border-[#D6D6D6] rounded-3xl ml-2 px-[15px] h-[26px] items-center">
//                             <input
//                               type="text"
//                               className=" bg-transparent flex-1 focus:outline-none "
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="  mt-3">
//                         <h3 className=" font-semibold  text-lg">Features</h3>
//                         <div className=" mt-3  flex flex-wrap gap-5 ml-7">
//                           <div className=" flex items-center">
//                             <input type="checkbox" name="" id="" />
//                             <h4 className=" ml-2">Live Monitoring</h4>
//                           </div>
//                           <div className=" flex items-center">
//                             <input type="checkbox" name="" id="" />
//                             <h4 className=" ml-2">Customer Support</h4>
//                           </div>
//                           <div className=" flex items-center">
//                             <input type="checkbox" name="" id="" />
//                             <h4 className=" ml-2">Onboarding Setup</h4>
//                           </div>
//                           <div className=" flex items-center">
//                             <input type="checkbox" name="" id="" />
//                             <h4 className=" ml-2">Menu Setup</h4>
//                           </div>
//                           <div className=" flex items-center">
//                             <input type="checkbox" name="" id="" />
//                             <h4 className=" ml-2">POS System</h4>
//                           </div>
//                           <div className=" flex items-center">
//                             <input type="checkbox" name="" id="" />
//                             <h4 className=" ml-2">Order Manager</h4>
//                           </div>
//                           <div className=" flex items-center">
//                             <input type="checkbox" name="" id="" />
//                             <h4 className=" ml-2">Take away</h4>
//                           </div>
//                           <div className=" flex items-center">
//                             <input type="checkbox" name="" id="" />
//                             <h4 className=" ml-2">KOT Dashbaord</h4>
//                           </div>
//                           <div className=" flex items-center">
//                             <input type="checkbox" name="" id="" />
//                             <h4 className=" ml-2">Payment Gateway</h4>
//                           </div>
//                           <div className=" flex items-center">
//                             <input type="checkbox" name="" id="" />
//                             <h4 className=" ml-2">Menus</h4>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-10 flex items-center justify-end mb-5">
//                       <button
//                         type="button"
//                         className="  w-[107px] h-[26px] rounded-full  dark:border-white   border border-black border-solid text-sm"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="button"
//                         className=" w-[107px] h-[26px] rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm ml-2"
//                       >
//                         Add
//                       </button>
//                     </div>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

// export default AddPricing;
import React from 'react'

export default function Support() {
  return (
    <div>Support</div>
  )
}
