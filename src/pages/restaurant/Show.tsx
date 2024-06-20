import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import box1 from "../../assets/images/box1.png";
import box2 from "../../assets/images/box2.png";
import box3 from "../../assets/images/box3.png";
import { IRootState } from "../../store";
import axios from "axios";
import { setPageTitle } from "../../store/themeConfigSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorHandle } from "../common/ErrorHandle";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {  RiHome4Line } from "react-icons/ri";
import PageLoader from "../../components/PageLoader";
import { IoIosArrowForward } from "react-icons/io";
const CrmSwal = withReactContent(Swal);
import IconMail from "../../components/Icon/IconMail";
import IconPlus from '../../components/Icon/IconPlus';
import IconChecks from '../../components/Icon/IconChecks';
import IconFile from '../../components/Icon/IconFile';
import IconServer from '../../components/Icon/IconServer';
import PerfectScrollbar from 'react-perfect-scrollbar';
import BranchList from "./BranchList";

export default function Show() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const restaurantId = location.state.restaurantId;
  console.log("restaurantId",restaurantId);
  const crmToken='8|wE3Mh4SVxwrcXeqKDcQIMZYC6RDVZ4IKGQcSTF5d937ad76e';
  const [resList, setResList] = useState<any>([]);
  const [activityList, setActivityList] = useState<any>([]);
  const [branchList, setBranchList] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  // const crmToken = useSelector(
  //   (state: IRootState) => state.themeConfig.crmToken
  // );
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
    finally {
      setIsLoading(false)
    }
  };

  console.log('branchlist', branchList);
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
    // if (!params.branch_name) {
    //   errors = {
    //     ...errors,
    //     branch_name: " Branch Name is required",
    //   };
    // }

    // if (!params.address) {
    //   errors = {
    //     ...errors,
    //     address: " Address is required",
    //   };
    // }
    // if (!params.city) {
    //   errors = {
    //     ...errors,
    //     city: " city is required",
    //   };
    // }
    // if (!params.state) {
    //   errors = {
    //     ...errors,
    //     state: " state is required",
    //   };
    // }
    // if (!params.pincode) {
    //   errors = {
    //     ...errors,
    //     pincode: " pincode is required",
    //   };
    // }

    // if (!params.country) {
    //   errors = {
    //     ...errors,
    //     country: " country is required",
    //   };
    // }

    // if (!params.time_zone) {
    //   errors = {
    //     ...errors,
    //     time_zone: " time_zone is required",
    //   };
    // }
    // if (!params.branch_email) {
    //   errors = {
    //     ...errors,
    //     branch_email: " branch_email is required",
    //   };
    // }

    // if (!params.branch_name) {
    //   errors = {
    //     ...errors,
    //     branch_name: " branch_name is required",
    //   };
    // }

    // if (!params.branch_phone) {
    //   errors = {
    //     ...errors,
    //     branch_phone: " branch_phone is required",
    //   };
    // }
    // if (!params.landline) {
    //   errors = {
    //     ...errors,
    //     landline: " landline is required",
    //   };
    // }
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
      if (response.data.status == 'error') {
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
        url: "https://cdn.onetapdine.com/api/restaurants/" + restaurantId + "/branch",
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



  return (
    <>
      {
        isLoading ? <PageLoader /> : (
          <div>
            <div>
              <div className="panel flex flex-col md:flex-row justify-between items-center overflow-x-auto whitespace-nowrap p-1.5 rounded-none">
                <div className="flex items-center overflow-x-auto whitespace-nowrap mb-2 md:mb-0">
                  <div className="rounded-full p-1.5 ltr:mr-3 rtl:ml-3">
                    <RiHome4Line className='opacity' size={20} color='gray' />
                  </div>
                  <IoIosArrowForward className='ltr:mr-3 opacity-25 font-thin' color='gray' />
                  <a href="/" className="block hover:underline text-gray-600 ltr:mr-3 rtl:ml-3 poppins-font" rel="noreferrer" >
                    Home
                  </a>
                  <IoIosArrowForward className='font-thin ml-3 mr-3 opacity-25' color='gray' />
                  <a href="/restaurants" className="block hover:underline text-gray-600 ltr:mr-3 rtl:ml-3 poppins-font" rel="noreferrer" >
                    Restaurants
                  </a>
                  <IoIosArrowForward className='font-thin ml-3 opacity-25' color='gray' />
                  <p className='ltr:ml-3 text-blue-700 poppins-font' >View</p>
                </div>
                <div className="flex gap-2 items-center overflow-x-auto">
                  {/* <button type="button" className="btn flex items-center gap-3 btn-sm btn-outline-info">Add Branch</button> */}
                  <a href={`https://${resList.sub_domain}.onetapdine.com`} target="_blank" className="text-black dark:text-white font-extrabold text-[15px]">
                    <button type="button" className="btn flex items-center gap-3 btn-sm btn-outline-primary">View Restaurants</button>
                  </a>
                  <button type="button" className="btn flex items-center gap-3 btn-sm btn-outline-danger">Delete</button>
                </div>
              </div>

            </div>

            <div className=" px-6 py-8 font-robotoLight">

              <div className="  grid xl:grid-cols-3 md:grid-cols-2 gap-5 lg:gap-10">
                <div className="panel h-full p-0">
                  <div className="flex p-5">
                    <div className="shrink-0 bg-primary/10 text-primary rounded-xl w-11 h-11 flex justify-center items-center dark:bg-primary dark:text-white-light">
                      <img src={box1} alt='' />
                    </div>
                    <div className="ltr:ml-3 rtl:mr-3 ">
                      <p className="text-lg lg:text-xl dark:text-white-light">{data.branchCount}</p>
                      <h5 className="text-[#506690] text-xs">Total number of branches</h5>
                    </div>
                  </div>

                </div>

                <div className="panel h-full p-0">
                  <div className="flex p-5">
                    <div className="shrink-0 bg-danger/10 text-danger rounded-xl w-11 h-11 flex justify-center items-center dark:bg-danger dark:text-white-light">
                      <img src={box2} alt='' />

                    </div>
                    <div className="ltr:ml-3 rtl:mr-3 ">
                      <p className="text-xl dark:text-white-light">{data.employeeCount}</p>
                      <h5 className="text-[#506690] text-xs"> Total number of employees</h5>
                    </div>
                  </div>

                </div>

                <div className="panel h-full p-0">
                  <div className="flex p-5">
                    <div className="shrink-0 bg-success/10 text-success rounded-xl w-11 h-11 flex justify-center items-center dark:bg-success dark:text-white-light">
                      <img src={box3} alt='' />


                    </div>
                    <div className="ltr:ml-3 rtl:mr-3 ">
                      <p className="text-xl  dark:text-white-light">{data.itemCount}</p>
                      <h5 className="text-[#506690] text-xs"> Total number of items
                      </h5>
                    </div>
                  </div>

                </div>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
                {/* restaiurant details  */}
                <div className="panel h-full w-full">
                  <div className="flex items-center justify-between p-2 border-b border-white-light dark:border-[#1b2e4b]">
                    <h5 className="poppins-btn text-lg">Restaurant Details</h5>
                  </div>
                  <div className="table-responsive">
                    <table className="min-w-full">
                      <tbody>
                        <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                          <td className="min-w-[150px] text-black dark:text-white">
                            <div className="flex">
                              <p className="whitespace-nowrap">Restaurants Name</p>
                            </div>
                          </td>
                          <td>{resList?.restaurant_name}</td>
                        </tr>
                        <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                          <td className="text-black dark:text-white">
                            <div className="flex">
                              <p className="whitespace-nowrap">Contact Name</p>
                            </div>
                          </td>
                          <td>{resList?.admin_name}</td>
                        </tr>
                        <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                          <td className="text-black dark:text-white">
                            <div className="flex">
                              <p className="whitespace-nowrap">Email</p>
                            </div>
                          </td>
                          <td>{resList?.admin_email}</td>
                        </tr>
                        <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                          <td className="text-black dark:text-white">
                            <div className="flex">
                              <p className="whitespace-nowrap">Contact Number</p>
                            </div>
                          </td>
                          <td>{resList?.admin_phone}</td>
                        </tr>
                        <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                          <td className="text-black dark:text-white">
                            <div className="flex">
                              <p className="whitespace-nowrap">No Of Branch</p>
                            </div>
                          </td>
                          <td>{resList?.no_of_branches}</td>
                        </tr>
                        <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                          <td className="text-black dark:text-white">
                            <div className="flex">
                              <p className="whitespace-nowrap">Mode</p>
                            </div>
                          </td>
                          <td>{resList?.mode==1?'Live':'Demo'}</td>
                        </tr>
                        <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                          <td className="text-black dark:text-white">
                            <div className="flex">
                              <p className="whitespace-nowrap">Status</p>
                            </div>
                          </td>
                          <td>{resList?.status==1?'Active':'Blocked'}</td>
                        </tr>
                        <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                          <td className="text-black dark:text-white">
                            <div className="flex">
                              <p className="whitespace-nowrap">Registered Date</p>
                            </div>
                          </td>
                          <td>{resList?.created_at}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="panel h-full">
                  <div className="flex items-start justify-between dark:text-white-light mb-5 -mx-5 p-5 pt-0 border-b border-white-light dark:border-[#1b2e4b]">
                    <h5 className="poppins-btn text-lg">Activity Log</h5>
                  </div>
                  <PerfectScrollbar className="perfect-scrollbar relative h-[360px] ltr:pr-3 rtl:pl-3 ltr:-mr-3 rtl:-ml-3">
                    <div className="space-y-7">
                      <div className="flex">
                        <div className="shrink-0 ltr:mr-2 rtl:ml-2 relative z-10 before:w-[2px] before:h-[calc(100%-24px)] before:bg-white-dark/30 before:absolute before:top-10 before:left-4">
                          <div className="bg-secondary shadow shadow-secondary w-8 h-8 rounded-full flex items-center justify-center text-white">
                            <IconPlus className="w-4 h-4" />
                          </div>
                        </div>
                        <div>
                          <h5 className="dark:text-white-light">
                            New project created :{' '}
                            <button type="button" className="text-success">
                              [VRISTO Admin Template]
                            </button>
                          </h5>
                          <p className="text-white-dark text-xs">27 Feb, 2020</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="shrink-0 ltr:mr-2 rtl:ml-2 relative z-10 before:w-[2px] before:h-[calc(100%-24px)] before:bg-white-dark/30 before:absolute before:top-10 before:left-4">
                          <div className="bg-success shadow-success w-8 h-8 rounded-full flex items-center justify-center text-white">
                            <IconMail className="w-4 h-4" />
                          </div>
                        </div>
                        <div>
                          <h5 className="dark:text-white-light">
                            Mail sent to{' '}
                            <button type="button" className="text-white-dark">
                              HR
                            </button>{' '}
                            and{' '}
                            <button type="button" className="text-white-dark">
                              Admin
                            </button>
                          </h5>
                          <p className="text-white-dark text-xs">28 Feb, 2020</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="shrink-0 ltr:mr-2 rtl:ml-2 relative z-10 before:w-[2px] before:h-[calc(100%-24px)] before:bg-white-dark/30 before:absolute before:top-10 before:left-4">
                          <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center text-white">
                            <IconChecks className="w-4 h-4" />
                          </div>
                        </div>
                        <div>
                          <h5 className="dark:text-white-light">Server Logs Updated</h5>
                          <p className="text-white-dark text-xs">27 Feb, 2020</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="shrink-0 ltr:mr-2 rtl:ml-2 relative z-10 before:w-[2px] before:h-[calc(100%-24px)] before:bg-white-dark/30 before:absolute before:top-10 before:left-4">
                          <div className="bg-danger w-8 h-8 rounded-full flex items-center justify-center text-white">
                            <IconChecks className="w-4 h-4" />
                          </div>
                        </div>
                        <div>
                          <h5 className="dark:text-white-light">
                            Task Completed :
                            <button type="button" className="text-success ml-1">
                              [Backup Files EOD]
                            </button>
                          </h5>
                          <p className="text-white-dark text-xs">01 Mar, 2020</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="shrink-0 ltr:mr-2 rtl:ml-2 relative z-10 before:w-[2px] before:h-[calc(100%-24px)] before:bg-white-dark/30 before:absolute before:top-10 before:left-4">
                          <div className="bg-warning w-8 h-8 rounded-full flex items-center justify-center text-white">
                            <IconFile className="w-4 h-4" />
                          </div>
                        </div>
                        <div>
                          <h5 className="dark:text-white-light">
                            Documents Submitted from <button type="button">Sara</button>
                          </h5>
                          <p className="text-white-dark text-xs">10 Mar, 2020</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="ltr:mr-2 rtl:ml-2">
                          <div className="bg-dark w-8 h-8 rounded-full flex items-center justify-center text-white">
                            <IconServer className="w-4 h-4" />
                          </div>
                        </div>
                        <div>
                          <h5 className="dark:text-white-light">Server rebooted successfully</h5>
                          <p className="text-white-dark text-xs">06 Apr, 2020</p>
                        </div>
                      </div>
                    </div>
                  </PerfectScrollbar>
                </div>
              </div>
              <BranchList restaurantId={restaurantId} />
            </div>
          </div>
        )
      }
    </>
  );
}
