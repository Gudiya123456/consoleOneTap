import React, { useState, useEffect, Fragment } from 'react'
import delete1 from '../../assets/images/delete.svg'
import { useDispatch, useSelector } from 'react-redux'
import nextwhite from "../../assets/images/nextwhite.svg"
import nextblack from "../../assets/images/nextblack.svg"
import edit from "../../assets/images/Edit.svg";
import viewBlack from "../../assets/images/Group 188.svg";
import GridBlack from "../../assets/images/View Module (3).svg";
import gridSelect from "../../assets/images/Group 201.svg";
import viewSelect from "../../assets/images/Group 203.svg";
import box1 from '../../assets/images/box1.png';
import box2 from '../../assets/images/box2.png';
import box3 from '../../assets/images/box3.png';
import arrowLight from '../../assets/images/box3.png';
import arrow from '../../assets/images/box3.png';

import { Dialog, Transition } from "@headlessui/react";
import { IRootState } from '../../store'
import axios from 'axios'
import { setPageTitle } from '../../store/themeConfigSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { ErrorHandle } from '../common/ErrorHandle'
import withReactContent from 'sweetalert2-react-content';
import Swal from "sweetalert2";
import { RiArrowLeftWideFill } from 'react-icons/ri'
const CrmSwal = withReactContent(Swal);


export default function Show() {
    const dispatch=useDispatch();
    const location = useLocation()
    const navigate = useNavigate();
    const restaurantId = location.state.restaurantId
    console.log(restaurantId)
    // alert('issss', restaurantId)
    const [resList, setResList] = useState<any>([]);
    const [activityList, setActivityList] = useState<any>([]);
    const [branchList, setBranchList] = useState<any>([]);
    const[data,setData]=useState<any>([]);
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const [grid, setGrid] = useState(false)
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [model, setModal] = useState(false);
    const [editModal,setEditModal]=useState(false);
    const[isLoading,setIsLoading]=useState(false);
    const[btnLoading,setBtnLoading]=useState(false);
    const [timeZones, setTimeZones] = useState([])
    const [branchModal,setBranchModal]=useState(false)

    useEffect(() => {
        dispatch(setPageTitle('Restaurant Details'));
        fetchRestaurantList();
    }, []);

    const fetchRestaurantList = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: "https://cdn.onetapdine.com/api/restaurants/" + restaurantId,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            console.log('fetch restaiurant', response.data)
            console.log('restaurants', response.data.restaurants)
            console.log('Branches', response.data.branches)


            if(response.data.status=='success'){
                setResList(response.data.restaurant);
                setActivityList(response.data.activities)
                setBranchList(response.data.branches)
                setTimeZones(response.data.timeZones)
                setData(response.data);
            }
            else if(response.data.status=='error'){
                // navigate('/restaurants')
                // alert(99)
            }
          

        } catch (error: any) {
            if (error.response.status == 401) {
                ErrorHandle();
            }
           console.log(error)
        }
    };

    const [defaultParams] = useState({
        id: resList.id,
        restaurant_name: resList.restaurant_name?resList.restaurant_name:'',
        branches: resList.branches,
        admin_email: resList.admin_email,
        admin_name: resList.admin_name,
        admin_phone: resList.admin_phone,
        mode: resList.mode,
        status: resList.status,


        // branch deatils 

        branch_name:branchList.branch_name,
        address:branchList.address,
        city:branchList.city,
        state:branchList.state,
        pincode:branchList.pincode,
        country:branchList.country,
        time_zone:branchList.time_zone,
        branch_email:branchList.branch_email,
        branch_phone:branchList.branch_phone,
        landline:branchList.landline,
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
    console.table(params)

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
       
        if (params.status == '') errors = { ...errors, status: 'The status field is required.' };
        if (params.mode == '') errors = { ...errors, mode: 'The mode field is required.' };
        if (!params.branches) {
            errors = { ...errors, branches: "Please select branches!" };
        }
        if (!params.branch_name) {
            errors = {
                ...errors,
                branch_name: " Branch Name is required",
            };
        }

        if (!params.address) {
            errors = {
                ...errors,
                address: " Address is required",
            };
        }
        if (!params.city) {
            errors = {
                ...errors,
                city: " city is required",
            };
        }
        if (!params.state) {
            errors = {
                ...errors,
                state: " state is required",
            };
        }
        if (!params.pincode) {
            errors = {
                ...errors,
                pincode: " pincode is required",
            };
        }
        
        if (!params.country) {
            errors = {
                ...errors,
                country: " country is required",
            };
        }
        
        if (!params.time_zone) {
            errors = {
                ...errors,
                time_zone: " time_zone is required",
            };
        }
        if (!params.branch_email) {
            errors = {
                ...errors,
                branch_email: " branch_email is required",
            };
        }

        if (!params.branch_name) {
            errors = {
                ...errors,
                branch_name: " branch_name is required",
            };
        }
        
        if (!params.branch_phone) {
            errors = {
                ...errors,
                branch_phone: " branch_phone is required",
            };
        }
        if (!params.landline) {
            errors = {
                ...errors,
                landline: " landline is required",
            };
        }
        // if (!params.status1) {
        //     errors = {
        //         ...errors,
        //         status1: " status1 is required",
        //     };
        // }
        // if (!params.mode1) {
        //     errors = {
        //         ...errors,
        //         mode1: " mode1 is required",
        //     };
        // }
        
        
       
        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const deleteUser = async(user: any = null) => {
    //   setModal(true)
                try {
                    const response = await axios({
                        method: "delete",
                        url:
                            "https://cdn.onetapdine.com/api/restaurants/" + user.id,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + crmToken,
                        },
                    });
                    if (response.data.status === "success") {
                        // setResList(resList.filter((d: any) => d.id !== user.id));
                        console.log('sucesss');
                        // alert("Restaurant has been deleted successfully.");
                        navigate('/restaurants')
                    }
                } catch (error) {
                    // if (error.response.status == 401) navigate('/login')
                        console.log(error);
                } finally {
                    console.log(errors);
                }
            }
    const storeOrUpdateApi = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: "https://cdn.onetapdine.com/api/restaurants",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + crmToken,
                },
            });
            if (response.data.status == 'success') {
                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });

                fetchRestaurantList()
                setEditModal(false)
            } else {
                alert("Failed")
            }

        } catch (error: any) {
            console.log(error)
            if (error.response.status === 401) {
                ErrorHandle();
            }
            if (error?.response?.status === 422) {
                const serveErrors = error.response.data.errors;
                let serverErrors = {};
                for (var key in serveErrors) {
                    serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
                    console.log(serveErrors[key][0])
                }
                setErros(serverErrors);
                CrmSwal.fire({
                    title: "Server Validation Error! Please solve",
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    showCancelButton: false,
                    width: 450,
                    timer: 2000,
                    customClass: {
                        popup: "color-danger"
                    }
                });
            }
        } finally {
            setBtnLoading(false)
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
                mode: data.mode ? '1' : '0',
                status: data.status ? '1' : '0',
            });
        }
        setEditModal(true)
    }

    // const editBranch=()=>{
    //     setBranchModal(true)
    // }

    const editBranch = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: "https://cdn.onetapdine.com/api/restaurants",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + crmToken,
                },
            });
            if (response.data.status == 'success') {
                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });

                fetchRestaurantList()
                setEditModal(false)
            } else {
                alert("Failed")
            }

        } catch (error: any) {
            console.log(error)
            if (error.response.status === 401) {
                ErrorHandle();
            }
            if (error?.response?.status === 422) {
                const serveErrors = error.response.data.errors;
                let serverErrors = {};
                for (var key in serveErrors) {
                    serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
                    console.log(serveErrors[key][0])
                }
                setErros(serverErrors);
                CrmSwal.fire({
                    title: "Server Validation Error! Please solve",
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    showCancelButton: false,
                    width: 450,
                    timer: 2000,
                    customClass: {
                        popup: "color-danger"
                    }
                });
            }
        } finally {
            setBtnLoading(false)
        }
    };
    
    return (
        <div className=' font-robotoLight'>
            <div className='flex justify-end gap-3 mb-5' >

                <div className='flex gap-1 '   >
                    <img src={edit} />
                    <button type="button" onClick={()=>{storeOrUpdate(resList)}} className=' text-black dark:text-white font-extrabold text-[15px]' >
                        Edit Restaurant
                    </button>
                </div>
                <div className='flex gap-1'  >
                    <img src={delete1} />
                    <button type="button" onClick={()=>{setModal(true)}} className=' text-black dark:text-white whitespace-nowrap font-extrabold text-[15px]' >
                        Delete Restaurant
                    </button>
                </div>
            </div>


            <div className="  grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                                <div className="rounded-lg  ">
                                    <div className="dark:bg-black bg-white  rounded-t-3xl rounded-br-3xl  firstbox flex items-center">
                                        <h2 className=" dark:text-white text-black ml-5 mr-3 font-medium text-xl">
                                        Total number of branches
                                        </h2>
                                    </div>
                                    <div className=" flex ">
                                        <div className=" flex-1 dark:text-white text-black dark:bg-black bg-white rounded-b-3xl  secondbox">
                                            <h1 className=" ml-7 font-bold dark:text-white text-black text-4xl">{data.branchCount}</h1>
                                        </div>
                                        <div className=" w-5 h-5 dark:bg-black bg-white  "></div>
                                        <div className=" dark:bg-[#202125] bg-[#f2f2f2]     w-28   flex  justify-center items-center rounded-tl-2xl  -ml-5 -mt-0">
                                            <img
                                                src={box1}
                                                alt=""
                                               
                                                className=" object-contain  w-12 h-12 "
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg  ">
                                    <div className="dark:bg-black bg-white  rounded-t-3xl rounded-br-3xl  firstbox flex items-center">
                                        <h2 className=" dark:text-white text-black ml-7 font-medium text-xl">
                                        Total number of  employees
                                        </h2>
                                    </div>
                                    <div className=" flex ">
                                        <div className=" flex-1 dark:text-white text-black dark:bg-black bg-white rounded-b-3xl  secondbox">
                                            <h1 className=" ml-7 font-bold dark:text-white text-black text-4xl">{data.employeeCount}</h1>
                                        </div>
                                        <div className=" w-5 h-5 dark:bg-black bg-white  "></div>
                                        <div className=" dark:bg-[#202125] bg-[#f2f2f2]     w-28   flex  justify-center items-center rounded-tl-2xl  -ml-5 -mt-0">
                                            <img
                                                src={box2}
                                                alt=""
                                               
                                                className=" object-contain  w-12 h-12 "
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg  ">
                                    <div className="dark:bg-black bg-white  rounded-t-3xl rounded-br-3xl  firstbox flex items-center">
                                        <h2 className=" dark:text-white text-black ml-7 font-medium text-xl">
                                        Total number of items
                                        </h2>
                                    </div>
                                    <div className=" flex ">
                                        <div className=" flex-1 dark:text-white text-black dark:bg-black bg-white rounded-b-3xl  secondbox">
                                            <h1 className=" ml-7 font-bold dark:text-white text-black text-4xl">{data.itemCount}</h1>
                                        </div>
                                        <div className=" w-5 h-5 dark:bg-black bg-white  "></div>
                                        <div className=" dark:bg-[#202125] bg-[#f2f2f2]     w-28   flex  justify-center items-center rounded-tl-2xl  -ml-5 -mt-0">
                                            <img
                                                src={box3}
                                                alt=""
                                               
                                                className=" object-contain  w-12 h-12 "
                                            />
                                        </div>
                                    </div>
                                </div> 
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
                            <p className="text-sm font-robotoLight "> : {resList?.restaurant_name} </p>
                        </div>
                    </div>
                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Contact Name</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight "> : {resList?.admin_name} </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Email</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: {resList?.admin_email} </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Contact Number</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: {resList?.admin_phone} </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Branches</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">
                                : {resList.branches}
                            </p>
                        </div>
                    </div>
                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Mode</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: {resList.mode==1?'Live':'Demo'}</p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Status</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: {resList.mode==1?'Active':'Blocked'}</p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold">Date Created </h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: {resList.created_at}</p>
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
                        activityList.length?(
                            activityList.map((activity)=>{
                                return(
                                    <>
                                    <div className="p-2 px-3 dark:bg-[#3D3D3D] bg-[#EEEEEE] text-black dark:text-white rounded-xl mt-2">
                        <h5 className="text-md font-robotoLight ">{activity.description}</h5>
                        <h5 className="text-md font-robotoLight ">{activity.created_at}</h5>
                    </div>
                                    </>
                                )
                            })
                        ):<div className='text-black dark:text-white' >No Activities Found</div>
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
                            {
                                branchList.length?(
                                    <div>
                                        {
                                            branchList.map((branch1)=>{
                                                return(
                                                    <div className=" bg-white dark:bg-black p-3 pl-7 rounded-lg text-white">
                                <div className=" flex text-center justify-center items-center">
                                    <h1 className="text-lg font-robotoLight dark:text-white text-black">
                                        Branch Details{" "}
                                    </h1>
                                </div>

                                <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Branch Name </h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight "> :  {branch1.branch_name} </p>
                        </div>
                    </div>
                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Contact Name</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight "> :   {resList.admin_name} </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Email</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: {resList.admin_email} </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Contact Number</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: {resList.admin_phone} </p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Branches</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">
                                : {resList.branches}
                            </p>
                        </div>
                    </div>
                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Mode</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: {branch1.mode==1?'Live':'Demo'}</p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Status</h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: {branch1.status==1?'Active':'Blocked'}</p>
                        </div>
                    </div>

                    <div className="flex  items-center m-2 text-black dark:text-white ">
                        <div className=" w-36">
                            <h5 className="text-md font-robotoLight font-bold ">Date Created </h5>
                        </div>
                        <div className=" ">
                            <p className="text-sm font-robotoLight ">: {branch1.created_at}</p>
                        </div>
                    </div>
                            </div>
                                                )
                                            })
                                        }
                                    </div>
                                ):'No Branch Details  Found'
                            }
                        
                        
                        </div>
                    ) : (
                        <div
                            className="panel dark:bg-black dark:text-white bg-white text-black rounded-xl mt-2"
                        >
                            {branchList.length ? (
                                <div className="table-responsive mb-5 p-3 ">
                                    <>
                                        <div className=" dark:bg-[#35373C] bg-[#DDDDDD] text-black dark:text-white grid grid-cols-6 p-2 rounded-lg ">
                                            <div className=" flex items-center justify-center">
                                                <h3>Branch Name</h3>
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

                                        {branchList.map((branch:any) => {
                                            return (
                                                <div
                                                    className=" dark:bg-[#202125] bg-[#F2F2F2] dark:text-white text-black grid grid-cols-6 p-2 rounded-lg mt-1"
                                                    key={branch.id}
                                                >
                                                    <div className=" flex items-center justify-center">
                                                        <h3> {branch.branch_name}</h3>
                                                    </div>
                                                    <div className=" flex items-center justify-center">
                                                        <h3>{branch.address}</h3>
                                                    </div>
                                                    <div className=" flex items-center justify-center">
                                                        <h3>{branch.city}</h3>
                                                    </div>
                                                    <div className=" flex items-center justify-center">
                                                        <h3>{branch.country}</h3>
                                                    </div>
                                                    <div className=" flex items-center justify-center">
                                                        <div
                                                            className={`badge text-center w-20 rounded-lg h-6  text-[#12DD00]  ${branch.status == "1"
                                                                    ? "bg-[#FFFFFF] text-[#12DD00] text-center"
                                                                    : "text-[#D10000] bg-[#FFFFFF] text-center"
                                                                }`}
                                                        >
                                                            {branch.status == 1 ? "Active" : "Blocked"}
                                                        </div>
                                                    </div>
                                                    <div className=" flex items-center justify-center">
                                                        {
                                                            branch.id=='1'?<div onClick={()=>{editBranch(branch)}}>Edit</div>: <img
                                                            src={themeConfig.theme == 'dark' ? nextwhite : nextblack}
                                                            // src={require("./images/arrow.png")}
                                                            className=" w-5 h-5"
                                                        />
                                                        }
                                                       
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


                {/* deletee modal for restaurant  */}
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
                                        onClick={()=>{deleteUser(resList)}}
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
                                        <div className='flex gap-2 items-center ' >
                                            <div className='' alt="" onClick={() => { setEditModal(false) }}>{themeConfig.theme == 'dark' ? <RiArrowLeftWideFill size="25" /> : <RiArrowLeftWideFill size="25" />}</div>
                                            <h5 className="text-lg font-bold dark:text-white ">
                                               
                                                Edit Restaurant
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
                                                        name="restaurant_name"
                                                        value={params.restaurant_name}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.restaurant_name ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.restaurant_name
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>

                                               
                                                <div className="">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                     Admin Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                                        name="admin_name"
                                                        value={params.admin_name}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.admin_name ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.admin_name
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="name">
                                                       Admin Phone
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                                        name="admin_phone"
                                                        value={params.admin_phone}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.admin_phone ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.admin_phone
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>


                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="phone">
                                                        Email Id
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                                        name="admin_email"
                                                        value={params.admin_email}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.admin_email ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.admin_email
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                </div>


                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                      Branches
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                                        name="branches"
                                                        value={params.branches}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.branches ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.branches
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                </div>
                                               

                                            </div>


                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">

                                                <div className="mb-1">
                                                    <div className="mt-4">
                                                        <label htmlFor="status" className='text-style roboto-light'>Mode</label>
                                                        <div className="mt-3">
                                                            <label className="inline-flex">
                                                                <input type="radio" name="mode" value="1"  defaultChecked={params.mode == '1' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-success peer" />
                                                                <span className="peer-checked:text-success text-style roboto-light">Live</span>
                                                            </label>
                                                            <label className="inline-flex px-5">
                                                                <input type="radio" name="mode" value="0" defaultChecked={params.mode == '0' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-secondary peer" />
                                                                <span className="peer-checked:text-secondary text-style roboto-light">Demo</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-semibold text-sm p-2">{errors.mode}</span>
                                                    </div>
                                                </div>

                                                

                                                <div className="mb-1">
                                                    <div className="mt-4">
                                                        <label htmlFor="status" className='text-style roboto-light'>Status</label>
                                                        <div className="mt-3">
                                                            <label className="inline-flex">
                                                                <input type="radio" name="status" value='1' defaultChecked={params.status == '1' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-success peer" />
                                                                <span className="peer-checked:text-success text-style roboto-light">Active</span>
                                                            </label>
                                                            <label className="inline-flex px-5">
                                                                <input type="radio" name="status" value='0' defaultChecked={params.status == '0' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-secondary peer" />
                                                                <span className="peer-checked:text-secondary text-style roboto-light">Blocked</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-semibold text-sm p-2">{errors.status}</span>
                                                    </div>
                                                </div>


                                                

                                            </div>


                                        </form>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button
                                                type="button"
                                                className="btn  btn-dark btn-sm px-10 rounded-2xl dark:bg-white dark:text-black "
                                                onClick={() => { formSubmit() }}
                                            >
                                                Update Restaurant
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* edit modal for Braches  */}
            <Transition appear show={branchModal} as={Fragment}>
                <Dialog as="div" open={branchModal} onClose={() => setBranchModal(true)}>
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
                                        <div className='flex gap-2 items-center ' >
                                            <div className='' alt="" onClick={() => { setBranchModal(false) }}>{themeConfig.theme == 'dark' ? <RiArrowLeftWideFill size="25" /> : <RiArrowLeftWideFill size="25" />}</div>
                                            <h5 className="text-lg font-bold dark:text-white ">
                                               
                                                Edit Branches
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="px-10 pb-5 dark:bg-[#202125] bg-white">
                                        <form>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 gap-x-5">
                                                <div className="">
                                                    <label className='text-style roboto-light' htmlFor="rname"  >
                                                        Branch Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                                        name="branch_name"
                                                        value={params.branch_name}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.branch_name ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.branch_name
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>

                                               
                                                <div className="">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                    Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                                        name="address"
                                                        value={params.address}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.address ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.address
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="name">
                                                      City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                                        name="city"
                                                        value={params.city}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.city ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.city
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>


                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="phone">
                                                        State
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                                        name="state"
                                                        value={params.state}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.state ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.state
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                </div>


                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                     Pincode
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                                        name="pincode"
                                                        value={params.pincode}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.pincode ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.pincode
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                </div>
                                                <div className="mb-1">
                                                    <label htmlFor="name" className='text-style roboto-light'>
                                                        Country
                                                    </label>

                                                    <select className="input-form dark:border-[#5E5E5E] dark:bg-transparent" name="country" value={params.country ? params.country : ''} onChange={(e) => changeValue(e)}>
                                                        <option value="">Select Country</option>
                                                        <option value="INDIA">INDIA</option>
                                                        <option value="USA">USA</option>
                                                        <option value="UAE">UAE</option>
                                                    </select>
                                                    {errors?.country ? (
                                                        <div className="text-danger mt-1">{errors.country}</div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                    TimeZone
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                                        name="time_zone"
                                                        value={params.time_zone}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.time_zone ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.time_zone
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                </div>
                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                  Branch Email
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                                        name="branch_email"
                                                        value={params.branch_email}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.branch_email ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.branch_email
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                </div>

                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                   Branch Phone
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                                        name="branch_phone"
                                                        value={params.branch_phone}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.branch_phone ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.branch_phone
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                </div>

                                                <div className="mb-1">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                   Landline
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                                        name="landline"
                                                        value={params.landline}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />  
                                                    {errors?.landline ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.landline
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                </div>

                                                <div className="mb-1">
                                                    <div className="mt-4">
                                                        <label htmlFor="status" className='text-style roboto-light'>Mode</label>
                                                        <div className="mt-3">
                                                            <label className="inline-flex">
                                                                <input type="radio" name="mode" value="1"  defaultChecked={params.mode == '1' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-success peer" />
                                                                <span className="peer-checked:text-success text-style roboto-light">Live</span>
                                                            </label>
                                                            <label className="inline-flex px-5">
                                                                <input type="radio" name="mode" value="0" defaultChecked={params.mode == '0' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-secondary peer" />
                                                                <span className="peer-checked:text-secondary text-style roboto-light">Demo</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-semibold text-sm p-2">{errors.mode}</span>
                                                    </div>
                                                </div>

                                                

                                                <div className="mb-1">
                                                    <div className="mt-4">
                                                        <label htmlFor="status" className='text-style roboto-light'>Status</label>
                                                        <div className="mt-3">
                                                            <label className="inline-flex">
                                                                <input type="radio" name="status" value='1' defaultChecked={params.status == '1' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-success peer" />
                                                                <span className="peer-checked:text-success text-style roboto-light">Active</span>
                                                            </label>
                                                            <label className="inline-flex px-5">
                                                                <input type="radio" name="status" value='0' defaultChecked={params.status == '0' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-secondary peer" />
                                                                <span className="peer-checked:text-secondary text-style roboto-light">Blocked</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-semibold text-sm p-2">{errors.status}</span>
                                                    </div>
                                                </div>
                                                {/* <div className="mb-1">
                                                    <label htmlFor="name" className='text-style roboto-light'>
                                                        Timezone
                                                    </label>

                                                    <select className="input-form dark:border-[#5E5E5E] dark:bg-transparent" name='time_zone' value={params.time_zone ? params.time_zone : ''} onChange={(e) => changeValue(e)} >
                                                        <option value=''>Select Timezone</option>
                                                        {timeZones[params.country]?.map((z) => (
                                                            <option value={z} key={z}>{z}</option>
                                                        ))}
                                                    </select>
                                                    {errors?.time_zone ? (
                                                        <div className="text-danger mt-1">{errors.time_zone}</div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div> */}
                                               

                                            </div>


                                            {/* <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">

                                                <div className="mb-1">
                                                    <div className="mt-4">
                                                        <label htmlFor="status" className='text-style roboto-light'>Mode</label>
                                                        <div className="mt-3">
                                                            <label className="inline-flex">
                                                                <input type="radio" name="mode" value="1"  defaultChecked={params.mode == '1' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-success peer" />
                                                                <span className="peer-checked:text-success text-style roboto-light">Live</span>
                                                            </label>
                                                            <label className="inline-flex px-5">
                                                                <input type="radio" name="mode" value="0" defaultChecked={params.mode == '0' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-secondary peer" />
                                                                <span className="peer-checked:text-secondary text-style roboto-light">Demo</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-semibold text-sm p-2">{errors.mode}</span>
                                                    </div>
                                                </div>

                                                

                                                <div className="mb-1">
                                                    <div className="mt-4">
                                                        <label htmlFor="status" className='text-style roboto-light'>Status</label>
                                                        <div className="mt-3">
                                                            <label className="inline-flex">
                                                                <input type="radio" name="status" value='1' defaultChecked={params.status == '1' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-success peer" />
                                                                <span className="peer-checked:text-success text-style roboto-light">Active</span>
                                                            </label>
                                                            <label className="inline-flex px-5">
                                                                <input type="radio" name="status" value='0' defaultChecked={params.status == '0' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-secondary peer" />
                                                                <span className="peer-checked:text-secondary text-style roboto-light">Blocked</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-semibold text-sm p-2">{errors.status}</span>
                                                    </div>
                                                </div>


                                                

                                            </div> */}


                                        </form>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button
                                                type="button"
                                                className="btn  btn-dark btn-sm px-10 rounded-2xl dark:bg-white dark:text-black "
                                                onClick={() => { formSubmit() }}
                                            >
                                                Update Branch
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
