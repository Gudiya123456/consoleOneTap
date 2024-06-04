// import React, { Fragment, useEffect, useState } from "react";

// import { MdEdit, MdDelete } from "react-icons/md";
// import { AiFillPlusCircle } from "react-icons/ai";
// import { IoIosArrowDown } from "react-icons/io";
// import { FcCheckmark } from "react-icons/fc";
// import { MdClose } from "react-icons/md";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { IRootState } from "../../store";
// import { Dialog, Transition } from "@headlessui/react";
// import { IoIosArrowBack } from "react-icons/io";
// import { features } from "process";
// import { NavLink, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// const Pricing = () => {
//   const [selectedplan, setSelectedPlan] = useState("monthly");
//   const [packages, setPackages] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [durations, setDuration] = useState([]);
//   const [isloading, setisLoading] = useState(false);
//   const [selecteddurations, setSelectedDuration] = useState(null);
//   const [selectedCountriy, setSelectedCountry] = useState(null);
//   const [filteredPackages, setFilteredPackages] = useState(packages);
//   const [modal, setModal] = useState(false);
//   const [editmodal, setEditModal] = useState(false);

//   const crmToken = useSelector(
//     (state: IRootState) => state.themeConfig.crmToken
//   );
//   useEffect(() => {
//     fetchPackages();
//   }, []);
//   useEffect(() => {
//     let c = packages;
//     if (selectedCountriy) {
//       c = c.filter((a) => a.country == selectedCountriy);
//     }
//     if (selecteddurations) {
//       c = c.filter((a) => a.duration == selecteddurations);
//     }
//     console.log(c);
//     setFilteredPackages(c);
//   }, [selectedCountriy, selecteddurations]);

//   const fetchPackages = async () => {
//     setisLoading(true);
//     try {
//       const response = await axios({
//         method: "get",
//         url: "https://cdn.onetapdine.com/api/packages",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + crmToken,
//         },
//       });
//       console.log(response.data);
//       if (response.data.status == "success") {
//         setPackages(response.data.packages);
//         setCountries(response.data.countries);
//         setDuration(response.data.durations);
//       }

//       if (response.data.status == "error") {
//         alert(99999);
//       }
//     } catch (error: any) {
//       if (error.response.status == 401) {
//         // ErrorHandle();
//       } else console.log(error);
//     } finally {
//       setisLoading(false);
//     }
//   };
//   const plans = [
//     {
//       back: "#04B84D",
//       second: "#000000c7",
//       planname: "Basic plan",
//       rs: 18,
//       cs: [{ status: "true", name: "Customer support" }],
//       Lm: [{ status: "true", name: "Live Monitoring" }],
//       os: [{ status: "true", name: "Onboarding Setup" }],
//       ms: [{ status: "true", name: "Menu Setup" }],
//       pos: [{ status: "true", name: "Pos System" }],
//       om: [{ status: "true", name: "Order Manager" }],
//       t: [{ status: "false", name: "Takeaway" }],
//       kd: [{ status: "false", name: "KOT Dashboard" }],
//       pg: [{ status: "false", name: "Payment gateway" }],
//       m: [{ status: "false", name: "Menus" }],
//     },
//     {
//       back: "#BAB200",
//       second: "#000000c7",
//       planname: "Pro plan",
//       rs: 50,
//       cs: [{ status: "true", name: "Customer support" }],
//       Lm: [{ status: "true", name: "Live Monitoring" }],
//       os: [{ status: "true", name: "Onboarding Setup" }],
//       ms: [{ status: "true", name: "Menu Setup" }],
//       pos: [{ status: "true", name: "Pos System" }],
//       om: [{ status: "true", name: "Order Manager" }],
//       t: [{ status: "true", name: "Takeaway" }],
//       kd: [{ status: "true", name: "KOT Dashboard" }],
//       pg: [{ status: "true", name: "Payment gateway" }],
//       m: [{ status: "true", name: "Menus" }],
//     },
//   ];
//   const back = "#BAB200";
//   const second = "#000000c7"

//   // functionality for features
//   // fetch Restaurant data
//   const [isLoading, setIsLoading] = useState(false);
//   const [features, setFeatures] = useState([]);
//   useEffect(() => {
//     fetchFeatures();
//   }, [])
//   const fetchFeatures = async () => {
//     setIsLoading(true)
//     try {
//       const response = await axios({
//         method: 'get',
//         url: "https://cdn.onetapdine.com/api/features",
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer ' + crmToken,
//         },
//       });
//       console.log(response.data);

//       if (response.data.status == 'success') {
//         setFeatures(response.data.features);
//         console.log(response.data);
//       }
//       else {
//         console.log()
//       }

//     } catch (error: any) {
//       if (error.response.status == 401) navigate('/login')

//       else console.log(error)

//     }

//     finally {
//       setIsLoading(false)

//     }
//   };

//   const [defaultParams] = useState({
//     id: "",
//     package_name: "",
//     duration: "",
//     amount: '',
//     status: '',
//     features: [],
//     country: '',
//     back:''
//   });

//   const [params, setParams] = useState<any>(
//     JSON.parse(JSON.stringify(defaultParams))
//   );
//   const [errors, setErros] = useState<any>({});

//   const changeValue = (e: any) => {
//     let { value, name, type } = e.target;
//     setErros({ ...errors, [name]: "" });

//     type == "checkbox"
//       ? e.target.checked
//         ? (value = 1)
//         : (value = 0)
//       : null;
//     setParams({ ...params, [name]: value });

//   };

//   const [X, Z] = useState<any>([]);
//   const XX = (t) => {
//     const a = Number(t.value.split("[\\s,]+"));
//     if (t.checked) {
//       if (!X.includes(a)) Z([...X, a]);
//     } else {
//       if (X.includes(a)) {
//         const Y = X.filter((e: any) => e != a);
//         Z(Y);
//       }
//     }
//   };

//   const validate = () => {
//     setErros({});
//     let errors = {};

//     if (!params.package_name) {
//       errors = { ...errors, package_name: "package_name is required" };
//     }

//     if (!params.country) {
//       errors = { ...errors, country: "country is required" };
//     }

//     if (!params.duration) {
//       errors = { ...errors, duration: "duration is required" };
//     }

//     if (!params.amount) {
//       errors = { ...errors, amount: "amount is required" };
//     }
//     if (!params.features) {
//       errors = { ...errors, features: "features is required" };
//     }

//     if (!params.status) {
//       errors = { ...errors, status: "status is required" };
//     }
//     console.log(errors);
//     setErros(errors);
//     return { totalErrors: Object.keys(errors).length };
//   };
//   console.table(params)

//   const [btnLoading, setBtnLoading] = useState(true);
//   const navigate = useNavigate();

//   const storeOrUpdateApi = async (data: any) => {
//     setBtnLoading(true);
//     try {
//       const response = await axios({
//         method: "post",
//         url: "https://cdn.onetapdine.com/api/packages",
//         data,
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: "Bearer " + crmToken,
//         },
//       });

//       if (response.data.status == "success") {
//         Swal.fire({
//           icon: response.data.status,
//           title: response.data.title,
//           text: response.data.message,
//           padding: "2em",
//           customClass: "sweet-alerts",
//         });

//         if (response.data.status == "success") {
//           fetchPackages();
//           setModal(false);
//         } else {
//           alert(9);
//         }
//       } else {
//         alert("Failed");
//       }
//     } catch (error: any) {
//       if (error.response.status == 401) navigate("/login");
//       if (error?.response?.status === 422) {
//         const serveErrors = error.response.data.errors;
//         let serverErrors = {};
//         for (var key in serveErrors) {
//           serverErrors = {
//             ...serverErrors,
//             [key]: serveErrors[key][0],
//           };
//           console.log(serveErrors[key][0]);
//         }
//         setErros(serverErrors);
//         CrmSwal.fire({
//           title: "Server Validation Error! Please solve",
//           toast: true,
//           position: "top",
//           showConfirmButton: false,
//           showCancelButton: false,
//           width: 450,
//           timer: 2000,
//           customClass: {
//             popup: "color-danger",
//           },
//         });
//       }
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const formSubmit = () => {
//     const isValid = validate();
//     if (isValid.totalErrors) return false;
//     const data = new FormData();
//     data.append("id", params.id);
//     data.append("package_name", params.package_name);
//     data.append("country", params.country);
//     data.append("amount", params.amount);
//     data.append("duration", params.duration);
//     data.append("features", JSON.stringify(X));
//     data.append("status", params.status);
//     data.append("back", params.back);
//     storeOrUpdateApi(data);
//   };

//   const storeOrUpdate = (data) => {
//     setErros({});
//     if (data) {
//       setParams({
//         id: data.id,
//         package_name: data.package_name,
//         country: data.country,
//         status: data.status,
//         duration: data.duration,
//         back: data.back,
//         amount: data.amount,
//         features: data.features,

//       });

//       // Z(data.features.map(f => f.id))
//     } else {
//       const defaltData = JSON.parse(JSON.stringify(defaultParams));
//       Z([])
//       setParams(defaltData);
//     }
//     setModal(true);
//   };

//   const distroy = (user: any) => {
//     Swal.fire({
//       icon: "warning",
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       showCancelButton: true,
//       confirmButtonText: "Delete",
//       padding: "2em",
//       customClass: "sweet-alerts",
//     }).then(async (result) => {
//       if (result.value) {
//         try {
//           const response = await axios({
//             method: "delete",
//             url: "https://cdn.onetapdine.com/api/packages/" + user.id,
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + crmToken,
//             },
//           });
//           if (response.data.status === "success") {
//             // setCategories(categories.filter((d: any) => d.id !== id))
//             Swal.fire({
//               title: response.data.title,
//               text: response.data.message,
//               icon: "success",
//               customClass: "sweet-alerts",
//             });
//             fetchPackages();
//           }
//         } catch (error: any) {
//           if (error.response.status == 401) navigate("/login");
//         } finally {
//         }
//       }
//     });
//   };

//   return (
//     <div className="dark:bg-[#202125] bg-[#F2F2F2] dark:text-[#FFFFFF] text-[#000000] p-2 px-8">
//       <div className=" flex justify-center md:justify-end">
//         <div className="mt-1 flex items-center" onClick={() => { storeOrUpdate() }}>
//           <AiFillPlusCircle size={18} />

//           <h5 className=" text-[14px] font-semibold">Add Pricing</h5>
//         </div>
//         <NavLink to='/pricing/features'>
//           <div className="mt-1 flex items-center ml-3">
//             <AiFillPlusCircle size={18} />

//             <h5 className="  text-[14px]  font-semibold">Add Features</h5>
//           </div>
//         </NavLink>

//       </div>
//       <div className=" flex justify-center md:justify-end mt-5 flex-wrap  gap-3">
//         <div className=" flex bg-[#FFFFFF] dark:bg-[#000000] px-2 h-[27px] items-center font-semibold text-sm  rounded-full justify-center">
//           {durations.map((duration) => (
//             <div
//               className={`${selecteddurations == duration
//                   ? "bg-[#F2F2F2] dark:bg-[#202125]"
//                   : "bg-[#FFFFFF] dark:bg-[#000000]"
//                 } px-2 h-[18px] flex items-center justify-center rounded-full cursor-pointer`}
//               onClick={() => setSelectedDuration(duration)}
//             >
//               <h6 className=" text-sm ">{duration}</h6>
//             </div>
//           ))}
//         </div>

//         <div className="relative  inline-block w-[158px] font-semibold text-sm">
//           <select
//             className="bg-[#FFFFFF] dark:text-white dark:bg-[#000000]  appearance-none w-[158px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center "
//             onChange={(e) => setSelectedCountry(e.target.value)}
//           >
//             <option>Select Country</option>
//             {countries.map((country) => (
//               <option value={country}>{country}</option>
//             ))}
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-2 text-gray-700">
//             <IoIosArrowDown size={17} />
//           </div>
//         </div>
//       </div>

//       <div className="mt-5 md:mt-10 flex justify-center">
//         <div>
//           <h1 className=" text-2xl font-bold">
//             Find the perfect plans for your needs
//           </h1>
//           <div className=" grid md:grid-cols-2 mt-6 md:mt-10 gap-8  justify-center">
//             {
//               filteredPackages.length ? (
//                 filteredPackages?.map((p, index) => (
//                   <div key={index}>
//                     <div className=" flex justify-center">
//                       <div
//                         style={{
//                           // background: "#04B84D"
//                           background:"#BAB200"
//                         }}
//                         className="  w-[173px] h-[55px] rounded-2xl flex justify-center items-center text-white -mb-7"
//                       >
//                         <h3 className=" text-lg  font-semibold">{p.package_name}</h3>
//                       </div>
//                     </div>

//                     <div className="dark:bg-[#000000] bg-[#FFFFFF] border-[#D8D6D6] border-solid px-5 pt-10 pb-9 rounded-3xl w-[287px]">
//                       <div className=" flex items-center border-b pb-2 border-[#606060]">
//                         <div
//                           style={{
//                             // background: `linear-gradient(110deg, "#04B84D" 10%, "#000000c7" 100%)`,
//                             // background:'red'
//                             background: `linear-gradient(110deg, ${back} 10%, ${second} 100%)`,

//                           }}
//                           className="  h-[32px] w-[32px] rounded-full flex justify-center  items-center text-white font-bold text-[28px] leading-tight "
//                         >
//                           {p.country == 'INDIA' ? '₹' : p.country == 'USA' ? '$' : 'د.إ'}
//                         </div>
//                         <div className=" ml-1 ">
//                           <span className=" text-4xl font-semibold">{p.amount}</span>
//                           <span className=" text-lg font-semibold -top-3">
//                             / {p.duration}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="mt-6" >
//                         <div className=" flex items-center gap-2  text-sm font-semibold mt-2">
//                           <FcCheckmark size={17} />
//                           <h3 className=" ml-3">{p.features}</h3>
//                         </div>
//                       </div>

//                       <div className=" gap-2 text-white flex justify-center text-[12px] mt-11">
//                         <button
//                           className=" w-[68px] h-[25px] flex bg-[#407BFF] rounded-full justify-center items-center  "
//                           onClick={() => storeOrUpdate(p)}
//                         >
//                           <MdEdit size={12} />
//                           <div className=" ml-1 mt-[1px]">
//                             <h1>Edit</h1>
//                           </div>
//                         </button>
//                         <button onClick={()=>{distroy(p)}} className=" w-[68px] h-[25px] flex bg-[#D60000] rounded-full justify-center items-center   ">
//                           <div>
//                             <MdDelete size={12} />
//                           </div>
//                           <div className=" ml-1 mt-[1px]">
//                             <h1>Delete</h1>
//                           </div>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (packages?.map((p, index) => (
//                 <div key={index}>
//                   <div className=" flex justify-center">
//                     <div
//                       style={{
//                         background:"#BAB200"
//                         // style={{ background: p.back }}
//                       }}
//                       className="  w-[173px] h-[55px] rounded-2xl flex justify-center items-center text-white -mb-7"
//                     >
//                       <h3 className=" text-lg  font-semibold">{p.package_name}</h3>
//                     </div>
//                   </div>

//                   <div className="dark:bg-[#000000] bg-[#FFFFFF] border-[#D8D6D6] border-solid px-5 pt-10 pb-9 rounded-3xl w-[287px]">
//                     <div className=" flex items-center border-b pb-2 border-[#606060]">
//                       <div
//                         style={{
//                           background: `linear-gradient(110deg, "#04B84D" 10%, "#000000c7" 100%)`,
//                         }}
//                         className="  h-[32px] w-[32px] rounded-full flex justify-center  items-center text-white font-bold text-[28px] leading-tight "
//                       >
//                         {p.country == 'INDIA' ? '₹' : p.country == 'USA' ? '$' : 'د.إ'}
//                       </div>
//                       <div className=" ml-1 ">
//                         <span className=" text-4xl font-semibold">{p.amount}</span>
//                         <span className=" text-lg font-semibold -top-3">
//                           / {p.duration}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="mt-6">
//                       <div className=" flex items-center gap-2 text-sm font-semibold mt-2">
//                         <FcCheckmark size={17} />
//                         {p.features}
//                       </div>
//                     </div>
//                     <div className=" gap-2 text-white flex justify-center text-[12px] mt-11">
//                       <button
//                         className=" w-[68px] h-[25px] flex bg-[#407BFF] rounded-full justify-center items-center  "
//                         onClick={() => {storeOrUpdate(p)}}
//                       >
//                         <MdEdit size={12} />
//                         <div className=" ml-1 mt-[1px]">
//                           <h1>Edit</h1>
//                         </div>
//                       </button>
//                       <button onClick={()=>{distroy(p)}} className=" w-[68px] h-[25px] flex bg-[#D60000] rounded-full justify-center items-center   ">
//                         <div>
//                           <MdDelete size={12} />
//                         </div>
//                         <div className=" ml-1 mt-[1px]">
//                           <h1>Delete</h1>
//                         </div>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )))
//             }
//           </div>
//         </div>
//       </div>

//       {/* features modal  */}
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
//           // onClick={() => {
//           //   setModal(false);
//           // }}
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
//                   <div className=" bg-white px-7 py-6 rounded-2xl dark:text-white dark:bg-[#202125] max-w-[924px] font-[400]">
//                     <div className=" flex items-center">
//                       <div
//                         onClick={() => {
//                           setModal(false);
//                         }}
//                         className=" cursor-pointer"
//                       >
//                         <IoIosArrowBack />
//                       </div>
//                       <div>
//                         <h3 className=" font-bold  text-xl">{params.id ? 'Edit Pricing' : 'Add Pricing'}</h3>
//                       </div>
//                     </div>
//                     <div className=" ml-4 mt-3">
//                       <h3 className=" font-bold  text-xl">Package Name</h3>
//                       <div className=" flex flex-wrap mt-5 gap-4 ml-7">
//                         <div className="relative  inline-block w-[194px] font-semibold text-sm">
//                           <select name="country" value={params.country} onChange={(e)=>{changeValue(e)}} className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none h-[26px] w-[194px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">
//                             <option selected disabled>
//                               Select Country
//                             </option>
//                             {
//                               countries.map((count) => (
//                                 <option>{count}</option>
//                               ))
//                             }
//                           </select>

//                           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
//                             <IoIosArrowDown size={17} color="#B5B5B5" />
//                           </div>

//                         </div>

//                         <div className="relative  inline-block w-[194px] font-semibold text-sm">
//                           <select name="duration" value={params.duration} onChange={(e)=>{changeValue(e)}} className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none h-[26px] w-[194px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">
//                             <option selected disabled>
//                               Duration
//                             </option>
//                             {
//                               durations.map((dur) => (
//                                 <option>{dur}</option>
//                               ))
//                             }
//                           </select>
//                           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
//                             <IoIosArrowDown size={17} color="#B5B5B5" />
//                           </div>
//                         </div>
//                         <div>

//                         <div>
//                           <input
//                               type="text"
//                               placeholder=" Package Name"
//                               value={params.package_name}
//                               name="package_name"
//                               onChange={(e)=>{changeValue(e)}}
//                               className="bg-[#FFFFFF] text-[#B5B5B5] dark:bg-[#202125] dark:border-[#515151]  border border-[#D6D6D6]  h-[26px] w-[262px] text-sm    rounded-full px-4 "
//                             />
//                         </div>
//                         </div>
//                         {/* <div className="relative  inline-block w-[194px] font-semibold text-sm">
//                           <select name="package_name" value={params.package_name} onChange={(e)=>{changeValue(e)}} className="bg-[#FFFFFF]  text-[#B5B5B5] dark:bg-[#202125] border dark:border-[#515151] border-[#D6D6D6] appearance-none h-[26px] w-[194px] text-sm     pl-3 rounded-full py-[2px] pr-6     flex items-center ">
//                             <option selected disabled>
//                               Package Name
//                             </option>
//                             {
//                               packages.map((pack) => (
//                                 <option>{pack.package_name}</option>
//                               ))
//                             }
//                           </select>
//                           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  pr-3 text-gray-700">
//                             <IoIosArrowDown size={17} color="#B5B5B5" />
//                           </div>
//                         </div> */}
//                       </div>
//                       <div className="  mt-3">
//                         <h3 className=" font-bold  text-lg">Price</h3>
//                         <div className="flex flex-wrap mt-2 gap-4 ml-7">
//                           <div className=" text-sm">
//                             <input
//                               type="text"
//                               placeholder=" Price"
//                               value={params.amount}
//                               name="amount"
//                               onChange={(e)=>{changeValue(e)}}
//                               className="bg-[#FFFFFF] text-[#B5B5B5] dark:bg-[#202125] dark:border-[#515151]  border border-[#D6D6D6]  h-[26px] w-[262px] text-sm    rounded-full px-4 "
//                             />
//                              <div>
//                           {errors?.amount &&
//                             <div className="text-danger mt-1">
//                               {
//                                 errors.amount
//                               }
//                             </div>

//                           }
//                           </div>
//                           </div>
//                          <div>
//                           <div className="flex flex-wrap  gap-4 ml-7">
//                           <div>
//                             <label className=" ml-5">
//                               <input
//                                 type="radio"
//                                 name="status"
//                                  value='1'
//                                  defaultChecked={params.status == '1' ? true : false} onChange={(e) => changeValue(e)}
//                                 className="form-radio text-success peer"
//                               />
//                               <span
//                                 style={{ color: "#32e01d", fontSize: "18px" }}
//                                 className="peer-checked:text-success  roboto-light"
//                               >
//                                 Active
//                               </span>
//                             </label>
//                           </div>
//                           <div>
//                             <label className=" px-5">
//                               <input
//                                 type="radio"
//                                 name="status" value='0'
//                                 defaultChecked={params.status == '0' ? true : false} onChange={(e) => changeValue(e)}
//                                 className=" form-radio border-danger  w-5 h-5 text-danger peer"
//                               />
//                               <span
//                                 style={{ color: "red", fontSize: "18px" }}
//                                 className="peer-checked:text-success  roboto-light"
//                               >
//                                 Blocked
//                               </span>
//                             </label>
//                           </div>
//                           </div>
//                         <span className="text-danger font-semibold text-sm p-2">{errors.status}</span>

//                          </div>

//                         </div>

//                       </div>
//                       {/* <div className="mb-4">
//                                     <label>Select Background color</label>
//                                     <input type="color" placeholder="Enter Label Name" id="favcolor" value={params.back} name="back" onChange={(e) => changeValue(e)} />
//                                 </div> */}

//                       <div className="font-semibold  mt-5">
//                         <h3 className=" font-bold  text-lg">Features</h3>
//                         <div className=" mt-3  flex flex-wrap gap-5 ml-7">
//                           {/* {
//                             features.map((feat) => {
//                               return (
//                                 <div className=" flex items-center">
//                                   <input type="checkbox" name="" id="" />
//                                   <h4 className=" ml-2">{feat.feature}</h4>
//                                 </div>
//                               )
//                             })
//                           } */}

//                               {features.map((item: any) => {
//                                                     return (
//                                                         <label
//                                                             className="inline-flex me-4"
//                                                             key={item.id}
//                                                         >
//                                                             <input
//                                                                 type="checkbox"
//                                                                 className="form-checkbox text-primary"
//                                                                 value={item?.id}
//                                                                 defaultChecked={X.includes(
//                                                                     item?.feature
//                                                                 )}
//                                                                 onClick={(
//                                                                     e
//                                                                 ) => {
//                                                                     XX(
//                                                                         e.target
//                                                                     );
//                                                                 }}
//                                                             />
//                                                             <span>
//                                                                 {item?.feature}
//                                                             </span>
//                                                         </label>
//                                                     );
//                                                 })}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-10 font-bold flex items-center justify-end mb-5">
//                       <button
//                         type="button"
//                         className="  w-[107px] h-[26px] rounded-full  dark:border-white   border  border-black border-solid text-sm"
//                         onClick={() => {
//                           setModal(false);
//                         }}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="button"
//                         className=" w-[107px] h-[26px] rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm ml-2"
//                         onClick={()=>{formSubmit()}}
//                       >
//                        {params.id?'Update':' Add'}
//                       </button>
//                     </div>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>

//     </div>
//   );
// };

// export default Pricing;

// import React, { useState } from 'react';

// const restaurants = [
//   { id: 1, name: "Restaurant A" },
//   { id: 2, name: "Restaurant B" },
//   { id: 3, name: "Restaurant C" },
//   // ...other restaurants
// ];

// const Support = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

//   const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);
//     if (query) {
//       const filtered = restaurants.filter(restaurant =>
//         restaurant.name.toLowerCase().includes(query)
//       );
//       setFilteredRestaurants(filtered);
//     } else {
//       setFilteredRestaurants(restaurants);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={handleSearch}
//         placeholder="Search for restaurants"
//       />
//       <div>
//         {filteredRestaurants.length > 0 ? (
//           filteredRestaurants.map(restaurant => (
//             <div key={restaurant.id}>{restaurant.name}</div>
//           ))
//         ) : (
//           <div>No restaurants found</div>
//         )}
//       </div>

//       <div className="relative  ">
//   <div className="bg-white h-36 w-36 rounded-full absolute top-[50px] left-[555px] "></div>
//   <div className="bg-black h-24 w-36 absolute top-[110px] left-[555px]   "></div>
// </div>
// <div className="relative flex justify-center items-center h-screen w-screen">

// <div className="h-12 w-24 bg-indigo-500
//             rounded-tl-full rounded-tr-full "></div>
// </div>
//     </div>
//   );
// };

// export default Support;

import React from "react";

export default function Support() {
  return <div>Support</div>;
}
