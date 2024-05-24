import React, { useState } from "react";
// import delet from "./images/delete.png";
// import plus from "./images/plus.png";
const AddFeatures = () => {
  const [inputvisible, setInputvisible] = useState(false);
  const features = [
    {
      slno: 1,
      fn: "Live Monitoring",
    },
    {
      slno: 2,
      fn: "Customer Support",
    },
    {
      slno: 3,
      fn: "Oboarding Setup",
    },
    {
      slno: 4,
      fn: "menu Setup",
    },
    {
      slno: 6,
      fn: "POS System",
    },
    {
      slno: 7,
      fn: "Takeaway",
    },
    {
      slno: 8,
      fn: "KOT Dashboard",
    },
    {
      slno: 9,
      fn: "Payment Gateway",
    },
    {
      slno: 10,
      fn: "Menus",
    },
  ];
  return (
    <div className=" mx-10 dark:bg-[#000000]  bg-[#FFFFFF] p-2 rounded-xl">
      <div className=" grid grid-cols-12 bg-[#EEEEEE] h-[53px] items-center rounded-lg dark:bg-[#35373B] text-black dark:text-white">
        <div className="  col-span-1 justify-center text-center font-semibold">
          SL:No
        </div>
        <div className="justify-center text-center font-semibold">
          Features
        </div>
      </div>
      {features.map((f) => (
        <div
          key={f.slno}
          className=" grid grid-cols-12 bg-[#F2F2F2] h-[53px] items-center rounded-lg mt-1 dark:bg-[#202125]"
        >
          <div className=" col-span-1 justify-center text-center font-semibold">
            {f.slno}
          </div>
          <div className=" col-span-2 justify-center ">
            <div>{f.fn}</div>
          </div>

          <div className=" col-span-9 flex justify-end items-center text-center ">
            <div className=" w-[64px] h-[26px] rounded-full text-white bg-black dark:bg-[#FFFFFF] dark:text-[black]">
              Edit
            </div>
            <div className=" mx-9">
              <img
                // src={delet}
                alt=""
                srcset=""
                className=" w-[22px] h-[22px]"
              />
            </div>
          </div>
        </div>
      ))}
      <div className=" grid grid-cols-12 bg-[#F2F2F2] h-[53px] items-center rounded-lg mt-1">
        <div className=" col-span-1 justify-center text-center font-semibold"></div>
        <div className=" col-span-4 justify-center ">
          {!inputvisible ? (
            <div className=" flex items-center">
              <div
                className=" cursor-pointer "
                onClick={() => setInputvisible(true)}
              >
                <img
                //   src={plus}
                  alt=""
                  srcset=""
                  className=" w-[18px] h-[18px]"
                />
              </div>
              Add new feature
            </div>
          ) : (
            <input
              type="text"
              placeholder="Type here"
              className="input-form flex-1 focus:outline-none h-[34px]  rounded-3xl w-[289px] px-5 bg-[#FFFFFF]"
            />
          )}
        </div>

        <div className=" col-span-7 flex justify-end mr-12 items-center text-center ">
          <div className=" w-[64px] h-[26px] rounded-full text-white bg-black dark:bg-[#FFFFFF] dark:text-[black]">
            Add
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFeatures;


// import React, { useState, Fragment, useEffect } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import Swal from 'sweetalert2';
// import { useDispatch, useSelector } from 'react-redux';
// import { setPageTitle } from '../../store/themeConfigSlice';
// import IconSearch from '../../components/Icon/IconSearch';
// import IconUser from '../../components/Icon/IconUser';
// import IconX from '../../components/Icon/IconX';
// import axios from 'axios';
// import { IRootState } from '../../store/index';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { IoCloseCircle } from 'react-icons/io5';
// const Contacts = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(setPageTitle('Features'));
//         fetchFeatures();

//     }, []);
//     const [resList, setResList] = useState<any>([]);
//     const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(true)


//     // fetch Restaurant data
//     const fetchFeatures = async () => {
//         setIsLoading(true)
//         try {
//             const response = await axios({
//                 method: 'get',
//                 url: window.location.origin + '/api/dashboard/features',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: 'Bearer ' + crmToken,
//                 },
//             });

//             if (response.data.status == 'success') {
//                 setResList(response.data.features);
//                 console.log(response.data);
//             }
//             else {
//                 console.log()
//             }


//         } catch (error: any) {
//             if (error.response.status == 401) navigate('/login')

//             else console.log(error)

//         }

//         finally {
//             setIsLoading(false)

//         }
//     };

//     const [addContactModal, setAddContactModal] = useState<any>(false);
//     const [filteredItems, setFilteredItems] = useState<any>(resList);
//     const [search, setSearch] = useState<any>('');

//     useEffect(() => {
//         setFilteredItems(() => {
//             return resList.filter((item: any) => {
//                 return item.features.toLowerCase().includes(search.toLowerCase());
//             });
//         });
//     }, [search, resList]);

//     const [defaultParams] = useState({
//         id: null,
//         features: '',
//         description: ''
//     });
//     const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
//     const [errors, setErros] = useState<any>({});

//     const changeValue = (e: any) => {
//         const { value, name } = e.target;
//         setErros({ ...errors, [name]: '' });
//         setParams({ ...params, [name]: value });
//     };

//     const validate = () => {
//         setErros({});
//         let errors = {};

//         if (!params.features) {
//             errors = { ...errors, features: 'features is required' };
//         }
//         if (!params.description) {
//             errors = { ...errors, description: 'description is required' };
//         }

//         console.log(errors)
//         setErros(errors);
//         return { totalErrors: Object.keys(errors).length };
//     };
//     const saveUser = () => {
//         const isValid = validate();
//         if (isValid.totalErrors) return false;
//         if (params.id) {
//             //update user
//             let user = {
//                 id: params.id,

//                 features: params.features,
//                 description: params.description,

//             };
//             updateUserToServer(user);
//         }
//     };

//     const updateUserToServer = async (user: any) => {
//         try {

//             const response = await axios({
//                 method: 'PUT',
//                 url: window.location.origin + '/api/dashboard/features/' + user.id,
//                 data: { features: params.features, description: params.description },
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: 'Bearer ' + crmToken,
//                 },
//             });

//             if (response.data.status === 'success') {
//                 showMessage('User has been updated successfully.');
//                 setAddContactModal(false);
//                 fetchFeatures();
//                 const reslists = response.data.features;
//                 let user: any = filteredItems.find((d: any) => d.id === reslists.id);
//                 user.features = reslists.features;
//                 user.description = reslists.description;
//                 showMessage('User has been updated successfully.');
//                 alert('User has been updated successfully')

//             }
//         } catch (error: any) {
//             console.log(error)
//             if (error.response.status === 401) navigate('/login')
//             if (error.response.status === 422) {
//                 const serveErrors = error.response.data.errors;
//                 for (var key in serveErrors) {
//                     setErros({ ...errors, [key]: serveErrors[key][0] });
//                 }
//             }
//             // else ErrorHandle(error);
//         }
//     };


//     const editUser = (user: any = null) => {
//         const json = JSON.parse(JSON.stringify(defaultParams));
//         setParams(json);
//         if (user) {
//             let json1 = JSON.parse(JSON.stringify(user));
//             setParams(json1);
//         }

//         setErros({});
//         setAddContactModal(true);
//     };

//     const showMessage = (msg = '', type = 'success') => {
//         const toast: any = Swal.mixin({
//             toast: true,
//             position: 'top',
//             showConfirmButton: false,
//             timer: 3000,
//             customClass: { container: 'toast' },
//         });
//         toast.fire({
//             icon: type,
//             title: msg,
//             padding: '10px 20px',
//         });
//     };



//     return (


//         <>
//             {
//                 isLoading ? 'loading....' : (
//                     <div>
//                         <div className="flex items-center justify-between flex-wrap gap-4">
//                             <h2 className="text-2xl">Features</h2>

//                             <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">

//                                 <div className="relative">
//                                     <input type="text" placeholder="Search Features" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
//                                     <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
//                                         <IconSearch className="mx-auto" />
//                                     </button>
//                                 </div>

//                             </div>
//                         </div>

//                         <div className="mt-5 panel p-0 border-0 overflow-hidden">
//                             <div className="table-responsive">
//                                 <table className="table-striped table-hover">
//                                     <thead>
//                                         <tr>
//                                             <th>Name</th>
//                                             <th>Description</th>

//                                             <th className="!text-center">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredItems.map((contact: any) => {
//                                             return (
//                                                 <tr key={contact.id}>
//                                                     <td>
//                                                         <div className="flex items-center w-max">
//                                                             {contact.path && (
//                                                                 <div className="w-max">
//                                                                     <img src={`/assets/images/${contact.image}`} className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
//                                                                 </div>
//                                                             )}
//                                                             {!contact.path && contact.features && (
//                                                                 <div className="grid place-content-center h-8 w-8 ltr:mr-2 rtl:ml-2 rounded-full bg-primary text-white text-sm font-semibold"></div>
//                                                             )}
//                                                             {!contact.path && !contact.features && (
//                                                                 <div className="border border-gray-300 dark:border-gray-800 rounded-full p-2 ltr:mr-2 rtl:ml-2">
//                                                                     <IconUser className="w-4.5 h-4.5" />
//                                                                 </div>
//                                                             )}
//                                                             <div>{contact.features}</div>
//                                                         </div>
//                                                     </td>
//                                                     <td>{contact.description}</td>

//                                                     <td>
//                                                         <div className="flex gap-4 items-center justify-center">
//                                                             <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editUser(contact)}>
//                                                                 Edit
//                                                             </button>

//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             );
//                                         })}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>

//                         <Transition appear show={addContactModal} as={Fragment}>
//                             <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-[51]">
//                                 <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
//                                     <div className="fixed inset-0 bg-[black]/60" />
//                                 </Transition.Child>
//                                 <div className="fixed inset-0 overflow-y-auto">
//                                     <div className="flex min-h-full items-center justify-center px-4 py-8">
//                                         <Transition.Child
//                                             as={Fragment}
//                                             enter="ease-out duration-300"
//                                             enterFrom="opacity-0 scale-95"
//                                             enterTo="opacity-100 scale-100"
//                                             leave="ease-in duration-200"
//                                             leaveFrom="opacity-100 scale-100"
//                                             leaveTo="opacity-0 scale-95"
//                                         >
//                                             <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
//                                                 {/* <button
//                                         type="button"
//                                         onClick={() => setAddContactModal(false)}
//                                         className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
//                                     >
//                                         <IconX />
//                                     </button> */}

//                                                 <button
//                                                     onClick={() =>
//                                                         setAddContactModal(false)
//                                                     }
//                                                     type="button"
//                                                     className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
//                                                 >
//                                                     <IoCloseCircle size={30} color="#b53e3e" />
//                                                 </button>

//                                                 <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
//                                                     {params.id ? 'Edit Features' : 'Add Features'}
//                                                 </div>
//                                                 <div className="p-5">
//                                                     <form>

//                                                         <div className="mb-5">
//                                                             <label htmlFor="name">Name</label>
//                                                             <input id="name" type="text" placeholder="Enter Features Name" className="form-input" name='features' value={params.features} onChange={(e) => changeValue(e)} />
//                                                             {errors?.features ? <div className="text-danger mt-1">{errors.features}</div> : ''}

//                                                         </div>

//                                                         <div className="mb-5">
//                                                             <label htmlFor="address">Description</label>
//                                                             <textarea
//                                                                 id="location"
//                                                                 rows={3}
//                                                                 placeholder="Enter Description"
//                                                                 className="form-textarea resize-none min-h-[130px]"
//                                                                 name='description'
//                                                                 value={params.description}
//                                                                 onChange={(e) => changeValue(e)}
//                                                             ></textarea>
//                                                             {errors?.description ? <div className="text-danger mt-1">{errors.description}</div> : ''}

//                                                         </div>

//                                                         <div className="flex justify-end items-center mt-8">
//                                                             <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
//                                                                 Cancel
//                                                             </button>
//                                                             <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser} >
//                                                                 {params.id ? 'Update' : 'Add'}
//                                                             </button>
//                                                         </div>

//                                                     </form>
//                                                 </div>
//                                             </Dialog.Panel>
//                                         </Transition.Child>
//                                     </div>
//                                 </div>
//                             </Dialog>
//                         </Transition>
//                     </div>
//                 )
//             }
//         </>
//     );
// };

// export default Contacts;


