import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import darkview from "../../assets/images/darkview.png";
import view from "../../assets/images/view.png";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import PlusDark from "../../assets/images/PlusDark.svg";
import Plus from "../../assets/images/Plus (1).svg";
import leftarrow from "../../assets/images/leftarrow.png";
import leftDark from "../../assets/images/Chevron Left (1).svg";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { setPageTitle } from "../../store/themeConfigSlice";
import { ErrorHandle } from "../common/ErrorHandle";
import PageLoader from "../../components/PageLoader";
import { useNavigate } from "react-router-dom";
const CrmSwal = withReactContent(Swal);
import { MdRemoveRedEye } from "react-icons/md";

const Authorization = () => {
  const [modal, setModal] = useState(false);
  const [permissionmodal, setpermissionModal] = useState(false);
  const [status, setStatus] = useState("");
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const [isLoading, setIsLoading] = useState(true);
  const crmToken = useSelector(
    (state: IRootState) => state.themeConfig.crmToken
  );
  const [authList, setAuthList] = useState<any>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setPageTitle("Authorization"));
    fetchAuthorization();
  }, []);

  // fetch Restaurant data
  const fetchAuthorization = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: "https://cdn.onetapdine.com/api/authorizations",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crmToken,
        },
      });
      if (response.data.status == "success") {
        setAuthList(response.data.users);
      }

      console.log(response.data);
    } catch (error: any) {
      if (error.response.status == 401) {
        ErrorHandle();
      } else console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [defaultParams] = useState({
    id: "",
    email: "",
    name: "",
    phone: "",
    role: "",
    status: "1",
  });
  const [params, setParams] = useState<any>(
    JSON.parse(JSON.stringify(defaultParams))
  );
  const [errors, setErros] = useState<any>({});
  const [btnLoading, setBtnLoading] = useState(false);
  const changeValue = (e: any) => {
    const { value, name } = e.target;
    setErros({ ...errors, [name]: "" });
    setParams({ ...params, [name]: value });
  };

  const validate = () => {
    setErros({});
    let errors = {};

    if (!params.name) {
      errors = { ...errors, name: "name is required!" };
    }

    if (!params.email) {
      errors = { ...errors, email: "email is required" };
    }
    if (!params.phone) {
      errors = { ...errors, phone: "phone is required" };
    }

    if (!params.role) {
      errors = { ...errors, role: "roles is required" };
    }

    if (!params.status) {
      errors = { ...errors, status: "Please select status!" };
    }

    console.log(errors);
    setErros(errors);
    return { totalErrors: Object.keys(errors).length };
  };
  const storeOrUpdateApi = async (data: any) => {
    setBtnLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: "https://cdn.onetapdine.com/api/authorizations",
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

        if (response.data.status == "success") {
          fetchAuthorization();
          setModal(false);
        } else {
          alert(9);
        }
      } else {
        alert("Failed");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status == 401) {
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
    data.append("email", params.email);
    data.append("name", params.name);
    data.append("phone", params.phone);
    data.append("role", params.role);
    data.append("status", params.status);
    storeOrUpdateApi(data);
  };
  const storeOrUpdate = (data) => {
    setErros({});
    if (data) {
      setParams({
        id: data.id,
        status: data.status,
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: data.role,
      });
    } else {
      const defaltData = JSON.parse(JSON.stringify(defaultParams));
      setParams(defaltData);
    }
    setModal(true);
  };

  return (
    <>
      <div className=""></div>
      <div className="flex justify-between mb-2">
        <div></div>
        <div
          className="flex gap-1"
          onClick={() => {
            storeOrUpdate();
          }}
        >
          <img src={themeConfig.theme == "dark" ? PlusDark : Plus} />
          <button
            type="button"
            className=" text-black dark:text-white font-extrabold text-[15px]"
          >
            Add Authoriation
          </button>
        </div>
      </div>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <div className=" dark:bg-black dark:text-white bg-white text-black rounded-xl mt-2">
            {authList.length ? (
              <div className="table-responsive mb-5 p-3">
                <div className="overflow-x-auto ">
                  {/* <div className="w-svw "> */}
                  <div className="min-w-max  md:min-w-full">
                    <div className="dark:bg-[#35373C] bg-[#DDDDDD] text-black dark:text-white  grid grid-cols-8 p-2 rounded-lg md:gap-3 break-all">
                      <div className="flex items-center justify-center ">
                        <h3>Sl.no</h3>
                      </div>
                      <div className="flex items-center justify-center">
                        <h3>Name</h3>
                      </div>
                      <div className="flex items-center justify-center">
                        <h3>Email</h3>
                      </div>
                      <div className="flex items-center justify-center">
                        <h3>Role</h3>
                      </div>
                      <div className="flex items-center justify-center">
                        <h3>Phone</h3>
                      </div>
                      <div className="flex items-center justify-center">
                        <h3>Status</h3>
                      </div>
                      <div className="flex items-center justify-center">
                        <h3>Permission</h3>
                      </div>
                    </div>

                    {authList.map((data, index) => (
                      <div
                        className="dark:bg-[#202125] bg-[#F2F2F2] dark:text-white text-black grid grid-cols-8 p-2 rounded-lg mt-1 md:gap-3 break-all"
                        key={data.id}
                      >
                        <div className="flex items-center justify-center ">
                          <h3>{index + 1}</h3>
                        </div>
                        <div className="flex items-center justify-center">
                          <h3>{data.name}</h3>
                        </div>
                        <div className="flex items-center justify-center">
                          <h3>{data.email}</h3>
                        </div>
                        <div className="flex items-center justify-center">
                          <h3>{data.role}</h3>
                        </div>
                        <div className="flex items-center justify-center">
                          <h3>{data.phone}</h3>
                        </div>
                        <div className="flex items-center justify-center">
                          <div
                            className={`badge text-center w-20 rounded-lg h-6 ${
                              data.status == 1
                                ? "bg-[#FFFFFF] text-[#12DD00]"
                                : "text-[#D10000] bg-[#FFFFFF]"
                            }`}
                          >
                            {data.status == 1 ? "Active" : "Disable"}
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            setpermissionModal(true);
                          }}
                          className="flex items-center justify-center"
                        >
                          <MdRemoveRedEye className="object-contain w-4 h-4 cursor-pointer" />
                        </div>
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => {
                              storeOrUpdate(data);
                            }}
                            className="w-[56px] h-[26px] bg-[#DDDDDD] rounded-2xl text-black"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <b>No Details Found</b>
            )}
          </div>
        </>
      )}

      {/* Add / Edit Authoriation? modal */}
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
                <Dialog.Panel className=" border-0   overflow-hidden  my-8 text-black dark:text-white-dark ">
                  <div className=" dark:bg-[#202125]  w-[600px] bg-[#FFFFFF] text-black dark:text-white p-4 px-6 rounded-2xl ">
                    <div className=" flex gap-2 items-center">
                      <img
                        src={themeConfig.theme == "dark" ? leftDark : leftarrow}
                        alt=""
                        className=" object-contain w-4 h-4"
                        onClick={() => setModal(false)}
                      />
                      <h3 className=" font-bold dark:text-white text-xl">
                        {params.id ? "Edit Authorization" : "Add Authorization"}
                      </h3>
                    </div>

                    <form>
                      <div className=" grid grid-cols-2 gap-2">
                        <div className=" mt-2">
                          <label
                            className="text-style roboto-light ml-2"
                            htmlFor="status"
                          >
                            Name
                          </label>
                          <div className="flex items-center border border-[#101012] dark:border-white rounded-3xl">
                            <div className="flex    px-[10px] py-[2px] items-center">
                              <input
                                type="text"
                                className=" dark:bg-transparent  focus:outline-none "
                                name="name"
                                value={params.name}
                                onChange={(e) => changeValue(e)}
                              />
                            </div>
                          </div>
                          {errors?.name ? (
                            <div className="text-danger mt-1">
                              {errors.name}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className=" mt-2">
                          <label
                            className="text-style roboto-light ml-2"
                            htmlFor="status"
                          >
                            Email
                          </label>
                          <div className="flex items-center border border-[#101012] dark:border-white rounded-3xl">
                            <div className="flex  flex-1   px-[10px] py-[2px] items-center">
                              <input
                                type="text"
                                className="flex-1 focus:outline-none dark:bg-transparent "
                                name="email"
                                value={params.email}
                                onChange={(e) => changeValue(e)}
                              />
                            </div>
                          </div>
                          {errors?.email ? (
                            <div className="text-danger mt-1">
                              {errors.email}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className=" grid grid-cols-2 gap-5">
                        <div className=" mt-2">
                          <label
                            className="text-style roboto-light ml-2"
                            htmlFor="status"
                          >
                            Phone
                          </label>
                          <div className="flex items-center border border-[#101012] dark:border-white rounded-3xl">
                            <div className="flex  flex-1   px-[10px] py-[2px] items-center">
                              <input
                                type="text"
                                className=" flex-1 focus:outline-none  dark:bg-transparent"
                                name="phone"
                                value={params.phone}
                                onChange={(e) => changeValue(e)}
                              />
                            </div>
                          </div>
                          {errors?.phone ? (
                            <div className="text-danger mt-1">
                              {errors.phone}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className=" mt-2">
                          <label
                            className="text-style roboto-light ml-2"
                            htmlFor="status"
                          >
                            Role
                          </label>
                          <div className="flex items-center border border-[#101012] dark:border-white rounded-3xl">
                            <div className="flex  flex-1   px-[10px] py-[2px] items-center">
                              <input
                                type="text"
                                className=" flex-1 border-none focus:outline-none dark:bg-transparent "
                                name="role"
                                value={params.role}
                                onChange={(e) => changeValue(e)}
                              />
                            </div>
                          </div>
                          {errors?.role ? (
                            <div className="text-danger mt-1">
                              {errors.role}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className=" mt-2">
                        <label
                          htmlFor="status"
                          className="text-style roboto-light ml-2"
                        >
                          Status
                        </label>
                        <div className="mt-3 ml-2">
                          <label className="inline-flex">
                            <input
                              type="radio"
                              name="status"
                              value="1"
                              defaultChecked={
                                params.status == "1" ? true : false
                              }
                              onChange={(e) => changeValue(e)}
                              className="form-radio text-success peer"
                            />
                            <span
                              style={{ color: "#32e01d" }}
                              className="peer-checked:text-success text-style roboto-light"
                            >
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
                              className=" form-radio border-danger  w-5 h-5 text-danger peer"
                            />
                            <span
                              style={{ color: "red" }}
                              className="peer-checked:text-denger text-style roboto-light"
                            >
                              Disable
                            </span>
                          </label>
                        </div>
                        <span className="text-danger font-semibold text-sm p-2">
                          {errors.status}
                        </span>
                      </div>
                      {/* <div className=" mt-2 ml-2">
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
                                            </div> */}
                    </form>
                    <div className="mt-4 flex items-center justify-end">
                      <button
                        type="button"
                        className="btn  btn-dark btn-sm  py-0 rounded-full border border-black dark:border-white     text-sm mr-2"
                        onClick={() => setModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn  btn-dark btn-sm  py-0 rounded-full border border-black dark:bg-white dark:text-black     text-sm mr-2"
                        onClick={() => formSubmit()}
                      >
                        {btnLoading
                          ? "Loading..."
                          : params.id
                          ? "Update"
                          : "Add"}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* permission modal  */}
      <Transition appear show={permissionmodal} as={Fragment}>
        <Dialog
          as="div"
          open={permissionmodal}
          onClose={() => setpermissionModal(true)}
        >
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
              setpermissionModal(false);
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
                <Dialog.Panel className=" border-0   overflow-hidden  my-8 text-black dark:text-white ">
                  <div className=" bg-white dark:bg-[#202125] p-4 px-6 rounded-2xl w-[595px]">
                    <div className=" flex items-center">
                      <img
                        onClick={() => {
                          setpermissionModal(false);
                        }}
                        src={themeConfig.theme == "dark" ? leftDark : leftarrow}
                        alt=""
                        className=" object-contain w-4 h-4 "
                      />
                      <h3 className=" font-bold dark:text-white text-lg">
                        Permissions
                      </h3>
                    </div>

                    <div className=" dark:bg-[#121212] bg-[#DDDDDD] text-black dark:text-white grid grid-cols-5  rounded-lg mt-2 h-[28px]">
                      <div className=" flex items-center justify-center">
                        <h3 className=" font-bold dark:text-white text-sm">
                          Name
                        </h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <h3 className=" font-bold dark:text-white text-sm">
                          View
                        </h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <h3 className=" font-bold dark:text-white text-sm">
                          Create
                        </h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <h3 className=" font-bold dark:text-white text-sm">
                          Edit
                        </h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <h3 className=" font-bold dark:text-white text-sm">
                          Delete
                        </h3>
                      </div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Profile</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Restaurant</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3 className="">Authorization</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Payments</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Pricing</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Invoice</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center"></div>
                      <div className=" flex items-center justify-center"></div>
                      <div className=" flex items-center justify-center"></div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white  grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Billing</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center"></div>
                      <div className=" flex items-center justify-center"></div>
                      <div className=" flex items-center justify-center"></div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Settings</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center"></div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center"></div>
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                      <button
                        type="button"
                        className="btn  btn-dark btn-sm w-[85px] h-[28px] rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm"
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

export default Authorization;
