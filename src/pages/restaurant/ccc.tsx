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
    const [isLoading, setIsLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);

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
                url: window.location.origin + "/api/dashboard/restaurants",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + crmToken,
                },
            });
            if (response.data.status == "success") {
                setResList(response.data.restaurants);
                setTimeZones(response.data.timeZones)
                console.log(response.data);
            } else {
                console.log(errors);
            }
        } catch (error: any) {
            if (error.response.status == 401) navigate("/login");
            if (error.response.status === 422) {
                const serveErrors = error.response.data.errors;
                for (var key in serveErrors) {
                    setErros({ ...errors, [key]: serveErrors[key][0] });
                }
            } else console.log(error);
        } finally {
            setIsLoading(false);
        }
    };


    const fileLogoRef = useRef<HTMLInputElement>(null);
    const fileIconRef = useRef<HTMLInputElement>(null);
    const [logoPriview, setLogoPriview] = useState<any>('https://dummyimage.com/600x400/000/fff');
    const [iconPriview, setIconPriview] = useState<any>('https://dummyimage.com/600x400/000/fff');


    const [modal, setModal] = useState<any>(false);

    const [defaultParams] = useState({
        id: '',
        sub_domain: "",
        restaurant_name: "",
        branches: "",
        contact_person_email: "",
        contact_person_name: "",
        contact_person_phone: "",
        mode: '1',
        status: '1',
        logo: '',
        fav_icon: '',
        branch_name: '',
        address1: '',
        address2: '',
        area: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        time_zone: '',
        branch_mode: 1,
        branch_status: 1,
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
                restaurant_name: "restaurant_name is required!",
            };
        }
        if (!params.sub_domain) {
            errors = { ...errors, sub_domain: "sub_domain is required" };
        }
        if (!params.contact_person_email) {
            errors = {
                ...errors,
                contact_person_email: "contact_person_email is required",
            };
        }
        if (!params.contact_person_name) {
            errors = {
                ...errors,
                contact_person_name: "contact_person_name is required",
            };
        }
        if (!params.contact_person_phone) {
            errors = {
                ...errors,
                contact_person_phone: "contact_person_phone is required",
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
            if (!params.address1) {
                errors = { ...errors, address1: "address line 1 is required" };
            }
        }

        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };




    const deleteUser = (user: any = null) => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: "Delete",
            padding: "2em",
            customClass: "sweet-alerts",
        }).then(async (result) => {
            if (result.value) {
                try {
                    const response = await axios({
                        method: "delete",
                        url:
                            window.location.origin +
                            "/api/dashboard/restaurants/" +
                            user.id,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + crmToken,
                        },
                    });
                    if (response.data.status === "success") {
                        setFilteredItems(
                            filteredItems.filter((d: any) => d.id !== user.id)
                        );
                        setResList( resList.filter((d: any) => d.id !== user.id));
                        showMessage("Restaurant has been deleted successfully.");
                    }
                } catch (error: any) {
                    if (error.response.status == 401) navigate('/login')
                } finally {
                    console.log(errors);
                }
            }
        });
    };



    const storeOrUpdateApi = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: window.location.origin + "/api/dashboard/restaurants",
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
            if (error.response.status === 401) navigate('/login')
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
        data.append("contact_person_name", params.contact_person_name);
        data.append("contact_person_email", params.contact_person_email);
        data.append("contact_person_phone", params.contact_person_phone);
        data.append("mode", params.mode);
        data.append("status", params.status);
        data.append("logo", params.logo);
        data.append("fav_icon", params.fav_icon);
        data.append("branch_name", params.branch_name);
        data.append("address1", params.address1);
        data.append("address2", params.address2);
        data.append("area", params.area);
        data.append("city", params.city);
        data.append("state", params.state);
        data.append("pincode", params.pincode);
        data.append("country", params.country);
        data.append("time_zone", params.time_zone);
        data.append("branch_mode", params.branch_mode);
        data.append("branch_status", params.branch_status);
        storeOrUpdateApi(data);
    };

    const storeOrUpdate = (data) => {
        setErros({});
        if (data) {
            setParams({
                id: data.id,
                restaurant_name: data.restaurant_name,
                branches: data.branches,
                contact_person_email: data.contact_person_email,
                contact_person_name: data.contact_person_name,
                contact_person_phone: data.contact_person_phone,
                sub_domain: data.sub_domain,
                logo: '',
                fav_icon: '',
                country: data.country,
                address1: data.address,
                address_2: data.address_2,
                area: data.area,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
                mode: data.mode ? '1' : '0',
                status: data.status ? '1' : '0',
            });

            data.logo ?
                setLogoPriview(window.location.origin + data.logo) :
                setLogoPriview('https://dummyimage.com/600x400/000/fff');

            data.fav_icon ?
                setIconPriview(window.location.origin + data.fav_icon) :
                setIconPriview('https://dummyimage.com/600x400/000/fff');

        } else {
            setParams(defaultParams);
            setLogoPriview('https://dummyimage.com/600x400/000/fff');
            setIconPriview('https://dummyimage.com/600x400/000/fff');
        }
        setModal(true)
    }


    return (
        <div>

            {isLoading ? (<PageLoader />) :
                (
                    <div className="">
                        <div className="flex items-center justify-between flex-wrap gap-4 px-4 pb-3">
                            <h2 className="text-2xl font-semibold">Restaurant</h2>
                            <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">

                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search Restaurant"
                                        className="form-input py-2 ltr:pr-11 rtl:pl-11 peer"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary"
                                    >
                                        <IconSearch className="mx-auto" />
                                    </button>
                                </div>


                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-dark btn-sm"
                                        onClick={() => storeOrUpdate(null)}
                                    >
                                        <HiMiniBuildingStorefront className="ltr:mr-2 rtl:ml-2" />
                                        Add Restaurant
                                    </button>
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div>Loading</div>
                        ) : (
                            <>
                                {filteredItems.length ? (
                                    <div className=" grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:sm:grid-cols-3" >
                                        {filteredItems.map((restaurant) => (
                                            <div className="bg-white rounded shadow" key={restaurant.id} >
                                                <div className="flex gap-2  bg-[#f3f4f6] p-2" >
                                                    <div className="col-span-2" >
                                                        <img className="rounded-2xl w-20 h-20"
                                                            src={restaurant.fav_icon ? window.location.origin + restaurant.fav_icon : '/default/fav_icon.png'}
                                                            alt="fav icon" />
                                                    </div>
                                                    <div className=" flex justify-between  col-span-10 mt-3" >
                                                        <div>
                                                            <div className="flex items-center gap-2"><a href={`https://${restaurant.sub_domain}.onetapdine.com/dashboard`} target="_blank" className="text-[18px] font-bold text-blue-700">{restaurant.restaurant_name}</a> <FaLink color="blue" /></div>
                                                            <div><b className="text-gray-600 text-[14px]">Branches : {restaurant.branches}</b></div>
                                                            <div><b className="text-gray-400 text-[12px]">{restaurant.created_at}</b></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="px-2 p-2">
                                                    <div className="flex justify-end gap-5" >
                                                        <div><span className={`badge ${restaurant.status ? 'bg-success' : 'bg-danger'} `}>{restaurant.status ? 'Active' : 'Blocked'}</span></div>
                                                        <div> <span className={`badge ${restaurant.mode ? 'bg-success' : 'bg-info'} `}>{restaurant.mode ? 'Live' : 'Demo'}</span></div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="flex justify-between mb-1" >
                                                            <div className="flex gap-1 items-center" >
                                                                <FaUser /><b className="text-gray-600"> Name</b>
                                                            </div>
                                                            <div>
                                                                <b>{restaurant.contact_person_name}</b>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between mb-1" >
                                                            <div className="flex gap-1 items-center" >
                                                                <FaSquarePhone /><b className="text-gray-600"> Phone</b>
                                                            </div>
                                                            <div>
                                                                <b>{restaurant.contact_person_phone}</b>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between mb-1" >
                                                            <div className="flex gap-1 items-center" >
                                                                <MdEmail /><b className="text-gray-600"> Email</b>
                                                            </div>
                                                            <div>
                                                                <b>{restaurant.contact_person_email}</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-[#f3f4f6] p-2">
                                                    <div className="flex justify-between ">
                                                        <button>
                                                            <MdEditSquare size={25} color="#3f7eef" onClick={() => storeOrUpdate(restaurant)} />
                                                        </button>
                                                        <NavLink to="/restaurants/view" state={{
                                                            restaurantId:
                                                                restaurant.id,
                                                        }}>
                                                            <IoEye size={25} color="purple" />
                                                        </NavLink>
                                                        <button>
                                                            <FaTrash size={25} color="#cb0101" onClick={() => deleteUser(restaurant)} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>No Restaurant Available</div>
                                )}
                            </>
                        )}
                    </div>

                )}





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
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-5xl my-8 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <h5 className="text-lg font-bold">
                                            {params.id ? 'Edit' : 'Add'} Restaurant
                                        </h5>
                                        <button
                                            onClick={() =>
                                                setModal(false)
                                            }
                                            type="button"
                                            className="text-white-dark hover:text-dark"
                                        >
                                            <IoCloseCircle size={30} color="#b53e3e" />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <form>

                                            <div className="mb-4">
                                                <span className="badge bg-dark">
                                                    <b>Restaurant Details</b>
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

                                                <div className="">
                                                    <label htmlFor="rname">
                                                        Restaurant Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Name"
                                                        className="form-input"
                                                        name="restaurant_name"
                                                        value={
                                                            params.restaurant_name
                                                        }
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
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
                                                    <label htmlFor="subdomain">
                                                        Subdomain Name
                                                    </label>
                                                    {params.id ? (
                                                        <input

                                                            type="text"
                                                            readOnly
                                                            placeholder="Enter Subdomain Name"
                                                            className="form-input"
                                                            name="sub_domain"
                                                            disabled={params.id ? true : false}
                                                            value={
                                                                params.sub_domain
                                                            }
                                                            onChange={(e) =>
                                                                changeValue(e)
                                                            }
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Subdomain Name"
                                                            className="form-input bg-info-light"
                                                            name="sub_domain"
                                                            value={
                                                                params.sub_domain
                                                            }
                                                            onChange={(e) => changeValue(e)
                                                            }
                                                        />
                                                    )}
                                                    {errors?.sub_domain ? (
                                                        <div className="text-danger mt-1">
                                                            {errors.sub_domain}
                                                        </div>
                                                    ) : (
                                                        <span className="italic text-[12px] font-bold text-gray-600">{params.id ? 'Cannot able to edit' : 'Please note that this cannot be edited later'}</span>
                                                    )}
                                                </div>

                                                <div className="">
                                                    <label htmlFor="email">
                                                        Maximum Branches
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="Enter no of Branches"
                                                        className="form-input"
                                                        name="branches"
                                                        value={params.branches}
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
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
                                                    <label htmlFor="name">
                                                        Contact Person Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Contact Person Name"
                                                        className="form-input"
                                                        name="contact_person_name"
                                                        value={
                                                            params.contact_person_name
                                                        }
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                    />
                                                    {errors?.contact_person_name ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.contact_person_name
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>


                                                <div className="mb-1">
                                                    <label htmlFor="phone">
                                                        Contact Person Phone
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Phone"
                                                        className="form-input"
                                                        name="contact_person_phone"
                                                        value={
                                                            params.contact_person_phone
                                                        }
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                    />
                                                    {errors?.contact_person_phone ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.contact_person_phone
                                                            }
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>

                                                <div className="mb-1">
                                                    <label htmlFor="email">
                                                        Contact Person Email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Email"
                                                        className="form-input"
                                                        name="contact_person_email"
                                                        value={
                                                            params.contact_person_email
                                                        }
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                    />
                                                    {errors?.contact_person_email ? (
                                                        <div className="text-danger mt-1">
                                                            {
                                                                errors.contact_person_email
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
                                                        <label htmlFor="status">Mode</label>
                                                        <div className="mt-3">
                                                            <label className="inline-flex">
                                                                <input type="radio" name="mode" value="1" defaultChecked={params.mode == '1' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-success peer" />
                                                                <span className="peer-checked:text-success">Live</span>
                                                            </label>
                                                            <label className="inline-flex px-5">
                                                                <input type="radio" name="mode" value="0" defaultChecked={params.mode == '0' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-secondary peer" />
                                                                <span className="peer-checked:text-secondary">Demo</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-semibold text-sm p-2">{errors.mode}</span>
                                                    </div>
                                                </div>

                                                <div className="mb-1">
                                                    <div className="mt-4">
                                                        <label htmlFor="status">Status</label>
                                                        <div className="mt-3">
                                                            <label className="inline-flex">
                                                                <input type="radio" name="status" value='1' defaultChecked={params.status == '1' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-success peer" />
                                                                <span className="peer-checked:text-success">Active</span>
                                                            </label>
                                                            <label className="inline-flex px-5">
                                                                <input type="radio" name="status" value='0' defaultChecked={params.status == '0' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-secondary peer" />
                                                                <span className="peer-checked:text-secondary">Blocked</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-semibold text-sm p-2">{errors.status}</span>
                                                    </div>
                                                </div>


                                                <div className="mb-5 mt-2">
                                                    <label htmlFor="image">Logo</label>
                                                    <input ref={fileLogoRef} name="logo" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
                                                    <span className="w-full h-20 relative">
                                                        <img className="w-40 h-20 rounded overflow-hidden object-cover" id="logo" onClick={() => {
                                                            fileLogoRef.current!.click()
                                                        }} src={logoPriview} alt="logo" />
                                                    </span>
                                                    {errors?.logo ? <div className="text-danger mt-1">{errors.logo}</div> : ''}
                                                </div>

                                                <div className="mb-5 mt-2">
                                                    <label htmlFor="fav_icon">Fav Icon</label>
                                                    <input ref={fileIconRef} name="fav_icon" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
                                                    <span className="w-full h-20 relative">
                                                        <img className="w-20 h-20 rounded  overflow-hidden object-cover" id="fav_icon" onClick={() => {
                                                            fileIconRef.current!.click()
                                                        }} src={iconPriview} alt="fav_icon" />
                                                    </span>
                                                    {errors?.fav_icon ? <div className="text-danger mt-1">{errors.fav_icon}</div> : ''}
                                                </div>

                                            </div>

                                            {!params.id ? (

                                                <>
                                                    <div className="mt-4 mb-4">
                                                        <span className="badge bg-dark">
                                                            <b>Main Branch Details</b>
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#f1f2f3] p-3 rounded">

                                                        <div className="mb-1">
                                                            <label htmlFor="name">
                                                                Branch Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="Branch Name"
                                                                className="form-input"
                                                                name="branch_name"
                                                                value={
                                                                    params.branch_name
                                                                }
                                                                onChange={(e) =>
                                                                    changeValue(e)
                                                                }
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

                                                        <div className="mb-1">
                                                            <label htmlFor="name">
                                                                Address Line 1
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="address line 1"
                                                                className="form-input"
                                                                name="address1"
                                                                value={
                                                                    params.address1
                                                                }
                                                                onChange={(e) =>
                                                                    changeValue(e)
                                                                }
                                                            />
                                                            {errors?.address1 ? (
                                                                <div className="text-danger mt-1">
                                                                    {
                                                                        errors.address1
                                                                    }
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                        <div className="mb-1">
                                                            <label htmlFor="name">
                                                                Address Line 2
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="address line 2"
                                                                className="form-input"
                                                                name="address2"
                                                                value={
                                                                    params.address_2
                                                                }
                                                                onChange={(e) =>
                                                                    changeValue(e)
                                                                }
                                                            />
                                                            {errors?.address_2 ? (
                                                                <div className="text-danger mt-1">
                                                                    {
                                                                        errors.address_2
                                                                    }
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>

                                                        <div className="mb-1">
                                                            <label htmlFor="name">
                                                                Area
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="area"
                                                                className="form-input"
                                                                name="area"
                                                                value={
                                                                    params.area
                                                                }
                                                                onChange={(e) =>
                                                                    changeValue(e)
                                                                }
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

                                                        <div className="mb-1">
                                                            <label htmlFor="name">
                                                                City
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="city"
                                                                className="form-input"
                                                                name="city"
                                                                value={
                                                                    params.city
                                                                }
                                                                onChange={(e) =>
                                                                    changeValue(e)
                                                                }
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
                                                            <label htmlFor="name">
                                                                State
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="state"
                                                                className="form-input"
                                                                name="state"
                                                                value={
                                                                    params.state
                                                                }
                                                                onChange={(e) =>
                                                                    changeValue(e)
                                                                }
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
                                                            <label htmlFor="name">
                                                                Pincode
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="pincode"
                                                                className="form-input"
                                                                name="pincode"
                                                                value={params.pincode}
                                                                onChange={(e) => changeValue(e)} />
                                                            {errors?.pincode ? (<div className="text-danger mt-1">{errors.pincode}</div>) : ''}
                                                        </div>



                                                        <div className="mb-1">
                                                            <label htmlFor="name">
                                                                Country
                                                            </label>

                                                            <select className="form-select" name="country" value={params.country ? params.country : ''} onChange={(e) => changeValue(e)}>
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
                                                            <label htmlFor="name">
                                                                Timezone
                                                            </label>

                                                            <select className="form-select text-white-dark" name='time_zone' value={params.time_zone ? params.time_zone : ''} onChange={(e) => changeValue(e)} >
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




                                                        <div className="mb-1">
                                                            <div className="mt-4">
                                                                <label htmlFor="status">Mode</label>
                                                                <div className="mt-3">
                                                                    <label className="inline-flex">
                                                                        <input type="radio" name="branch_mode" value="1" defaultChecked={params.branch_mode == '1' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-success peer" />
                                                                        <span className="peer-checked:text-success">Live</span>
                                                                    </label>
                                                                    <label className="inline-flex px-5">
                                                                        <input type="radio" name="branch_mode" value="0" defaultChecked={params.branch_mode == '0' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-secondary peer" />
                                                                        <span className="peer-checked:text-secondary">Demo</span>
                                                                    </label>
                                                                </div>
                                                                <span className="text-danger font-semibold text-sm p-2">{errors.branch_mode}</span>
                                                            </div>
                                                        </div>

                                                        <div className="mb-1">
                                                            <div className="mt-4">
                                                                <label htmlFor="status">Status</label>
                                                                <div className="mt-3">
                                                                    <label className="inline-flex">
                                                                        <input type="radio" name="branch_status" value='1' defaultChecked={params.branch_status == '1' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-success peer" />
                                                                        <span className="peer-checked:text-success">Active</span>
                                                                    </label>
                                                                    <label className="inline-flex px-5">
                                                                        <input type="radio" name="branch_status" value='0' defaultChecked={params.branch_status == '0' ? true : false} onChange={(e) => changeValue(e)} className="form-radio text-secondary peer" />
                                                                        <span className="peer-checked:text-secondary">Blocked</span>
                                                                    </label>
                                                                </div>
                                                                <span className="text-danger font-semibold text-sm p-2">{errors.branch_status}</span>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </>
                                            ) : ''}
                                        </form>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button
                                                type="button"
                                                className="btn  btn-dark btn-sm ltr:ml-4 rtl:mr-4"
                                                onClick={() => formSubmit()}
                                            >
                                                {btnLoading ? 'Loading...' : params.id ? 'Update Restaurant' : 'Add Restaurant'}

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
