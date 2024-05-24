import React, { useState, Fragment } from "react";

import user from "../../assets/images/user1.png";
import { Dialog, Transition } from "@headlessui/react";
import pen from "../../assets/images/pen.png";
import email from "../../assets/images/email.png";
import phone from "../../assets/images/phone.png";
import wpen from "../../assets/images/wpen.png";
import wemail from "../../assets/images/wemail.png";
import wphone from "../../assets/images/wphone.png";


// import { HiMiniBuildingStorefront } from "react-icons/hi2";
// import { IoCloseCircle } from "react-icons/io5";
// import { useSelector } from "react-redux";
// import { IRootState } from "../../../store";

const Restaurants = () => {
  //   const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  const [modal, setModal] = useState(false);
  //   const [cardsData, setCardsData] = useState([
  //     {
  //       id: 1,
  //       name: "Pizza Hut ",
  //       img: one,
  //       price: 600,
  //     },

  //     {
  //       id: 3,
  //       name: "ThalaKappati",
  //       img: two,
  //       price: 200,
  //     },
  //     {
  //       id: 4,
  //       name: " A2B ",
  //       img: three,
  //       price: 150,
  //     },
  //     {
  //       id: 5,
  //       name: "KFC",
  //       img: four,
  //       price: 600,
  //     },
  //   ]);

  return (
    <>
      <div className="">
        <div className="flex justify-between mb-2">
          <div></div>
          <div
            className="flex gap-1"
            onClick={() => {
              setModal(true);
            }}
          >
            {/* <img src={themeConfig.theme == "dark" ? PlusDark : Plus} /> */}
            <button
              type="button"
              className=" text-black dark:text-white font-extrabold text-[15px]"
            >
              Add Restaurant
            </button>
          </div>
        </div>
        {/* <div className="">
          <div className="grid grid-cols-3 xl:grid-cols-4 gap-5">
            {cardsData.map((note: any) => {
              return (
                <div key={note.id}>
                  <NavLink to="/dashboard/restaurant/view">
                    <div className=" bg-white dark:bg-[#202125] h-[150px] max-w-[334px] rounded-xl relative">
                      <img
                        // src={note.img}
                        alt=""
                        className="bg-cover bg-center bg-no-repeat  h-[150px] w-[334px] relative   rounded-xl"
                      />
                      <div className="absolute bottom-0 px-2 py-2 bg-gray-500/10 w-full">
                        <h1 className="text-white font-extrabold  text-md">
                          {note.name}
                        </h1>
                      </div>
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div> */}
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
                <Dialog.Panel className="panel border-0   overflow-hidden  my-8 text-black dark:text-white-dark ">
                  {/* <div className="  bg-white  dark:bg-[#202125]"> */}
                  <div className=" dark:bg-[#202125] bg-white text-black px-9 rounded-2xl w-[421px] pt-6 pb-5 dark:text-white font-[500]">
                    <h5 className="text-lg font-bold  ">Profile Details</h5>

                    <form>
                      <div className="ml-1 ">
                        <div className=" mt-2 ">
                          <label
                            className="text-style roboto-light  text-[16px] font-semibold ml-12"
                            htmlFor="status"
                          >
                            Profile Name
                          </label>
                          <div className="flex items-center">
                            <div>
                              <img
                                src={user}
                                alt=""
                                srcset=""
                                className=" object-contain w-[29px] h-[29px]"
                              />
                            </div>
                            <div className="flex  flex-1 border border-black rounded-3xl ml-2 px-[15px] h-[36px] items-center">
                              <input
                                type="text"
                                className="input-form flex-1 focus:outline-none pr-[5px]"
                              />
                              <img
                                src={pen}
                                alt=""
                                srcset=""
                                className=" object-contain w-4 "
                              />
                              <img
                                src={wpen}
                                alt=""
                                srcset=""
                                className=" object-contain w-4 "
                              />
                            </div>
                          </div>
                        </div>

                        <div className=" mt-2">
                          <label
                            className="text-style roboto-light  text-[16px] font-semibold ml-12"
                            htmlFor="status"
                          >
                            Contact Number
                          </label>
                          <div className="flex items-center">
                            <div>
                              <img
                                src={phone}
                                alt=""
                                srcset=""
                                className=" object-contain w-[29px] h-[29px]"
                              />
                              <img
                                src={wphone}
                                alt=""
                                srcset=""
                                className=" object-contain w-[29px] h-[29px]"
                              />
                            </div>
                            <div className="flex  flex-1 border border-black rounded-3xl ml-2 px-[15px] h-[36px] items-center">
                              <input
                                type="text"
                                className="input-form flex-1 focus:outline-none pr-[5px]"
                              />
                              <img
                                src={pen}
                                alt=""
                                srcset=""
                                className=" object-contain w-4 "
                              />
                              <img
                                src={wpen}
                                alt=""
                                srcset=""
                                className=" object-contain w-4 "
                              />
                            </div>
                          </div>
                        </div>
                        <div className=" mt-2">
                          <label
                            className="text-style roboto-light  text-[16px] font-semibold ml-12"
                            htmlFor="status"
                          >
                            Email Address
                          </label>
                          <div className="flex items-center">
                            <div>
                              <img
                                src={email}
                                alt=""
                                srcset=""
                                className=" object-contain w-[29px] h-[29px] "
                              />
                              <img
                                src={wemail}
                                alt=""
                                srcset=""
                                className=" object-contain w-[29px] h-[29px] "
                              />
                            </div>
                            <div className="flex  flex-1 border border-black rounded-3xl ml-2 px-[15px] h-[36px] items-center">
                              <input
                                type="text"
                                className="input-form flex-1 focus:outline-none pr-[5px]"
                              />
                              <img
                                src={pen}
                                alt=""
                                srcset=""
                                className=" object-contain w-4 "
                              />
                              <img
                                src={wpen}
                                alt=""
                                srcset=""
                                className=" object-contain w-4 "
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="mt-5 flex items-center justify-end">
                      <button
                        type="button"
                        className="btn  btn-dark btn-sm w-[86px] h-[31px] rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Restaurants;

// import React, { useState, Fragment, useEffect } from "react";

// import { Dialog, Transition } from "@headlessui/react";
// import { Radio } from "@material-tailwind/react";
// import darkview from "../../assets/images/darkview.png"
// import view from "../../assets/images/view.png"
// import { useSelector } from "react-redux";
// import { IRootState } from "../store";
// import jj from "../../assets/images/view.png"
// import { t } from "i18next";
// import PlusDark from '../../assets/images/PlusDark.svg'
// import Plus from '../../assets/images/Plus (1).svg'
// import leftarrow from '../../assets/images/leftarrow.png'
// import leftDark from '../../assets/images/Chevron Left (1).svg'


// const Authorization = () => {
//     //   const themeConfig = useSelector((state: IRootState) => state.themeConfig);
//     const [modal, setModal] = useState(false);
//     const [permissionmodal, setpermissionModal] = useState(false);
//     const [status, setStatus] = useState("");
//     const themeConfig = useSelector((state: IRootState) => state.themeConfig);

//     const filteredItems = [
//         {
//             Slno: 1,
//             Name: "Pradeep",
//             Email: "abc@efgh.ijk",
//             role: "super admin",
//             phone: "9038949996",
//             Status: "1",
//         },
//         {
//             Slno: 2,
//             Name: "Pradeep",
//             Email: "abc@efgh.ijk",
//             role: "super admin",
//             phone: "9038949996",
//             Status: "1",
//         },
//         {
//             Slno: 3,
//             Name: "Pradeep",
//             Email: "abc@efgh.ijk",
//             role: "super admin",
//             phone: "9038949996",
//             Status: "0",
//         },
//     ];
//     return (
//         <>
//             <div className=""></div>
//             <div className='flex justify-between mb-2'>

//                 <div>
//                 </div>
//                 <div className='flex gap-1' onClick={() => { setModal(true) }}  >
//                     <img src={themeConfig.theme == 'dark' ? PlusDark : Plus} />
//                     <button type="button" className=' text-black dark:text-white font-extrabold text-[15px]' >
//                         Add Authoriation
//                     </button>
//                 </div>

//             </div>
//             <div className="panel p-0 dark:bg-black dark:text-white bg-white text-black rounded-xl mt-2">
//                 {filteredItems.length ? (
//                     <div className="table-responsive mb-5 p-3 ">
//                         <>
//                             <div className=" dark:bg-[#202125] bg-[#DDDDDD] text-black dark:text-white grid grid-cols-8 p-2 rounded-lg">
//                                 <div className=" flex items-center justify-center">
//                                     <h3>Sl.No</h3>
//                                 </div>
//                                 <div className=" flex items-center justify-center">
//                                     <h3>Name</h3>
//                                 </div>
//                                 <div className=" flex items-center justify-center">
//                                     <h3>Email</h3>
//                                 </div>
//                                 <div className=" flex items-center justify-center">
//                                     <h3>Role</h3>
//                                 </div>
//                                 <div className=" flex items-center justify-center">
//                                     <h3>Phone</h3>
//                                 </div>
//                                 <div className=" flex items-center justify-center">
//                                     <h3>Status</h3>
//                                 </div>
//                                 <div className=" flex items-center justify-center">
//                                     <h3>Permission</h3>
//                                 </div>
//                                 <div className=" flex items-center justify-center">
//                                     <h3>Action</h3>
//                                 </div>
//                             </div>

//                             {filteredItems.map((data, index) => {
//                                 return (
//                                     <div
//                                         className=" dark:bg-[#202125] bg-[#F2F2F2] dark:text-white text-black grid grid-cols-8 p-2 rounded-lg mt-1"
//                                         key={data.Slno}
//                                     >
//                                         <div className=" flex items-center justify-center">
//                                             <h3> {data.Slno}</h3>
//                                         </div>
//                                         <div className=" flex items-center justify-center">
//                                             <h3>{data.Name}</h3>
//                                         </div>
//                                         <div className=" flex items-center justify-center">
//                                             <h3>{data.Email}</h3>
//                                         </div>
//                                         <div className=" flex items-center justify-center">
//                                             <h3>{data.role}</h3>
//                                         </div>
//                                         <div className=" flex items-center justify-center">
//                                             <h3>{data.phone}</h3>
//                                         </div>
//                                         <div className=" flex items-center justify-center">
//                                             <div
//                                                 className={`badge text-center w-20 rounded-lg h-6 text-[#12DD00] ${data.Status == "1"
//                                                         ? " dark:bg-[#000000] bg-[#FFFFFF] text-[#12DD00] text-center"
//                                                         : "text-[#FF0000] bg-[#FFFFFF] dark:bg-[#000000] text-center"
//                                                     }`}
//                                             >
//                                                 {data.Status == 1 ? "Active" : "Blocked"}
//                                             </div>
//                                         </div>
//                                         <div className=" flex items-center justify-center " onClick={()=>{setpermissionModal(true)}}>
//                                             <img
//                                                 src={themeConfig.theme == 'dark' ? darkview : view}
//                                                 alt=""
//                                                 srcset=""
//                                                 className=" object-contain w-4 h-4 cursor-pointer"
//                                             />

//                                         </div>
//                                         <div className=" flex items-center justify-center">
//                                             <button className=" w-[56px] h-[26px] bg-[#DDDDDD] rounded-2xl text-[#000000] dark:bg-[#000000] dark:text-[#FFFFFF]">
//                                                 Edit
//                                             </button>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </>
//                     </div>
//                 ) : (
//                     <>
//                         <b>No Details Found</b>
//                     </>
//                 )}
//             </div>
//             <Transition appear show={permissionmodal} as={Fragment}>
//                 <Dialog
//                     as="div"
//                     open={permissionmodal}
//                     onClose={() => setpermissionModal(true)}
//                 >
//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0"
//                         enterTo="opacity-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                     >
//                         <div className="fixed inset-0" />
//                     </Transition.Child>
//                     <div
//                         className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
//                         onClick={() => {
//                             setpermissionModal(false);
//                         }}
//                     >
//                         <div className="flex items-center justify-center min-h-screen px-4">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0 scale-95"
//                                 enterTo="opacity-100 scale-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100 scale-100"
//                                 leaveTo="opacity-0 scale-95"
//                             >
//                                 <Dialog.Panel className=" border-0   overflow-hidden  my-8 text-black dark:text-white ">
//                                     {/* <div className="  bg-white  dark:bg-[#202125]"> */}
//                                     <div className=" bg-white dark:bg-[#202125] p-4 px-6 rounded-2xl w-[595px]">
//                                         <div className=" flex items-center">
//                                             <img
//                                             onClick={()=>{setpermissionModal(false)}}
//                                                 src={ themeConfig.theme=='dark'? leftDark: leftarrow}
//                                                 alt=""
//                                                 srcset=""
//                                                 className=" object-contain w-4 h-4 "
//                                             />
//                                             <h3 className=" font-bold dark:text-white text-lg">
//                                                 Permissions
//                                             </h3>
//                                         </div>

//                                         <div className=" dark:bg-[#121212] bg-[#DDDDDD] text-black dark:text-white grid grid-cols-5  rounded-lg mt-2 h-[28px]">
//                                             <div className=" flex items-center justify-center">
//                                                 <h3 className=" font-bold dark:text-white text-sm">
//                                                     Name
//                                                 </h3>
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <h3 className=" font-bold dark:text-white text-sm">
//                                                     View
//                                                 </h3>
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <h3 className=" font-bold dark:text-white text-sm">
//                                                     Create
//                                                 </h3>
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <h3 className=" font-bold dark:text-white text-sm">
//                                                     Edit
//                                                 </h3>
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <h3 className=" font-bold dark:text-white text-sm">
//                                                     Delete
//                                                 </h3>
//                                             </div>
//                                         </div>
//                                         <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
//                                             <div className=" flex items-center ml-2">
//                                                 <h3>Profile</h3>
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" class="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                         </div>
//                                         <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
//                                             <div className=" flex items-center ml-2">
//                                                 <h3>Restaurant</h3>
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                         </div>
//                                         <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
//                                             <div className=" flex items-center ml-2">
//                                                 <h3 className="">Authorization</h3>
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                         </div>
//                                         <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
//                                             <div className=" flex items-center ml-2">
//                                                 <h3>Payments</h3>
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                         </div>
//                                         <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
//                                             <div className=" flex items-center ml-2">
//                                                 <h3>Pricing</h3>
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                         </div>
//                                         <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
//                                             <div className=" flex items-center ml-2">
//                                                 <h3>Invoice</h3>
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center"></div>
//                                             <div className=" flex items-center justify-center"></div>
//                                             <div className=" flex items-center justify-center"></div>
//                                         </div>
//                                         <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white  grid grid-cols-5  rounded-lg mt-1 h-[44px]">
//                                             <div className=" flex items-center ml-2">
//                                                 <h3>Billing</h3>
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center"></div>
//                                             <div className=" flex items-center justify-center"></div>
//                                             <div className=" flex items-center justify-center"></div>
//                                         </div>
//                                         <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
//                                             <div className=" flex items-center ml-2">
//                                                 <h3>Settings</h3>
//                                             </div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center"></div>
//                                             <div className=" flex items-center justify-center">
//                                                 <input type="checkbox" name="" id="" />
//                                             </div>
//                                             <div className=" flex items-center justify-center"></div>
//                                         </div>
//                                         <div className="mt-4 flex items-center justify-end">
//                                             <button
//                                                 type="button"
//                                                 className="btn  btn-dark btn-sm w-[85px] h-[28px] rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm"
//                                             >
//                                                 Save
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </Dialog.Panel>
//                             </Transition.Child>
//                         </div>
//                     </div>
//                 </Dialog>
//             </Transition>

//             <Transition appear show={modal} as={Fragment}>
//                 <Dialog as="div" open={modal} onClose={() => setModal(true)}>
//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0"
//                         enterTo="opacity-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                     >
//                         <div className="fixed inset-0" />
//                     </Transition.Child>
//                     <div
//                         className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
//                         onClick={() => {
//                             setModal(false);
//                         }}
//                     >
//                         <div className="flex items-center justify-center min-h-screen px-4">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0 scale-95"
//                                 enterTo="opacity-100 scale-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100 scale-100"
//                                 leaveTo="opacity-0 scale-95"
//                             >
//                                 <Dialog.Panel className=" border-0   overflow-hidden  my-8 text-black dark:text-white-dark ">
//                                     {/* <div className="  bg-white  dark:bg-[#202125]"> */}
//                                     <div className=" dark:bg-[#202125]  w-[600px] bg-[#FFFFFF] text-black dark:text-white p-4 px-6 rounded-2xl ">
//                                         <div className=" flex items-center">
//                                             <img
//                                                 src={themeConfig.theme=='dark'?leftDark:leftarrow}
//                                                 alt=""
//                                                 srcset=""
//                                                 className=" object-contain w-4 h-4"
//                                             />
//                                             <h3 className=" font-bold dark:text-white text-xl">
//                                                 Add Authorization
//                                             </h3>
//                                         </div>

//                                         <form>
//                                             <div className=" grid grid-cols-2 gap-2">
//                                                 <div className=" mt-2">
//                                                     <label
//                                                         className="text-style roboto-light ml-2"
//                                                         htmlFor="status"
//                                                     >
//                                                         Name
//                                                     </label>
//                                                     <div className="flex items-center border border-[#101012] dark:border-white rounded-3xl">
//                                                         <div className="flex    px-[10px] py-[2px] items-center">
//                                                             <input
//                                                                 type="text"
//                                                                 className=" dark:bg-transparent  focus:outline-none "
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className=" mt-2">
//                                                     <label
//                                                         className="text-style roboto-light ml-2"
//                                                         htmlFor="status"
//                                                     >
//                                                         Email
//                                                     </label>
//                                                     <div className="flex items-center border border-[#101012] dark:border-white rounded-3xl">
//                                                         <div className="flex  flex-1   px-[10px] py-[2px] items-center">
//                                                             <input
//                                                                 type="text"
//                                                                 className="flex-1 focus:outline-none dark:bg-transparent "
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className=" grid grid-cols-2 gap-5">
//                                                 <div className=" mt-2">
//                                                     <label
//                                                         className="text-style roboto-light ml-2"
//                                                         htmlFor="status"
//                                                     >
//                                                         Contact
//                                                     </label>
//                                                     <div className="flex items-center border border-[#101012] dark:border-white rounded-3xl">
//                                                         <div className="flex  flex-1   px-[10px] py-[2px] items-center">
//                                                             <input
//                                                                 type="text"
//                                                                 className=" flex-1 focus:outline-none  dark:bg-transparent"
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className=" mt-2">
//                                                     <label
//                                                         className="text-style roboto-light ml-2"
//                                                         htmlFor="status"
//                                                     >
//                                                         Role
//                                                     </label>
//                                                     <div className="flex items-center border border-[#101012] dark:border-white rounded-3xl">
//                                                         <div className="flex  flex-1   px-[10px] py-[2px] items-center">
//                                                             <input
//                                                                 type="text"
//                                                                 className=" flex-1 border-none focus:outline-none dark:bg-transparent "
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className=" mt-2 ml-2">
//                                                 <h5 className="text-style roboto-light ">Status</h5>
//                                                 <div className="flex mt-1">
//                                                     <div className=" flex items-center">
//                                                         <div
//                                                             className=" border border-[#12DD00] w-[20px] h-[20px] rounded-full flex justify-center items-center"
//                                                             onClick={() => setStatus("active")}
//                                                         >
//                                                             <div
//                                                                 style={{
//                                                                     display: status == "active" ? "flex" : "none",
//                                                                 }}
//                                                                 className=" bg-[#12DD00] w-[14px] h-[14px] rounded-full "
//                                                             ></div>
//                                                         </div>
//                                                         <div className=" ml-1 text-[#12DD00]">Active</div>
//                                                     </div>
//                                                     <div className=" flex items-center ml-3">
//                                                         <div
//                                                             className=" border border-[#FF0000] w-[20px] h-[20px] rounded-full flex justify-center items-center"
//                                                             onClick={() => setStatus("disable")}
//                                                         >
//                                                             <div
//                                                                 style={{
//                                                                     display:
//                                                                         status == "disable" ? "flex" : "none",
//                                                                 }}
//                                                                 className=" bg-[#FF0000] w-[14px] h-[14px] rounded-full"
//                                                             ></div>
//                                                         </div>
//                                                         <div className=" ml-1 text-[#FF0000]">Disable</div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </form>
//                                         <div className="mt-4 flex items-center justify-end">
//                                             <button
//                                                 type="button"
//                                                 className="btn  btn-dark btn-sm  py-0 rounded-full border border-black dark:border-white     text-sm mr-2"
//                                                 onClick={() => setModal(false)}
//                                             >
//                                                 Cancel
//                                             </button>
//                                             <button
//                                                 type="button"
//                                                 className="btn  btn-dark btn-sm  py-0 rounded-full border border-black dark:bg-white dark:text-black     text-sm mr-2"
//                                                 onClick={() => setModal(false)}
//                                             >
//                                                 Add
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </Dialog.Panel>
//                             </Transition.Child>
//                         </div>
//                     </div>
//                 </Dialog>
//             </Transition>
//         </>
//     );
// };

// export default Authorization;
