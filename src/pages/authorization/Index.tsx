import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import React, { Fragment, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiHome4Line } from 'react-icons/ri';
import { AiOutlineEdit } from "react-icons/ai";
import { MdRemoveRedEye } from "react-icons/md";
import TableDrawer from './TableDrawer';
import { Dialog, Transition } from "@headlessui/react";

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

  const [showDrawer, setShowDrawer] = useState(false);
  const [permissionmodal, setpermissionModal] = useState(false)

  return (
    <div>
      <div className="panel flex md:flex-row  justify-between items-center overflow-x-auto whitespace-nowrap p-1.5 rounded-none ">
        <div className="flex  items-center overflow-x-auto whitespace-nowrap " >
          <div className="rounded-full p-1.5   ltr:mr-3 rtl:ml-3">
            <RiHome4Line className=' opacity' size={20} color='gray' />

          </div>
          <IoIosArrowForward className='ltr:mr-3 opacity-25 font-thin' color='gray' />

          <a href="/"  className=" poppins-font block hover:underline text-gray-600  ltr:mr-3 rtl:ml-3" rel="noreferrer">
            Home
          </a>
          <IoIosArrowForward className='font-thin opacity-25' color='gray' />

          <p  className=' poppins-font ltr:ml-3 text-blue-700' >Authorization</p>

        </div>
        <div>
          <a href="/restaurants"  className="flex  items-center hover:underline text-gray-600 text-[13px] poppins-font  ltr:mr-10 rtl:ml-3" rel="noreferrer">
            <IoIosArrowBack
              className='font-thin ml-2 mr-2 ' color='gray' />  Back
          </a>

        </div>
      </div>
      <TableDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
      <div className="panel mx-4 mt-6">
        <div className="flex flex-col md:flex-row md:items-center mb-5 gap-5">
          <div className="flex justify-between w-full md:w-auto">
            <h5 className="font-semibold text-lg dark:text-white-light">Authorization</h5>
            <button onClick={() => { setShowDrawer(true) }} type="button" className="btn btn-sm btn-dark shadow-none mr-5 md:hidden">Add Authorization</button>
          </div>
          <div className="w-full md:w-auto ltr:ml-auto rtl:mr-auto">
            <input
              type="text"
              className="form-input w-full md:w-[350px]"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => { setShowDrawer(true) }} type="button" className="btn btn-sm btn-dark shadow-none hidden md:block">Add Authorization</button>
        </div>

        <div className="datatables">
          <DataTable
            className="whitespace-nowrap table-hover"
            records={recordsData}
            columns={[
              {
                accessor: 'firstName',
                title: ' Name',
                sortable: true,
                render: ({ firstName, lastName, id }) => (
                  <NavLink to='/restaurant/view' state={{ restaurantId: 26 }} > <div className="flex items-center w-max">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAACUCAMAAAD26AbpAAAAbFBMVEX///8AAACPj4/8/Pz39/dzc3MEBATY2NhMTEyHh4eioqLT09Pb29v09PTf39/o6OgNDQ2pqallZWXu7u60tLQmJiYgICA0NDTKyspUVFQTExNdXV2AgIBtbW0ZGRktLS08PDyZmZlFRUW9vb2oiDsEAAADxUlEQVR4nO2ai46qMBCGW1uQixQRWVHwgr7/O56WLqvHA9K60paT+WKyiW7C/zMzHWgHIQAAAAAAAAAAAAAAAAAAAAD4JYR/yNNXAjtq3oAgqTWJo/rIqaOYdj/Mw0UbAsqaAD8QRIwiNA8DSAilpSd0+77f/pEu6pLOIwoiBnG4fozAtwV8CuMZOBA1S6MdHuCSUeR6WXN1yeb0c9+f8PGXl7ieTATlgaiBgSjw7/fOe0ivQ0nUeQhy2xoHabtBWg0l0Z1N7uzqKuog9Mcs+Hi9SFz1wMOwPeFRC7ymb66WA0FpgBWiwEs6dXNh5UFYjJVBR2RbbD88CKoOMHZ1VQrVLSxsax3goG7hbFtrP+XoatTB/y22rbaXUNmCq5lE9+p5hHHl4qLKzupB8PEuta23h7jQsVAsbevtQTxcqMMfMtwj01hT+Uvo1rbeHqL1uPA7h8y23h70LDgZhf+gFspCp7UVLrZn3hc0cLIv5K9f/J/YU9t6+/B0LNS21fay1bFQ2lbbC9WxYFtsLwTV6g4WTu7CEBSrW1jZVtsLIaQWu0RjvUEcOtQuxqDdzIvP4/tIwuXOxb6G5EFapNagM4cP3dLNqHxu8Zi666Dd2RYiB0MhfqhcfLZ4IH71mNE6CxwthA6CyuCFhxk4EDm+HPYgzqmWTja1J1go5fp/i29ZOF4HHXRbPMq+s7s5+Yj9L5Sv+tnucL/70sthJ16XZ5BF6Fslzbzr1/3+F1cv6xmPcRzCtk3obapq44XNlpH7hMy8yFPGUlePdPSY4+1v6c41Z1YCvczGwmyEDqFpwFm/VAlX5edlxvuAErxPlIltvRLys+awqLqcT8rb8+uv86WKUplOVt9Cibw6iQOts4WOw35J7BcFv35y0zqt/aF9+KtuCbH+4BEfpZzBebwXFvhn7cXWAiHzl0TXbwO6DnDn+hrJMWLzPtoyyDW2UYep26FJCxb4JVn1CQcYb5iVeuAW2Ht1/Izfbi1ZqAeCVp9xILfHmHkPvA6On3EgEYPQJltcm7jNJx20E4cmxyaFhdsbq+gwPl6XRkta3C2N0R01D8bH9ZRHUtVpzFb0svi8hTMz6UDncFMdoyOHq5Ed+PfYmwxD9tb7wRgng2NWSf3Z5Uji49rcxvfL06hfEJgbm7xNkkc+PhgbFaPNFA4EjalMyrUmj3SoTW3NpIHOFJ4Oxo6k2QStWXIx1RlWUznAB1MWlhMZ8M3NKU1lAYMFByyYTaRp1tT5RwEs6JCGi6mYyaAMAAAAAAAAAAAAAAAAAAAAYI8/VVUttF5/IxwAAAAASUVORK5CYII=" alt="" className='w-9 h-9 rounded ltr:mr-2 rtl:ml-2 object-cover ' />
                    <div>{firstName + ' ' + lastName}</div>
                  </div></NavLink>
                ),
              },

              { accessor: 'email', title: 'Email', sortable: true },
              { accessor: 'phone', title: 'Phone.', sortable: true },
              { accessor: 'company', title: 'Role', sortable: true },

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
                    <Tippy content="Permission">
                      <button type="button" onClick={() => { setpermissionModal(true) }} >
                        {/* <BiCreditCardFront size={20} /> */}
                        <MdRemoveRedEye className="object-contain w-4 h-4 cursor-pointer" />

                      </button>
                    </Tippy>
                    <Tippy content="Edit">
                      {/* <NavLink to='/restaurants/edit' > */}
                      <button type="button" onClick={() => { setShowDrawer(true) }} >
                        <AiOutlineEdit size={20} />
                      </button>
                      {/* </NavLink> */}
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
      {/* permission modal  */}
      <Transition appear show={permissionmodal} as={Fragment}>
        <Dialog
          as="div"
          open={permissionmodal}
          onClose={() => setpermissionModal(true)}
        >
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
          <div
            className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
            onClick={() => {
              setpermissionModal(false);
            }}
          >
            <div className="flex items-center justify-center min-h-screen px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" border-0   overflow-hidden  my-8 text-black dark:text-white ">
                  <div className=" bg-white dark:bg-[#202125] p-4 px-6 rounded-2xl w-[595px]">
                    <div className=" flex items-center">
                      <div
                        onClick={() => {
                          setpermissionModal(false);
                        }}
                        // src={themeConfig.theme == "dark" ? leftDark : leftarrow}

                        className=" object-contain w-4 h-4 "
                      > </div>
                      <h3 className=" font-bold dark:text-white text-lg">
                        Permissions
                      </h3>
                    </div>

                    <div className=" dark:bg-[#121212] bg-[#DDDDDD] text-black dark:text-white grid grid-cols-5  rounded-lg mt-2 h-[28px]">
                      <div className=" flex items-center justify-center">
                        <h3 className=" font-bold dark:text-white text-sm">
                          Name
                        </h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <h3 className=" font-bold dark:text-white text-sm">
                          View
                        </h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <h3 className=" font-bold dark:text-white text-sm">
                          Create
                        </h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <h3 className=" font-bold dark:text-white text-sm">
                          Edit
                        </h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <h3 className=" font-bold dark:text-white text-sm">
                          Delete
                        </h3>
                      </div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Profile</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Restaurant</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3 className="">Authorization</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Payments</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Pricing</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Invoice</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center"></div>
                      <div className=" flex items-center justify-center"></div>
                      <div className=" flex items-center justify-center"></div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white  grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Billing</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center"></div>
                      <div className=" flex items-center justify-center"></div>
                      <div className=" flex items-center justify-center"></div>
                    </div>
                    <div className=" dark:bg-[#000000] bg-[#F2F2F2] text-black dark:text-white grid grid-cols-5  rounded-lg mt-1 h-[44px]">
                      <div className=" flex items-center ml-2">
                        <h3>Settings</h3>
                      </div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center"></div>
                      <div className=" flex items-center justify-center">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className=" flex items-center justify-center"></div>
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                      <button
                        type="button"
                        className="btn  btn-dark btn-sm w-[85px] h-[28px] rounded-full dark:bg-white dark:text-black bg-[#000000] text-white text-sm"
                      >
                        Save
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

export default MultipleTables;
