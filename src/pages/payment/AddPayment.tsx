import axios from 'axios';
import React, { useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IRootState } from '../../store';


export default function AddPayment({ showDrawer, setShowDrawer,stripe,title,alldata,fetchPaymentGteWay, paymentGateways, fetchPaymentGateWay }) {
    console.log('drawer', title);
    console.log('alldata',alldata);
    
  const defaultParams = {
    gateway_name:alldata?.gateway_name?alldata?.gateway_name: "",
    key:alldata?.key?alldata?.key: "",
    secret:alldata?.secret?alldata?.secret: "",
    environment:alldata?.environment?alldata?.environment: "",
};
const [params, setParams] = useState<any>(
    defaultParams
);
const[btnLoading,setBtnLoading]=useState(false);
// const crmToken = '8|wE3Mh4SVxwrcXeqKDcQIMZYC6RDVZ4IKGQcSTF5d937ad76e';
const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);

const navigate=useNavigate();
console.log(defaultParams)
console.log(params)
const [errors, setErros] = useState<any>({});

const changeValue = (e: any) => {
    const { value, name } = e.target;
    setErros({ ...errors, [name]: "" });
    setParams({ ...params, [name]: value });
};
const validate = () => {
    setErros({});
    let errors = {};
  
    if (!params.gateway_name) {
        errors = { ...errors, gateway_name: " gateway_name is required" };
    } if (!params.key) {
        errors = { ...errors, key: " key is required" };
    }
   
    if (!params.secret) {
      errors = { ...errors, secret: " secret is required" };
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
            url: "https://cdn.onetapdine.com/api/payment-gateways",
            data,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + crmToken,
            },
        });

        if (response.data.status == 'success') {
            setShowDrawer(false)
            fetchPaymentGateWay();
            // setParams(defaultParams)
            // paymentGateways();
            navigate('/payment');
            Swal.fire({
                icon: response.data.status,
                name: response.data.name,
                text: response.data.message,
                padding: '2em',
                customClass: 'sweet-alerts',
            });

            if (response.data.status == "success") {
            //   fetchPaymentGteWay()
            fetchPaymentGateWay();
                setShowDrawer(false)
            } else {
                alert(9)
            }

        } else {

            alert("Failed")
        }

    } catch (error: any) {
        console.log(error)
        // if (error.response.status == 401) navigate('/login')
        if (error?.response?.status === 422) {
            const serveErrors = error.response.data.errors;
            let serverErrors = {};
            for (var key in serveErrors) {
                serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
                console.log(serveErrors[key][0])
            }
            setErros(serverErrors);
            CrmSwal.fire({
                name: "Server Validation Error! Please solve",
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
    // data.append("id",params.id);
    data.append("gateway_name", params.gateway_name);
    data.append("key", params.key);
    data.append("environment", params.environment);
    data.append("secret", params.secret);
    data.append("is_enabled", '1');

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

                        <h4 className="mb-1 dark:text-white font-bold"> <span className='text-yellow-500' >{params.gateway_name}</span>  Payment Integration</h4>
                    </div>

                    <section className="flex-1 overflow-y-auto overflow-x-hidden perfect-scrollbar mt-5">
                        <form action="" method="post" className='p-5'>
                            {/* <div className='mb-4 poppins-font'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Gateway Name</label>
                                <input id="fullname" type="text" placeholder="Enter Gateway Name" className="input-form poppins-font placeholder-black " 
                                name='gateway_name'
                                value={params.gateway_name}
                                onChange={(e)=>{changeValue(e)}}
                                />
                                <span className='text-red-700' >{errors.gateway_name}</span>
                            </div> */}

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Key</label>
                                <input id="fullname" type="text" placeholder="Enter Key" className="input-form poppins-font placeholder-black" 
                                name='key'
                                value={params.key}
                                onChange={(e)=>{changeValue(e)}}
                                />
                                <span className='text-red-700' >{errors.key}</span>
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Secret Key</label>
                                <input id="fullname" type="text" placeholder="Enter Secret Key" className=" input-form poppins-font placeholder-black" 
                                name='secret'
                                value={params.secret}
                                onChange={(e)=>{changeValue(e)}}
                                />
                                <span className='text-red-700' >{errors.secret}</span>
                            </div>
                           
                              <div className="mb-3">
                          <label
                            htmlFor="name"
                            className="text-style roboto-light poppins-font"
                          >
                           Environment
                          </label>

                          <select
                            className="input-form h-[33px] poppins-font  dark:border-[#5E5E5E] dark:bg-transparent"
                            name='environment'
                            value={params.environment ? params.environment : ""}
                            onChange={(e)=>{changeValue(e)}}
                            >
                            <option className="poppins-font text-red-600" value="">
                              Select Environment
                            </option>
                            <option className="poppins-font" value='1' >
                            Live
                            </option>
                            <option className="poppins-font" value='0' >
                            Demo
                            </option>
                          
                          </select>
                          <span className='text-red-700' >{errors.environment}</span>


                         
                        </div>
                       
                        </form>
                    </section>
                    <footer className="w-full text-center border-t border-grey p-4">
                        <div className='flex justify-end gap-5 py-2'>
                            <button className='btn shadow' onClick={() => setShowDrawer(false)}>Cancel</button>
                            <button className='btn btn-dark' onClick={()=>{formSubmit()}} disabled={btnLoading} >{
                              btnLoading ?'Please wait':'Submit'
                              }</button>
                        </div>
                    </footer>
                </div>
            </nav>
        </div>
    )
}