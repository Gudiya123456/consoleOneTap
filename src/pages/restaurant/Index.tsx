import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiHome4Line } from 'react-icons/ri';
import { BiCreditCardFront } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import axios from 'axios'
import { AiOutlineDelete } from "react-icons/ai";
import Swal from 'sweetalert2';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
        address: {
            street: '529 Scholes Street',
            city: 'Temperanceville',
            zipcode: 5235,
            geo: {
                lat: 23.806115,
                lng: 164.677197,
            },
        },
        phone: '+91 9988774455',
        isActive: true,
        age: 39,
        company: 'POLARAX',
    },
    {
        id: 2,
        firstName: 'Celeste',
        lastName: 'Grant',
        email: 'celestegrant@polarax.com',
        dob: '1989-11-19',
        address: {
            street: '639 Kimball Street',
            city: 'Bascom',
            zipcode: 8907,
            geo: {
                lat: 65.954483,
                lng: 98.906478,
            },
        },
        phone: '+91 9988774455',
        isActive: false,
        age: 32,
        company: 'MANGLO',
    },
    {
        id: 3,
        firstName: 'Tillman',
        lastName: 'Forbes',
        email: 'tillmanforbes@manglo.com',
        dob: '2016-09-05',
        address: {
            street: '240 Vandalia Avenue',
            city: 'Thynedale',
            zipcode: 8994,
            geo: {
                lat: -34.949388,
                lng: -82.958111,
            },
        },
        phone: '+91 9988774455',
        isActive: false,
        age: 2,
        company: 'APPLIDECK',
    },
    {
        id: 4,
        firstName: 'Daisy',
        lastName: 'Whitley',
        email: 'daisywhitley@applideck.com',
        dob: '1987-03-23',
        address: {
            street: '350 Pleasant Place',
            city: 'Idledale',
            zipcode: 9369,
            geo: {
                lat: -54.458809,
                lng: -127.476556,
            },
        },
        phone: '+91 9988774455',
        isActive: true,
        age: 21,
        company: 'VOLAX',
    },
    {
        id: 5,
        firstName: 'Weber',
        lastName: 'Bowman',
        email: 'weberbowman@volax.com',
        dob: '1983-02-24',
        address: {
            street: '154 Conway Street',
            city: 'Broadlands',
            zipcode: 8131,
            geo: {
                lat: 54.501351,
                lng: -167.47138,
            },
        },
        phone: '+91 9988774455',
        isActive: false,
        age: 16,
        company: 'ORBAXTER',
    },

    {
        id: 5,
        firstName: 'Weber',
        lastName: 'Bowman',
        email: 'weberbowman@volax.com',
        dob: '1983-02-24',
        address: {
            street: '154 Conway Street',
            city: 'Broadlands',
            zipcode: 8131,
            geo: {
                lat: 54.501351,
                lng: -167.47138,
            },
        },
        phone: '+91 9988774455',
        isActive: false,
        age: 26,
        company: 'ORBAXTER',
    }, {
        id: 5,
        firstName: 'Weber',
        lastName: 'Bowman',
        email: 'weberbowman@volax.com',
        dob: '1983-02-24',
        address: {
            street: '154 Conway Street',
            city: 'Broadlands',
            zipcode: 8131,
            geo: {
                lat: 54.501351,
                lng: -167.47138,
            },
        },
        phone: '+91 9988774455',
        isActive: false,
        age: 26,
        company: 'ORBAXTER',
    }, {
        id: 5,
        firstName: 'Weber',
        lastName: 'Bowman',
        email: 'weberbowman@volax.com',
        dob: '1983-02-24',
        address: {
            street: '154 Conway Street',
            city: 'Broadlands',
            zipcode: 8131,
            geo: {
                lat: 54.501351,
                lng: -167.47138,
            },
        },
        phone: '+91 9988774455',
        isActive: false,
        age: 26,
        company: 'ORBAXTER',
    }, {
        id: 5,
        firstName: 'Weber',
        lastName: 'Bowman',
        email: 'weberbowman@volax.com',
        dob: '1983-02-24',
        address: {
            street: '154 Conway Street',
            city: 'Broadlands',
            zipcode: 8131,
            geo: {
                lat: 54.501351,
                lng: -167.47138,
            },
        },
        phone: '+91 9988774455',
        isActive: false,
        age: 26,
        company: 'ORBAXTER',
    }, {
        id: 5,
        firstName: 'Weber',
        lastName: 'Bowman',
        email: 'weberbowman@volax.com',
        dob: '1983-02-24',
        address: {
            street: '154 Conway Street',
            city: 'Broadlands',
            zipcode: 8131,
            geo: {
                lat: 54.501351,
                lng: -167.47138,
            },
        },
        phone: '+91 9988774455',
        isActive: false,
        age: 26,
        company: 'ORBAXTER',
    }, {
        id: 5,
        firstName: 'Weber',
        lastName: 'Bowman',
        email: 'weberbowman@volax.com',
        dob: '1983-02-24',
        address: {
            street: '154 Conway Street',
            city: 'Broadlands',
            zipcode: 8131,
            geo: {
                lat: 54.501351,
                lng: -167.47138,
            },
        },
        phone: '+91 9988774455',
        isActive: false,
        age: 26,
        company: 'ORBAXTER',
    },


];

const MultipleTables = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Restaurant'));
        fetchRestaurantList();
    },[]);

    const [restList,setRestList]=useState([]);
    const[filteredItem,setFilteredItems]=useState<any>(restList);

   
    const[editRest,setEditRest]=useState([]);
    const [isLoading,setIsloading]=useState(false);
    // const crmToken=useSelector((state:IRootState)=>state.themeConfig.crmToken);
    const crmToken='8|wE3Mh4SVxwrcXeqKDcQIMZYC6RDVZ4IKGQcSTF5d937ad76e';
    const [timeZone,setTimeZone]=useState([])
    const [search, setSearch] = useState('');

    const fetchRestaurantList=async()=>{
        setIsloading(true)
        try {
            const response=await axios({
                method:'get',
                url:'https://cdn.onetapdine.com/api/restaurants',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:'Bearer '+ crmToken
                }
            })

            if(response.data.status=='success'){
                console.log(response.data.restaurants);
                setRestList(response.data.restaurants);
                setTimeZone(response.data.timeZones)
            }
        } catch (error) {
            console.log(error);
            
        }
        finally{
            setIsloading(false)

        }
    }



    useEffect(() => {
        setFilteredItems(() => {
            return restList.filter((item: any) => {
                return item.restaurant_name.toLowerCase().includes(search);
            });
        });
    }, [search, restList]);
    console.log('filtered data', filteredItem);
    
const navigate=useNavigate();
    const distroy = (id: any) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then(async (result) => {
            if (result.value) {
                try {
                    const response = await axios({
                        method: 'delete',
                        url: 'https://cdn.onetapdine.com/api/restaurants/' + id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "Bearer " + crmToken,
                        },
                    });
                    if (response.data.status === "success") {
                        // setCategories(categories.filter((d: any) => d.id !== id))
                        Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });

                        fetchRestaurantList()
                    }
                } catch (error: any) {

                    if (error.response.status == 401) navigate('/login')
                } finally {

                }
            }
        });

    }

    
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'firstName'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    item.company.toLowerCase().includes(search.toLowerCase()) ||
                    item.age.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.dob.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    const [page2, setPage2] = useState(1);
    const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);
    const [initialRecords2, setInitialRecords2] = useState(sortBy(rowData, 'firstName'));
    const [recordsData2, setRecordsData2] = useState(initialRecords2);

    const [search2, setSearch2] = useState('');
    const [sortStatus2, setSortStatus2] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    useEffect(() => {
        setPage2(1);
    }, [pageSize2]);

    useEffect(() => {
        const from = (page2 - 1) * pageSize2;
        const to = from + pageSize2;
        setRecordsData2([...initialRecords2.slice(from, to)]);
    }, [page2, pageSize2, initialRecords2]);

    useEffect(() => {
        setInitialRecords2(() => {
            return rowData.filter((item: any) => {
                return (
                    item.firstName.toLowerCase().includes(search2.toLowerCase()) ||
                    item.company.toLowerCase().includes(search2.toLowerCase()) ||
                    item.age.toString().toLowerCase().includes(search2.toLowerCase()) ||
                    item.dob.toLowerCase().includes(search2.toLowerCase()) ||
                    item.email.toLowerCase().includes(search2.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search2.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search2]);

    useEffect(() => {
        const data2 = sortBy(initialRecords2, sortStatus2.columnAccessor);
        setInitialRecords2(sortStatus2.direction === 'desc' ? data2.reverse() : data2);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus2]);

    return (
        <div>
            <div className="panel flex justify-between items-center overflow-x-auto whitespace-nowrap p-1.5 rounded-none ">
                <div className="flex  items-center overflow-x-auto whitespace-nowrap " >
                    <div className="rounded-full p-1.5   ltr:mr-3 rtl:ml-3">
                        <RiHome4Line className=' opacity' size={20} color='gray' />

                    </div>
                    <IoIosArrowForward className='ltr:mr-3 opacity-25 font-thin' color='gray' />

                    <a href="/"  className="block hover:underline text-gray-600  ltr:mr-3 rtl:ml-3 poppins-font" rel="noreferrer">
                        Home
                    </a>
                    <IoIosArrowForward className='font-thin opacity-25' color='gray' />

                    <p  className='ltr:ml-3 text-blue-700 poppins-font' >Restaurants</p>

                </div>
                <div>
                    <a href="/restaurants" className="flex poppins-font  items-center hover:underline text-gray-600 text-[13px]  ltr:mr-10 rtl:ml-3" rel="noreferrer">
                        <IoIosArrowBack
                            className='font-thin ml-2 mr-2 ' color='gray' />  Back
                    </a>


                </div>
            </div>


            <div className="panel mx-4 mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className='flex justify-between' >
                        <h5 className="font-semibold text-lg dark:text-white-light">Restaurants</h5>
                        <button onClick={() => { setShowDrawer(true) }} type="button" className="btn btn-sm lg:hidden md:hidden btn-dark shadow-none mr-5">Add Restaurants </button>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto w-full md:w-auto">
                        <input
                            type="text"
                            className="form-input w-full sm:w-2/3 md:w-[200px] lg:w-[250px]  xl:w-[250px]"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <NavLink to='/restaurants/add' state={{  timeZone:timeZone }} >
                        <button onClick={() => {
                            storeOrUpdate(null);
                        }}
                            type="button" className="btn btn-sm poppins-btn btn-dark hidden lg:block md:block shadow-none mr-5">Add Restaurants</button>
                    </NavLink>
                </div>
                <div className="datatables poppins-font">
                   {
                    isLoading?'Loadinggg':(
                        <DataTable
                        className="whitespace-nowrap table-hover"
                        records={filteredItem}
                        columns={[
                            {
                                accessor: 'firstName',
                                title: 'Restaurant Name',
                                sortable: true,
                                render: ({ restaurant_name,fav_icon,id }) => (
                                    <NavLink to='/restaurant/view' state={{ restaurantId: id }} > <div className="flex items-center w-max">
                                        {/* <img className="w-9 h-9 rounded ltr:mr-2 rtl:ml-2 object-cover"
                                        src={`https://cdn.onetapdine.com/${fav_icon}`}
                                            alt="" /> */}
                                        <div>{restaurant_name}</div>
                                    </div></NavLink>
                                ),
                            },

                            { accessor: 'admin_phone', title: 'Phone No', sortable: true },

                            { accessor: 'admin_email', title: 'Email', sortable: true },

                            { accessor: 'no_of_branches', title: 'No of Branch', sortable: true },

                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: ({status}) => <label className="w-12 h-6 relative">
                                    <input type="checkbox" defaultChecked={status==1?true:false} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-success before:transition-all before:duration-300"></span>
                                </label>,
                            },
                            {
                                accessor: 'action',
                                title: 'Action',
                                titleClassName: '!text-center',
                                render: ({id}) => (
                                    <div className="flex items-center gap-2 w-max mx-auto">
                                        <Tippy content="History">
                                            <button type="button">
                                            <BiCreditCardFront size={20} />
                                            </button>
                                        </Tippy>
                                       
                                        {/* <Tippy content="Edit">
                                            <NavLink to='/restaurants/add' state={{ restaurantId: id, timeZone:timeZone }}  >
                                                <button type="button">
                                                <AiOutlineEdit  size={20} />
                                                </button>
                                            </NavLink>
                                        </Tippy> */}

                                        <Tippy content="Delete"  >
                                                <button type="button" onClick={()=>{distroy(id)}} >
                                                < AiOutlineDelete color='red' size={20} />
                                                </button>
                                        </Tippy>

                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                    )
                   }
                </div>
            </div>


        </div>
    );
};

export default MultipleTables;
