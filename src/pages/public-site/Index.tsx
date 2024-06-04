import React from "react";
import logo from "../../assets/images/onelogo.png";
import { IoIosArrowDown } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
export default function Index() {
  return (
    <div className=" dark:text-white">
      <div>
        <h1 className=" font-[600] text-[20px]">General Settings</h1>
      </div>
      <div className=" flex gap-5 xl:gap-10 flex-wrap ml-2 mt-3 items-center">
        <div>
          <label
            htmlFor=""
            className=" text-[15px] font-[400] leading-[14px] ml-2"
          >
            Name
          </label>
          <input
            type="text"
            name=""
            id=""
            placeholder=" Enter Name here "
            className=" bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] rounded-full text-[12px] font-[500]  border-[#4E4E4E] w-[301px] h-[30px] px-2"
          />
        </div>
        <div className=" ">
          <h3 className="text-[15px] font-[400] mb-[3px]">Logo Light mode :</h3>
          <div className=" w-[119px] h-[40px] bg-[#ECECEC] flex justify-center dark:bg-[#D9D9D9] items-center rounded-[2px]">
            <img src={logo} alt="" className=" w-[100px] h-[26px]" />
          </div>
          <h5 className=" text-[8px] font-[500]">Dimension ( 100X26)</h5>
        </div>
        <div className=" ">
          <h3 className="text-[15px] font-[400] mb-[3px]">Logo Dark mode :</h3>
          <div className=" w-[119px] h-[40px] dark:bg-[#D9D9D9] bg-[#ECECEC] flex justify-center items-center rounded-[2px]">
            <img src={logo} alt="" className=" w-[100px] h-[26px]" />
          </div>
          <h5 className=" text-[8px] font-[500]">Dimension ( 100X26)</h5>
        </div>
        <div>
          <h3 className="text-[15px] font-[400] mb-[3px]">Favicon :</h3>
          <div className=" w-[119px] h-[40px] bg-[#ECECEC] dark:bg-[#D9D9D9] flex justify-center items-center rounded-[2px]">
            {/* <img src={logo} alt="" className=" w-[32px] h-[32px]" /> */}
          </div>
          <h5 className=" text-[8px] font-[500]">Dimension ( 32X32)</h5>
        </div>
      </div>
      <div className=" flex flex-wrap ml-2 gap-5 lg:gap-10 mt-3">
        <div>
          <h3 className="text-[15px] font-[400] mb-[3px]">Console mode</h3>
          <div className="relative  inline-block mt-[2px]  font-[400] text-[13px] justify-center">
            <select className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] border-[#4E4E4E]  appearance-none min-w-[117px] h-[30px]    pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline">
              <option selected disabled>
                Live
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
              <IoIosArrowDown size={17} className=" dark:text-white" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-[15px] font-[400] mb-[3px]">Restaurant mode</h3>
          <div className="relative  inline-block mt-[2px]  font-[400] text-[13px] justify-center">
            <select className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] border-[#4E4E4E]  appearance-none min-w-[117px] h-[30px]    pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline">
              <option selected disabled>
                Live
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
              <IoIosArrowDown size={17} className=" dark:text-white" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-[15px] font-[400] mb-[3px]">Public site mode</h3>
          <div className="relative  inline-block mt-[2px]  font-[400] text-[13px] justify-center">
            <select className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] border-[#4E4E4E]  appearance-none min-w-[117px] h-[30px]    pl-3 rounded-full  pr-6   leading-tight focus:outline-none focus:shadow-outline">
              <option selected disabled>
                Live
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
              <IoIosArrowDown size={17} className=" dark:text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-5">
        <h1 className=" font-[600] text-[20px] mb-2">Contact Details</h1>
        <div className=" 2xl:w-3/4 mt-3 grid md:grid-cols-2 xl:grid-cols-3 ml-2 gap-4">
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Facebook
            </label>
            <div className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Facebook URL "
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              LinkedIn
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter LinkedIn URL "
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              X
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] rounded-full dark:bg-[#202125] border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter X URL "
                className=" text-[12px] font-[500]  bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Instagram
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] rounded-full dark:bg-[#202125] border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Instagram URL "
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Pinterest
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Pinterest URL "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Youtube
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Youtube URL "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className=" ml-4 mt-6 flex flex-wrap gap-8">
        <div>
          <div className=" flex items-center mt-5">
            <input
              type="radio"
              name="status"
              className=" form-radio border-black dark:border-white w-4 h-4 text-black peer"
            />

            <span className="text-[16px] font-[400]">India</span>
          </div>

          <div className=" flex mt-4 items-center">
            <input
              type="radio"
              name="status"
              className=" form-radio border-black dark:border-white w-4 h-4 text-black peer"
            />

            <span className="text-[16px] font-[400]">UAE</span>
          </div>
          <div className=" flex mt-4 items-center">
            <input
              type="radio"
              name="status"
              className=" form-radio border-black dark:border-white   w-4 h-4 text-black peer"
            />

            <span className="text-[16px] font-[400]">USA</span>
          </div>
        </div>
        <div>
          <div className=" flex gap-6 flex-wrap">
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Email
              </label>
              <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder=" Enter Email"
                  className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Alternative Email
              </label>
              <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=" Enter  Alternative Email "
                  className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
          </div>
          <div className=" flex flex-wrap gap-6 mt-4">
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Phone
              </label>
              <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=" Enter Phone Number "
                  className=" text-[12px] font-[500]  bg-transparent flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Alternative Phone
              </label>
              <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=" Enter  Alternative Phone "
                  className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
          </div>
          <div className=" flex gap-6 mt-4">
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Whatsapp
              </label>
              <div className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=" Enter  Whatsapp  Number "
                  className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-6">
        <h1 className=" font-[600] text-[20px] mb-2">Email Settings</h1>
        <div className=" mt-3 2xl:w-3/4 grid md:grid-cols-2 xl:grid-cols-3 ml-2 gap-4">
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              User Name
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter User Name "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Password
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] rounded-full dark:bg-[#202125] border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Password "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Port
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Port "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Encryption
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Encryption "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Mailer
            </label>
            <div className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Mailer"
                className=" text-[12px] font-[500]  bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Name
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Name "
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Address
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Address"
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// import { Link } from 'react-router-dom';
// import { Tab } from '@headlessui/react';
// import React, { Fragment, useEffect, useState } from 'react';
// import CodeHighlight from '../../components/Highlight';
// import { useDispatch, useSelector } from 'react-redux';
// import { setPageTitle } from '../../store/themeConfigSlice';
// import IconBell from '../../components/Icon/IconBell';
// import IconCode from '../../components/Icon/IconCode';
// import IconHome from '../../components/Icon/IconHome';
// import IconUser from '../../components/Icon/IconUser';
// import IconPhone from '../../components/Icon/IconPhone';
// import IconInfoCircle from '../../components/Icon/IconInfoCircle';
// import IconSettings from '../../components/Icon/IconSettings';
// import rozorpay from "../../assets/images/rozorpay.png";
// import gpay from "../../assets/images/gpay.png";
// import stripe from "../../assets/images/stripe.png";
// import paypal from "../../assets/images/paypal.png";
// import phonepe from "../../assets/images/phonepay.png";
// import amazon from "../../assets/images/amazon.png";
// import axios from 'axios';
// import { IRootState } from '../../store';
// import Swal from 'sweetalert2';
// import { IoIosArrowDown } from 'react-icons/io';
// const Tabs = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(setPageTitle('Payment'));
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   const [paymentGateways, setPaymentGateways] = useState([]);
//   const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
//   useEffect(() => {
//     fetchPaymentGteWay();
//   }, [])
//   const fetchPaymentGteWay = async () => {
//     setIsLoading(true)
//     try {
//       const response = await axios({
//         method: 'get',
//         url: "https://cdn.onetapdine.com/api/payment-gateways",
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer ' + crmToken,
//         },
//       });
//       console.log(response.data.paymentGateways)

//       if (response.data.status == "success") {
//         setPaymentGateways(response.data.paymentGateways)
//       }
//     } catch (error) {

//       alert("errror")

//     } finally {
//       setIsLoading(false)
//     }

//   }

//   const [gateWay, setGateWay] = useState({});
//   const [enabledGateay, setEnabledGateway] = useState('');
//   const [razorPay, setRazorPay] = useState<any>('');
//   const [stripe, setStripe] = useState<any>('');
//   const [paytm, setPaytm] = useState<any>('');
//   const [phonePe, setPhonePe] = useState<any>('');
//   const [payPal, setPayPal] = useState<any>('');
//   const [amazonPay, setAmazonPay] = useState<any>('');
//   const [googlePay, setGooglePay] = useState<any>('');


//   useEffect(() => {
//     const z = paymentGateways.find((p: any) => p.is_enabled == true);
//     if (z) setEnabledGateway(z.gateway_name)
//     const a = paymentGateways.find((p: any) => p.gateway_name == "razorpay");
//     setRazorPay(a ? a : { gateway_name: "razorpay", environment: '0', is_enabled: '0' })
//     const b = paymentGateways.find((p: any) => p.gateway_name == "stripe");
//     setStripe(b ? b : { gateway_name: "stripe", environment: '0', is_enabled: '0' })
//     const c = paymentGateways.find((p: any) => p.gateway_name == "paytm");
//     setPaytm(c ? c : { gateway_name: "paytm", environment: '0', is_enabled: '0' })
//     const d = paymentGateways.find((p: any) => p.gateway_name == "phonepay");
//     setPhonePe(d ? d : { gateway_name: "phonepay", environment: '0', is_enabled: '0' })
//     const e = paymentGateways.find((p: any) => p.gateway_name == "paypal");
//     setPayPal(e ? e : { gateway_name: "paypal", environment: '0', is_enabled: '0' })

//     const g = paymentGateways.find((p: any) => p.gateway_name == "googlepay");
//     setGooglePay(g ? g : { gateway_name: "googlepay", environment: '0', is_enabled: '0' })
//     const f = paymentGateways.find((p: any) => p.gateway_name == "amazon");
//     setAmazonPay(f ? f : { gateway_name: "amazon", environment: '0', is_enabled: '0' })
//     console.log(razorPay)
//     console.log(stripe)
//     console.log(paytm)
//     console.log(phonePe)
//     console.log(amazonPay)

//   }, [paymentGateways])


//   const storeOrUpdateApi = async (data) => {

//     try {

//       const response = await axios({
//         method: 'post',
//         url: "https://cdn.onetapdine.com/api/payment-gateways",
//         data,
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer ' + crmToken,
//         },
//       });
//       console.log('jdkjkgffgf')

//       if (response.data.status == "success") {
//         setPaymentGateways(response.data.paymentGateways)
//         Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });
//       }

//     } catch (error) {
//       console.log(error)

//     } finally {


//     }
//   }
//   const [errors, setErros] = useState<any>({});

//   const validate = (gateWay) => {
//     setErros({});
//     let errors = {};
//     // if (!gateWay.gateway_name) errors = { ...errors, gateway_name: "payment gateway name is required" };
//     if (gateWay.environment == '') errors = { ...errors, environment: "environment is required" };
//     if (!gateWay.key) errors = { ...errors, key: "key is required" };
//     if (!gateWay.secret) errors = { ...errors, secret: "secret is required" };
//     setErros(errors);

//     console.log(errors)
//     return { totalErrors: Object.keys(errors).length };
//   };
//   const configPaymentGateWay = async (a) => {

//     console.log(razorPay)
//     setGateWay(a.gateway_name)
//     const isValid = validate(a);
//     if (isValid.totalErrors) return false;
//     const data = new FormData();
//     data.append("gateway_name", a.gateway_name);
//     data.append("environment", a.environment);
//     data.append("secret", a.secret);
//     data.append("key", a.key);
//     data.append("is_enabled", a.is_enabled);
//     storeOrUpdateApi(data);
//   }


//   return (
//     <div>
//       <div className="space-y-8 pt-5">

//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">

//           {/* Vertical Pills */}
//           <div className="" id="vertical_pills">
//             <div className="mb-5 flex items-center justify-between">
//               <h5 className="text-lg font-semibold dark:text-white-light">Payment Gateway</h5>

//             </div>
//             <div className="mb-5 flex flex-col sm:flex-row">
//               <Tab.Group>
//                 <div className="flex  flex-wrap mr-10 gap-10">
//                   <Tab.List className="space-y-2 ltr:pr-4 rtl:pl-4">

//                     <Tab as={Fragment}>
//                       {({ selected }) => (
//                         <div className=" flex items-center border-none  text-lg font-semibold  md:justify-start justify-center">
//                           <div className=" flex mb-3 items-center">
//                             <div className="  w-[51px]  h[38px] flex justify-center">
//                               <img
//                                 src={rozorpay}
//                                 alt=""
//                                 className=" w-[51px] h[38px] "
//                               />
//                             </div>
//                             <div className="flex  ml-1">
//                               <h2 className=" w-40">Razorpay</h2>
//                               <input
//                                 type="radio"
//                                 name="payment"
//                                 id=""
//                                 value="razorpay"
//                                 className=" "
//                                 onChange={(e) => setSelectedOption(e.target.value)}
                                
//                               />

//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </Tab>
//                     <Tab as={Fragment}>
//                       {({ selected }) => (
//                         <div className=" flex items-center border-none  text-lg mb-5 font-semibold  md:justify-start justify-center">
//                           <div className=" flex mb-3 items-center">
//                             <div className="  w-[51px]  h[38px] flex justify-center">
//                               <img
//                                 src={phonepe}
//                                 alt=""
//                                 className=" w-[51px] h[38px] "
//                               />
//                             </div>
//                             <div className="flex  ml-1">
//                               <h2 className=" w-40">PhonePe</h2>
//                               <input
//                                 type="radio"
//                                 name="payment"
//                                 id=""
//                                 value="phonepe"
//                                 className=" "
//                                 onChange={(e) => setSelectedOption(e.target.value)}
//                               />

//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </Tab>

//                     <Tab as={Fragment}>
//                       {({ selected }) => (
//                         <div className=" flex items-center border-none  text-lg mb-5 font-semibold  md:justify-start justify-center">
//                           <div className=" flex mb-3 items-center">
//                             <div className="  w-[51px]  h[38px] flex justify-center">
//                               <img
//                                 src={gpay}
//                                 alt=""
//                                 className=" w-[51px] h[38px] "
//                               />
//                             </div>
//                             <div className="flex  ml-1">
//                               <h2 className=" w-40">Google Pay</h2>
//                               <input
//                                 type="radio"
//                                 name="payment"
//                                 id=""
//                                 value="googlepay"
//                                 className=" "
//                                 onChange={(e) => setSelectedOption(e.target.value)}
//                               />

//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </Tab>

//                     <Tab as={Fragment}>
//                       {({ selected }) => (
//                         <div className=" flex items-center border-none  text-lg mb-5 font-semibold  md:justify-start justify-center">
//                           <div className=" flex mb-3 items-center">
//                             <div className="  w-[51px]  h[38px] flex justify-center">
//                               <img
//                                 src={amazon}
//                                 alt=""
//                                 className=" w-[31px] h[38px] "
//                               />
//                             </div>
//                             <div className="flex  ml-1">
//                               <h2 className=" w-40">Amazon Pay</h2>
//                               <input
//                                 type="radio"
//                                 name="payment"
//                                 id=""
//                                 value="amazon"
//                                 className=" "
//                                 onChange={(e) => setSelectedOption(e.target.value)}
//                               />

//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </Tab>

//                     <Tab as={Fragment}>
//                       {({ selected }) => (
//                         <div className=" flex items-center border-none  text-lg mb-5 font-semibold  md:justify-start justify-center">
//                           <div className=" flex mb-3 items-center">
//                             <div className="  w-[51px]  h[38px] flex justify-center">
//                               <img
//                                 src="data:image/png;base64,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"
//                                 alt=""
//                                 className=" w-[51px] h[38px] "
//                               />
//                             </div>
//                             <div className="flex  ml-1">
//                               <h2 className=" w-40">Stripe</h2>
//                               <input
//                                 type="radio"
//                                 name="payment"
//                                 id=""
//                                 value="amazon"
//                                 className=" "
//                                 onChange={(e) => setSelectedOption(e.target.value)}
//                               />

//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </Tab>
//                     <Tab as={Fragment}>
//                       {({ selected }) => (
//                         <div className=" flex items-center border-none  text-lg mb-5 font-semibold  md:justify-start justify-center">
//                           <div className=" flex mb-3 items-center">
//                             <div className="  w-[51px]  h[38px] flex justify-center">
//                               <img
//                                 src={paypal}
//                                 alt=""
//                                 className="w-[61px] h[38px] "
//                               />
//                             </div>
//                             <div className="flex  ml-1">
//                               <h2 className=" w-40">Paypal</h2>
//                               <input
//                                 type="radio"
//                                 name="payment"
//                                 id=""
//                                 value="amazon"
//                                 className=" "
//                                 onChange={(e) => setSelectedOption(e.target.value)}
//                               />

//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </Tab>
//                   </Tab.List>
//                 </div>
//                 <Tab.Panels>
//                   <Tab.Panel>
//                     <div className="active">
//                       <div className=" ">
//                         <div className="">
//                           <div className=" flex gap-2 text-[13px] flex-wrap ">
//                             <div>
//                               <div className=" ml-3  f">
//                                 <h3 className="">Gateway Name</h3>
//                               </div>
//                               <div>
//                                 <input
//                                   type="text"
//                                   name=""
//                                   id=""
//                                   value={razorPay?.gateway_name ? razorPay.gateway_name : ''}
//                                   onChange={(e) => setRazorPay({ ...razorPay, gateway_name: e.target.value })}
//                                   className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                                 />
//                               </div>
//                             </div>
//                             <div>
//                               <div className=" ml-3">
//                                 <h3>Key</h3>
//                               </div>
//                               <input
//                                 type="text"
//                                 name=""
//                                 id=""
//                                 className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                                 value={razorPay?.key ? razorPay.key : ''}
//                                 onChange={(e) => setRazorPay({ ...razorPay, key: e.target.value })}
//                               />
//                               <div className="text-danger font-black ">{gateWay == "razorpay" && errors.key ? errors.key : ''}</div>

//                             </div>

//                           </div>

//                           <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">
//                             <div>
//                               <div className=" ml-3  f">
//                                 <h3 className=""> Secret Key</h3>
//                               </div>
//                               <div>
//                                 <input
//                                   type="text"
//                                   name=""
//                                   id=""
//                                   value={razorPay?.secret ? razorPay.secret : ''}
//                                   onChange={(e) => setRazorPay({ ...razorPay, secret: e.target.value })}
//                                   className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                                 />
//                                 <div className="text-danger font-black ">{gateWay == "razorpay" && errors.secret ? errors.secret : ''}</div>

//                               </div>
//                             </div>
//                             <div className="">
//                               <h3 className=""> Select Environment</h3>

//                               <select name="duration" value={razorPay?.environment ? razorPay.environment : ''}
//                                 onChange={(e) => setRazorPay({ ...razorPay, environment: e.target.value })} className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none  h-[26px] w-[240px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">

//                                 <option>
//                                   select
//                                 </option>
//                                 <option value={1}>Live</option>
//                                 <option value={0}>Demo</option>
//                               </select>
//                               {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
//                                 <IoIosArrowDown size={17} color="#B5B5B5" />
//                               </div> */}
//                             </div>

//                           </div>

//                           <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">

//                             <div className="">
//                               <label htmlFor="status" className='text-style roboto-light'>Status</label>
//                               <div className="">
//                                 <label className="inline-flex">
//                                   <input type="radio"
//                                     name="status"
//                                     className="form-radio text-success peer"
//                                     defaultChecked={razorPay.is_enabled == 1 ? true : false}
//                                     value={1}
//                                     onClick={(e) => setRazorPay({ ...razorPay, is_enabled: 1 })}
//                                   />
//                                   <span style={{ color: '#32e01d' }} className="peer-checked:text-success text-style roboto-light">Enable</span>
//                                 </label>
//                                 <label className="inline-flex px-5">
//                                   <input type="radio"
//                                     name="status"
//                                     defaultChecked={razorPay.is_enabled == 0 ? true : false}
//                                     value={0}
//                                     onClick={(e) => setRazorPay({ ...razorPay, is_enabled: 0 })}
//                                     className="form-radio text-danger peer"
//                                   />
//                                   <span style={{ color: 'red' }} className="peer-checked:text-denger text-style roboto-light">Disable</span>
//                                 </label>
//                               </div>
//                               <span className="text-danger font-semibold text-sm p-2">{errors.status}</span>
//                             </div>







//                           </div>


//                         </div>

//                         <div className=" flex justify-center mt-4">
//                           <button
//                             onClick={() => configPaymentGateWay(razorPay)}
//                             className=" w-[97px] h-[27px] text-sm dark:bg-[#FFFFFF] dark:text-dark bg-[#000000] rounded-lg text-white">
//                             Set
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </Tab.Panel>
//                   <Tab.Panel>

//                     <div className=" ">
//                       <div className="">
//                         <div className=" flex gap-2 text-[13px] flex-wrap ">
//                           <div>
//                             <div className=" ml-3  f">
//                               <h3 className="">Gateway Name </h3>
//                             </div>
//                             <div>
//                               <input
//                                 type="text"
//                                 name=""
//                                 id=""
//                                 value={phonePe?.gateway_name ? phonePe.gateway_name : ''}
//                                 onChange={(e) => setPhonePe({ ...phonePe, gateway_name: e.target.value })}
//                                 className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <div className=" ml-3">
//                               <h3>Key</h3>
//                             </div>
//                             <input
//                               type="text"
//                               name=""
//                               id=""
//                               className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               value={phonePe?.key ? phonePe.key : ''}
//                               onChange={(e) => setPhonePe({ ...phonePe, key: e.target.value })}
//                             />
//                             <div className="text-danger font-black ">{gateWay == "phonePe" && errors.key ? errors.key : ''}</div>

//                           </div>

//                         </div>

//                         <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">
//                           <div>
//                             <div className=" ml-3  f">
//                               <h3 className=""> Secret Key</h3>
//                             </div>
//                             <div>
//                               <input
//                                 type="text"
//                                 name=""
//                                 id=""
//                                 value={phonePe?.secret ? phonePe.secret : ''}
//                                 onChange={(e) => setPhonePe({ ...phonePe, secret: e.target.value })}
//                                 className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               />
//                               <div className="text-danger font-black ">{gateWay == "phonePe" && errors.secret ? errors.secret : ''}</div>

//                             </div>
//                           </div>
//                           <div className="">
//                             <h3 className=""> Select Environment</h3>

//                             <select name="duration" value={phonePe?.environment ? phonePe.environment : ''}
//                               onChange={(e) => setPhonePe({ ...phonePe, environment: e.target.value })} className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none  h-[26px] w-[240px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">

//                               <option>
//                                 select
//                               </option>
//                               <option value={1}>Live</option>
//                               <option value={0}>Demo</option>
//                             </select>
//                           </div>

//                         </div>

//                         <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">

//                           <div className="">
//                             <label htmlFor="status" className='text-style roboto-light'>Status</label>
//                             <div className="">
//                               <label className="inline-flex">
//                                 <input type="radio"
//                                   name="status"
//                                   className="form-radio text-success peer"
//                                   defaultChecked={phonePe.is_enabled == 1 ? true : false}
//                                   value={1}
//                                   onClick={(e) => setPhonePe({ ...phonePe, is_enabled: 1 })}
//                                 />
//                                 <span style={{ color: '#32e01d' }} className="peer-checked:text-success text-style roboto-light">Enable</span>
//                               </label>
//                               <label className="inline-flex px-5">
//                                 <input type="radio"
//                                   name="status"
//                                   defaultChecked={phonePe.is_enabled == 0 ? true : false}
//                                   value={0}
//                                   onClick={(e) => setPhonePe({ ...phonePe, is_enabled: 0 })}
//                                   className="form-radio text-danger peer"
//                                 />
//                                 <span style={{ color: 'red' }} className="peer-checked:text-denger text-style roboto-light">Disable</span>
//                               </label>
//                             </div>
//                             <span className="text-danger font-semibold text-sm p-2">{errors.status}</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className=" flex justify-center mt-4">
//                         <button
//                           onClick={() => configPaymentGateWay(razorPay)}
//                           className=" w-[97px] h-[27px] text-sm dark:bg-[#FFFFFF] dark:text-dark bg-[#000000] rounded-lg text-white">
//                           Set
//                         </button>
//                       </div>
//                     </div>

//                   </Tab.Panel>
//                   <Tab.Panel>
//                     <div className=" ">
//                       <div className="">
//                         <div className=" flex gap-2 text-[13px] flex-wrap ">
//                           <div>
//                             <div className=" ml-3  f">
//                               <h3 className="">Gateway Name </h3>
//                             </div>
//                             <div>
//                               <input
//                                 type="text"
//                                 name=""
//                                 id=""
//                                 value={googlePay?.gateway_name ? googlePay.gateway_name : ''}
//                                 onChange={(e) => setGooglePay({ ...googlePay, gateway_name: e.target.value })}
//                                 className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <div className=" ml-3">
//                               <h3>Key</h3>
//                             </div>
//                             <input
//                               type="text"
//                               name=""
//                               id=""
//                               className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               value={googlePay?.key ? googlePay.key : ''}
//                               onChange={(e) => setGooglePay({ ...googlePay, key: e.target.value })}
//                             />
//                             <div className="text-danger font-black ">{gateWay == "googlePay" && errors.key ? errors.key : ''}</div>

//                           </div>

//                         </div>

//                         <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">
//                           <div>
//                             <div className=" ml-3  f">
//                               <h3 className=""> Secret Key</h3>
//                             </div>
//                             <div>
//                               <input
//                                 type="text"
//                                 name=""
//                                 id=""
//                                 value={googlePay?.secret ? googlePay.secret : ''}
//                                 onChange={(e) => setGooglePay({ ...googlePay, secret: e.target.value })}
//                                 className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               />
//                               <div className="text-danger font-black ">{gateWay == "googlePay" && errors.secret ? errors.secret : ''}</div>

//                             </div>
//                           </div>
//                           <div className="">
//                             <h3 className=""> Select Environment</h3>

//                             <select name="duration" value={googlePay?.environment ? googlePay.environment : ''}
//                               onChange={(e) => setGooglePay({ ...googlePay, environment: e.target.value })} className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none  h-[26px] w-[240px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">

//                               <option>
//                                 select
//                               </option>
//                               <option value={1}>Live</option>
//                               <option value={0}>Demo</option>
//                             </select>
//                           </div>

//                         </div>

//                         <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">

//                           <div className="">
//                             <label htmlFor="status" className='text-style roboto-light'>Status</label>
//                             <div className="">
//                               <label className="inline-flex">
//                                 <input type="radio"
//                                   name="status"
//                                   className="form-radio text-success peer"
//                                   defaultChecked={googlePay.is_enabled == 1 ? true : false}
//                                   value={1}
//                                   onClick={(e) => setGooglePay({ ...googlePay, is_enabled: 1 })}
//                                 />
//                                 <span style={{ color: '#32e01d' }} className="peer-checked:text-success text-style roboto-light">Enable</span>
//                               </label>
//                               <label className="inline-flex px-5">
//                                 <input type="radio"
//                                   name="status"
//                                   defaultChecked={googlePay.is_enabled == 0 ? true : false}
//                                   value={0}
//                                   onClick={(e) => setGooglePay({ ...googlePay, is_enabled: 0 })}
//                                   className="form-radio text-danger peer"
//                                 />
//                                 <span style={{ color: 'red' }} className="peer-checked:text-denger text-style roboto-light">Disable</span>
//                               </label>
//                             </div>
//                             <span className="text-danger font-semibold text-sm p-2">{errors.status}</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className=" flex justify-center mt-4">
//                         <button
//                           onClick={() => configPaymentGateWay(googlePay)}
//                           className=" w-[97px] h-[27px] text-sm dark:bg-[#FFFFFF] dark:text-dark bg-[#000000] rounded-lg text-white">
//                           Set
//                         </button>
//                       </div>
//                     </div>
//                   </Tab.Panel>
//                   <Tab.Panel>
//                     <div className=" ">
//                       <div className="">
//                         <div className=" flex gap-2 text-[13px] flex-wrap ">
//                           <div>
//                             <div className=" ml-3  f">
//                               <h3 className="">Gateway Name </h3>
//                             </div>
//                             <div>
//                               <input
//                                 type="text"
//                                 name=""
//                                 id=""
//                                 value={amazonPay?.gateway_name ? amazonPay.gateway_name : ''}
//                                 onChange={(e) => setAmazonPay({ ...amazonPay, gateway_name: e.target.value })}
//                                 className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <div className=" ml-3">
//                               <h3>Key</h3>
//                             </div>
//                             <input
//                               type="text"
//                               name=""
//                               id=""
//                               className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               value={amazonPay?.key ? amazonPay.key : ''}
//                               onChange={(e) => setamazonPay({ ...amazonPay, key: e.target.value })}
//                             />
//                             <div className="text-danger font-black ">{gateWay == "amazonPay" && errors.key ? errors.key : ''}</div>

//                           </div>

//                         </div>

//                         <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">
//                           <div>
//                             <div className=" ml-3  f">
//                               <h3 className=""> Secret Key</h3>
//                             </div>
//                             <div>
//                               <input
//                                 type="text"
//                                 name=""
//                                 id=""
//                                 value={amazonPay?.secret ? amazonPay.secret : ''}
//                                 onChange={(e) => setAmazonPay({ ...amazonPay, secret: e.target.value })}
//                                 className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               />
//                               <div className="text-danger font-black ">{gateWay == "amazonPay" && errors.secret ? errors.secret : ''}</div>

//                             </div>
//                           </div>
//                           <div className="">
//                             <h3 className=""> Select Environment</h3>

//                             <select name="duration" value={amazonPay?.environment ? amazonPay.environment : 0} 
//                               onChange={(e) => setAmazonPay({ ...amazonPay, environment: e.target.value })} className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none  h-[26px] w-[240px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">

//                               <option>
//                                 select
//                               </option>
//                               <option value={1}>Live</option>
//                               <option value={0}>Demo</option>
//                             </select>
//                           </div>

//                         </div>

//                         <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">

//                           <div className="">
//                             <label htmlFor="status" className='text-style roboto-light'>Status</label>
//                             <div className="">
//                               <label className="inline-flex">
//                                 <input type="radio"
//                                   name="status"
//                                   className="form-radio text-success peer"
//                                   defaultChecked={amazonPay.is_enabled == 1 ? true : false}
//                                   value={1}
//                                   onClick={(e) => setAmazonPay({ ...amazonPay, is_enabled: 1 })}
//                                 />
//                                 <span style={{ color: '#32e01d' }} className="peer-checked:text-success text-style roboto-light">Enable</span>
//                               </label>
//                               <label className="inline-flex px-5">
//                                 <input type="radio"
//                                   name="status"
//                                   defaultChecked={amazonPay.is_enabled == 0 ? true : false}
//                                   value={0}
//                                   onClick={(e) => setAmazonPay({ ...amazonPay, is_enabled: 0 })}
//                                   className="form-radio text-danger peer"
//                                 />
//                                 <span style={{ color: 'red' }} className="peer-checked:text-denger text-style roboto-light">Disable</span>
//                               </label>
//                             </div>
//                             <span className="text-danger font-semibold text-sm p-2">{errors.status}</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className=" flex justify-center mt-4">
//                         <button
//                           onClick={() => configPaymentGateWay(amazonPay)}
//                           className=" w-[97px] h-[27px] text-sm dark:bg-[#FFFFFF] dark:text-dark bg-[#000000] rounded-lg text-white">
//                           Set
//                         </button>
//                       </div>
//                     </div>
//                   </Tab.Panel>
//                   <Tab.Panel>
//                     <div className=" ">
//                       <div className="">
//                         <div className=" flex gap-2 text-[13px] flex-wrap ">
//                           <div>
//                             <div className=" ml-3  f">
//                               <h3 className="">Gateway Name </h3>
//                             </div>
//                             <div>
//                               <input
//                                 type="text"
//                                 name=""
//                                 id=""
//                                 value={stripe?.gateway_name ? stripe.gateway_name : ''}
//                                 onChange={(e) => setStripe({ ...stripe, gateway_name: e.target.value })}
//                                 className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <div className=" ml-3">
//                               <h3>Key</h3>
//                             </div>
//                             <input
//                               type="text"
//                               name=""
//                               id=""
//                               className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               value={stripe?.key ? stripe.key : ''}
//                               onChange={(e) => setStripe({ ...stripe, key: e.target.value })}
//                             />
//                             <div className="text-danger font-black ">{gateWay == "stripe" && errors.key ? errors.key : ''}</div>

//                           </div>

//                         </div>

//                         <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">
//                           <div>
//                             <div className=" ml-3  f">
//                               <h3 className=""> Secret Key</h3>
//                             </div>
//                             <div>
//                               <input
//                                 type="text"
//                                 name=""
//                                 id=""
//                                 value={stripe?.secret ? stripe.secret : ''}
//                                 onChange={(e) => setStripe({ ...stripe, secret: e.target.value })}
//                                 className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               />
//                               <div className="text-danger font-black ">{gateWay == "stripe" && errors.secret ? errors.secret : ''}</div>

//                             </div>
//                           </div>
//                           <div className="">
//                             <h3 className=""> Select Environment</h3>

//                             <select name="duration" value={stripe?.environment ? stripe.environment : ''}
//                               onChange={(e) => setStripe({ ...stripe, environment: e.target.value })} className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none  h-[26px] w-[240px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">

//                               <option>
//                                 select
//                               </option>
//                               <option value={1}>Live</option>
//                               <option value={0}>Demo</option>
//                             </select>
//                           </div>

//                         </div>

//                         <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">

//                           <div className="">
//                             <label htmlFor="status" className='text-style roboto-light'>Status</label>
//                             <div className="">
//                               <label className="inline-flex">
//                                 <input type="radio"
//                                   name="status"
//                                   className="form-radio text-success peer"
//                                   defaultChecked={stripe.is_enabled == 1 ? true : false}
//                                   value={1}
//                                   onClick={(e) => setStripe({ ...stripe, is_enabled: 1 })}
//                                 />
//                                 <span style={{ color: '#32e01d' }} className="peer-checked:text-success text-style roboto-light">Enable</span>
//                               </label>
//                               <label className="inline-flex px-5">
//                                 <input type="radio"
//                                   name="status"
//                                   defaultChecked={stripe.is_enabled == 0 ? true : false}
//                                   value={0}
//                                   onClick={(e) => setStripe({ ...stripe, is_enabled: 0 })}
//                                   className="form-radio text-danger peer"
//                                 />
//                                 <span style={{ color: 'red' }} className="peer-checked:text-denger text-style roboto-light">Disable</span>
//                               </label>
//                             </div>
//                             <span className="text-danger font-semibold text-sm p-2">{errors.status}</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className=" flex justify-center mt-4">
//                         <button
//                           onClick={() => configPaymentGateWay(stripe)}
//                           className=" w-[97px] h-[27px] text-sm dark:bg-[#FFFFFF] dark:text-dark bg-[#000000] rounded-lg text-white">
//                           Set
//                         </button>
//                       </div>
//                     </div>
//                   </Tab.Panel>
//                   <Tab.Panel>
//                     <div className=" ">
//                       <div className="">
//                         <div className=" flex gap-2 text-[13px] flex-wrap ">
//                           <div>
//                             <div className=" ml-3  f">
//                               <h3 className="">Gateway Name </h3>
//                             </div>
//                             <div>
//                               <input
//                                 type="text"
//                                 name=""
//                                 id=""
//                                 value={payPal?.gateway_name ? payPal.gateway_name : ''}
//                                 onChange={(e) => setPayPal({ ...payPal, gateway_name: e.target.value })}
//                                 className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <div className=" ml-3">
//                               <h3>Key</h3>
//                             </div>
//                             <input
//                               type="text"
//                               name=""
//                               id=""
//                               className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               value={payPal?.key ? payPal.key : ''}
//                               onChange={(e) => setPayPal({ ...payPal, key: e.target.value })}
//                             />
//                             <div className="text-danger font-black ">{gateWay == "payPal" && errors.key ? errors.key : ''}</div>

//                           </div>

//                         </div>

//                         <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">
//                           <div>
//                             <div className=" ml-3  f">
//                               <h3 className=""> Secret Key</h3>
//                             </div>
//                             <div>
//                               <input
//                                 type="text"
//                                 name=""
//                                 id=""
//                                 value={payPal?.secret ? payPal.secret : ''}
//                                 onChange={(e) => setPayPal({ ...payPal, secret: e.target.value })}
//                                 className=" bg-white px-2  dark:bg-[#202125] text-black dark:text-white rounded-full dark:border-[#575757] border-[#C7C7C7] border h-[27px] w-[238px]"
//                               />
//                               <div className="text-danger font-black ">{gateWay == "payPal" && errors.secret ? errors.secret : ''}</div>

//                             </div>
//                           </div>
//                           <div className="">
//                             <h3 className=""> Select Environment</h3>

//                             <select name="duration" value={payPal?.environment ? payPal.environment : ''}
//                               onChange={(e) => setPayPal({ ...payPal, environment: e.target.value })} className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none  h-[26px] w-[240px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">

//                               <option>
//                                 select
//                               </option>
//                               <option value={1}>Live</option>
//                               <option value={0}>Demo</option>
//                             </select>
//                           </div>

//                         </div>

//                         <div className=" flex gap-2 text-[13px] flex-wrap  mt-2">

//                           <div className="">
//                             <label htmlFor="status" className='text-style roboto-light'>Status</label>
//                             <div className="">
//                               <label className="inline-flex">
//                                 <input type="radio"
//                                   name="status"
//                                   className="form-radio text-success peer"
//                                   defaultChecked={payPal.is_enabled == 1 ? true : false}
//                                   value={1}
//                                   onClick={(e) => setPayPal({ ...payPal, is_enabled: 1 })}
//                                 />
//                                 <span style={{ color: '#32e01d' }} className="peer-checked:text-success text-style roboto-light">Enable</span>
//                               </label>
//                               <label className="inline-flex px-5">
//                                 <input type="radio"
//                                   name="status"
//                                   defaultChecked={payPal.is_enabled == 0 ? true : false}
//                                   value={0}
//                                   onClick={(e) => setPayPal({ ...payPal, is_enabled: 0 })}
//                                   className="form-radio text-danger peer"
//                                 />
//                                 <span style={{ color: 'red' }} className="peer-checked:text-denger text-style roboto-light">Disable</span>
//                               </label>
//                             </div>
//                             <span className="text-danger font-semibold text-sm p-2">{errors.status}</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className=" flex justify-center mt-4">
//                         <button
//                           onClick={() => configPaymentGateWay(payPal)}
//                           className=" w-[97px] h-[27px] text-sm dark:bg-[#FFFFFF] dark:text-dark bg-[#000000] rounded-lg text-white">
//                           Set
//                         </button>
//                       </div>
//                     </div>
//                   </Tab.Panel>
//                 </Tab.Panels>
//               </Tab.Group>
//             </div>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tabs;
