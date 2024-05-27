import React, { useState, useEffect, Fragment } from 'react'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import restaurant from "../../assets/images/Service Bell.png"
import restaurantd from "../../assets/images/Room Service (1).svg"
import items from "../../assets/images/Food.svg"
import employee from "../../assets/images/Users.svg"
import next from "../../assets/images/Next page.svg"
import gridbox from "../../assets/images/Maximize Window.svg"

import add from '../../assets/images/Add (2).svg'
import delete1 from '../../assets/images/delete.svg'

import grid1 from "../../assets/images/grid.svg"
import view from "../../assets/images/view.svg"

import griddark from "../../assets/images/griddark.svg"
import viewdark from "../../assets/images/viewdark.svg"
import { useSelector } from 'react-redux'
import nextwhite from "../../assets/images/nextwhite.svg"
import nextblack from "../../assets/images/nextblack.svg"
import edit from "../../assets/images/Edit.svg";
import viewBlack from "../../assets/images/Group 188.svg";
import GridWhite from "../../assets/images/View Module (2).svg";
import GridBlack from "../../assets/images/View Module (3).svg";
import gridSelect from "../../assets/images/Group 201.svg";

import viewSelectD from "../../assets/images/Group 202.svg";
import viewSelect from "../../assets/images/Group 203.svg";
import box1 from '../../assets/images/box1.png';
import box2 from '../../assets/images/box2.png';
import box3 from '../../assets/images/box3.png';

import { Dialog, Transition } from "@headlessui/react";
import { IRootState } from '../../store'

const Cards = [
    {
        name: ' Total number of branches',
        count: '23',
        img: box1
    }, {
        name: 'Total number of  employees',
        count: '08',
        img: box2
    },
    {
        name: 'Total number of items',
        count: '230',
        img: box3
    }
]

export default function Show() {
    const [deletes, setDelete] = useState(false);
    const [grid, setGrid] = useState(false)
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const [model, setModal] = useState(false);

    const filteredItems = [
        {
            ContactName: 'Ram',
            Address: ' BTM Layout 8th cross',
            City: 'Bangalore',
            Country: 'India',
            Status: '1',

        },
        {
            ContactName: 'Ram',
            Address: ' BTM Layout 8th cross',
            City: 'Bangalore',
            Country: 'India',
            Status: '1',

        },
        {
            ContactName: 'Ram',
            Address: ' BTM Layout 8th cross',
            City: 'Bangalore',
            Country: 'India',
            Status: '1',

        },
        {
            ContactName: 'Ram',
            Address: ' BTM Layout 8th cross',
            City: 'Bangalore',
            Country: 'India',
            Status: '1',

        }
    ]

    const Activities=[
        {
            branch_name:'Seasons (Main Branch)',
            date:'11/05/2024 | 12:23pm',
            message:'Employee added a waiter',
        },
        {
            branch_name:' Branch name : Seasons ( BTM )',
            date:'08/05/2024 | 11:30am',
            message:'Employee Changed manager name',
        },
        {
            branch_name:'Manager removed Employee',
            date:'11/05/2024 | 12:23pm',
            message:' Seasons (Main Branch)',
        },
        {
            branch_name:'Manager removed Employee',
            date:'11/05/2024 | 12:23pm',
            message:' Seasons (Main Branch)',
        },
        {
            branch_name:'Manager removed Employee',
            date:'11/05/2024 | 12:23pm',
            message:' Seasons (Main Branch)',
        }
    ]

    return (
        <div className=' font-robotoLight'>
            <div className='flex justify-end gap-3 mb-5' >

                <div className='flex gap-1 '   >
                    <img src={edit} />
                    <button type="button" className=' text-black dark:text-white font-extrabold text-[15px]' >
                        Edit Restaurant
                    </button>
                </div>
                <div className='flex gap-1' onClick={() => { setModal(true) }}  >
                    <img src={delete1} />
                    <button type="button" className=' text-black dark:text-white whitespace-nowrap font-extrabold text-[15px]' >
                        Delete Restaurant
                    </button>
                </div>
            </div>


            <div className="  grid lg:grid-cols-3 md:grid-cols-2 gap-10">

                {
                    Cards.length ? (
                        Cards.map((card) => {
                            return (
                                <div className="rounded-lg  ">
                                    <div className="dark:bg-black bg-white  rounded-t-3xl rounded-br-3xl  firstbox flex items-center">
                                        <h2 className=" dark:text-white text-black ml-7 font-medium text-xl">
                                            {card.name}
                                        </h2>
                                    </div>
                                    <div className=" flex ">
                                        <div className=" flex-1 dark:text-white text-black dark:bg-black bg-white rounded-b-3xl  secondbox">
                                            <h1 className=" ml-7 font-bold dark:text-white text-black text-4xl">{card.count}</h1>
                                        </div>
                                        <div className=" w-5 h-5 dark:bg-black bg-white  "></div>
                                        <div className=" dark:bg-[#202125] bg-[#f2f2f2]     w-28   flex  justify-center items-center rounded-tl-2xl  -ml-5 -mt-0">
                                            <img
                                                src={card.img}
                                                alt=""
                                               
                                                className=" object-contain  w-12 h-12 "
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : 'No data found'
                }
            </div>

            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <div className=" dark:bg-black bg-white p-3 pl-7 rounded-lg text-white">
                    <div className=" flex">
                        <div className=" dark:bg-[#3D3D3D] bg-[#F2F2F2] rounded-3xl w-56 text-center mb-1 py-1">
                            <h1 className="text-lg font-robotoLight dark:text-white text-black ">
                                Restaurants Details
                            </h1>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Restaurants Name </h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight "> : Seasons Restaurant </p>
                        </div>
                    </div>
                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Contact Name</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight "> : XXXXXX </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Email</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: Seasons12@gmail.com </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Contact Number</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: 9876XXX10 </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Branches</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">
                                : BTM Layout, Whitefield, JP nagar
                            </p>
                        </div>
                    </div>
                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Mode</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: Live</p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Status</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: Active</p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight ">Date Created </h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: 09/11/2015</p>
                        </div>
                    </div>
                </div>



                <div className=" dark:bg-black bg-white p-3 px-7  rounded-lg text-white">


                    <div className=" flex">
                        <div className=" dark:bg-[#3D3D3D] bg-[#F2F2F2]  rounded-3xl w-56 text-center mb-1 py-1">
                            <h1 className="text-lg font-robotoLight dark:text-white text-black ">
                                Recent Activities{" "}
                            </h1>
                        </div>
                    </div>
                    <div className='h-[280px] overflow-auto' >
                    {
                        Activities.length?(
                            Activities.map((activity)=>{
                                return(
                                    <>
                                    <div className="p-2 px-3 dark:bg-[#3D3D3D] bg-[#EEEEEE] text-black dark:text-white rounded-xl mt-2">
                        <h5 className="text-md font-robotoLight ">{activity.message}</h5>
                        {/* <h5 className="text-md font-robotoLight ">
                            Branch name : {activity.branch_name}
                        </h5> */}
                        <h5 className="text-md font-robotoLight ">{activity.date}</h5>
                    </div>
                                    </>
                                )
                            })
                        ):'No Activities Found'
                    }
                    </div>


                </div>
            </div>

            <div className='mt-5 ' >
                <div className='flex justify-between' >
                    <h1 className=' font-robotoLight text-black dark:text-white text-lg' >Branch Details</h1>
                    <div className='flex bg-white px-2 py-1 gap-2 rounded-2xl' >
                        <img className={`${grid == false ? '' : 'w-5'}`} src={grid == false ? viewSelect : viewBlack} alt="" onClick={() => { setGrid(false) }} />
                        <img className={`${grid == true ? '' : 'w-5'}`} src={grid == true ? gridSelect : GridBlack} alt="" onClick={() => { setGrid(true) }} />
                    </div>
                </div>
                {
                    grid == true ? (
                        <div className="mt-2  grid grid-cols-2 gap-5 ">
                            <div className=" bg-white dark:bg-black p-3 pl-7 rounded-lg text-white">
                                <div className=" flex text-center justify-center items-center">
                                    <h1 className="text-lg font-robotoLight dark:text-white text-black">
                                        Restaurants Details{" "}
                                    </h1>
                                </div>

                                <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Restaurants Name </h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight "> : Seasons Restaurant </p>
                        </div>
                    </div>
                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Contact Name</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight "> : XXXXXX </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Email</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: Seasons12@gmail.com </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Contact Number</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: 9876XXX10 </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Branches</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">
                                : BTM Layout, Whitefield, JP nagar
                            </p>
                        </div>
                    </div>
                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Mode</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: Live</p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Status</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: Active</p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight ">Date Created </h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: 09/11/2015</p>
                        </div>
                    </div>
                            </div>
                            <div className=" text-black dark:text-white p-3 pl-7 rounded-lg bg-white dark:bg-black ">
                                <div className=" flex text-center justify-center items-center">
                                    <h1 className="text-lg font-robotoLight text-white ">
                                        Restaurants Details{" "}
                                    </h1>
                                </div>

                                <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Restaurants Name </h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight "> : Seasons Restaurant </p>
                        </div>
                    </div>
                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Contact Name</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight "> : XXXXXX </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Email</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: Seasons12@gmail.com </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Contact Number</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: 9876XXX10 </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Branches</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">
                                : BTM Layout, Whitefield, JP nagar
                            </p>
                        </div>
                    </div>
                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Mode</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: Live</p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Status</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: Active</p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight ">Date Created </h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: 09/11/2015</p>
                        </div>
                    </div>
                            </div>
                            <div className=" bg-white dark:bg-black p-3 pl-7 rounded-lg dark:text-white text-black">
                                <div className=" flex text-center justify-center items-center">
                                    <h1 className="text-lg font-robotoLight text-white ">
                                        Restaurants Details{" "}
                                    </h1>
                                </div>

                                <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Restaurants Name </h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight "> : Seasons Restaurant </p>
                        </div>
                    </div>
                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Contact Name</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight "> : XXXXXX </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Email</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: Seasons12@gmail.com </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Contact Number</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: 9876XXX10 </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Branches</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">
                                : BTM Layout, Whitefield, JP nagar
                            </p>
                        </div>
                    </div>
                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Mode</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: Live</p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Status</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: Active</p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight ">Date Created </h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: 09/11/2015</p>
                        </div>
                    </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="panel dark:bg-black dark:text-white bg-white text-black rounded-xl mt-2"
                        >
                            {filteredItems.length ? (
                                <div className="table-responsive mb-5 p-3 ">
                                    <>
                                        <div className=" dark:bg-[#35373C] bg-[#DDDDDD] text-black dark:text-white grid grid-cols-6 p-2 rounded-lg ">
                                            <div className=" flex items-center justify-center">
                                                <h3>Contact Name</h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <h3>Address</h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <h3>City</h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <h3>Country</h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <h3>Status</h3>
                                            </div>
                                            <div className=" flex items-center justify-center">
                                                <h3>View Details</h3>
                                            </div>
                                        </div>

                                        {filteredItems.map((data:any) => {
                                            return (
                                                <div
                                                    className=" dark:bg-[#202125] bg-[#F2F2F2] dark:text-white text-black grid grid-cols-6 p-2 rounded-lg mt-1"
                                                    key={data.id}
                                                >
                                                    <div className=" flex items-center justify-center">
                                                        <h3> {data.ContactName}</h3>
                                                    </div>
                                                    <div className=" flex items-center justify-center">
                                                        <h3>{data.Address}</h3>
                                                    </div>
                                                    <div className=" flex items-center justify-center">
                                                        <h3>{data.City}</h3>
                                                    </div>
                                                    <div className=" flex items-center justify-center">
                                                        <h3>{data.Country}</h3>
                                                    </div>
                                                    <div className=" flex items-center justify-center">
                                                        <div
                                                            className={`badge text-center w-20 rounded-lg h-6  text-[#12DD00]  ${data.Status == "1"
                                                                    ? "bg-[#FFFFFF] text-[#12DD00] text-center"
                                                                    : "text-[#D10000] bg-[#FFFFFF] text-center"
                                                                }`}
                                                        >
                                                            {data.Status == 1 ? "Active" : "Blocked"}
                                                        </div>
                                                    </div>
                                                    <div className=" flex items-center justify-center">
                                                        <img
                                                            src={themeConfig.theme == 'dark' ? nextwhite : nextblack}
                                                            // src={require("./images/arrow.png")}
                                                            className=" w-5 h-5"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>
                                </div>
                            ) : (
                                <>
                                    <b>No Details Found</b>
                                </>
                            )}
                        </div>
                    )
                }


            </div>

            <Transition appear show={model} as={Fragment}>
                <Dialog as="div" open={model} onClose={() => setModal(false)}>
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
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
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
                                <Dialog.Panel as="div" className="panel border-0 py-8 rounded-xl overflow-hidden w-full max-w-[460px] my-8 text-black dark:text-white  bg-white dark:bg-[#202125]">

                                    <form>



                                        <div className="grid grid-cols-1 gap-2  ">
                                            <div className=" flex justify-center text-center">
                                                <label className=' text-[18px] font-robotoLight font-bold roboto-light' htmlFor="rname"  >
                                                    Are you sure you want to delete this resturaunt?
                                                </label>


                                            </div>
                                        </div>
                                    </form>
                                    <div className="mt-3 flex items-center justify-center gap-4">
                                        <button

                                            type="button"
                                            className=" px-6 p-[3px]  text-[15px] rounded-2xl font-bold  text-black dark:text-white border border-black dark:border-white "
                                            onClick={() => { setModal(false) }}

                                        >
                                            No

                                        </button>
                                        <button
                                            type="button"
                                            className=" px-6 p-[3px] text-[15px] rounded-2xl font-bold  text-black dark:text-white border border-black dark:border-white "

                                        >
                                            Yes

                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
