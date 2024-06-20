import React, { useEffect, useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import logo from "../../assets/images/auth/profile.svg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';



export default function TableDrawer({ showDrawer, setShowDrawer,data,fetchAuthorization }) {
  const navigate = useNavigate();
  const fileImageRef = useRef<HTMLInputElement>(null);
  const [imagePriview, setImagePriview] = useState<any>(logo);
  const crmToken = '8|wE3Mh4SVxwrcXeqKDcQIMZYC6RDVZ4IKGQcSTF5d937ad76e';
  const[btnLoading,setBtnLoading]=useState(false)

  console.log("data", data)

  const defaultParams = {
      id: "",
      name: "",
      email: "",
      phone: "",
      image: "",
      status: "1",
      role:''
  };
  const [params, setParams] = useState<any>(
      defaultParams
  );
  useEffect(() => {
      if (data?.id) {
          setParams(
              {
                  id: data.id,
                  name: data.name,
                  email: data.email,
                  phone: data.phone,
                  image: data.image,
                  status: data.status,
                  role: data.role,

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
      if (!params.name) {
          errors = { ...errors, name: " name is required" };
      }
      if (!params.email) {
          errors = { ...errors, email: " email is required" };
      } if (!params.phone) {
          errors = { ...errors, phone: " phone is required" };
      } if (!params.image) {
          errors = { ...errors, image: " image is required" };
      }
    //    if (!params.status) {
    //       errors = { ...errors, status: " status is required" };
    //   }
    //   if (!params.role) {
    //     errors = { ...errors, role: " role is required" };
    // }
      console.log(errors);
      setErros(errors);
      return { totalErrors: Object.keys(errors).length };
  };

  const storeOrUpdateApi = async (data: any) => {
      setBtnLoading(true)
      try {
          const response = await axios({
              method: 'post',
              url: "https://cdn.onetapdine.com/api/authorizations",
              data,
              headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + crmToken,
              },
          });

          if (response.data.status == 'success') {
              fetchAuthorization();
              setShowDrawer(false)
              setParams(defaultParams)
              Swal.fire({
                  icon: response.data.status,
                  name: response.data.name,
                  text: response.data.message,
                  padding: '2em',
                  customClass: 'sweet-alerts',
              });

              if (response.data.status == "success") {
                  fetchAuthorization()
                  setShowDrawer(false)
              } else {
                  alert(9)
              }

          } else {

              alert("Failed")
              console.log(response.error)
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
      data.append("id", params.id);
      data.append("name", params.name);
      data.append("email", params.email);
      data.append("phone", params.phone);
      data.append("image", params.image);
      data.append("status", params.status);
      data.append("role", params.role);

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

                        <h4 className="mb-1 dark:text-white font-bold">{data?.id?'Edit':'Add'} Authorization</h4>
                    </div>

                    <section className="flex-1 overflow-y-auto overflow-x-hidden perfect-scrollbar mt-5">
                        <form action="" method="post" className='p-5'>
                       {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-2' > */}
                            <div className='mb-4 poppins-font'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Name</label>
                                <input id="fullname" type="text" placeholder="Enter Name" className="input-form poppins-font placeholder-black " 
                                 name='name'
                                 value={params.name}
                                 onChange={(e)=>changeValue(e)}
                                 />
                                 <span className="text-danger font-semibold text-sm p-2">{errors.name}</span>
 
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Email</label>
                                <input id="fullname" type="text" placeholder="Enter Email" className="input-form poppins-font placeholder-black" 
                                 name='email'
                                 value={params.email}
                                 onChange={(e)=>changeValue(e)}
                                 />
                                 <span className="text-danger font-semibold text-sm p-2">{errors.email}</span>
 
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Phone</label>
                                <input id="fullname" type="text" placeholder="Enter Phone" className=" input-form poppins-font placeholder-black"
                                name='phone'
                                value={params.phone}
                                onChange={(e)=>changeValue(e)}
                                />
                                <span className="text-danger font-semibold text-sm p-2">{errors.phone}</span>

                            </div>
                           
                              <div className="mb-3">
                          <label
                            htmlFor="name"
                            className="text-style roboto-light poppins-font"
                          >
                            Role
                          </label>

                          <select
                            className="input-form h-[33px] poppins-font  dark:border-[#5E5E5E] dark:bg-transparent"
                            name="role"
                            value={params.role}
                            onChange={(e)=>{changeValue(e)}}
                          >
                            <option className="poppins-font text-red-600" value="">
                              Select Role
                            </option>
                            <option className="poppins-font" value="Admin">
                             Admin
                            </option>
                            <option className="poppins-font" value="BDE">
                             BDE
                            </option>
                            <option className="poppins-font" value="Accounts">
                              Accounts
                            </option>
                          </select>
                         
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="name"
                            className="text-style roboto-light"
                          >
                            Status
                          </label>

                          <select
                            className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                            name="status"
                            value={params.status}
                            onChange={(e)=>{changeValue(e)}}
                          >
                            <option className="" value="">
                              Select Status
                            </option>
                            <option className="" value="1">
                             Active
                            </option>
                            <option className="" value="0">
                             Disable
                            </option>
                           
                          </select>
                         
                        </div>
                        {/* <div className="mb-1 mt-1">
                        <label
                            htmlFor="name"
                            className="text-style roboto-light"
                          >
                          Profile Image
                          </label>
                                        <input
                                            ref={fileLogoRef}
                                            name="logo"
                                            type="file"
                                            onChange={(e) => setImage(e)}
                                            className="form-input hidden"
                                            accept="image/*"
                                        />
                                        <span className="w-full h-20 relative">
                                            <img
                                                className="w-40 h-20  rounded overflow-hidden object-cover"
                                                id="logo"
                                                onClick={() => {
                                                    fileLogoRef.current!.click();
                                                }}
                                                src={logoPriview}
                                                alt="logo"
                                            />
                                        </span>
                                       
                                    </div> */}
                     <div className="mb-1">
                                <label htmlFor="image">Profile Image</label>
                                <input ref={fileImageRef} name="image" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
                                <span className="w-full h-20 relative">
                                    <img className="w-48 h-20  overflow-hidden object-cover" id="image" onClick={() => {
                                        fileImageRef.current!.click()
                                    }} src={imagePriview} alt="img" />
                                </span>
                                <span className="text-danger font-semibold text-sm p-2">{errors.image}</span>
                            </div>

                        </form>
                    </section>
                    <footer className="w-full text-center border-t border-grey p-4">
                        <div className='flex justify-end gap-5 py-2'>
                            <button className='btn shadow' onClick={() => setShowDrawer(false)}>Cancel</button>
                            <button onClick={()=>{formSubmit()}} disabled={btnLoading} className='btn btn-dark'>
                              {btnLoading?'Please wait':'Submit'}
                            </button>
                        </div>
                    </footer>
                </div>
            </nav>
        </div>
    )
}