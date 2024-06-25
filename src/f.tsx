
import React, { Fragment, useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import {  useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaBowlRice, FaFish } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Dialog, Transition } from '@headlessui/react';
import IconPlus from "../components/Icon/IconPlus";
import { AiOutlineClose } from 'react-icons/ai';
import Select from 'react-select';
import { IoIosRadioButtonOff } from "react-icons/io";
import { IoMdInformationCircle } from "react-icons/io";
import IconMinus from "../components/Icon/IconMinus";
import IconShoppingBag from "../components/Icon/IconShoppingBag";


// import Footer from "./Footer";
import Swal from 'sweetalert2';
import Header from "./scan&order/Header";
import Footer from "./scan&order/Footer";

// real funct

import { useSearchParams,useLocation, Navigate, useNavigate } from 'react-router-dom'
import axios from "axios";
// import { IRootState } from "../../../console/store";
import { IRootState } from "../store";



const Index = () => {


    // started with api  integration

    const[isLoading, setIsLoading]=useState(true);

    // get value of url
    const query = new URLSearchParams(location.search);
    const table = query.get('table')
    console.log('table url',table)

    const navigate=useNavigate();
    const[isTableExits, setIsTableExist]=useState();

    // check if table exist or not

    useEffect(()=>{
       if (table) checkTableExist();
    },[table])

    const checkTableExist=async()=>{
        setIsLoading(true);
        try {

            const response=await axios({
                method:'post',
                url:window.location.origin+'/api/restaurant/customers/check-table',
                data:{table_code:table},
                headers:{
                    'Content-Type':'application/json',
                    // Authorization:'Bearer'+table
                },
            });

            console.log('table exit or not',response.data)
            setIsTableExist(response.data.action)

            if(response.data.status=='success'){
                navigate('/login');
            }

        } catch (error) {
            console.log(error)

        }
        finally{
            setIsLoading(false);
        }

    }
    const customerToken = useSelector((state: IRootState) => state.themeConfig.customerToken);

    const[categories,setCategories]=useState<any>([]);
    const[subCategories, setSubCategories]=useState<any>([]);
    const[filteredSubCategories, setFilteredSubCategories]=useState<any>([]);
    const[allItems,setAllItems]=useState<any>([]);
    const[filteredItems, setFilteredItems]=useState([]);
    const[all,setAll]=useState<any>([]);


useEffect(()=>{
    fetchHomeData();
},[])
    const fetchHomeData= async()=>{
        setIsLoading(true);
        try {
            const response=await axios({
                method:'get',
                url:window.location.origin+"/api/restaurant/customers/home-data",

                headers:{
                    'Content-Type':'application/json',
                    'current-order':11710999412,
                    Authorization: `Bearer ${customerToken}`
                }
            });
            console.log(response.data);
            if(response.data.status=='success'){
                setCategories(response.data.categories)
                setSubCategories(response.data.subcategories)
                setAllItems(response.data.items)
                setAll(response.data);


            }

        } catch (error) {

        }
    }












    const sliders = [
        {
            url: 'https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672452/NetflixApp/pizza_osjb4f.jpg',
        },
        {
            url: './assets/food/banner1.jpg',
        },
        {
            url: './assets/food/banner3.jpg',
        },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlider = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? sliders.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nexSlider = () => {
        const isLastSlide = currentIndex === sliders.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const [codeArr, setCodeArr] = useState<string[]>([]);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };



    const [counter, setCounter] = useState(0);

    const incrementCounter = () => {
        setCounter(counter + 1);
    };

    const decrementCounter = () => {
        if (counter !== 0) {
            setCounter(counter - 1);
        }
    };

    const [model, setModel] = useState(false);
    const [incDecValue, setIncDecValue] = useState<any>(0);
    const [model3, setModel3] = useState(false);

    const showAlert = async (type: number) => {
        if (type === 15) {
            const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
            toast.fire({
                icon: 'success',
                title: 'Added to cart successfully',
                padding: '10px 20px',
            });
            setModel(false);
        }
    }
const[type,setType]=useState('');
const[currentCategory, setCurrentCategory]=useState(0);
const[currentSubCategory, setCurrentSubCategory]=useState(0);

useEffect(()=>{
    filterData();
    // console.log('type',type)

},[type,currentCategory])

useEffect(()=>{
if(currentSubCategory) {
    setFilteredItems(allItems.filter((item)=>{
        return item.sub_category_id==currentSubCategory
    }))
}
},[currentSubCategory])

    const filterData=()=>{
        if(!currentCategory) setFilteredSubCategories(subCategories)
        else {
            setFilteredSubCategories(subCategories.filter(subcategory=>currentCategory==subcategory.category_id));
    }
    }


    return (
        <>
        {
        // isLoading ? 'load':
           !isTableExits ? (

                <div className="bg-white py-1.5 px-2 ">

                {/* header  */}
                <Header/>

                {/* slider show  */}
                <div className="max-w-[1520px] h-[250px] w-full  relative group">
                    <div className="w-full h-full rounded-2xl bg-center bg-cover duration-500" style={{ backgroundImage: `url(${sliders[currentIndex].url})` }}></div>
                    <div className=" absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-1 bg-orange-700 text-white cursor-pointer">
                        <BsChevronCompactLeft onClick={prevSlider} size={20} />
                    </div>
                    <div className="group-hover absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-1 bg-orange-700 text-white cursor-pointer">
                        <BsChevronCompactRight onClick={nexSlider} size={20} />
                    </div>
                </div>

                {/* search  */}

                <div className="relative   w-full flex gap-10 mt-5">


                    <div className=" w-full flex gap-2 rounded-3xl  ">
                        <div className=" w-30 sm:w-full  md:w-full sm:items-center md:items-center sm:justify-center md:justify-center flex m-auto  p-2  border border-green-700 rounded-3xl  ">
                            <button type="submit" className="text-green-700 mr-1  ">

                                <FaBowlRice />
                            </button>
                            <div
                                className="   focus:shadow-[0_0_5px_2px_rgb(194_213_255_/_62%)] dark:shadow-[#1b2e4b] placeholder:tracking-wider   text-green-700 "
                            >
                                veg
                            </div>
                        </div>

                        <div className=" w-30 sm:w-full md:w-full sm:items-center md:items-center sm:justify-center flex m-auto  p-2  border border-red-500 rounded-3xl  ">
                            <button type="submit" className="text-red-500 mr-1  ">

                                <FaFish />
                            </button>
                            <div
                                className=" focus:shadow-[0_0_5px_2px_rgb(194_213_255_/_62%)] dark:shadow-[#1b2e4b] placeholder:tracking-wider   text-red-500 "

                            >
                                nonveg
                            </div>
                        </div>
                    </div>


                    <div className=" w-full flex m-auto items-center  p-2 bg-gray-100  border border-grey-200 rounded-3xl  ">
                        <button type="submit" className="text-[#909ffa]  mr-1   ">

                            <FaSearch />
                        </button>
                        <input type="text" placeholder="Search "
                            className=" w-full h-3 border border-none  outline-0   bg-gray-100 "

                        />


                    </div>

                </div>



                {/* //swiperrr  */}



                <div className="max-w-[1520px] px-4 ">
                    <div className="lg:col-span-2 py-4">
                        <div className="swiper" id="slider5">
                            <div className="swiper-wrapper">
                                <Swiper
                                    // modules={[Navigation, Pagination]}

                                    breakpoints={{
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween: 30,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 40,
                                        },
                                        350: {
                                            slidesPerView: 2,
                                            spaceBetween: 150,
                                        },
                                        450: {
                                            slidesPerView: 2,
                                            spaceBetween: 10,
                                        },

                                    }}

                                >

<SwiperSlide>
                                                <button

                                                onClick={()=>{setCurrentCategory(0)}}
                                                className=' shadow-xl dark:bg-[#909ffa] hover:bg-[#909ffa] w-[240px] dark:text-white hover:text-white text-black p-1  m-auto border hover:border-[#909ffa] dark:border-[#909ffa] border-grey-100 rounded'
                                                >
                                        <div className="font-semibold text-sm ">All</div>
                                                </button>
                                            </SwiperSlide>
                                    {categories.map((item, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <button

                                                onClick={()=>{setCurrentCategory(item.id)}}
                                                className=' shadow-xl dark:bg-[#909ffa] hover:bg-[#909ffa] w-[240px] dark:text-white hover:text-white text-black p-1  m-auto border hover:border-[#909ffa] dark:border-[#909ffa] border-grey-100 rounded'
                                                >
                                        <div className="font-semibold text-sm ">{item.category_name}</div>
                                                </button>
                                            </SwiperSlide>
                                        );
                                    })}
                                    {/* {categories.map((item, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <button
                                                    className=' bg-white-200 shadow-xl dark:bg-[#909ffa] hover:bg-[#909ffa] w-[240px] dark:text-white hover:text-white text-black p-1  m-auto border hover:border-[#909ffa] dark:border-[#909ffa] border-grey-100 rounded'
                                                onClick={()=>{alert(99)}}
                                                >
                                                    <div className="font-bold">{item.category_name}</div>
                                                </button>
                                            </SwiperSlide>
                                        );
                                    })} */}

                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>


                {
                    filteredSubCategories.map((item)=>{
                        return(
                            <>
                            <div className="relative border-b border-y-zinc-600   w-full  flex mt-2 inline-block text-left">
                    <div className="w-full  flex justify-between">
                        <button type="button" onClick={() => {
                            // setCurrentSubCategory(item.id);
                            toggleCode('code1')
                        }} className="inline-flex  w-full justify-between justify-left gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-bold  text-black shadow-sm  hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                            {item.sub_category_name}
                            <svg className="-mr-1 h-5 w-5 text-black-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>



                </div>
                {codeArr.includes('code1') && (
                    <>
                        <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:gris-cols-4 gap-6 mt-2">
                            {filteredItems.map((item) => (
                                <div className="flex items-center hover:scale-105 duration-300" key={item.id}>
                                    <div className="h-full w-full shadow-[4px_6px_10px_-3px_#bfc9d4] border border-white-light dark:border-0 dark:bg-secondary-dark-light dark:shadow-none rounded-2xl">
                                        <div className="text-black">
                                            <div className="flex">
                                                <div className="overflow-hidden mx-auto rounded-lg">
                                                    <img src={item.image} alt={item.name} className=" h-full object-cover w-[120px]" />
                                                </div>
                                                <div className="flex-1 ltr:pl-4 rtl:pr-4 py-1 px-2">
                                                    <div className="flex gap-2" >
                                                        <h5 className="text-dark text-[15px] font-bold mb-1 mt-3">{item. item_name}</h5>
                                                        <IoMdInformationCircle className=" text-dark text-[15px] font-bold mb-1 mt-3" onClick={() => { setModel3(true) }} />
                                                    </div>

                                                    <p className=" text-dark text-[12px]">Lorem, ipsum dolor sit amet consectetur adipisicing elit..</p>



                                                    <div className="flex justify-between">
                                                        <p className="flex items-center font-bold text-dark py-1 text-[18px]">{item.price}</p>
                                                        <button className="bg-orange-700 text-white btn gap-2 items-center px-2 py-1 rounded-full shadow-[4px_6px_10px_-3px_#bfc9d4]" onClick={() => setModel(true)}>
                                                            <IconShoppingBag />
                                                             Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                            </>
                        )
                    })
                   }








                {/*  add to cart modal  */}

                <Transition appear show={model} as={Fragment}>
                    <Dialog as="div" open={model} onClose={() => setModel(false)}>
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div id="standard_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-2">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-2 text-black dark:text-white-dark">
                                        <div className="flex">
                                            <div className="overflow-hidden mx-auto">
                                                <img src="./assets/food/cheese_pizza.jpg" alt="pizza" className="w-full object-cover rounded-xl" />
                                            </div>
                                            <AiOutlineClose onClick={() => setModel(false)} size={20} className="absolute right-4 text-[10px] cursor-pointer" />
                                            <div className="flex-1 ltr:pl-4 rtl:pr-4 py-1 px-2">
                                                {/* <h5 className="text-dark text-[18px] font-bold mb-1">Pepper Steak with Onions</h5> */}
                                                <div className="flex gap-2" >
                                                    <h5 className="text-dark text-[15px] font-bold mb-1 mt-3">Pepper Steak Onions</h5>
                                                    <IoMdInformationCircle className=" text-dark text-[15px] font-bold mb-1 mt-3" onClick={() => { setModel3(true) }} />
                                                </div>
                                                <p className=" text-dark text-[12px]">
                                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti praesentium ratione id ex tempore rerum accusantium tempora itaque!
                                                </p>

                                                <p className="flex items-center font-bold text-dark py-1 text-[20px]">₹300</p>
                                            </div>
                                        </div>
                                        <div className="my-4">
                                            <div className="mb-5 flex gap-2 ">
                                                <h3 className="font-semibold text-lg dark:text-white-light text-[16px]">Quantity:</h3>
                                                <div className="inline-flex  indec-group items-center px-2 py-1 rounded-xl bg-[#f1f2f3] shadow-[4px_6px_10px_-3px_#bfc9d4]">
                                                    <button
                                                        type="button"
                                                        className="border border-red-500 flex font-semibold items-center justify-center rounded-full rtl:rounded-r-md"
                                                        onClick={() => setIncDecValue(incDecValue > 0 ? incDecValue - 1 : 0)}
                                                    >
                                                        <IconMinus className="w-4 h-4 border-red-500 text-orange-700" />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        placeholder="55"
                                                        className="border-0 form-input p-0 rounded-none text-center bg-[#f1f2f3]"
                                                        min="0"
                                                        max="25"
                                                        readOnly
                                                        value={incDecValue}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="border border-red-500 flex font-semibold items-center justify-center rounded-full rtl:rounded-r-md"
                                                        onClick={() => setIncDecValue(incDecValue < 100 ? incDecValue + 1 : 100)}
                                                    >
                                                        <IconPlus className="w-4 h-4 border-red-500 text-orange-700" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <label htmlFor="ctnTextarea" className="text-[14px] mt-15 text-black mt-4">
                                                Steak Size
                                            </label>
                                            <Select defaultValue={options[0]} options={options} isSearchable={false} />

                                        </div> */}

                                        {/* <div>
                                            <label htmlFor="ctnTextarea" className="text-[14px] mt-15 text-black mt-4">
                                                Steak Temperature
                                            </label>
                                            <Select defaultValue={options2[0]} options={options2} isSearchable={false} />

                                        </div> */}

                                        <div>

                                            <label htmlFor="ctnTextarea" className="text-[14px] mt-15 text-black mt-4">
                                                Size
                                            </label>
                                            <ul className="grid grid-cols-2 sm:grid-col-3 w-full gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">

                                                <li>
                                                    <input type="radio" id="hosting-big1" name="hosting" value="hosting-big" className="hidden peer" />
                                                    <label htmlFor="hosting-big1" className="inline-flex p-1 items-center gap-5 w-full text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600  hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                        <div className="ml-2">
                                                            <IoIosRadioButtonOff />

                                                        </div>


                                                        <div className="block">
                                                            <div className="w-full text-sm font-semibold">Regular </div>
                                                            <div className="w-full">pcs.. </div>
                                                        </div>

                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="radio" id="hosting-big" name="hosting" value="hosting-big" className="hidden peer" />
                                                    <label htmlFor="hosting-big" className="inline-flex p-1 items-center gap-5 w-full text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600  hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                        <div className="ml-2">
                                                            <IoIosRadioButtonOff />

                                                        </div>


                                                        <div className="block">
                                                            <div className="w-full text-sm font-semibold">Big-12</div>
                                                            <div className="w-full">+₹100 </div>
                                                        </div>

                                                    </label>
                                                </li>

                                            </ul>
                                        </div>


                                        <div className="max-w-[1520px] ">
                                            <label htmlFor="ctnTextarea" className="text-[14px] text-black">
                                                Addon
                                            </label>
                                            <div className="lg:col-span-2 py-4">
                                                <div className="swiper" id="slider5">
                                                    <div className="swiper-wrapper">
                                                        <Swiper
                                                            // modules={[Navigation, Pagination]}

                                                            breakpoints={{
                                                                1024: {
                                                                    slidesPerView: 2,
                                                                    spaceBetween: 30,
                                                                },
                                                                // 768: {
                                                                //     slidesPerView: 3,
                                                                //     spaceBetween: 40,
                                                                // },
                                                                350: {
                                                                    slidesPerView: 1,
                                                                    spaceBetween: 20,
                                                                },
                                                                370: {
                                                                    slidesPerView: 2,
                                                                    spaceBetween: 20,
                                                                },

                                                            }}

                                                        >
                                                            {filteredItems.map((item, i) => {
                                                                return (
                                                                    <SwiperSlide key={i}>
                                                                        <ul className="">
                                                                            <li>
                                                                                <input type="checkbox" id="react-option" value="" className="hidden peer" required />
                                                                                <label htmlFor="react-option" className="inline-flex items-center justify-between w-full  bg-[#f7f7fc] text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 peer-checked:bg-[#dceaff] hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                                                    <div className="block">
                                                                                        {/* <div onClick={() => { isFocused ? 'hhjj' : 'kkk' }} className="grid md:grid-cols-2 sm:grid-cols-1 lg:gris-cols-4 gap-6 mt-0 mb-2"> */}
                                                                                        {filteredItems.map((item) => (
                                                                                            <div className="flex items-center hover:scale-105 duration-300" key={item.id}>
                                                                                                <div className="h-full w-full  border border-none dark:border-0 dark:bg-secondary-dark-light dark:shadow-none rounded-2xl">
                                                                                                    <div className="text-black-light">
                                                                                                        <div className="flex">
                                                                                                            <div className=" overflow-hidden mx-auto rounded-lg">
                                                                                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                                                                            </div>
                                                                                                            <div className=" ltr:pl-4 rtl:pr-4 py-1 px-2 text-nowrap">
                                                                                                                <h5 className="text-dark text-sm font-bold  mt-1">{item.name}</h5>
                                                                                                                {/* <div className="flex gap-2" >
                                                                                                                <h5 className="text-dark text-[15px] font-bold mb-1 mt-3">{item.name}</h5>
                                                                                                                 <IoMdInformationCircle className=" text-dark text-[15px] font-bold mb-1 mt-3" onClick={()=>{setModel3(true)}} />
                                                                                                                 </div> */}

                                                                                                                <p className="flex items-center font-bold text-dark text-[18px]">{item.price}</p>

                                                                                                                <div className=" flex justify-between text-right   text-dark py-1 text-[18px]">

                                                                                                                    <div className="flex justify-between gap-2 rounded-full bg-orange-700" >

                                                                                                                        <button className="p-1  text-white"
                                                                                                                            onClick={() => decrementCounter()}
                                                                                                                        >-


                                                                                                                        </button>
                                                                                                                        <p className="flex items-center  text-white py-1 text-[18px]">{counter}</p>

                                                                                                                        <button className="p-1 text-white"
                                                                                                                            onClick={() => { incrementCounter() }}
                                                                                                                        >+
                                                                                                                        </button>
                                                                                                                    </div>
                                                                                                                </div>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </label>
                                                                            </li>


                                                                        </ul>
                                                                    </SwiperSlide>
                                                                );
                                                            })}
                                                            {filteredItems.map((item, i) => {
                                                                return (
                                                                    <SwiperSlide key={i}>
                                                                        <ul className="">
                                                                            <li>
                                                                                <input type="checkbox" id="react-option2" value="" className="hidden peer" required />
                                                                                <label htmlFor="react-option2" className="inline-flex items-center justify-between w-full  bg-[#f7f7fc] text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 peer-checked:bg-[#dceaff] hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                                                    <div className="block">
                                                                                        {filteredItems.map((item) => (
                                                                                            <div className="flex items-center hover:scale-105 duration-300" key={item.id}>
                                                                                                <div className="h-full w-full  border border-none dark:border-0 dark:bg-secondary-dark-light dark:shadow-none rounded-2xl">
                                                                                                    <div className="text-black-light">
                                                                                                        <div className="flex">
                                                                                                            <div className="overflow-hidden mx-auto rounded-lg">
                                                                                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                                                                            </div>
                                                                                                            <div className=" ltr:pl-4 rtl:pr-4 py-1 px-2 text-nowrap">
                                                                                                                <h5 className="text-dark text-[15px] font-bold  mt-1">{item.name}</h5>

                                                                                                                <p className="flex items-center font-bold text-dark text-[18px]">{item.price}</p>

                                                                                                                <div className=" flex justify-between text-right   text-dark py-1 text-[18px]">
                                                                                                                    <div></div>
                                                                                                                    <div className="flex justify-between gap-2 rounded-full bg-orange-700" >

                                                                                                                        <button className="p-1  text-white"
                                                                                                                            onClick={() => decrementCounter()}
                                                                                                                        >-


                                                                                                                        </button>
                                                                                                                        <p className="flex items-center  text-white py-1 text-[18px]">{counter}</p>

                                                                                                                        <button className="p-1 text-white"
                                                                                                                            onClick={() => { incrementCounter() }}
                                                                                                                        >+
                                                                                                                        </button>
                                                                                                                    </div>
                                                                                                                </div>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </label>
                                                                            </li>


                                                                        </ul>
                                                                    </SwiperSlide>
                                                                );
                                                            })}
                                                            {filteredItems.map((item, i) => {
                                                                return (
                                                                    <SwiperSlide key={i}>
                                                                        <ul className="">
                                                                            <li>
                                                                                <input type="checkbox" id="react-option3" value="" className="hidden peer" required />
                                                                                <label htmlFor="react-option3" className="inline-flex items-center justify-between w-full  bg-[#f7f7fc] text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 peer-checked:bg-[#dceaff] hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                                                    <div className="block">
                                                                                        {filteredItems.map((item) => (
                                                                                            <div className="flex items-center hover:scale-105 duration-300" key={item.id}>
                                                                                                <div className="h-full w-full  border border-none dark:border-0 dark:bg-secondary-dark-light dark:shadow-none rounded-2xl">
                                                                                                    <div className="text-black-light">
                                                                                                        <div className="flex">
                                                                                                            <div className="overflow-hidden mx-auto rounded-lg">
                                                                                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                                                                            </div>
                                                                                                            <div className=" ltr:pl-4 rtl:pr-4 py-1 px-2 text-nowrap">
                                                                                                                <h5 className="text-dark text-[15px] font-bold  mt-1">{item.name}</h5>

                                                                                                                <p className="flex items-center font-bold text-dark text-[18px]">{item.price}</p>

                                                                                                                <div className=" flex justify-between text-right   text-dark py-1 text-[18px]">
                                                                                                                    <div></div>
                                                                                                                    <div className="flex justify-between gap-2 rounded-full bg-orange-700" >

                                                                                                                        <button className="p-1  text-white"
                                                                                                                            onClick={() => decrementCounter()}
                                                                                                                        >-


                                                                                                                        </button>
                                                                                                                        <p className="flex items-center  text-white py-1 text-[18px]">{counter}</p>

                                                                                                                        <button className="p-1 text-white"
                                                                                                                            onClick={() => { incrementCounter() }}
                                                                                                                        >+
                                                                                                                        </button>
                                                                                                                    </div>
                                                                                                                </div>

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </label>
                                                                            </li>


                                                                        </ul>
                                                                    </SwiperSlide>
                                                                );
                                                            })}
                                                        </Swiper>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <form className="space-y-5">
                                            <div>
                                                <label htmlFor="ctnTextarea" className="text-[14px] text-black">
                                                    Special Instruction
                                                </label>
                                                <textarea id="ctnTextarea" rows={2} className="form-textarea text-[12px]" placeholder="Add Note (extra mayo,cheese,etc)" required></textarea>
                                            </div>
                                        </form>

                                        <div>
                                            <div className="mt-8 flex items-center justify-center">
                                                <button
                                                    className="items-center py-2 rounded-full btn gap-2 bg-orange-600 px-3 shadow-[4px_6px_10px_-3px_#bfc9d4] w-[300px] text-white h-12"
                                                onClick={() => showAlert(15)}
                                                >
                                                    <IconShoppingBag /> Add To cart
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>



                {/* product info modal  */}
                <Transition appear show={model3} as={Fragment}>
                    <Dialog as="div" open={model3} onClose={() => setModel3(false)}>
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel as="div" className="panel p-3 my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                        <AiOutlineClose onClick={() => setModel3(false)} size={20} className="absolute right-4 text-[10px] cursor-pointer" />
                                        <div className="font-bold" >Cheese Pizza</div>



                                        <div className="flex items-center justify-center mb-5 mt-2" onClick={() => setModel3(true)} >
                                            <h1>LMIV - Allergen - i). Contains cereals and products thereof containing gluten. ii). Wheat.</h1>
                                        </div>





                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>


                {/* footer  */}
                <Footer/>
                </div>
            ):'Please rescan the qr code'
        }


        </>
    );
};

export default Index;
