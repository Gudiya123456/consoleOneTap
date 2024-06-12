import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconBell from '../../components/Icon/IconBell';
import IconXCircle from '../../components/Icon/IconXCircle';
import IconPencil from '../../components/Icon/IconPencil';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import { NavLink } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiHome4Line } from 'react-icons/ri';
import { BiCreditCardFront } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

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
        dispatch(setPageTitle('Multiple Tables'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'firstName'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
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
                    <NavLink to='/restaurants/add' >
                        <button onClick={() => {
                            storeOrUpdate(null);
                        }}
                            type="button" className="btn btn-sm poppins-btn btn-dark hidden lg:block md:block shadow-none mr-5">Add Restaurants</button>
                    </NavLink>
                </div>
                <div className="datatables poppins-font">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            {
                                accessor: 'firstName',
                                title: 'Restaurant Name',
                                sortable: true,
                                render: ({ firstName, lastName, id }) => (
                                    <NavLink to='/restaurant/view' state={{ restaurantId: 26 }} > <div className="flex items-center w-max">
                                        <img className="w-9 h-9 rounded ltr:mr-2 rtl:ml-2 object-cover"
                                            src="data:image/jpeg;base64,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"
                                            alt="" />
                                        <div>{firstName + ' ' + lastName}</div>
                                    </div></NavLink>
                                ),
                            },

                            { accessor: 'email', title: 'Email', sortable: true },
                            { accessor: 'phone', title: 'Phone No.', sortable: true },
                            { accessor: 'age', title: 'No of Branch.', sortable: true },

                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: () => <label onClick={() => { alert(999) }} className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-success before:transition-all before:duration-300"></span>
                                </label>,
                            },
                            {
                                accessor: 'action',
                                title: 'Action',
                                titleClassName: '!text-center',
                                render: () => (
                                    <div className="flex items-center gap-2 w-max mx-auto">
                                        <Tippy content="History">
                                            <button type="button">
                                                <BiCreditCardFront size={20} />

                                            </button>
                                        </Tippy>
                                        <Tippy content="Edit">
                                            <NavLink to='/restaurants/add' >
                                                <button type="button">
                                                    <AiOutlineEdit size={20} />
                                                </button>
                                            </NavLink>
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
                </div>
            </div>


        </div>
    );
};

export default MultipleTables;
