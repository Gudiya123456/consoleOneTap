// import React from 'react'
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
// import { RiHome4Line } from 'react-icons/ri'

// export default function AddPayment() {
//     return (
//         <div>
//             <div className="panel flex justify-between items-center overflow-x-auto whitespace-nowrap p-1.5 rounded-none ">
//                 <div className="flex  items-center overflow-x-auto whitespace-nowrap " >
//                     <div className="rounded-full p-1.5   ltr:mr-3 rtl:ml-3">
//                         <RiHome4Line className=' opacity' size={20} color='gray' />

//                     </div>
//                     <IoIosArrowForward className='ltr:mr-3 opacity-25 font-thin' color='gray' />

//                     <a href="/" className="block hover:underline text-gray-600  ltr:mr-3 rtl:ml-3 poppins-font" rel="noreferrer">
//                         Home
//                     </a>
//                     <IoIosArrowForward className='font-thin mr-3 opacity-25' color='gray' />
//                     <a href="/" className="block hover:underline text-gray-600  ltr:mr-3 rtl:ml-3 poppins-font" rel="noreferrer">
//                         Payment
//                     </a>
//                     <IoIosArrowForward className='font-thin opacity-25' color='gray' />

//                     <p className='ltr:ml-3 text-blue-700 poppins-font' >Add Payment</p>

//                 </div>
//                 <div>
//                     <a href="/" className="flex poppins-font  items-center hover:underline text-gray-600 text-[13px]  ltr:mr-10 rtl:ml-3" rel="noreferrer">
//                         <IoIosArrowBack
//                             className='font-thin ml-2 mr-2 ' color='gray' />  Back
//                     </a>


//                 </div>
//             </div>
//             <div className='p-6'>
//                 <div className="panel  w-full">

//                     <div className='flex justify-between'>
//                         <div><b className='text-[20px]'>Add Payment</b></div>
//                     </div>
//                     <div className="p-5 grid grid-cols-2 gap-4">

//                         <div className="mb-1">
//                             <label> Title</label>
//                             <input type="text" placeholder="Enter  Title" className="form-input" />
//                         </div>
//                         <div className="mb-1">
//                             <label>Pricing</label>
//                             <input type="text" placeholder="Enter Pricing" className="form-input" name="background" />
//                         </div>
//                         <div className="mb-1">
//                             <label>Description</label>
//                             <input type="text" placeholder="Enter Description" className="form-input" name="background" />
//                         </div>

//                         <div className="mb-1">
//                             <div className="mt-4">
//                                 <label htmlFor="status">Status</label>
//                                 <div className="mt-3">
//                                     <label className="inline-flex">
//                                         <input type="radio" name="status" className="form-radio text-success peer" />
//                                         <span className="peer-checked:text-success">Active</span>
//                                     </label>
//                                     <label className="inline-flex px-5">
//                                         <input type="radio" name="status" className="form-radio text-secondary peer" />
//                                         <span className="peer-checked:text-secondary">Blocked</span>
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>


//                         <div className="flex justify-end items-center mt-8">

//                             <button type="button" className="btn bg-[#1d67a7] text-white ltr:ml-4 rtl:mr-4">
//                                 Add
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CreateComplaint({ showDrawer, setShowDrawer, data, fetchPayments }) {
    console.log("data", data)
    const navigate = useNavigate();
    const fileImageRef = useRef<HTMLInputElement>(null);
    const [imagePriview, setImagePriview] = useState<any>('https://dummyimage.com/600x400/000/fff');

    console.log(data)

    const defaultParams = {
        id: "",
        title: "",
        pricing: "",
        description: "",
        image: "",
        status: "1",
    };
    const [params, setParams] = useState<any>(
        defaultParams
    );
    useEffect(() => {
        if (data?.id) {
            setParams(
                {
                    id: data.id,
                    title: data.title,
                    pricing: data.pricing,
                    description: data.description,
                    image: data.image,
                    status: data.status,
                }
            )
        }
        else {

            setParams(defaultParams)
        }
    }, [data])

    const [modal, setModal] = useState<any>(false);
    console.log(defaultParams)
    console.log(params)
    const [errors, setErros] = useState<any>({});

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: "" });
        setParams({ ...params, [name]: value });
    };
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
                setImagePriview(reader.result)
                setParams({ ...params, [name]: e.target.files[0] });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.title) {
            errors = { ...errors, title: " title is required" };
        }
        if (!params.pricing) {
            errors = { ...errors, pricing: " pricing is required" };
        } if (!params.description) {
            errors = { ...errors, description: " description is required" };
        } if (!params.image) {
            errors = { ...errors, image: " image is required" };
        } if (!params.status) {
            errors = { ...errors, status: " status is required" };
        }
        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const [btnLoading, setBtnLoading] = useState(false);

    const storeOrUpdateApi = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: "http://127.0.0.1:8000/api/payments",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    // Authorization: "Bearer " + crmToken,
                },
            });

            if (response.data.status == 'success') {
                fetchPayments();
                setShowDrawer(false)
                setParams(defaultParams)
                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });

                if (response.data.status == "success") {
                    fetchPayments()
                    setModal(false)
                } else {
                    alert(9)
                }

            } else {

                alert("Failed")
            }

        } catch (error: any) {
            console.log(error)
            if (error.response.status == 401) navigate('/login')
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
        data.append("title", params.title);
        data.append("pricing", params.pricing);
        data.append("description", params.description);
        data.append("image", params.image);
        data.append("status", params.status);
        storeOrUpdateApi(data);
    };


    return (
        <div>
            <div className={`${(showDrawer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} ></div>

            <nav
                className={`${(showDrawer && 'ltr:!right-0 rtl:!left-0') || ''
                    } bg-white fixed ltr:-right-[800px] rtl:-left-[800px] top-0 bottom-0 w-full max-w-[500px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-1000 z-[51] dark:bg-black p-4`}
            >

                <div className="flex flex-col h-screen overflow-hidden">
                    <div className="w-full text-center border-b border-grey p-4">
                        <button type="button" className="px-4 py-4 absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowDrawer(false)}>
                            <IoCloseSharp className=" w-5 h-5" />
                        </button>

                        <h4 className="mb-1 dark:text-white font-bold">{data?.id?'Edit':'Add'} New Payment</h4>
                    </div>

                    <section className="flex-1 overflow-y-auto overflow-x-hidden perfect-scrollbar mt-5">
                        <form action="" method="post" className='p-5'>



                            <div className='mb-4 poppins-font'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Title</label>
                                <input id="fullname" type="text" placeholder="Enter Name" className="input-form poppins-font placeholder-black "
                                    name='title'
                                    value={params.title}
                                    onChange={(e) => { changeValue(e) }}

                                />
                                {errors?.title ? <div className="text-danger mt-1">{errors.title}</div> : ''}

                            </div>

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Pricing </label>
                                <input id="fullname" type="text" placeholder="pricing " className="input-form poppins-font placeholder-black"
                                    name='pricing'
                                    value={params.pricing}
                                    onChange={(e) => { changeValue(e) }}

                                />
                                {errors?.pricing ? <div className="text-danger mt-1">{errors.pricing}</div> : ''}

                            </div>

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Description</label>
                                {/* <input id="fullname" type="textarea" placeholder="description" className=" input-form poppins-font placeholder-black"
                                    name='description'
                                    value={params.description}
                                    onChange={(e) => { changeValue(e) }}


                                /> */}
                                <textarea className=" input-form rounded-md text-white-dark text-style poppins-font"></textarea>
                                {errors?.description ? <div className="text-danger mt-1">{errors.description}</div> : ''}

                            </div>

                            <div className="mb-1">
                                <label htmlFor="image">Image</label>
                                <input ref={fileImageRef} name="image" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
                                <span className="w-full h-20 relative">
                                    <img className="w-48 h-20  overflow-hidden object-cover" id="image" onClick={() => {
                                        fileImageRef.current!.click()
                                    }} src={imagePriview} alt="img" />
                                </span>
                                <span className="text-danger font-semibold text-sm p-2">{errors.image}</span>
                            </div>


                            <div className="mb-5">
                                <label htmlFor="number">Status</label>
                                <label className="inline-flex">
                                    <input
                                        id="status5"
                                        name="status"
                                        type="radio"
                                        className="form-radio text-success peer"
                                        defaultChecked={params.status == 1 ? true : false}
                                        value={1}
                                        onClick={(e) => changeValue(e)}
                                    />

                                    <span className="peer-checked:text-success">Active</span>
                                </label>

                                <label className="inline-flex ml-3">
                                    <input
                                        id="status4"
                                        name="status"
                                        type="radio"
                                        defaultChecked={params.status == 0 ? true : false}
                                        value={0}
                                        onClick={(e) => changeValue(e)}
                                        className="form-radio text-danger peer"
                                    />
                                    <span className="peer-checked:text-danger">Blocked</span>
                                </label>
                                {errors?.status ? <div className="text-danger mt-1">{errors.status}</div> : ''}
                            </div>

                        </form>
                    </section>
                    <footer className="w-full text-center border-t border-grey p-4">
                        <div className='flex justify-end gap-5 py-2'>
                            <button className='btn shadow' onClick={() => setShowDrawer(false)}>Cancel</button>
                            <button onClick={() => { formSubmit() }} className='btn btn-dark'>
                                {
                                    params.id ? <div>{btnLoading ? 'Please wait' : 'Update'}</div> : <div>{btnLoading ? 'Please wait' : 'Add'}</div>
                                }
                            </button>
                        </div>
                    </footer>
                </div>
            </nav>
        </div>
    )
}
