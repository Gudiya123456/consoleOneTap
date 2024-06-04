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
import { ErrorHandle } from "../common/ErrorHandle";

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
import logo from '../../assets/images/logo.svg'
import dlogo from '../../assets/images/dlogo.svg'

import favicon from '../../assets/images/favicon.svg'
import dfavicon from '../../assets/images/dfavicon.svg'

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
    const [modal, setModal] = useState(false);
    useEffect(() => {
        dispatch(setPageTitle("Restaurant"));
    }, []);



    useEffect(() => {
        dispatch(setPageTitle("Restaurant"));
        fetchRestaurantList();
    }, []);
    // fetch Restaurant data
    const fetchRestaurantList = async () => {
        setIsLoading(true);
        try {
            const response = await axios({
                method: "get",
                url: "https://cdn.onetapdine.com/api/restaurants",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + crmToken,
                },
            });
            if (response.data.status == "success") {
                setResList( resList.filter((d: any) => d.id !== resList.id));
                setResList(response.data.restaurants);
                setTimeZones(response.data.timeZones)
                console.log(response.data.restaurantss);
            }

            if(response.data.status=='error'){
                alert(99999)
            }
        } catch (error: any) {
            if (error.response.status == 401) {
                ErrorHandle();
            }
            else console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

console.log('reslist', resList);
    const fileLogoRef = useRef<HTMLInputElement>(null);
    const fileIconRef = useRef<HTMLInputElement>(null);
    const [logoPriview, setLogoPriview] = useState<any>(themeConfig.theme=='dark'?dlogo:logo);
    const [iconPriview, setIconPriview] = useState<any>(themeConfig.theme=='dark'?dfavicon:favicon);

    const [defaultParams] = useState({
        id: '',
        sub_domain: "",
        restaurant_name: "",
        branches: "",
        admin_email: '',
        admin_name: '',
        admin_phone: "",
        branch_name: '',
        mode: '',
        status: '',
        logo: '',
        fav_icon: '',
        area: '',
        city: '',
        state: '',
        address: '',
        pincode: '',
        country: '',
        time_zone: '',




    });

    const setImage = (e: any) => {
        const { name } = e.target;
        setErros({ ...errors, [name]: '' });
        if (e.target.files[0]) {
            if (e.target.files[0].type && e.target.files[0].type.indexOf('image') === -1) {
                setErros({ ...errors, [name]: 'file is not a valid image' });
                return;
            }
            const maxSizeInBytes = 2 * 1024 * 1024;
            if (e.target.files[0].size > maxSizeInBytes) {
                setErros({ ...errors, [name]: 'maximum file size is 2 mb' });
                return;
            }
            const reader = new FileReader();
            reader.onload = function (event: any) {

                if (name == 'logo') setLogoPriview(reader.result)
                else setIconPriview(reader.result)

                setParams({ ...params, [name]: e.target.files[0] });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

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
    const [search, setSearch] = useState<any>("");

    const [filteredItems, setFilteredItems] = useState<any>(resList);

    useEffect(() => {

        setFilteredItems(() => {
            return resList.filter((item: any) => {
                return item.restaurant_name
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
        });
    }, [search, resList]);

    const validate = () => {
        setErros({});
        let errors = {};

        if (!params.restaurant_name) {
            errors = {
                ...errors,
                restaurant_name: "restaurant name is required!",
            };
        }
        if (!params.sub_domain) {
            errors = { ...errors, sub_domain: "sub domain is required" };
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
        if (!params.branch_name) {
            errors = {
                ...errors,
                branch_name: "Branch Name is required",
            };
        }
        if (!params.branches) {
            errors = {
                ...errors,
                branches: "No of Branch is required",
            };
        }
        if (!params.address) {
            errors = {
                ...errors,
                address: "Address is required",
            };
        }
        if (!params.area) {
            errors = {
                ...errors,
                area: "Area is required",
            };
        }
        if (!params.city) {
            errors = {
                ...errors,
                city: "City is required",
            };
        }
        if (!params.state) {
            errors = {
                ...errors,
                state: "State is required",
            };
        }
        if (!params.pincode) {
            errors = {
                ...errors,
                pincode: "Pincode is required",
            };
        }

        if (params.status == '') errors = { ...errors, status: 'The status field is required.' };
        if (params.mode == '') errors = { ...errors, mode: 'The mode field is required.' };
        if (!params.branches) {
            errors = { ...errors, branches: "Please select branches!" };
        }
        if (!params.id) {

            if (!params.country) {
                errors = { ...errors, country: "country is required" };
            }

        }

        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

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
                setModal(false)
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
        data.append("sub_domain", params.sub_domain);
        data.append("restaurant_name", params.restaurant_name);
        data.append("branches", params.branches);
        data.append("admin_name", params.admin_name);
        data.append("admin_email", params.admin_email);
        data.append("admin_phone", params.admin_phone);
        data.append("mode", params.mode);
        data.append("status", params.status);
        data.append("logo", params.logo);
        data.append("fav_icon", params.fav_icon);
        data.append("area", params.area);
        data.append("city", params.city);
        data.append("state", params.state);
        data.append("pincode", params.pincode);
        data.append("country", params.country);
        data.append("time_zone", params.time_zone);
        data.append("branch_name", params.branch_name);
        data.append("address", params.address);


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
                sub_domain: data.sub_domain,
                logo: '',
                fav_icon: '',
                mode: data.mode ? '1' : '0',
                status: data.status ? '1' : '0',
            });

            data.logo ?
                setLogoPriview(window.location.origin + data.logo) :
                setLogoPriview(themeConfig.theme=='dark'?dlogo:logo);

            data.fav_icon ?
                setIconPriview(window.location.origin + data.fav_icon) :
                setIconPriview(themeConfig.theme=='dark'?dfavicon:favicon);
        } else {
            setParams(defaultParams);
            setLogoPriview(themeConfig.theme=='dark'?dlogo:logo);
            setIconPriview(themeConfig.theme=='dark'?dfavicon:favicon);
        }
        setModal(true)
    }
    const resto='/restaurant/view';

    return (
        <div>
            {
                isLoading ? (<PageLoader />) : (
                    <div className="">
                        <div className='flex justify-between mb-2'>

                            <div>

                            </div>
                            <div className='flex gap-1' onClick={() => { setModal(true) }}  >
                                <img src={themeConfig.theme == 'dark' ? PlusDark : Plus} />
                                <button
                                    onClick={() => { storeOrUpdate(null) }}
                                    type="button" className=' text-black dark:text-white font-extrabold text-[15px]' >
                                    Add Restaurant
                                </button>
                            </div>

                        </div>
                        {resList.length ? (
                            <div className=" grid grid-cols-3  gap-5" >
                                {resList.map((restaurant: any) => (
                                    <div
                                        key={restaurant.id}>
                                        <NavLink to='/restaurant/view' state={{restaurantId:restaurant.id}} >
                                            {/* <NavLink to={`${resto}/${restaurant.id}`}  > */}
                                            <div className={` dark:bg-[#202125]  bg-[linear-gradient(to_bottom,rgba(0,0,0,0)53%,rgba(0,2,0.8)95%)] rounded-3xl h-[160px]  relative`}
                                            style={{height:'180px', backgroundSize:'cover', backgroundImage:`linear-gradient(to bottom, rgba(0,0,0,0)53%, rgba(0,2,0.8)95%), url(https://cdn.onetapdine.com${restaurant.background})`}}
                                            >
                                                <div className="absolute bottom-0 px-2 py-2   w-full">
                                                    <h1 className="text-white font-extrabold  text-md">{restaurant.restaurant_name}</h1>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>No Restaurant Created</div>
                        )}

                    </div>

                )
            }

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
                                                {
                                                    params.id ? 'Edit' : 'Add '
                                                }
                                                  Restaurant
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="px-10 pb-5 dark:bg-[#202125] bg-white">
                                        <form>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 gap-x-5">
                                                <div className="mb-3">
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
                                               


                                                <div className="mb-3">
                                                    <label className='text-style roboto-light' htmlFor="subdomain">
                                                        Subdomain Name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent "
                                                        name="sub_domain"
                                                        value={params.sub_domain}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.sub_domain ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.sub_domain
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>

                                                <div className="mb-3">
                                                    <label className='text-style roboto-light' htmlFor="email">
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
                                                <div className="mb-3">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                        Branch No
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
                                                <div className="mb-3">
                                                    <label className='text-style roboto-light' htmlFor="name">
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


                                                <div className="mb-3">
                                                    <label className='text-style roboto-light' htmlFor="phone">
                                                       Admin Email Id
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


                                                <div className="mb-3">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                       Admin Contact Number
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
                                                <div className="mb-3">
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

                                                <div className="mb-3">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                        Area
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                                        name="area"
                                                        value={params.area}
                                                        onChange={(e) => { changeValue(e) }}
                                                    />
                                                    {errors?.area ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.area
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="mb-3">
                                                    <label className='text-style roboto-light' htmlFor="email">
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

                                                <div className="mb-3">
                                                    <label className='text-style roboto-light' htmlFor="email">
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

                                                <div className="mb-3">
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


                                                <div className="mb-3">
                                                    <label className='text-style roboto-light' htmlFor="email">
                                                        Pincode
                                                    </label>
                                                    <input
                                                        type="text"
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

                                                <div className="mb-3">
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

                                            </div>


                                            {/* <div className="grid grid-cols-7 mt-7  gap-2">

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

                                            </div> */}

                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">

                                                <div className="mb-3">
                                                    <div className="mt-4">
                                                        <label htmlFor="status" className='text-style roboto-light'>Mode</label>
                                                        <div className="mt-3">
                                                            <label className="inline-flex">
                                                                <input type="radio" name="mode" value="1"  defaultChecked={params.mode == '1' ? true : false} onChange={(e) => changeValue(e)} className="form-radio border-[#B3B3B3] text-success peer" />
                                                                <span style={{color:'#5E5E5E'}} className="peer-checked:text-success text-success text-style roboto-light">Live</span>
                                                            </label>
                                                            <label className="inline-flex px-5">
                                                                <input type="radio" name="mode" value="0" defaultChecked={params.mode == '0' ? true : false} onChange={(e) => changeValue(e)} className="form-radio border-[#B3B3B3] text-success peer" />
                                                                <span style={{color:'#5E5E5E'}} className="peer-checked:text-secondary text-style roboto-light">Demo</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger mt-1">{errors.mode}</span>
                                                    </div>
                                                </div>

                                                

                                                <div className="mb-3">
                                                    <div className="mt-4">
                                                        <label htmlFor="status" className='text-style roboto-light'>Status</label>
                                                        <div className="mt-3">
                                                            <label className="inline-flex">
                                                                <input type="radio" name="status" value='1' defaultChecked={params.status == '1' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-success peer" />
                                                                <span style={{color:'#32e01d'}} className="peer-checked:text-success text-style roboto-light">Active</span>
                                                            </label>
                                                            <label className="inline-flex px-5">
                                                                <input type="radio" name="status" value='0' defaultChecked={params.status == '0' ? true : false} onChange={(e) => changeValue(e)} className=" form-radio border-danger  w-5 h-5 text-danger peer" />
                                                                <span style={{color:'red'}} className="peer-checked:text-denger text-style roboto-light">Disable</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger mt-1">{errors.status}</span>
                                                    </div>
                                                </div>


                                                <div className="mb-3 mt-4">
                                                    {/* <label htmlFor="image" className='text-style roboto-light'>Logo</label> */}
                                                    <input ref={fileLogoRef} name="logo" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
                                                    <span className="w-full h-20 relative">
                                                        <img className="w-30 h-20 rounded overflow-hidden object-cover" id="logo" onClick={() => {
                                                            fileLogoRef.current!.click()
                                                        }} src={logoPriview} alt="logo" />
                                                    </span>
                                                    {errors?.logo ? <div className="text-danger mt-1">{errors.logo}</div> : ''}
                                                </div>

                                                <div className="mb-3 mt-4 ">
                                                    {/* <label htmlFor="fav_icon" className='text-style roboto-light'>Fav Icon</label> */}
                                                    <input ref={fileIconRef} name="fav_icon" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
                                                    <span className="w-full h-20 relative">
                                                        <img className="w-30 h-20 rounded  overflow-hidden object-cover" id="fav_icon" onClick={() => {
                                                            fileIconRef.current!.click()
                                                        }} src={iconPriview} alt="fav_icon" />
                                                    </span>
                                                    {errors?.fav_icon ? <div className="text-danger mt-1">{errors.fav_icon}</div> : ''}
                                                </div>

                                            </div>


                                        </form>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button
                                                type="button"
                                                className="btn  btn-dark btn-sm px-10 rounded-2xl bg-[#000000] text-white dark:bg-white dark:text-black "
                                                onClick={() => { formSubmit() }}
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
