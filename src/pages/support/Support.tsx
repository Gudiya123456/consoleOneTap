import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import React,{ useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconXCircle from '../../components/Icon/IconXCircle';
import { RiHome4Line } from 'react-icons/ri';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoEyeSharp } from "react-icons/io5";
import SupportDrawer from './SupportDrawer';

const rowData = [
  {
      id: 1,
      firstName: 'Caroline',
      lastName: 'Jensen',
      email: 'carolinejensen@zidant.com',
      dob: '2004-05-28',
      reason:'Late Delivery',
      message:'I want to cancel Items',
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
      reason:'Late Delivery',
      message:'I want to cancel Items',
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
      reason:'Late Delivery',
      message:'I want to cancel Items',
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
      reason:'Late Delivery',
      message:'I want to cancel Items',
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
      reason:'Late Delivery',
      message:'I want to cancel Items',
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
      reason:'Late Delivery',
      message:'I want to cancel Items',
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
  //  {
  //     id: 5,
  //     firstName: 'Weber',
  //     lastName: 'Bowman',
  //     email: 'weberbowman@volax.com',
  //     dob: '1983-02-24',
  //     reason:'Late Delivery',
  //     message:'I want to cancel Items',
  //     address: {
  //         street: '154 Conway Street',
  //         city: 'Broadlands',
  //         zipcode: 8131,
  //         geo: {
  //             lat: 54.501351,
  //             lng: -167.47138,
  //         },
  //     },
  //     phone: '+91 9988774455',
  //     isActive: false,
  //     age: 26,
  //     company: 'ORBAXTER',
  // }, {
  //     id: 5,
  //     firstName: 'Weber',
  //     lastName: 'Bowman',
  //     email: 'weberbowman@volax.com',
  //     dob: '1983-02-24',
  //     reason:'Late Delivery',
  //     message:'I want to cancel Items',
  //     address: {
  //         street: '154 Conway Street',
  //         city: 'Broadlands',
  //         zipcode: 8131,
  //         geo: {
  //             lat: 54.501351,
  //             lng: -167.47138,
  //         },
  //     },
  //     phone: '+91 9988774455',
  //     isActive: false,
  //     age: 26,
  //     company: 'ORBAXTER',
  // }, {
  //     id: 5,
  //     firstName: 'Weber',
  //     lastName: 'Bowman',
  //     email: 'weberbowman@volax.com',
  //     dob: '1983-02-24',
  //     reason:'Late Delivery',
  //     message:'I want to cancel Items',
  //     address: {
  //         street: '154 Conway Street',
  //         city: 'Broadlands',
  //         zipcode: 8131,
  //         geo: {
  //             lat: 54.501351,
  //             lng: -167.47138,
  //         },
  //     },
  //     phone: '+91 9988774455',
  //     isActive: false,
  //     age: 26,
  //     company: 'ORBAXTER',
  // }

];

const Support = () => {
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

    const formatDate = (date: string | number | Date) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const randomColor = () => {
        const color = ['primary', 'success', 'danger',];
        const random = Math.floor(Math.random() * color.length);
        return color[random];
    };

    const randomStatus = () => {
        const status = [ 'PENDING','ONGOING','CLOSED'];
        const random = Math.floor(Math.random() * status.length);
        return status[random];
    };

  const [showDrawer, setShowDrawer] = useState(false);


    return (
        <div>
      <SupportDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />

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

                    <p  className='ltr:ml-3 text-blue-700 poppins-font' >Support</p>

                </div>
                <div>
                    <a href="/restaurants" className="flex poppins-font  items-center hover:underline text-gray-600 text-[13px]  ltr:mr-10 rtl:ml-3" rel="noreferrer">
                        <IoIosArrowBack
                            className='font-thin ml-2 mr-2 ' color='gray' />  Back
                    </a>


                </div>
            </div>
            <div className='p-6' >
            <div className="panel ">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Support</h5>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            {
                                accessor: 'company',
                                title: 'Restaurant Name',
                                sortable: true,
                                render: ({ company, id }) => (
                                   
                                      <div className="flex items-center w-max">
                                        {/* <img className="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover" src={`/assets/images/profile-${id}.jpeg`} alt="" /> */}
                                        <div>
                                        <div>{company}</div>
                                       Bangalore
                                        </div>
                                    </div>
                                ),
                            },
                            { accessor: 'firstName', title: 'User Name', sortable: true ,

                              render: ({ firstName, id }) => (
                                   
                                <div className="flex items-center w-max">
                                  {/* <img className="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover" src={`/assets/images/profile-${id}.jpeg`} alt="" /> */}
                                  <div>
                                  <div>{firstName}</div>
                                 +91 9966882211
                                  </div>
                              </div>
                          ),
                            },
                            { accessor: 'reason', title: 'Reason', sortable: true },
                            { accessor: 'message', title: 'Message', sortable: true },

                            {
                                accessor: 'dob',
                                title: 'Created At',
                                sortable: true,
                                render: ({ dob }) => <div>{formatDate(dob)}</div>,
                            },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: () => <span className={`badge bg-${randomColor()} `}>{randomStatus()}</span>,
                            },
                            {
                                accessor: 'action',
                                title: 'Action',
                                titleClassName: '!text-center',
                                render: () => (
                                    <div className="flex items-center w-max mx-auto">
                                        <Tippy content="View">
                                            <button type="button" onClick={()=>{setShowDrawer(true)}} >
                                                <IoEyeSharp size={20} />
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
                </div>
            </div>

            </div>
        </div>
    );
};

export default Support;


