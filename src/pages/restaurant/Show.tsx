import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import IconEye from '../../components/Icon/IconEye';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import IconSearch from '../../components/Icon/IconSearch';
import IconUser from '../../components/Icon/IconUser';
import IconX from '../../components/Icon/IconX';
import axios from 'axios';
import Header from '../../components/Layouts/Header';
import { useLocation, useNavigate } from 'react-router-dom';

const RestaurantView = ({ id }) => {
    const location = useLocation()
    const navigate = useNavigate();
    console.log(location)
    const restaurantId = location.state.restaurantId


    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [addContactModal, setAddContactModal] = useState<any>(false);
    const [resList, setResList] = useState<any>([]);
    const [activityList, setActivityList] = useState<any>([]);
    const [branchList, setBranchList] = useState<any>([]);
    const [data, setData] = useState<any>([]);

    const dispatch = useDispatch();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);

    useEffect(() => {
        dispatch(setPageTitle('Restaurant'));
        fetchRestaurantList();
    }, []);

    // fetch Restaurant data
    const fetchRestaurantList = async () => {
        try {
            const response = await axios({
                method: 'get',
                // url: window.location.origin + "/api/restaurant/dashboard/branches",
                url: window.location.origin + '/api/dashboard/restaurants/' + restaurantId,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });

            setResList(response.data.restaurant);
            setActivityList(response.data.activities)
            setBranchList(response.data.branches)
            setData(response.data.data);

            console.log('helloooo data:::', response.data);
        } catch (error: any) {
            if (error.response.status == 401) navigate('/login')
           console.log(error)
            // else ErrorHandle(error);
        }
    };

    const [filteredItems, setFilteredItems] = useState<any>(branchList);
    const [search, setSearch] = useState<any>("");

    useEffect(() => {
        setFilteredItems(() => {
            return branchList.filter((item: any) => {
                return item.branch_name
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
        });
    }, [search, branchList]);






    return (
        <div>

            <div className='p-4' >
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-xl font-semibold">Branches</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {data.branches}</div>
                        </div>
                        {/* <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 70
                        </div> */}
                    </div>

                    {/* Sessions */}
                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-xl font-semibold">Employee</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{data.employees} </div>
                        </div>
                        {/* <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 84,709
                        </div> */}
                    </div>

                    {/*  Time On-Site */}
                    <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-xl font-semibold">Customer</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {data.customers} </div>
                        </div>
                        {/* <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 3789
                        </div> */}
                    </div>

                    {/* Bounce Rate */}
                    <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-xl font-semibold">Items</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {data.items}</div>
                        </div>
                        {/* <div className="flex items-center font-semibold mt-5">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Last Week 50.01%
                        </div> */}
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="grid gap-6 xl:grid-flow-row">
                        {/*  Previous Statement  */}
                        <div className="panel overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold">{resList.restaurant_name}</div>
                                    <div className="text-success"> {resList.sub_domain}</div>
                                </div>

                            </div>
                            <div className="relative mt-10">

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-primary">Person Name</div>
                                        <div className="mt-2 font-semibold ">{resList.contact_person_name}</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Phone Number</div>
                                        <div className="mt-2 font-semibold ">{resList.contact_person_phone}</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Email</div>
                                        <div className="mt-2 font-semibold ">{resList.contact_person_email}</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Branches</div>
                                        <div className="mt-2 font-semibold ">{resList.branches}</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Mode</div>
                                        <div className="mt-2 font-semibold ">{resList.mode==1? 'Live':'Demo'}</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Status</div>
                                        <div className="mt-2 font-semibold ">{resList.status==1? 'Active':'Blocked'}</div>
                                    </div>
                                </div>




                            </div>
                        </div>
                        {/*  Current Statement */}
                    </div>

                    {/*  Recent Transactions  */}
                    <div className="panel">
                        <div className="mb-5 text-lg font-bold">Recent Activities</div>
                        { activityList ?(
                            activityList.map((activity: any)=>{
                                return(
                                    <>
                                    <div className='panel mb-2' >
                                        <div>
                                            <p className='font-semibold' >{activity.title}</p>
                                        </div>
                                        <div>
                                            <p className='font-semibold'>{activity.created_at}</p>
                                        </div>
                                        <div>
                                            <p >{activity.message}</p>
                                        </div>
                                    </div>
                                    </>
                                )

                            }
                        )
                        ):'No Activity Found'


                        }

                    </div>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-4 my-4">
                    <h2 className="text-2xl font-semibold">Branches</h2>
                    <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                        {/* <div className="flex gap-3">
                            <div>
                                <button type="button" className="btn btn-primary" onClick={() => editUser()}>
                                    <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                    Add Branches
                                </button>
                            </div>
                        </div> */}
                        <div className="relative">
                            <input type="text" placeholder="Search Branches" value={search}
                                        onChange={(e) => setSearch(e.target.value)} className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" />
                            <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                                <IconSearch className="mx-auto" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-5 panel p-0 border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Branch Name</th>
                                    <th>Type</th>
                                    <th>Country</th>
                                    <th>Address</th>
                                    <th>Status</th>

                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((contact: any) => {
                                    return (
                                        <tr key={contact.id}>
                                            <td>
                                                <div className="flex items-center w-max">

                                                    <div>{contact.branch_name}</div>
                                                </div>
                                            </td>

                                            <td>{contact.type}</td>



                                            <td className="whitespace-nowrap">{contact.country}</td>

                                            <td className="whitespace-nowrap">{contact.address1}</td>
                                            <td className="">{contact.status==1?<div className='btn btn-success btn-sm'>Active</div>:<div className='  btn btn-sm btn-danger'>Blocked</div>}</td>


                                            <td onClick={()=>{setAddContactModal(true)}} >
                                                <div className="flex gap-4 items-center justify-center">
                                                    <button type="button" className="btn btn-sm btn-outline-primary">
                                                        View
                                                    </button>


                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>


            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-2xl text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddContactModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />

                                    </button>

                                    <div className="p-5 mt-5">
                                     <form action="">
                                        {
                                            branchList.map((branch,id)=>{
                                                return(
                                                    <>
                                                        <b className='mb-2' >View Branch Details</b>

                                                    <div className='panel mb-2 grid grid-cols-2 ' >
                                                        <div>Id:{branch.id}</div>
                                                        <div>Date:{branch.created_at}</div>

                                                        <div>Type:{branch.type}</div>
                                                        <div>Branch Name:{branch.branch_name}</div>
                                                        <div>Mobile No:{branch.mobile}</div>
                                                        <div>Landline:{branch.landline}</div>
                                                        <div>Email Id:{branch.email}</div>
                                                        <div>Type:{branch.type}</div>
                                                        <div>Tax Name:{branch.tax_name}</div>
                                                        <div>Tax Value:{branch.tax_value}</div>
                                                        <div>Time Zone:{branch.time_zone}</div>
                                                        <div>Status:{branch.status}</div>
                                                        <div>Mode:{branch.mode}</div>
                                                        <div>Address 1:{branch.address1}</div>
                                                        <div>Address 2:{branch.address2}</div>
                                                        <div>Area:{branch.area}</div>
                                                        <div>City:{branch.city}</div>
                                                        <div>State:{branch.state}</div>
                                                        <div>Country:{branch.country}</div>
                                                        <div>Pincode:{branch.pincode}</div>



                                                    </div>
                                                    </>
                                                )
                                            })
                                        }
                                     </form>
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


export default RestaurantView;
