import React, { useRef } from "react";
import { ReactSortable } from "react-sortablejs";
import { RiPencilFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import IconUserPlus from "../../components/Icon/IconUserPlus";
import IconSearch from "../../components/Icon/IconSearch";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import IconX from "../../components/Icon/IconX";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { IRootState } from "../../store/index";
import { setPageTitle } from "../../store/themeConfigSlice";
import Swal from "sweetalert2";
import PageLoader from '../../components/PageLoader'
import { IoCloseCircle } from "react-icons/io5";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import withReactContent from 'sweetalert2-react-content';
import { FaLink } from "react-icons/fa";

import one from '../../assets/images/restaurant/img1.jpeg'
import two from '../../assets/images/restaurant/img2.jpeg'
import three from '../../assets/images/restaurant/img3.jpg'
import four from '../../assets/images/restaurant/img4.jpeg'
import add from '../../assets/images/Add.svg'
import fabicon from '../../assets/images/fabicon.svg'
import Add1 from '../../assets/images/Add (1).svg'
import PlusDark from '../../assets/images/PlusDark.svg'
import Plus from '../../assets/images/Plus (1).svg'

import arrow from '../../assets/images/arrow.svg'
import arrowLight from '../../assets/images/Back To.svg'
const CrmSwal = withReactContent(Swal);

import { FaUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { LiaPhoneSquareSolid } from "react-icons/lia";


const Restaurant = () => {
    const navigate = useNavigate();
    const [resList, setResList] = useState<any>([]);
    const [timeZones, setTimeZones] = useState([])
    const dispatch = useDispatch();
    const crmToken = useSelector(
        (state: IRootState) => state.themeConfig.crmToken
    );

    console.log(crmToken)
    const [isLoading, setIsLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [status, setStatus] = useState("");
    const [status1, setStatus1] = useState("");
    const[modal,setModal]=useState(false);
    useEffect(() => {
        dispatch(setPageTitle("Restaurant"));
    }, []);

    const filteredItems=[

      {
        'restaurant_name':'KFC',
        'id':'1'
      },
      {
        'restaurant_name':'Pizza Hut',
        'id':'1'
      },
      {
        'restaurant_name':'Thalasery',
        'id':'1'
      }

    ]

    return (
        <div>

        
                    <div className="">
                        <div className='flex justify-between mb-2'>

                            <div>

                            </div>
                            <div className='flex gap-1' onClick={() => { setModal(true) }}  >
                                <img src={themeConfig.theme == 'dark' ? PlusDark : Plus} />
                                <button type="button" className=' text-black dark:text-white font-extrabold text-[15px]' >
                                    Add Restaurant
                                </button>
                            </div>

                        </div>

                        
                          
                                {filteredItems.length ? (
                                    <div className=" grid grid-cols-3  gap-5" >
                                        {filteredItems.map((restaurant:any) => (
                                           <div
                                           key={restaurant.id}>
                                           <NavLink to='/restaurant/view'  >
                                               <div className="  dark:bg-[#202125] bg-[linear-gradient(to_bottom,rgba(0,0,0,0)53%,rgba(0,2,0.8)95%),url(/restaurant/kot/images/auth/img2.jpeg)] bg-cover  h-[170px]   rounded-xl relative">
                                                   {/* <img src={one} alt="" className='bg-cover   bg-center bg-no-repeat saturate-20  h-[160px] w-[500px] relative   rounded-xl' /> */}
                                                   <div className="absolute bottom-0 px-2 py-2   w-full">
                                                       <h1 className="text-white font-extrabold  text-md">{restaurant.restaurant_name}</h1>
                                                   </div>
                                               </div>
                                           </NavLink>
                                       </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>No Restaurant Available</div>
                                )}
                           
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
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border border-[#F2F2F2] p-0 rounded-2xl overflow-hidden w-full max-w-5xl my-8 text-black dark:text-white-dark">
                                    <div className="  bg-white px-10 pb-5 pt-8 dark:bg-[#202125]">
                                        <div className='flex gap-2 ' >
                                            <img src={themeConfig.theme == 'dark' ? arrow : arrowLight} className='w-5' alt="" onClick={() => { setModal(false) }} />
                                            <h5 className="text-lg font-bold dark:text-white ">
                                                Add Restaurant
                                            </h5>
                                        </div>

                                    </div>
                                    <div className="px-10 pb-5 dark:bg-[#202125] bg-white">
                                        <form>



                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 gap-x-5">

                                                <div className="">
                                                    <label className='text-style roboto-light' htmlFor="rname"  >
                                                        Restaurant Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"


                                                    />

                                                </div>

                                                <div className="">
                                                    <label className='text-style roboto-light' htmlFor="subdomain">
                                                        Subdomain Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent "

                                                    />


                                                </div>

                                                <div className="">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                        Branch Names
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                                    />

                                                </div>



                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="name">
                                                        Branch Manager Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                                    />

                                                </div>


                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="phone">
                                                        Email Id
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                                    />

                                                </div>

                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                        Contact Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                                    />

                                                </div>
                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                        Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                                    />

                                                </div>

                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                        Area
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                                    />

                                                </div>
                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                        City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                                    />

                                                </div>

                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                        State
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                                    />

                                                </div>

                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                        Country
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                                    />

                                                </div>

                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                        Pincode
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                                    />

                                                </div>

                                                <div className="mb-1">
                                                    <label htmlFor="name" className='text-style roboto-light'>
                                                        Timezone
                                                    </label>

                                                    <select className="input-form  dark:border-[#5E5E5E] dark:bg-transparent text-white-dark" >
                                                        {/* <option value=''></option> */}
                                                        {/* <option value=''>Select Timezone</option> */}


                                                    </select>

                                                </div>

                                                {/* <div className="mb-1">
                                                        <label className='text-style roboto-light' htmlFor="status">Mode</label>
                                                        <div className="mt-3">
                                                            <label className="inline-flex">
                                                                <input type="radio" name="mode" value="1"  className="form-radio text-success peer" />
                                                                <span className="peer-checked:text-success " >Live</span>
                                                            </label>
                                                            <label className="inline-flex px-5">
                                                                <input type="radio" name="mode" value="0"  className="form-radio text-secondary peer text-style" />
                                                                <span className="peer-checked:text-secondary ">Demo</span>
                                                            </label>
                                                        </div>
                                                </div> */}
                                                <div className=" mt-2 ml-2">
                                                    <h5 className="text-style roboto-light ">Mode</h5>
                                                    <div className="flex mt-1">
                                                        <div className=" flex items-center">
                                                            <div
                                                                className=" border border-[#12DD00] w-[20px] h-[20px] rounded-full flex justify-center items-center"
                                                                onClick={() => setStatus1("active")}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display: status1 == "active" ? "flex" : "none",
                                                                    }}
                                                                    className=" bg-[#12DD00] w-[14px] h-[14px] rounded-full "
                                                                ></div>
                                                            </div>
                                                            <div className=" ml-1 text-[#12DD00]">Live</div>
                                                        </div>
                                                        <div className=" flex items-center ml-3">
                                                            <div
                                                                className=" border border-[#FF0000] w-[20px] h-[20px] rounded-full flex justify-center items-center"
                                                                onClick={() => setStatus1("disable")}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            status1 == "disable" ? "flex" : "none",
                                                                    }}
                                                                    className=" bg-[#FF0000] w-[14px] h-[14px] rounded-full"
                                                                ></div>
                                                            </div>
                                                            <div className=" ml-1 text-[#FF0000]">Demo</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className=" mt-2 ml-2">
                                                    <h5 className="text-style roboto-light ">Status</h5>
                                                    <div className="flex mt-1">
                                                        <div className=" flex items-center">
                                                            <div
                                                                className=" border border-[#12DD00] w-[20px] h-[20px] rounded-full flex justify-center items-center"
                                                                onClick={() => setStatus("active")}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display: status == "active" ? "flex" : "none",
                                                                    }}
                                                                    className=" bg-[#12DD00] w-[14px] h-[14px] rounded-full "
                                                                ></div>
                                                            </div>
                                                            <div className=" ml-1 text-[#12DD00]">Active</div>
                                                        </div>
                                                        <div className=" flex items-center ml-3">
                                                            <div
                                                                className=" border border-[#FF0000] w-[20px] h-[20px] rounded-full flex justify-center items-center"
                                                                onClick={() => setStatus("disable")}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            status == "disable" ? "flex" : "none",
                                                                    }}
                                                                    className=" bg-[#FF0000] w-[14px] h-[14px] rounded-full"
                                                                ></div>
                                                            </div>
                                                            <div className=" ml-1 text-[#FF0000]">Disable</div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="grid grid-cols-7 mt-7  gap-2">






                                                <div className="mb-5 mt-2">
                                                    <input name="fav_icon" type="file" className="input-form hidden" accept="image/*" />
                                                    <span className="w-full h-20 relative flex gap-1">
                                                        <img src={themeConfig.theme == 'dark' ? PlusDark : Add1} className='w-8' />
                                                        <img className="w-20 h-20 rounded  overflow-hidden object-cover" src={fabicon} id="fav_icon" alt="fav_icon" />
                                                    </span>
                                                </div>


                                                <div className="mb-5 mt-2 ">
                                                    <input name="fav_icon" type="file" className="input-form hidden" accept="image/*" />
                                                    <span className="w-full h-20 relative flex gap-1">
                                                        <img src={themeConfig.theme == 'dark' ? PlusDark : Add1} className='w-8' />
                                                        <img className="w-20 h-20 rounded  overflow-hidden object-cover" src={fabicon} id="fav_icon" alt="fav_icon" />
                                                    </span>
                                                </div>

                                            </div>


                                        </form>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button
                                                type="button"
                                                className="btn  btn-dark btn-sm px-10 rounded-2xl dark:bg-white dark:text-black "

                                            >
                                                Add Restaurant

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

export default Restaurant;
