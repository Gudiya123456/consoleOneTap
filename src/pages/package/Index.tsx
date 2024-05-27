import React, { useState,Fragment } from "react";

import plus from "../../assets/images/plus.png";
import right from "../../assets/images/right.png";
import wrong from "../../assets/images/wrong.png";
import { Dialog, Transition } from "@headlessui/react";
import leftarrow from "../../assets/images/leftarrow.png";
import rupee from "../../assets/images/rupee.png";
import dirham from "../../assets/images/dirahm.png";
import pound from "../../assets/images/pound.png";
const Pricing = () => {
  const [selectedplan, setSelectedPlan] = useState("monthly");
  const [modal, setModal] = useState(false);

  const plans = [
    {
      back: "#04B84D",
      planname: "Basic plan",
      rs: 18,
      cs: [{ status: "true", name: "Customer support" }],
      Lm: [{ status: "true", name: "Live Monitoring" }],
      os: [{ status: "true", name: "Onboarding Setup" }],
      ms: [{ status: "true", name: "Menu Setup" }],
      pos: [{ status: "true", name: "Pos System" }],
      om: [{ status: "true", name: "Order Manager" }],
      t: [{ status: "false", name: "Takeaway" }],
      kd: [{ status: "false", name: "KOT Dashboard" }],
      pg: [{ status: "false", name: "Payment gateway" }],
      m: [{ status: "false", name: "Menus" }],
    },
    {
      back: "#BAB200",
      planname: "Pro plan",
      rs: 50,
      cs: [{ status: "true", name: "Customer support" }],
      Lm: [{ status: "true", name: "Live Monitoring" }],
      os: [{ status: "true", name: "Onboarding Setup" }],
      ms: [{ status: "true", name: "Menu Setup" }],
      pos: [{ status: "true", name: "Pos System" }],
      om: [{ status: "true", name: "Order Manager" }],
      t: [{ status: "true", name: "Takeaway" }],
      kd: [{ status: "true", name: "KOT Dashboard" }],
      pg: [{ status: "true", name: "Payment gateway" }],
      m: [{ status: "true", name: "Menus" }],
    },
  ];
  return (
    <div className="dark:bg-[#202125] bg-[#F2F2F2] dark:text-[#FFFFFF] text-[#000000] p-2 px-8">
      <div className=" flex justify-end">
        <div className="mt-1 flex items-center" onClick={()=>{setModal(true)}} >
          <img
            src={plus}
            alt=""
            className=" w-[18px] h-[18px] cursor-pointer"
          />
          <h5 className=" text-sm font-semibold">Add Pricing</h5>
        </div>
        <div className="mt-1 flex items-center ml-3">
          <img
            src={plus}
            alt=""
            className=" w-[18px] h-[18px] cursor-pointer"
          />
          <h5 className=" text-sm font-semibold">Add Features</h5>
        </div>
      </div>
      <div className=" flex justify-end mt-4">
        <div className=" flex dark:bg-[#FFFFFF] bg-[#000000] w-[170px] h-[27px] items-center  rounded-full justify-center">
          <div
            style={{
              background: selectedplan == "monthly" ? "#F2F2F2" : "#000000",
              color: selectedplan == "monthly" ? "#000000" : "#F2F2F2",
            }}
            className="  w-[78px] h-[18px] flex items-center justify-center rounded-full cursor-pointer"
            onClick={() => setSelectedPlan("monthly")}
          >
            <h6 className=" text-sm ">Monthly</h6>
          </div>
          <div
            style={{
              background: selectedplan == "yearly" ? "#F2F2F2" : "#000000",
              color: selectedplan == "yearly" ? "#000000" : "#F2F2F2",
            }}
            className=" bg-[#F2F2F2] w-[78px] h-[18px] flex items-center justify-center rounded-full cursor-pointer"
            onClick={() => setSelectedPlan("yearly")}
          >
            <h6 className=" text-sm ">Yearly</h6>
          </div>
        </div>
        <div className=" ml-3">
          <select
            name=""
            id=""
            className="dark:bg-[#FFFFFF] dark:text-black bg-black text-white rounded-full text-sm w-[147px] h-[25px] text-center flex justify-center items-center"
          >
            <option value="" selected disabled>
              Select Currency
            </option>
          </select>
        </div>
      </div>
      <div className=" mt-10 flex justify-center">
        <div>
          <h1 className=" text-2xl font-bold">
            Find the perfect plans for your needs
          </h1>
          <div className=" grid grid-cols-2 mt-10 gap-8">
            {plans?.map((p, index) => (
              <div key={index}>
                <div className=" flex justify-center">
                  <div
                    style={{ background: p.back }}
                    className="  w-[173px] h-[55px] rounded-2xl flex justify-center items-center text-white -mb-7"
                  >
                    <h3 className=" text-lg font-semibold">{p.planname}</h3>
                  </div>
                </div>

                <div className="dark:bg-[#000000] bg-[#FFFFFF] border-[#D8D6D6] border-solid px-5 py-10 rounded-3xl w-[287px]">
                  <div className=" flex items-center border-b pb-2 border-[#606060]">
                    <div
                      style={{ background: p.back }}
                      className="  h-[28px] w-[28px] rounded-full flex justify-center items-center text-white font-bold text-xl"
                    >
                      $
                    </div>
                    <div className=" ml-1 ">
                      <span className=" text-4xl font-semibold">{p.rs}</span>
                      <span className=" text-lg font-semibold -top-3">
                        /month
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.Lm[0].status == "true" ? (
                        <img
                          src={right}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      ) : (
                        <img
                          src={wrong}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      )}
                      <h3 className=" ml-3">{p.Lm[0].name}</h3>
                    </div>

                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.cs[0].status == "true" ? (
                        <img
                          src={right}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      ) : (
                        <img
                          src={wrong}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      )}
                      <h3 className=" ml-3">{p.cs[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.os[0].status == "true" ? (
                        <img
                          src={right}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      ) : (
                        <img
                          src={wrong}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      )}
                      <h3 className=" ml-3">{p.os[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.ms[0].status == "true" ? (
                        <img
                          src={right}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      ) : (
                        <img
                          src={wrong}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      )}
                      <h3 className=" ml-3">{p.ms[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.pos[0].status == "true" ? (
                        <img
                          src={right}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      ) : (
                        <img
                          src={wrong}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      )}
                      <h3 className=" ml-3">{p.pos[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.om[0].status == "true" ? (
                        <img
                          src={right}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      ) : (
                        <img
                          src={wrong}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      )}
                      <h3 className=" ml-3">{p.pos[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.t[0].status == "true" ? (
                        <img
                          src={right}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      ) : (
                        <img
                          src={wrong}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      )}
                      <h3 className=" ml-3">{p.t[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.kd[0].status == "true" ? (
                        <img
                          src={right}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      ) : (
                        <img
                          src={wrong}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      )}
                      <h3 className=" ml-3">{p.kd[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.pg[0].status == "true" ? (
                        <img
                          src={right}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      ) : (
                        <img
                          src={wrong}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      )}
                      <h3 className=" ml-3">{p.pg[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                    <div className=" flex items-center text-sm font-semibold mt-2">
                      {p.m[0].status == "true" ? (
                        <img
                          src={right}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      ) : (
                        <img
                          src={wrong}
                          alt="img"
                          className=" w-[17px] h-[17px]"
                        />
                      )}
                      <h3 className=" ml-3">{p.m[0].name}</h3>
                      <h3 className=" ml-3"></h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
            // onClick={() => {
            //   setModal(false);
            // }}
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
                  {/* <div className="  bg-white  dark:bg-[#202125]"> */}
                  <div className=" bg-white px-7 py-6 rounded-2xl dark:text-white dark:bg-[#202125] w-[924px] font-[400]">
                    <div className=" flex items-center">
                      <img
                        src={leftarrow}
                        alt=""
                        className=" object-contain w-[15px] h-[15px] "
                        onClick={() => {
                          setModal(false);
                        }}
                      />
                      <h3 className=" font-semibold  text-lg">Add Pricing</h3>
                    </div>
                    <div className=" ml-3 mt-3">
                      <h3 className=" font-semibold  text-lg">Package Name</h3>
                      <div className=" flex mt-3">
                        <div className=" flex items-center ml-7">
                          <input type="checkbox" name="" id="" />
                          <h4 className=" ml-2">Basic Plan</h4>
                        </div>
                        <div className=" flex items-center ml-7">
                          <input type="checkbox" name="" id="" />
                          <h4 className=" ml-2">Pro Plan</h4>
                        </div>
                      </div>
                      <div className="  mt-3">
                        <h3 className=" font-semibold  text-lg">Currency</h3>
                      </div>
                      <div className="  mt-2 grid grid-cols-3 gap-5 ml-7">
                        <div></div>
                        <div>
                          <h4 className=" ml-6">Monthly Price</h4>
                        </div>
                        <div>
                          <h4 className=" ml-5">Yearly Price</h4>
                        </div>
                      </div>
                      <div className=" mt-[4px]  grid grid-cols-3 gap-5 ml-7">
                        <div className=" flex items-center">
                          <div className=" flex  flex-1 items-center">
                            <img
                              src={rupee}
                              alt=""
                              className=" w-[22px] h-[22px]"
                            />
                            <h4 className=" ml-3">Indian rupee</h4>
                          </div>

                          <div className="flex justify-self-end bg-black w-auto mr-3">
                            <input type="checkbox" name="" id="" />
                          </div>
                        </div>
                        <div className=" flex items-center">
                          <div className="flex  flex-1 border border-[#D6D6D6] rounded-3xl ml-2 px-[15px] h-[26px] items-center">
                            <input
                              type="text"
                              className=" bg-transparent flex-1 focus:outline-none "
                            />
                          </div>
                        </div>
                        <div className=" flex items-center">
                          <div className="flex  flex-1 border border-[#D6D6D6] rounded-3xl ml-2 px-[15px] h-[26px] items-center">
                            <input
                              type="text"
                              className=" bg-transparent flex-1 focus:outline-none "
                            />
                          </div>
                        </div>
                      </div>
                      <div className="  mt-5 grid grid-cols-3 gap-5 ml-7">
                        <div></div>
                        <div>
                          <h4 className=" ml-6">Monthly Price</h4>
                        </div>
                        <div>
                          <h4 className=" ml-5">Yearly Price</h4>
                        </div>
                      </div>
                      <div className=" mt-[4px]  grid grid-cols-3 gap-5 ml-7">
                        <div className=" flex items-center">
                          <div className=" flex  flex-1 items-center">
                            <img
                              src={dirham}
                              alt=""
                              className=" w-[22px] h-[22px]"
                            />
                            <h4 className=" ml-3">Dirham</h4>
                          </div>

                          <div className="flex justify-self-end bg-black w-auto mr-3">
                            <input type="checkbox" name="" id="" />
                          </div>
                        </div>
                        <div className=" flex items-center">
                          <div className="flex  flex-1 border border-[#D6D6D6] rounded-3xl ml-2 px-[15px] h-[26px] items-center">
                            <input
                              type="text"
                              className=" bg-transparent flex-1 focus:outline-none "
                            />
                          </div>
                        </div>
                        <div className=" flex items-center">
                          <div className="flex  flex-1 border border-[#D6D6D6] rounded-3xl ml-2 px-[15px] h-[26px] items-center">
                            <input
                              type="text"
                              className=" bg-transparent flex-1 focus:outline-none "
                            />
                          </div>
                        </div>
                      </div>
                      <div className="  mt-5 grid grid-cols-3 gap-5 ml-7">
                        <div></div>
                        <div>
                          <h4 className=" ml-6">Monthly Price</h4>
                        </div>
                        <div>
                          <h4 className=" ml-5">Yearly Price</h4>
                        </div>
                      </div>
                      <div className=" mt-[4px]  grid grid-cols-3 gap-5 ml-7">
                        <div className=" flex items-center">
                          <div className=" flex  flex-1 items-center">
                            <img
                              src={pound}
                              alt=""
                              className=" w-[22px] h-[22px]"
                            />
                            <h4 className=" ml-3">Pound</h4>
                          </div>

                          <div className="flex justify-self-end bg-black w-auto mr-3">
                            <input type="checkbox" name="" id="" />
                          </div>
                        </div>
                        <div className=" flex items-center">
                          <div className="flex  flex-1 border border-[#D6D6D6] rounded-3xl ml-2 px-[15px] h-[26px] items-center">
                            <input
                              type="text"
                              className=" bg-transparent flex-1 focus:outline-none "
                            />
                          </div>
                        </div>
                        <div className=" flex items-center">
                          <div className="flex  flex-1 border border-[#D6D6D6] rounded-3xl ml-2 px-[15px] h-[26px] items-center">
                            <input
                              type="text"
                              className=" bg-transparent flex-1 focus:outline-none "
                            />
                          </div>
                        </div>
                      </div>
                      <div className="  mt-3">
                        <h3 className=" font-semibold  text-lg">Features</h3>
                        <div className=" mt-3  flex flex-wrap gap-5 ml-7">
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Live Monitoring</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Customer Support</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Onboarding Setup</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Menu Setup</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">POS System</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Order Manager</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Take away</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">KOT Dashbaord</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Payment Gateway</h4>
                          </div>
                          <div className=" flex items-center">
                            <input type="checkbox" name="" id="" />
                            <h4 className=" ml-2">Menus</h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 flex items-center justify-end mb-5">
                      <button
                        type="button"
                        className="  w-[107px] h-[26px] rounded-full  dark:border-white   border border-black border-solid text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className=" w-[107px] h-[26px] rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm ml-2"
                      >
                        Add
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

export default Pricing;

// import React, { useState, Fragment, useEffect } from "react";

// import IconSearch from "../../components/Icon/IconSearch";
// import { Dialog, Transition } from "@headlessui/react";
// import IconX from "../../components/Icon/IconX";
// import { useDispatch, useSelector } from "react-redux";
// import { IRootState } from "../../store/index";
// import { setPageTitle } from "../../store/themeConfigSlice";
// import axios from "axios";
// import { NavLink, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import PageLoader from "../../components/PageLoader";
// import { IoCloseCircle } from "react-icons/io5";
// const CrmSwal = withReactContent(Swal);

// const Pricing = () => {
//     const [features, setFeatures] = useState<any>([]);
//     const [filteredFeatires, setFilteredFeatures] = useState<any>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [packages, setPackages] = useState([]);
//     const navigate = useNavigate();

//     const dispatch = useDispatch();
//     const crmToken = useSelector(
//         (state: IRootState) => state.themeConfig.crmToken
//     );

//     useEffect(() => {
//         if (features.length) setFilteredFeatures(features)
//     }, [features])

//     useEffect(() => {
//         dispatch(setPageTitle("Packages"));
//         fetchPackages();
//         // fetchUserType();
//     }, []);

//     // fetch Restaurant data
//     const fetchPackages = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios({
//                 method: "get",
//                 url: window.location.origin + "/api/dashboard/packages",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: "Bearer " + crmToken,
//                 },
//             });
//             if (response.data.status == "success") {
//                 setPackages(response.data.packages);
//                 setFeatures(response.data.features);
//             }
//         } catch (error: any) {
//             console.log(error);
//             if (error.response.status == 401) navigate("/login");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const [search, setSearch] = useState<any>("");
//     // const [resList, setResList] = useState<any>([]);
//     const [filteredItems, setFilteredItems] = useState<any>(packages);

//     useEffect(() => {
//         setFilteredItems(() => {
//             return packages.filter((item: any) => {
//                 return item.package_name
//                     .toLowerCase()
//                     .includes(search.toLowerCase());
//             });
//         });
//     }, [search, packages]);

//     const [modal, setModal] = useState<any>(false);

//     const [defaultParams] = useState({
//         id: "",
//         package_name: "",
//         description: "",
//         label: "",
//         amount_india_yearly: "",
//         amount_usa_yearly: "",
//         amount_uae_yearly: "",
//         amount_india_monthly: "",
//         amount_usa_monthly: "",
//         amount_uae_monthly: "",
//         show_india: 0,
//         show_usa: 0,
//         show_uae: 0,
//         features: [],
//         included_package: "",
//     });
//     const [params, setParams] = useState<any>(
//         JSON.parse(JSON.stringify(defaultParams))
//     );
//     const [errors, setErros] = useState<any>({});

//     const changeValue = (e: any) => {
//         let { value, name, type } = e.target;
//         setErros({ ...errors, [name]: "" });

//         type == "checkbox"
//             ? e.target.checked
//                 ? (value = 1)
//                 : (value = 0)
//             : null;
//         setParams({ ...params, [name]: value });

//         if (name == 'included_package') {
//             if (value) {
//                 let included_package = packages.find((p) => p.id == value)
//                 let aa = included_package.features.map((f => f.id));
//                 let nf = features.filter(f => !aa.includes(f.id));
//                 setFilteredFeatures(nf)

//             } else setFilteredFeatures(features)
//         }
//     };

//     const [X, Z] = useState<any>([]);
//     const XX = (t) => {
//         const a = Number(t.value.split("[\\s,]+"));
//         if (t.checked) {
//             if (!X.includes(a)) Z([...X, a]);
//         } else {
//             if (X.includes(a)) {
//                 const Y = X.filter((e: any) => e != a);
//                 Z(Y);
//             }
//         }
//     };

//     const validate = () => {
//         setErros({});
//         let errors = {};

//         // if (!params.description) {
//         //     errors = { ...errors, description: "description is required" };
//         // }
//         if (!params.package_name) {
//             errors = { ...errors, package_name: "package_name is required" };
//         }
//         // if (!params.features) {
//         //     errors = { ...errors, features: "features is required" };
//         // }

//         if (params.show_india) {
//             if (!params.amount_india_yearly) {
//                 errors = {
//                     ...errors,
//                     amount_india_yearly: "amount_india_yearly is required",
//                 };
//             }
//             if (!params.amount_india_monthly) {
//                 errors = {
//                     ...errors,
//                     amount_india_monthly: "amount_india_monthly is required",
//                 };
//             }
//         }

//         if (params.show_usa) {
//             if (!params.amount_usa_monthly) {
//                 errors = {
//                     ...errors,
//                     amount_usa_monthly: "amount_usa_monthly is required",
//                 };
//             }
//             if (!params.amount_usa_yearly) {
//                 errors = {
//                     ...errors,
//                     amount_usa_yearly: "amount_usa_yearly is required",
//                 };
//             }
//         }

//         if (params.show_uae) {
//             if (!params.amount_uae_monthly) {
//                 errors = {
//                     ...errors,
//                     amount_uae_monthly: "amount_uae_monthly is required",
//                 };
//             }
//             if (!params.amount_uae_yearly) {
//                 errors = {
//                     ...errors,
//                     amount_uae_yearly: "amount_uae_yearly is required",
//                 };
//             }
//         }

//         // if (!params.label) {
//         //     errors = { ...errors, label: "label is required" };
//         // }
//         console.log(errors);
//         setErros(errors);
//         return { totalErrors: Object.keys(errors).length };
//     };

//     const [btnLoading, setBtnLoading] = useState(true);

//     const storeOrUpdateApi = async (data: any) => {
//         setBtnLoading(true);
//         try {
//             const response = await axios({
//                 method: "post",
//                 url: window.location.origin + "/api/dashboard/packages",
//                 data,
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     Authorization: "Bearer " + crmToken,
//                 },
//             });

//             if (response.data.status == "success") {
//                 Swal.fire({
//                     icon: response.data.status,
//                     title: response.data.title,
//                     text: response.data.message,
//                     padding: "2em",
//                     customClass: "sweet-alerts",
//                 });

//                 if (response.data.status == "success") {
//                     fetchPackages();
//                     setModal(false);
//                 } else {
//                     alert(9);
//                 }
//             } else {
//                 alert("Failed");
//             }
//         } catch (error: any) {
//             if (error.response.status == 401) navigate("/login");
//             if (error?.response?.status === 422) {
//                 const serveErrors = error.response.data.errors;
//                 let serverErrors = {};
//                 for (var key in serveErrors) {
//                     serverErrors = {
//                         ...serverErrors,
//                         [key]: serveErrors[key][0],
//                     };
//                     console.log(serveErrors[key][0]);
//                 }
//                 setErros(serverErrors);
//                 CrmSwal.fire({
//                     title: "Server Validation Error! Please solve",
//                     toast: true,
//                     position: "top",
//                     showConfirmButton: false,
//                     showCancelButton: false,
//                     width: 450,
//                     timer: 2000,
//                     customClass: {
//                         popup: "color-danger",
//                     },
//                 });
//             }
//         } finally {
//             setBtnLoading(false);
//         }
//     };

//     const formSubmit = () => {
//         const isValid = validate();
//         if (isValid.totalErrors) return false;
//         const data = new FormData();
//         data.append("id", params.id);
//         data.append("package_name", params.package_name);
//         data.append("description", params.description);
//         data.append("label", params.label);
//         data.append("amount_india_yearly", params.amount_india_yearly);
//         data.append("amount_usa_yearly", params.amount_usa_yearly);
//         data.append("amount_uae_yearly", params.amount_uae_yearly);
//         data.append("amount_india_monthly", params.amount_india_monthly);
//         data.append("amount_usa_monthly", params.amount_usa_monthly);
//         data.append("amount_uae_monthly", params.amount_uae_monthly);
//         data.append("show_india", params.show_india);
//         data.append("show_usa", params.show_usa);
//         data.append("show_uae", params.show_uae);
//         data.append("features", JSON.stringify(X));
//         data.append("included_package", params.included_package);
//         storeOrUpdateApi(data);
//     };

//     const storeOrUpdate = (data) => {
//         setErros({});
//         if (data) {
//             setParams({
//                 id: data.id,
//                 package_name: data.package_name,
//                 description: data.description,
//                 label: data.label,
//                 email: data.email,
//                 amount_india_yearly: data.amount_india_yearly,
//                 amount_india_monthly: data.amount_india_monthly,
//                 amount_usa_yearly: data.amount_usa_yearly,
//                 amount_usa_monthly: data.amount_usa_monthly,
//                 amount_uae_yearly: data.amount_uae_yearly,
//                 amount_uae_monthly: data.amount_uae_monthly,
//                 show_india: data.show_india,
//                 show_usa: data.show_usa,
//                 show_uae: data.show_uae,
//                 features: data.features,

//                 included_package: params.included_package,
//             });

//             Z(data.features.map(f => f.id))
//         } else {
//             const defaltData = JSON.parse(JSON.stringify(defaultParams));
//             Z([])
//             setParams(defaltData);
//         }
//         setModal(true);
//     };

//     const distroy = (user: any) => {
//         Swal.fire({
//             icon: "warning",
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             showCancelButton: true,
//             confirmButtonText: "Delete",
//             padding: "2em",
//             customClass: "sweet-alerts",
//         }).then(async (result) => {
//             if (result.value) {
//                 try {
//                     const response = await axios({
//                         method: "delete",
//                         url:
//                             window.location.origin +
//                             "/api/dashboard/packages/" +
//                             user.id,
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: "Bearer " + crmToken,
//                         },
//                     });
//                     if (response.data.status === "success") {
//                         // setCategories(categories.filter((d: any) => d.id !== id))
//                         Swal.fire({
//                             title: response.data.title,
//                             text: response.data.message,
//                             icon: "success",
//                             customClass: "sweet-alerts",
//                         });
//                         fetchPackages();
//                     }
//                 } catch (error: any) {
//                     if (error.response.status == 401) navigate("/login");
//                 } finally {
//                 }
//             }
//         });
//     };

//     return (
//         <div>
//             {isLoading ? (
//                 <PageLoader />
//             ) : (
//                 <div className="panel p-4">
//                     <div className="flex items-center justify-between flex-wrap gap-4">
//                         <h2 className="text-xl">Pricing</h2>

//                         <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
//                             <div className="relative">
//                                 <input
//                                     type="text"
//                                     placeholder="Search Pricing"
//                                     className="form-input py-2 ltr:pr-11 rtl:pl-11 peer"
//                                     value={search}
//                                     onChange={(e) => setSearch(e.target.value)}
//                                 />
//                                 <button
//                                     type="button"
//                                     className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary"
//                                 >
//                                     <IconSearch className="mx-auto" />
//                                 </button>
//                             </div>

//                             <div className="flex gap-3">
//                                 <div>
//                                     <button
//                                         type="button"
//                                         className="btn btn-dark btn-sm"
//                                         onClick={() => storeOrUpdate()}
//                                     >
//                                         Add Packages
//                                     </button>
//                                 </div>
//                                 <NavLink to="/pricing/features">
//                                     <button
//                                         type="button"
//                                         className="btn btn-gradient btn-sm"
//                                     >
//                                         Features
//                                     </button>
//                                 </NavLink>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="mt-5">
//                         {filteredItems.length ? (
//                             <div className="max-w-[320px] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-10 md:max-w-[1140px] mx-auto dark:text-white-dark">
//                                 {filteredItems.map((pack: any) => {
//                                     return (
//                                         <>
//                                             <div className="p-4 lg:p-6 border  border-white-light dark:border-[#1b2e4b] rounded-3xl transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)]">
//                                                 <h3 className="text-2xl mb-5 font-bold text-black dark:text-white-light">
//                                                     {pack.package_name}
//                                                 </h3>
//                                                 <p>{pack.description}</p>

//                                                 <div className="my-7 p-2.5 text-lg">
//                                                     <strong className="text-[#3b3f5c] dark:text-white-light text-xl lg:text-3xl">
//                                                         {/* $ */}
//                                                         {
//                                                             pack.amount_india_monthly ? '₹': pack.amount_usa_monthly?' $':'AED '
//                                                         }
//                                                         {pack.amount_india_monthly
//                                                             ? pack.amount_india_monthly
//                                                             : pack.amount_usa_monthly
//                                                                 ? pack.amount_usa_monthly
//                                                                 : pack.amount_uae_monthly}
//                                                     </strong>{" "}
//                                                     / monthly
//                                                 </div>
//                                                 <div className="mb-6">
//                                                     <strong className="text-black dark:text-white-light text-[15px] mb-3 inline-block">
//                                                         Features Includes:
//                                                     </strong>
//                                                     <ul className="space-y-3">
//                                                         {pack.included_package ? (
//                                                             <>
//                                                                 <div className="bg-gray-100 border flex-1 p-2 rounded-lg">
//                                                                     <div className="flex items-center">
//                                                                         <div className="flex-shrink-0 relative">
//                                                                             <img
//                                                                                 src="https://tryotter.cdn.prismic.io/tryotter/c07f5c29-4d0d-4bf7-b008-3b8a148b3cb5_logo.svg?fit=max"
//                                                                                 className="w-8 object-cover"
//                                                                                 alt=""
//                                                                             />
//                                                                         </div>
//                                                                         <div className="mx-3 ltr:text-left rtl:text-right">
//                                                                             <p className="mb-1 font-semibold">
//                                                                                 {
//                                                                                     pack.included_package_name
//                                                                                 }
//                                                                             </p>

//                                                                             <p className="text-xs text-white-dark truncate max-w-[185px]">
//                                                                                 Otter
//                                                                                 Lite,
//                                                                                 Direct
//                                                                                 Orders,
//                                                                                 Digital
//                                                                                 Dine-in,
//                                                                                 Promotions,
//                                                                                 Financials,
//                                                                                 POS
//                                                                                 Integrations,
//                                                                                 Couriers
//                                                                             </p>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </>
//                                                         ) : null}
//                                                         {pack.features.map(
//                                                             (features: any) => {
//                                                                 return (
//                                                                     <>
//                                                                         <li>
//                                                                             <div className="flex-1">
//                                                                                 <div className="flex items-center">
//                                                                                     <div className="flex-shrink-0 relative">
//                                                                                         <img
//                                                                                             src="https://tryotter.cdn.prismic.io/tryotter/13fb914a-b3eb-4f39-8bb2-5915d0357217_directorders.svg?fit=max"
//                                                                                             className="w-8 object-cover"
//                                                                                             alt=""
//                                                                                         />
//                                                                                     </div>
//                                                                                     <div className="mx-3 ltr:text-left rtl:text-right">
//                                                                                         <p className="mb-1 font-semibold">
//                                                                                             {
//                                                                                                 features.features
//                                                                                             }
//                                                                                         </p>

//                                                                                         <p className="text-xs text-white-dark truncate max-w-[185px]">
//                                                                                             {
//                                                                                                 pack.label
//                                                                                             }
//                                                                                         </p>
//                                                                                     </div>
//                                                                                 </div>
//                                                                             </div>

//                                                                         </li>
//                                                                     </>
//                                                                 );
//                                                             }
//                                                         )}
//                                                     </ul>
//                                                 </div>
//                                                 <div className="flex gap-3 text-center justify-center">
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => {
//                                                             storeOrUpdate(pack);
//                                                         }}
//                                                         className="btn btn-dark"
//                                                     >
//                                                         Edit
//                                                     </button>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => {
//                                                             distroy(pack);
//                                                         }}
//                                                         className="btn btn-dark "
//                                                     >
//                                                         Delete
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </>
//                                     );
//                                 })}
//                             </div>
//                         ) : (
//                             <>
//                                 <div>
//                                     <div className="relative m-auto w-[300px] flex items-center border p-3.5 rounded text-danger bg-danger-light border-danger ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-danger-dark-light">
//                                         <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
//                                             x
//                                         </span>
//                                         <span className="ltr:pr-2 rtl:pl-2">
//                                             <strong className="ltr:mr-1 rtl:ml-1">
//                                                 No Package Found
//                                             </strong>
//                                         </span>
//                                     </div>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             )}

//             <Transition appear show={modal} as={Fragment}>
//                 <Dialog
//                     as="div"
//                     open={modal}
//                     onClose={() => setModal(false)}
//                     className="relative z-[51]"
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
//                         <div className="fixed inset-0 bg-[black]/60" />
//                     </Transition.Child>
//                     <div className="fixed inset-0 overflow-y-auto">
//                         <div className="flex min-h-full items-center justify-center px-4 py-8">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0 scale-95"
//                                 enterTo="opacity-100 scale-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100 scale-100"
//                                 leaveTo="opacity-0 scale-95"
//                             >
//                                 <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-5xl text-black dark:text-white-dark">

//                                     <button
//                                                     onClick={() =>
//                                                         setModal(false)
//                                                     }
//                                                     type="button"
//                                                     className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
//                                                 >
//                                                     <IoCloseCircle size={30} color="#b53e3e" />
//                                                 </button>
//                                     <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
//                                         {params.id
//                                             ? "Edit Packages"
//                                             : "Add Packages"}
//                                     </div>
//                                     <div className="p-5">
//                                         <form>
//                                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                                                 <div className="mb-5">
//                                                     <label htmlFor="name">
//                                                         Package Name
//                                                     </label>
//                                                     <input
//                                                         id="name"
//                                                         type="text"
//                                                         placeholder="Enter Name"
//                                                         className="form-input"
//                                                         name="package_name"
//                                                         value={
//                                                             params.package_name
//                                                         }
//                                                         onChange={(e) =>
//                                                             changeValue(e)
//                                                         }
//                                                     />
//                                                     {errors?.package_name ? (
//                                                         <div className="text-danger mt-1">
//                                                             {
//                                                                 errors.package_name
//                                                             }
//                                                         </div>
//                                                     ) : (
//                                                         ""
//                                                     )}
//                                                 </div>

//                                                 {packages.length ? (
//                                                     <div className="mb-5">
//                                                         <label htmlFor="id">
//                                                             Included Packages
//                                                         </label>
//                                                         <select
//                                                             name="included_package"
//                                                             className="form-input"
//                                                             value={
//                                                                 params.included_package
//                                                             }
//                                                             onChange={(e) =>
//                                                                 changeValue(e)
//                                                             }
//                                                         >
//                                                             <option value="">
//                                                                 Select Package
//                                                             </option>
//                                                             {packages.map(
//                                                                 (p: any) => {
//                                                                     return (
//                                                                         <option
//                                                                             key={
//                                                                                 p.id
//                                                                             }
//                                                                             value={
//                                                                                 p.id
//                                                                             }
//                                                                         >
//                                                                             {
//                                                                                 p.package_name
//                                                                             }
//                                                                         </option>
//                                                                     );
//                                                                 }
//                                                             )}
//                                                         </select>
//                                                         {errors?.included_package ? (
//                                                             <div className="text-danger mt-1">
//                                                                 {
//                                                                     errors.included_package
//                                                                 }
//                                                             </div>
//                                                         ) : (
//                                                             ""
//                                                         )}
//                                                     </div>
//                                                 ) : (
//                                                     ""
//                                                 )}

//                                                 <div className="mb-5">
//                                                     <label htmlFor="occupation">
//                                                         Label
//                                                     </label>
//                                                     <input
//                                                         name="label"
//                                                         value={params.label}
//                                                         onChange={(e) =>
//                                                             changeValue(e)
//                                                         }
//                                                         id="role"
//                                                         type="text"
//                                                         placeholder="Enter Label"
//                                                         className="form-input"
//                                                     />
//                                                     {/* {errors?.label ? (
//                                                         <div className="text-danger mt-1">
//                                                             {errors.label}
//                                                         </div>
//                                                     ) : (
//                                                         ""
//                                                     )} */}
//                                                 </div>
//                                             </div>

//                                             {filteredFeatires.length ? (<div className="mb-5">
//                                                 <label htmlFor="id">
//                                                     Features
//                                                 </label>
//                                                 {filteredFeatires.map((item: any) => {
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
//                                                                     item?.id
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
//                                                                 {item?.features}
//                                                             </span>
//                                                         </label>
//                                                     );
//                                                 })}
//                                                 {errors?.features ? (
//                                                     <div className="text-danger mt-1">
//                                                         {errors.features}
//                                                     </div>
//                                                 ) : (
//                                                     ""
//                                                 )}
//                                             </div>) : ''}


//                                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 items-center">
//                                                 <div className="mb-3 flex gap-2">
//                                                     <label htmlFor="number">
//                                                         {" "}
//                                                         Pricing for India
//                                                     </label>
//                                                     <label className="w-12 h-6 relative   ">
//                                                         <input
//                                                             type="checkbox"
//                                                             name="show_india"
//                                                             checked={
//                                                                 params.show_india
//                                                             }
//                                                             onChange={(e) =>
//                                                                 changeValue(e)
//                                                             }
//                                                             className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
//                                                             id="custom_switch_checkbox1"
//                                                         />
//                                                         <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
//                                                     </label>
//                                                 </div>
//                                                 {params.show_india ? (
//                                                     <>
//                                                         <div>
//                                                             <label htmlFor="number">
//                                                                 India Monthly
//                                                             </label>
//                                                             <input
//                                                                 type="text"
//                                                                 placeholder="Enter Monthly Pricing"
//                                                                 className="form-input"
//                                                                 name="amount_india_monthly"
//                                                                 value={
//                                                                     params.amount_india_monthly
//                                                                 }
//                                                                 onChange={(e) =>
//                                                                     changeValue(
//                                                                         e
//                                                                     )
//                                                                 }
//                                                             />
//                                                             {errors?.amount_india_monthly ? (
//                                                                 <div className="text-danger mt-1">
//                                                                     {
//                                                                         errors.amount_india_monthly
//                                                                     }
//                                                                 </div>
//                                                             ) : (
//                                                                 ""
//                                                             )}
//                                                         </div>

//                                                         <div>
//                                                             <label htmlFor="number">
//                                                                 India Yearly
//                                                             </label>
//                                                             <input
//                                                                 type="text"
//                                                                 placeholder="Enter Yearly Pricing"
//                                                                 className="form-input"
//                                                                 name="amount_india_yearly"
//                                                                 value={
//                                                                     params.amount_india_yearly
//                                                                 }
//                                                                 onChange={(e) =>
//                                                                     changeValue(
//                                                                         e
//                                                                     )
//                                                                 }
//                                                             />
//                                                             {errors?.amount_india_yearly ? (
//                                                                 <div className="text-danger mt-1">
//                                                                     {
//                                                                         errors.amount_india_yearly
//                                                                     }
//                                                                 </div>
//                                                             ) : (
//                                                                 ""
//                                                             )}
//                                                         </div>
//                                                     </>
//                                                 ) : (
//                                                     ""
//                                                 )}
//                                             </div>

//                                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 items-center">
//                                                 <div className="mb-3 flex gap-2">
//                                                     <label htmlFor="number">
//                                                         {" "}
//                                                         Pricing for USA
//                                                     </label>
//                                                     <label className="w-12 h-6 relative  ">
//                                                         <input
//                                                             type="checkbox"
//                                                             name="show_usa"
//                                                             checked={
//                                                                 params.show_usa
//                                                             }
//                                                             onChange={(e) =>
//                                                                 changeValue(e)
//                                                             }
//                                                             className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
//                                                             id="custom_switch_checkbox1"
//                                                         />
//                                                         <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
//                                                     </label>
//                                                 </div>
//                                                 {params.show_usa ? (
//                                                     <>
//                                                         <div>
//                                                             <label htmlFor="number">
//                                                                 USA Monthly
//                                                             </label>
//                                                             <input
//                                                                 type="text"
//                                                                 name="amount_usa_monthly"
//                                                                 value={
//                                                                     params.amount_usa_monthly
//                                                                 }
//                                                                 onChange={(e) =>
//                                                                     changeValue(
//                                                                         e
//                                                                     )
//                                                                 }
//                                                                 placeholder="Enter Monthly Pricing"
//                                                                 className="form-input"
//                                                             />
//                                                             {errors?.amount_usa_monthly ? (
//                                                                 <div className="text-danger mt-1">
//                                                                     {
//                                                                         errors.amount_usa_monthly
//                                                                     }
//                                                                 </div>
//                                                             ) : (
//                                                                 ""
//                                                             )}
//                                                         </div>

//                                                         <div>
//                                                             <label htmlFor="number">
//                                                                 USA Yearly
//                                                             </label>
//                                                             <input
//                                                                 type="text"
//                                                                 name="amount_usa_yearly"
//                                                                 value={
//                                                                     params.amount_usa_yearly
//                                                                 }
//                                                                 onChange={(e) =>
//                                                                     changeValue(
//                                                                         e
//                                                                     )
//                                                                 }
//                                                                 placeholder="Enter Yearly Pricing"
//                                                                 className="form-input"
//                                                             />
//                                                             {errors?.amount_usa_yearly ? (
//                                                                 <div className="text-danger mt-1">
//                                                                     {
//                                                                         errors.amount_usa_yearly
//                                                                     }
//                                                                 </div>
//                                                             ) : (
//                                                                 ""
//                                                             )}
//                                                         </div>
//                                                     </>
//                                                 ) : (
//                                                     ""
//                                                 )}
//                                             </div>
//                                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 items-center">
//                                                 <div className="mb-3 flex gap-2">
//                                                     <label htmlFor="number">
//                                                         {" "}
//                                                         Pricing for UAE
//                                                     </label>
//                                                     <label className="w-12 h-6 relative  ">
//                                                         <input
//                                                             type="checkbox"
//                                                             name="show_uae"
//                                                             checked={
//                                                                 params.show_uae
//                                                             }
//                                                             onChange={(e) =>
//                                                                 changeValue(e)
//                                                             }
//                                                             className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
//                                                             id="custom_switch_checkbox1"
//                                                         />
//                                                         <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
//                                                     </label>
//                                                 </div>
//                                                 {params.show_uae ? (
//                                                     <>
//                                                         <div>
//                                                             <label htmlFor="number">
//                                                                 UAE Monthly
//                                                             </label>
//                                                             <input
//                                                                 type="text"
//                                                                 name="amount_uae_monthly"
//                                                                 value={
//                                                                     params.amount_uae_monthly
//                                                                 }
//                                                                 onChange={(e) =>
//                                                                     changeValue(
//                                                                         e
//                                                                     )
//                                                                 }
//                                                                 placeholder="Enter Monthly Pricing"
//                                                                 className="form-input"
//                                                             />
//                                                             {errors?.amount_uae_monthly ? (
//                                                                 <div className="text-danger mt-1">
//                                                                     {
//                                                                         errors.amount_uae_monthly
//                                                                     }
//                                                                 </div>
//                                                             ) : (
//                                                                 ""
//                                                             )}
//                                                         </div>

//                                                         <div>
//                                                             <label htmlFor="number">
//                                                                 UAE Yearly
//                                                             </label>
//                                                             <input
//                                                                 type="text"
//                                                                 name="amount_uae_yearly"
//                                                                 value={
//                                                                     params.amount_uae_yearly
//                                                                 }
//                                                                 onChange={(e) =>
//                                                                     changeValue(
//                                                                         e
//                                                                     )
//                                                                 }
//                                                                 placeholder="Enter Yearly Pricing"
//                                                                 className="form-input"
//                                                             />
//                                                             {errors?.amount_uae_yearly ? (
//                                                                 <div className="text-danger mt-1">
//                                                                     {
//                                                                         errors.amount_uae_yearly
//                                                                     }
//                                                                 </div>
//                                                             ) : (
//                                                                 ""
//                                                             )}
//                                                         </div>
//                                                     </>
//                                                 ) : (
//                                                     ""
//                                                 )}
//                                             </div>

//                                             <div className="mb-5">
//                                                 <label htmlFor="address">
//                                                     Description
//                                                 </label>
//                                                 <textarea
//                                                     id="location"
//                                                     rows={3}
//                                                     placeholder="Enter Description"
//                                                     className="form-textarea resize-none min-h-[130px]"
//                                                     name="description"
//                                                     value={params.description}
//                                                     onChange={(e) =>
//                                                         changeValue(e)
//                                                     }
//                                                 ></textarea>
//                                                 {/* {errors?.description ? (
//                                                     <div className="text-danger mt-1">
//                                                         {errors.description}
//                                                     </div>
//                                                 ) : (
//                                                     ""
//                                                 )} */}
//                                             </div>
//                                             <div className="flex justify-end items-center mt-8">
//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-outline-danger"
//                                                     onClick={() =>
//                                                         setModal(false)
//                                                     }
//                                                 >
//                                                     Cancel
//                                                 </button>
//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-primary ltr:ml-4 rtl:mr-4"
//                                                     onClick={() => formSubmit()}
//                                                 >
//                                                     {params.id
//                                                         ? "Update"
//                                                         : "Add"}
//                                                 </button>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </Dialog.Panel>
//                             </Transition.Child>
//                         </div>
//                     </div>
//                 </Dialog>
//             </Transition>
//         </div>
//     );
// };

// export default Pricing;

