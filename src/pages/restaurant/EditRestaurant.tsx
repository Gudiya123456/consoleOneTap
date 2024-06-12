import React, { useState, useEffect, Fragment } from "react";
import delete1 from "../../assets/images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import nextwhite from "../../assets/images/nextwhite.svg";
import nextblack from "../../assets/images/nextblack.svg";
import edit from "../../assets/images/Edit.svg";
import viewBlack from "../../assets/images/Group 188.svg";
import GridBlack from "../../assets/images/View Module (3).svg";
import gridSelect from "../../assets/images/Group 201.svg";
import viewSelect from "../../assets/images/Group 203.svg";
import box1 from "../../assets/images/box1.png";
import box2 from "../../assets/images/box2.png";
import box3 from "../../assets/images/box3.png";
import arrowLight from "../../assets/images/box3.png";
import arrow from "../../assets/images/box3.png";
import { MdRemoveRedEye } from "react-icons/md";

import { Dialog, Transition } from "@headlessui/react";
import { IRootState } from "../../store";
import axios from "axios";
import { setPageTitle } from "../../store/themeConfigSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ErrorHandle } from "../common/ErrorHandle";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { RiArrowLeftWideFill, RiHome4Line } from "react-icons/ri";
import PageLoader from "../../components/PageLoader";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const CrmSwal = withReactContent(Swal);

export default function Show() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  // alert('issss', restaurantId)
  const [resList, setResList] = useState<any>([]);
  const [activityList, setActivityList] = useState<any>([]);
  const [branchList, setBranchList] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const crmToken = useSelector(
    (state: IRootState) => state.themeConfig.crmToken
  );
  const [grid, setGrid] = useState(false);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const [model, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [timeZones, setTimeZones] = useState([]);
  const [branchModal, setBranchModal] = useState(false);

  useEffect(() => {
    dispatch(setPageTitle("Restaurant Details"));
    fetchRestaurantList();
  }, []);

  const fetchRestaurantList = async () => {
    setIsLoading(true)
    try {
      const response = await axios({
        method: "get",
        url: "https://cdn.onetapdine.com/api/restaurants/" + restaurantId,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crmToken,
        },
      });
      console.log("fetch restaiurant", response.data);
      console.log("restaurants", response.data.restaurants);
      console.log("Branches", response.data.branches);

      if (response.data.status == "success") {
        setResList(response.data.restaurant);
        setActivityList(response.data.activities);
        setBranchList(response.data.branches);
        setTimeZones(response.data.timeZones);
        setData(response.data);
      } else if (response.data.status == "error") {
        // navigate('/restaurants')
        // alert(99)
      }
    } catch (error: any) {
      if (error.response.status == 401) {
        ErrorHandle();
      }
      console.log(error);
    }
    finally{
        setIsLoading(false)
    }
  };

  const [defaultParams] = useState({
    id: resList.id,
    restaurant_name: resList.restaurant_name ? resList.restaurant_name : "",
    branches: resList.branches,
    admin_email: resList.admin_email,
    admin_name: resList.admin_name,
    admin_phone: resList.admin_phone,
    mode: resList.mode,
    status: resList.status,

    // branch deatils

    branch_name: branchList.branch_name,
    address: branchList.address,
    city: branchList.city,
    state: branchList.state,
    pincode: branchList.pincode,
    country: branchList.country,
    time_zone: branchList.time_zone,
    branch_email: branchList.branch_email,
    branch_phone: branchList.branch_phone,
    landline: branchList.landline,
    // mode:branchList.,
    // status:branchList.,
  });

  const [params, setParams] = useState<any>(
    JSON.parse(JSON.stringify(defaultParams))
  );
  const [errors, setErros] = useState<any>({});

  const changeValue = (e: any) => {
    const { value, name } = e.target;
    setErros({ ...errors, [name]: "" });
    setParams({ ...params, [name]: value });
  };
  console.table(params);

  const validate = () => {
    setErros({});
    let errors = {};

    if (!params.restaurant_name) {
      errors = {
        ...errors,
        restaurant_name: "restaurant name is required!",
      };
    }

    if (!params.admin_email) {
      errors = {
        ...errors,
        admin_email: "admin email is required",
      };
    }
    if (!params.admin_name) {
      errors = {
        ...errors,
        admin_name: "admin name is required",
      };
    }
    if (!params.admin_phone) {
      errors = {
        ...errors,
        admin_phone: "admin phone is required",
      };
    }

    if (!params.branches) {
      errors = {
        ...errors,
        branches: "No of Branch is required",
      };
    }

    if (params.status == "")
      errors = { ...errors, status: "The status field is required." };
    if (params.mode == "")
      errors = { ...errors, mode: "The mode field is required." };
    if (!params.branches) {
      errors = { ...errors, branches: "Please select branches!" };
    }
 

    console.log(errors);
    setErros(errors);
    return { totalErrors: Object.keys(errors).length };
  };

  const deleteUser = async (user: any = null) => {
    //   setModal(true)
    try {
      const response = await axios({
        method: "delete",
        url: "https://cdn.onetapdine.com/api/restaurants/" + restaurantId,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crmToken,
        },
      });
      if (response.data.status === "success") {
        // setResList(resList.filter((d: any) => d.id !== user.id));
        console.log("sucesss");
        // alert("Restaurant has been deleted successfully.");
        navigate("/restaurants");
      }
      if(response.data.status=='error'){
        Swal.fire({
            icon: response.data.status,
            title: response.data.title,
            text: response.data.message,
            padding: "2em",
            customClass: "sweet-alerts",
          });
        // alert(response.data.message)
        setModal(false);
      }
    } catch (error) {
      // if (error.response.status == 401) navigate('/login')
      console.log(error);
    } finally {
      console.log(errors);
    }
  };
  const storeOrUpdateApi = async (data: any) => {
    setBtnLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: "https://cdn.onetapdine.com/api/restaurants",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + crmToken,
        },
      });
      if (response.data.status == "success") {
        Swal.fire({
          icon: response.data.status,
          title: response.data.title,
          text: response.data.message,
          padding: "2em",
          customClass: "sweet-alerts",
        });

        fetchRestaurantList();
        setEditModal(false);
      } else {
        alert("Failed");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        ErrorHandle();
      }
      if (error?.response?.status === 422) {
        const serveErrors = error.response.data.errors;
        let serverErrors = {};
        for (var key in serveErrors) {
          serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
          console.log(serveErrors[key][0]);
        }
        setErros(serverErrors);
        CrmSwal.fire({
          title: "Server Validation Error! Please solve",
          toast: true,
          position: "top",
          showConfirmButton: false,
          showCancelButton: false,
          width: 450,
          timer: 2000,
          customClass: {
            popup: "color-danger",
          },
        });
      }
    } finally {
      setBtnLoading(false);
    }
  };

  const formSubmit = () => {
    const isValid = validate();
    if (isValid.totalErrors) return false;
    const data = new FormData();
    data.append("id", params.id);
    data.append("restaurant_name", params.restaurant_name);
    data.append("branches", params.branches);
    data.append("admin_name", params.admin_name);
    data.append("admin_email", params.admin_email);
    data.append("admin_phone", params.admin_phone);
    data.append("mode", params.mode);
    data.append("status", params.status);
    storeOrUpdateApi(data);
  };

  const storeOrUpdate = (data) => {
    setErros({});
    if (data) {
      setParams({
        id: data.id,
        restaurant_name: data.restaurant_name,
        branches: data.branches,
        admin_name: data.admin_name,
        admin_email: data.admin_email,
        admin_phone: data.admin_phone,
        mode: data.mode ? "1" : "0",
        status: data.status ? "1" : "0",
      });
    }
    setEditModal(true);
  };

  // const editBranch=()=>{
  //     setBranchModal(true)
  // }

  const editBranch = async (data: any) => {
    setBtnLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: "https://cdn.onetapdine.com/api/restaurants/"+restaurantId +"/branch",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + crmToken,
        },
      });
      if (response.data.status == "success") {
        Swal.fire({
          icon: response.data.status,
          title: response.data.title,
          text: response.data.message,
          padding: "2em",
          customClass: "sweet-alerts",
        });

        fetchRestaurantList();
        setBranchModal(false);
      } else {
        alert("Failed");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        ErrorHandle();
      }
      if (error?.response?.status === 422) {
        const serveErrors = error.response.data.errors;
        let serverErrors = {};
        for (var key in serveErrors) {
          serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
          console.log(serveErrors[key][0]);
        }
        setErros(serverErrors);
        CrmSwal.fire({
          title: "Server Validation Error! Please solve",
          toast: true,
          position: "top",
          showConfirmButton: false,
          showCancelButton: false,
          width: 450,
          timer: 2000,
          customClass: {
            popup: "color-danger",
          },
        });
      }
    } finally {
      setBtnLoading(false);
    }
  };

  const editStoreUpdate=(data)=>{
    setErros({});
    if (data) {
      setParams({
        id: data.id,
        branch_name: data.branch_name,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        area: data.area,
        country: data.country,
        time_zone: data.time_zone,
        branch_email: data.branch_email,
        branch_phone: data.branch_phone,
        landline: data.landline,
        mode: data.mode ? "1" : "0",
        status: data.status ? "1" : "0",
      });
    }
    setBranchModal(true);
  }

  const editFormSubmit = () => {
    // const isValid = validate();
    // if (isValid.totalErrors) return false;
    const data = new FormData();
    data.append("id", params.id);
    data.append("branch_name", params.branch_name);
    data.append("address", params.address);
    data.append("city", params.city);
    data.append("state", params.state);
    data.append("pincode", params.pincode);
    data.append("area", params.area);
    data.append("country", params.country);
    data.append("time_zone", params.time_zone);
    data.append("branch_email", params.branch_email);
    data.append("branch_name", params.branch_name);
    data.append("branch_phone", params.branch_phone);
    data.append("landline", params.landline);
    data.append("mode", params.mode);
    data.append("status", params.status);
    editBranch(data);
  };

  return (
   <>
   {
    isLoading?<PageLoader/>:(
        <div>
          <div>
                        <div className="panel flex justify-between items-center overflow-x-auto whitespace-nowrap p-1.5 rounded-none ">
                            <div className="flex  items-center overflow-x-auto whitespace-nowrap " >
                                <div className="rounded-full p-1.5   ltr:mr-3 rtl:ml-3">
                                    <RiHome4Line className=' opacity' size={20} color='gray' />

                                </div>
                                <IoIosArrowForward className='ltr:mr-3 opacity-25 font-thin' color='gray' />

                                <a href="/" style={{ letterSpacing: '1px', fontFamily: 'Poppins', fontSize: '0.85rem', fontWeight: '400', lineHeight: '25px' }} className="block hover:underline text-gray-600  ltr:mr-3 rtl:ml-3" rel="noreferrer">
                                    Home
                                </a>

                                <IoIosArrowForward className='font-thin ml-3 mr-3 opacity-25' color='gray' />

                                <a href="/restaurants" style={{ letterSpacing: '1px', fontFamily: 'Poppins', fontSize: '0.85rem', fontWeight: '400', lineHeight: '25px' }} className="block hover:underline text-gray-600  ltr:mr-3 rtl:ml-3" rel="noreferrer">
                                    Restaurants
                                </a>


                                <IoIosArrowForward className='font-thin ml-3 opacity-25' color='gray' />

                                <p style={{ letterSpacing: '1px', fontFamily: 'Poppins', fontSize: '0.85rem', fontWeight: '400', lineHeight: '25px' }} className='ltr:ml-3 text-blue-700' >Edit Restaurants</p>

                            </div>
                            <div className="flex  items-center overflow-x-auto">


                                <a href="/restaurants" style={{ letterSpacing: '1px', fontFamily: 'Poppins', fontWeight: '400', lineHeight: '25px' }} className="flex  items-center hover:underline text-gray-600 text-[13px]  ltr:mr-10 rtl:ml-3" rel="noreferrer">
                                    <IoIosArrowBack
                                        className='font-thin ml-2 mr-2 ' color='gray' />  Back
                                </a>

                            </div>
                        </div>
                    </div>
        <div className="px-6 py-6" >
        <div className="px-8 py-8 dark:bg-[#202125] bg-white">
                      <form>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 gap-x-5">
                          <div className="">
                            <label
                              className="text-style roboto-light"
                              htmlFor="rname"
                            >
                              Restaurant Name
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="restaurant_name"
                              value={params.restaurant_name}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.restaurant_name ? (
                              <div className="text-danger mt-1">
                                {errors.restaurant_name}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
  
                          <div className="">
                            <label
                              className="text-style roboto-light"
                              htmlFor="email"
                            >
                              Admin Name
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="admin_name"
                              value={params.admin_name}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.admin_name ? (
                              <div className="text-danger mt-1">
                                {errors.admin_name}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="name"
                            >
                              Admin Phone
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="admin_phone"
                              value={params.admin_phone}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.admin_phone ? (
                              <div className="text-danger mt-1">
                                {errors.admin_phone}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
  
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="phone"
                            >
                              Email Id
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="admin_email"
                              value={params.admin_email}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.admin_email ? (
                              <div className="text-danger mt-1">
                                {errors.admin_email}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
  
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="email"
                            >
                              Branches
                            </label>
                            <input
                              type="number"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="branches"
                              value={params.branches}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.branches ? (
                              <div className="text-danger mt-1">
                                {errors.branches}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="rname"
                            >
                              Branch Name
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="branch_name"
                              value={params.branch_name}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.branch_name ? (
                              <div className="text-danger mt-1">
                                {errors.branch_name}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
  
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="email"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="address"
                              value={params.address}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.address ? (
                              <div className="text-danger mt-1">
                                {errors.address}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="name"
                            >
                              Area
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="area"
                              value={params.area}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.area ? (
                              <div className="text-danger mt-1">
                                {errors.area}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="name"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="city"
                              value={params.city}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.city ? (
                              <div className="text-danger mt-1">
                                {errors.city}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
  
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="phone"
                            >
                              State
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="state"
                              value={params.state}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.state ? (
                              <div className="text-danger mt-1">
                                {errors.state}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
  
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="email"
                            >
                              Pincode
                            </label>
                            <input
                              type="number"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="pincode"
                              value={params.pincode}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.pincode ? (
                              <div className="text-danger mt-1">
                                {errors.pincode}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="mb-1">
                            <label
                              htmlFor="name"
                              className="text-style roboto-light"
                            >
                              Country
                            </label>
  
                            <select
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="country"
                              value={params.country ? params.country : ""}
                              onChange={(e) => changeValue(e)}
                            >
                              <option value="">Select Country</option>
                              <option value="INDIA">INDIA</option>
                              <option value="USA">USA</option>
                              <option value="UAE">UAE</option>
                            </select>
                            {errors?.country ? (
                              <div className="text-danger mt-1">
                                {errors.country}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="email"
                            >
                              TimeZone
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="time_zone"
                              value={params.time_zone}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.time_zone ? (
                              <div className="text-danger mt-1">
                                {errors.time_zone}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="email"
                            >
                              Branch Email
                            </label>
                            <input
                              type="email"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="branch_email"
                              value={params.branch_email}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.branch_email ? (
                              <div className="text-danger mt-1">
                                {errors.branch_email}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
  
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="email"
                            >
                              Branch Phone
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="branch_phone"
                              value={params.branch_phone}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.branch_phone ? (
                              <div className="text-danger mt-1">
                                {errors.branch_phone}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
  
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="email"
                            >
                              Landline
                            </label>
                            <input
                              type="number"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="landline"
                              value={params.landline}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.landline ? (
                              <div className="text-danger mt-1">
                                {errors.landline}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="mb-1">
                                        <label
                                            htmlFor="name"
                                            className="text-style roboto-light"
                                        >
                                            Mode
                                        </label>

                                        <select
                                            className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="mode"
                                            value={params.mode ? params.mode : ""}
                                            onChange={(e) => changeValue(e)}
                                        >
                                            <option className="" value="">
                                                Select Mode
                                            </option>
                                            <option className="" value="1" defaultChecked={params.mode == '1' ? true : false} >
                                                Live
                                            </option>
                                            <option className="" value="0" defaultChecked={params.mode == '0' ? true : false} >
                                                Demo
                                            </option>

                                        </select>
                                        {errors?.mode ? (
                                            <div className="text-danger mt-1">
                                                {errors.mode}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="mb-1">
                                        <label
                                            htmlFor="name"
                                            className="text-style roboto-light"
                                        >
                                            Status
                                        </label>

                                        <select
                                            className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="status"
                                            value={params.status ? params.status : ""}
                                            onChange={(e) => changeValue(e)}
                                        >
                                            <option className="" value="">
                                                Select Status
                                            </option>
                                            <option className="" value="1" defaultChecked={params.mode == '1' ? true : false} >
                                                Active
                                            </option>
                                            <option className="" value="0" defaultChecked={params.mode == '0' ? true : false} >
                                                Disable
                                            </option>

                                        </select>
                                        {errors?.status ? (
                                            <div className="text-danger mt-1">
                                                {errors.status}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                          <div className="mb-1">
                                        <label
                                            htmlFor="name"
                                            className="text-style roboto-light"
                                        >
                                            Mode
                                        </label>

                                        <select
                                            className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="mode"
                                            value={params.mode ? params.mode : ""}
                                            onChange={(e) => changeValue(e)}
                                        >
                                            <option className="" value="">
                                                Select Mode
                                            </option>
                                            <option className="" value="1" defaultChecked={params.mode == '1' ? true : false} >
                                                Live
                                            </option>
                                            <option className="" value="0" defaultChecked={params.mode == '0' ? true : false} >
                                                Demo
                                            </option>

                                        </select>
                                        {errors?.mode ? (
                                            <div className="text-danger mt-1">
                                                {errors.mode}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="mb-1">
                                        <label
                                            htmlFor="name"
                                            className="text-style roboto-light"
                                        >
                                            Status
                                        </label>

                                        <select
                                            className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="status"
                                            value={params.status ? params.status : ""}
                                            onChange={(e) => changeValue(e)}
                                        >
                                            <option className="" value="">
                                                Select Status
                                            </option>
                                            <option className="" value="1" defaultChecked={params.mode == '1' ? true : false} >
                                                Active
                                            </option>
                                            <option className="" value="0" defaultChecked={params.mode == '0' ? true : false} >
                                                Disable
                                            </option>

                                        </select>
                                        {errors?.status ? (
                                            <div className="text-danger mt-1">
                                                {errors.status}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                        </div>
  
                        {/* <div className="flex flex-wrap mt-4 gap-3 ">
                          <div className="">
                            <div className="">
                              <label
                                htmlFor="status"
                                className="text-style roboto-light"
                              >
                                Mode
                              </label>
                              <div className="mt-3 ml-3">
                                <label className="inline-flex">
                                  <input
                                    type="radio"
                                    name="mode"
                                    value="1"
                                    defaultChecked={
                                      params.mode == "1" ? true : false
                                    }
                                    onChange={(e) => changeValue(e)}
                                    className="form-radio text-[#B3B3B3] dark:border-[#B3B3B3]  border-[#B3B3B3] peer"
                                  />
                                  <span className="peer-checked:text-[#5E5E5E] text-[#5E5E5E] text-[14px] font-light  roboto-light">
                                    Live
                                  </span>
                                </label>
                                <label className="inline-flex px-5">
                                  <input
                                    type="radio"
                                    name="mode"
                                    value="0"
                                    defaultChecked={
                                      params.mode == "0" ? true : false
                                    }
                                    onChange={(e) => changeValue(e)}
                                    className="form-radio text-[#B3B3B3] dark:border-[#B3B3B3]  border-[#B3B3B3] peer"
                                  />
                                  <span className="peer-checked:text-[#5E5E5E] text-[#5E5E5E] text-[14px] font-light roboto-light">
                                    Demo
                                  </span>
                                </label>
                              </div>
                              {errors.mode && (
                                <span className="text-danger font-semibold text-sm p-2">
                                  {errors.mode}
                                </span>
                              )}
                            </div>
                          </div>
  
                          <div className="mb-1">
                            <div className="">
                              <label
                                htmlFor="status"
                                className="text-style roboto-light"
                              >
                                Status
                              </label>
                              <div className="mt-3 ml-3">
                                <label className="inline-flex">
                                  <input
                                    type="radio"
                                    name="status"
                                    value="1"
                                    defaultChecked={
                                      params.status == "1" ? true : false
                                    }
                                    onChange={(e) => changeValue(e)}
                                    className="form-radio text-success dark:border-success  peer"
                                  />
                                  <span className="peer-checked:text-success  text-[14px] font-light text-success roboto-light">
                                    Active
                                  </span>
                                </label>
                                <label className="inline-flex px-5">
                                  <input
                                    type="radio"
                                    name="status"
                                    value="0"
                                    defaultChecked={
                                      params.status == "0" ? true : false
                                    }
                                    onChange={(e) => changeValue(e)}
                                    className="form-radio text-red-500  dark:border-red-500 border-red-500 peer"
                                  />
                                  <span className="peer-checked:text-red-500 text-[14px] font-light text-red-500  roboto-light">
                                    Blocked
                                  </span>
                                </label>
                              </div>
                              {errors.status && (
                                <span className="text-danger font-semibold text-sm p-2">
                                  {errors.status}
                                </span>
                              )}
                            </div>
                          </div>
                        </div> */}
                      </form>
                      <div className="mt-8 flex items-center justify-end">
                        <button
                          type="button"
                          className="btn  btn-dark btn-sm px-10 rounded-2xl dark:bg-white dark:text-black "
                          disabled={btnLoading}
                          onClick={() => {
                            formSubmit();
                          }}
                        >
                          {btnLoading?'Please wait':'Update'}
                        </button>
                      </div>
                    </div>
        </div>

        {/* edit modal for restaurant  */}
        <Transition appear show={editModal} as={Fragment}>
          <Dialog as="div" open={editModal} onClose={() => setEditModal(true)}>
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
                      <div className="flex gap-2 items-center ">
                        <div
                          className=""
                          alt=""
                          onClick={() => {
                            setEditModal(false);
                          }}
                        >
                          {themeConfig.theme == "dark" ? (
                            <RiArrowLeftWideFill size="25" />
                          ) : (
                            <RiArrowLeftWideFill size="25" />
                          )}
                        </div>
                        <h5 className="text-lg font-bold dark:text-white ">
                          Edit Restaurant
                        </h5>
                      </div>
                    </div>
                    <div className="px-10 pb-5 dark:bg-[#202125] bg-white">
                      <form>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 gap-x-5">
                          <div className="">
                            <label
                              className="text-style roboto-light"
                              htmlFor="rname"
                            >
                              Restaurant Name
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="restaurant_name"
                              value={params.restaurant_name}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.restaurant_name ? (
                              <div className="text-danger mt-1">
                                {errors.restaurant_name}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
  
                          <div className="">
                            <label
                              className="text-style roboto-light"
                              htmlFor="email"
                            >
                              Admin Name
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="admin_name"
                              value={params.admin_name}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.admin_name ? (
                              <div className="text-danger mt-1">
                                {errors.admin_name}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="name"
                            >
                              Admin Phone
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="admin_phone"
                              value={params.admin_phone}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.admin_phone ? (
                              <div className="text-danger mt-1">
                                {errors.admin_phone}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
  
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="phone"
                            >
                              Email Id
                            </label>
                            <input
                              type="text"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="admin_email"
                              value={params.admin_email}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.admin_email ? (
                              <div className="text-danger mt-1">
                                {errors.admin_email}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
  
                          <div className="mb-1">
                            <label
                              className="text-style roboto-light"
                              htmlFor="email"
                            >
                              Branches
                            </label>
                            <input
                              type="number"
                              className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                              name="branches"
                              value={params.branches}
                              onChange={(e) => {
                                changeValue(e);
                              }}
                            />
                            {errors?.branches ? (
                              <div className="text-danger mt-1">
                                {errors.branches}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
  
                        <div className="flex flex-wrap mt-4 gap-3 ">
                          <div className="">
                            <div className="">
                              <label
                                htmlFor="status"
                                className="text-style roboto-light"
                              >
                                Mode
                              </label>
                              <div className="mt-3 ml-3">
                                <label className="inline-flex">
                                  <input
                                    type="radio"
                                    name="mode"
                                    value="1"
                                    defaultChecked={
                                      params.mode == "1" ? true : false
                                    }
                                    onChange={(e) => changeValue(e)}
                                    className="form-radio text-[#B3B3B3] dark:border-[#B3B3B3]  border-[#B3B3B3] peer"
                                  />
                                  <span className="peer-checked:text-[#5E5E5E] text-[#5E5E5E] text-[14px] font-light  roboto-light">
                                    Live
                                  </span>
                                </label>
                                <label className="inline-flex px-5">
                                  <input
                                    type="radio"
                                    name="mode"
                                    value="0"
                                    defaultChecked={
                                      params.mode == "0" ? true : false
                                    }
                                    onChange={(e) => changeValue(e)}
                                    className="form-radio text-[#B3B3B3] dark:border-[#B3B3B3]  border-[#B3B3B3] peer"
                                  />
                                  <span className="peer-checked:text-[#5E5E5E] text-[#5E5E5E] text-[14px] font-light roboto-light">
                                    Demo
                                  </span>
                                </label>
                              </div>
                              {errors.mode && (
                                <span className="text-danger font-semibold text-sm p-2">
                                  {errors.mode}
                                </span>
                              )}
                            </div>
                          </div>
  
                          <div className="mb-1">
                            <div className="">
                              <label
                                htmlFor="status"
                                className="text-style roboto-light"
                              >
                                Status
                              </label>
                              <div className="mt-3 ml-3">
                                <label className="inline-flex">
                                  <input
                                    type="radio"
                                    name="status"
                                    value="1"
                                    defaultChecked={
                                      params.status == "1" ? true : false
                                    }
                                    onChange={(e) => changeValue(e)}
                                    className="form-radio text-success dark:border-success  peer"
                                  />
                                  <span className="peer-checked:text-success  text-[14px] font-light text-success roboto-light">
                                    Active
                                  </span>
                                </label>
                                <label className="inline-flex px-5">
                                  <input
                                    type="radio"
                                    name="status"
                                    value="0"
                                    defaultChecked={
                                      params.status == "0" ? true : false
                                    }
                                    onChange={(e) => changeValue(e)}
                                    className="form-radio text-red-500  dark:border-red-500 border-red-500 peer"
                                  />
                                  <span className="peer-checked:text-red-500 text-[14px] font-light text-red-500  roboto-light">
                                    Blocked
                                  </span>
                                </label>
                              </div>
                              {errors.status && (
                                <span className="text-danger font-semibold text-sm p-2">
                                  {errors.status}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                      <div className="mt-8 flex items-center justify-end">
                        <button
                          type="button"
                          className="btn  btn-dark btn-sm px-10 rounded-2xl dark:bg-white dark:text-black "
                          disabled={btnLoading}
                          onClick={() => {
                            formSubmit();
                          }}
                        >
                          {btnLoading?'Please wait':'Update Restaurant'}
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
    )
   }
   </>
  );
}
