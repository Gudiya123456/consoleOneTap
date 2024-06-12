import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import React,{ useEffect, useState } from 'react';
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
import { IoIosArrowForward } from 'react-icons/io';
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
        dob: '2004-05-28:11.00AM',
        gateway:'Phone Pe',
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
        gateway:'Google Pay',
        dob: '1989-11-19:12:00 AM',
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
        firstName: 'Celeste',
        lastName: 'Grant',
        email: 'celestegrant@polarax.com',
        dob: '1989-11-19:1:00 PM',
        gateway:'Razor Pay',

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
];

const BillingTable = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Billing'));
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
        
            <div className="panel mt-6">
                {/* <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className=" text-lg dark:text-white-light">Billing</h5>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div> */}
                 {/* <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                   <div className='flex gap-2 justify-between' >
                   <h5 className="font-semibold text-lg dark:text-white-light">Billing</h5>
                    <button onClick={()=>{setShowDrawer(true)}} type="button" className="btn btn-sm lg:hidden md:hidden btn-dark shadow-none mr-5">Payment Received </button>
                    <button onClick={()=>{setShowDrawer(true)}} type="button" className="btn btn-sm lg:hidden md:hidden btn-dark shadow-none mr-5">Outstanding Payment </button>


                   </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-[350px] md:w-auto lg:w-auto xl:w-auto " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    
                    </div>
                    <button onClick={()=>{setShowDrawer(true)}} type="button" className="btn btn-sm btn-dark lg:block md:block hidden shadow-none mr-5">Payment Received </button>
                    <button onClick={()=>{setShowDrawer(true)}} type="button" className="btn btn-sm btn-dark lg:block md:block hidden shadow-none mr-5">Outstanding Payment</button>


                </div> */}

<div className="flex flex-col md:flex-row md:items-center mb-5 gap-5">
    <div className='flex flex-col md:flex-row md:gap-2 w-full md:w-auto'>
        <h5 className="font-semibold text-lg dark:text-white-light">Billing</h5>
        <div className="flex justify-between md:justify-start mt-2 md:mt-0">
            <button onClick={() => { setShowDrawer(true) }} type="button" className="btn btn-sm btn-dark shadow-none md:hidden mr-2">Payment Received</button>
            <button onClick={() => { setShowDrawer(true) }} type="button" className="btn btn-sm btn-dark shadow-none md:hidden">Outstanding Payment</button>
        </div>
    </div>
    <div className="w-full md:w-auto ltr:ml-auto rtl:mr-auto">
        <input type="text" className="form-input w-full md:w-[300px]" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
    <div className="flex mt-2 md:mt-0">
        <button onClick={() => { setShowDrawer(true) }} type="button" className="btn btn-sm btn-dark shadow-none hidden md:block mr-2">Payment Received</button>
        <button onClick={() => { setShowDrawer(true) }} type="button" className="btn btn-sm btn-dark shadow-none hidden md:block">Outstanding Payment</button>
    </div>
</div>

                <div className="datatables poppins-font">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'age', title: 'Sno', sortable: true },

                            {
                                accessor: 'firstName',
                                title: 'Branch Name',
                                sortable: true,
                                render: ({ firstName, lastName, id }) => (
                                   <NavLink to='#' state={{restaurantId:26}} > <div className="flex items-center w-max">
                                   <div>{firstName + ' ' + lastName}</div>
                               </div></NavLink>
                                ),
                            },
                            { accessor: 'dob', title: 'Date/Time', sortable: true },
                            { accessor: 'gateway', title: 'Payment Gateway', sortable: true },
                            { accessor: 'company', title: 'Remark', sortable: true },
                            
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

export default BillingTable;
