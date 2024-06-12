import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import ReactApexChart from 'react-apexcharts';
import { setCrmToken, setPageTitle } from '../store/themeConfigSlice'
import PageLoader from '../components/PageLoader'
import axios from 'axios';
import box1 from '../assets/images/box1.png';
import box2 from '../assets/images/box2.png';
import box3 from '../assets/images/box3.png';
import { ErrorHandle } from './common/ErrorHandle';
import arrow from '../assets/images/arrow.svg'
import { IoIosArrowForward, IoIosFingerPrint, IoIosHome, IoMdPricetags } from 'react-icons/io';
import { RiDashboardFill, RiHome4Line } from 'react-icons/ri';
import { FaBellConcierge } from 'react-icons/fa6';
import { LiaCoinsSolid } from 'react-icons/lia';
import { BsCardHeading } from 'react-icons/bs';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import { MdSupportAgent } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import Dropdown from '../components/Dropdown';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconEye from '../components/Icon/IconEye';
import IconBitcoin from '../components/Icon/IconBitcoin';
import IconEthereum from '../components/Icon/IconEthereum';
import IconLitecoin from '../components/Icon/IconLitecoin';
import IconBinance from '../components/Icon/IconBinance';
import IconTether from '../components/Icon/IconTether';
import IconSolana from '../components/Icon/IconSolana';
import IconCircleCheck from '../components/Icon/IconCircleCheck';
import IconInfoCircle from '../components/Icon/IconInfoCircle';
import IconTrendingUp from '../components/Icon/IconTrendingUp';
import IconPlus from '../components/Icon/IconPlus';
import IconCreditCard from '../components/Icon/IconCreditCard';

const Index = () => {
    const dispatch = useDispatch();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const path = window.location.pathname
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    useEffect(() => {
        dispatch(setPageTitle('Console'));
        fetchHomeData()
    }, [crmToken]);

    const [isLoading, setIsLoading] = useState(true);


    const fetchHomeData = async () => {
        try {
            setIsLoading(true)
            const response = await axios({
                method: 'get',
                url: "https://cdn.onetapdine.com/api/home-data",

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            if (response.data.status == 'success') {
                setHomeData(response.data);
            }
        } catch (error: any) {
            if (error.response.status == 401) {
                ErrorHandle();
            }
        } finally {
            setIsLoading(false)
        }
    }

    // totalVisitOptions
    const totalVisit: any = {
        series: [{ data: [21, 9, 36, 12, 44, 25, 59, 41, 66, 25] }],
        options: {
            chart: {
                height: 58,
                type: 'line',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#009688',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#009688'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };


    // paidVisitOptions
    const paidVisit: any = {
        series: [{ data: [22, 19, 30, 47, 32, 44, 34, 55, 41, 69] }],
        options: {
            chart: {
                height: 58,
                type: 'line',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#e2a03f',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#e2a03f'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };
    return (
        <>
            {isLoading ? <PageLoader /> : (
                <div>
                    <div className="panel flex justify-between items-center overflow-x-auto whitespace-nowrap p-1.5 rounded-none ">
                        <div className="flex  items-center overflow-x-auto whitespace-nowrap " >
                            <div className="rounded-full p-1.5   ltr:mr-3 rtl:ml-3">
                                <RiHome4Line className=' opacity' size={20} color='gray' />

                            </div>
                            <IoIosArrowForward className='ltr:mr-3 opacity-25 font-thin' color='gray' />

                            <a href="/" className="block hover:underline text-gray-600 poppins-font  ltr:mr-3 rtl:ml-3" rel="noreferrer">
                                Home
                            </a>
                        </div>
                        <div>
                        </div>
                    </div>

                    <div className='px-6 py-8' >
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            <div className="panel h-full sm:col-span-2 lg:col-span-1">
                                {/* statistics */}
                                <div className="flex justify-between dark:text-white-light mb-5">
                                    <h5 className=" text-lg ">Statistics</h5>
                                    <div className="dropdown">
                                        <Dropdown
                                            offset={[0, 5]}
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="hover:text-primary"
                                            button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                        >
                                            <ul>
                                                <li>
                                                    <button type="button">This Week</button>
                                                </li>
                                                <li>
                                                    <button type="button">Last Week</button>
                                                </li>
                                                <li>
                                                    <button type="button">This Month</button>
                                                </li>
                                                <li>
                                                    <button type="button">Last Month</button>
                                                </li>
                                            </ul>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-8 text-sm text-[#515365] ">
                                    <div>
                                        <div>
                                            <div>Total Visits</div>
                                            <div className="text-[#f8538d] text-lg">423,964</div>
                                        </div>

                                        <ReactApexChart series={totalVisit.series} options={totalVisit.options} type="line" height={58} className="overflow-hidden" />
                                    </div>

                                    <div>
                                        <div>
                                            <div>Paid Visits</div>
                                            <div className="text-[#f8538d] text-lg">7,929</div>
                                        </div>

                                        <ReactApexChart series={paidVisit.series} options={paidVisit.options} type="line" height={58} className="overflow-hidden" />
                                    </div>
                                </div>
                            </div>

                            <div className="panel h-full">
                                <div className="flex justify-between dark:text-white-light mb-5">
                                    <h5 className=" text-lg ">Expenses</h5>
                                    <div className="dropdown">
                                        <Dropdown
                                            offset={[0, 5]}
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="hover:text-primary"
                                            button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                        >
                                            <ul>
                                                <li>
                                                    <button type="button">This Week</button>
                                                </li>
                                                <li>
                                                    <button type="button">Last Week</button>
                                                </li>
                                                <li>
                                                    <button type="button">This Month</button>
                                                </li>
                                                <li>
                                                    <button type="button">Last Month</button>
                                                </li>
                                            </ul>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className=" text-[#e95f2b] text-3xl  my-10">
                                    <span>  ₹ 45,141 </span>
                                    <span className="text-black text-sm dark:text-white-light ltr:mr-2 rtl:ml-2">this week</span>
                                    <IconTrendingUp className="text-success inline" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:shadow-none dark:bg-dark-light/10">
                                        <div
                                            className="bg-gradient-to-r from-[#4361ee] to-[#805dca] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                            style={{ width: '65%' }}
                                        ></div>
                                    </div>
                                    <span className="ltr:ml-5 rtl:mr-5 dark:text-white-light">57%</span>
                                </div>
                            </div>

                            <div
                                className="panel h-full overflow-hidden before:bg-[#1937cc] before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between"
                                style={{ background: 'linear-gradient(0deg,#00c6fb -227%,#005bea)' }}
                            >
                                <div className="flex items-start justify-between text-white-light mb-16 z-[7]">
                                    <h5 className=" text-lg">Total Balance</h5>

                                    <div className="relative text-xl whitespace-nowrap">
                                        ₹ 41,741.42
                                        <span className="table text-[#d3d3d3] bg-[#4361ee] rounded p-1 text-xs mt-1 ltr:ml-auto rtl:mr-auto">+ 2453</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between z-10">
                                    <div className="flex items-center justify-between">
                                        <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] place-content-center ltr:mr-2 rtl:ml-2">
                                            <IconPlus />
                                        </button>
                                        <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] grid place-content-center">
                                            <IconCreditCard />
                                        </button>
                                    </div>
                                    <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#4361ee] z-10">
                                        Upgrade
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            <div className="grid gap-6 xl:grid-flow-row">
                                <div className="panel overflow-hidden">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-lg ">Previous Statement</div>
                                            <div className="text-success"> Paid on June 27, 2022 </div>
                                        </div>
                                        <div className="dropdown">
                                            <Dropdown
                                                offset={[0, 5]}
                                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                btnClassName="hover:opacity-80"
                                                button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                            >
                                                <ul>
                                                    <li>
                                                        <button type="button">View Report</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Edit Report</button>
                                                    </li>
                                                </ul>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="relative mt-10">
                                        <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                            <IconCircleCheck className="text-success opacity-20 w-full h-full" />
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            <div>
                                                <div className="text-primary">Card Limit</div>
                                                <div className="mt-2  text-2xl"> ₹50,000.00</div>
                                            </div>
                                            <div>
                                                <div className="text-primary">Spent</div>
                                                <div className="mt-2  text-2xl"> ₹15,000.00</div>
                                            </div>
                                            <div>
                                                <div className="text-primary">Minimum</div>
                                                <div className="mt-2  text-2xl"> ₹2,500.00</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  Current Statement */}
                                <div className="panel overflow-hidden">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-lg ">Current Statement</div>
                                            <div className="text-danger"> Must be paid before July 27, 2022 </div>
                                        </div>
                                        <div className="dropdown">
                                            <Dropdown offset={[0, 5]} placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}>
                                                <ul>
                                                    <li>
                                                        <button type="button">View Report</button>
                                                    </li>
                                                    <li>
                                                        <button type="button">Edit Report</button>
                                                    </li>
                                                </ul>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="relative mt-10">
                                        <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                            <IconInfoCircle className="text-danger opacity-20 w-24 h-full" />
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            <div>
                                                <div className="text-primary">Card Limit</div>
                                                <div className="mt-2 text-2xl"> ₹50,000.00</div>
                                            </div>
                                            <div>
                                                <div className="text-primary">Spent</div>
                                                <div className="mt-2 text-2xl"> ₹30,500.00</div>
                                            </div>
                                            <div>
                                                <div className="text-primary">Minimum</div>
                                                <div className="mt-2 text-2xl"> ₹8,000.00</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*  Recent Transactions  */}
                            <div className="panel">
                                <div className="mb-5 text-lg ">Recent Transactions</div>
                                <div className="table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                                                <th>DATE</th>
                                                <th>NAME</th>
                                                <th>AMOUNT</th>
                                                <th className="text-center ltr:rounded-r-md rtl:rounded-l-md">STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="">#01</td>
                                                <td className="whitespace-nowrap">Oct 08, 2021</td>
                                                <td className="whitespace-nowrap">Eric Page</td>
                                                <td>₹1,358.75</td>
                                                <td className="text-center">
                                                    <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="">#02</td>
                                                <td className="whitespace-nowrap">Dec 18, 2021</td>
                                                <td className="whitespace-nowrap">Nita Parr</td>
                                                <td>-₹1,042.82</td>
                                                <td className="text-center">
                                                    <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="">#03</td>
                                                <td className="whitespace-nowrap">Dec 25, 2021</td>
                                                <td className="whitespace-nowrap">Carl Bell</td>
                                                <td>₹1,828.16</td>
                                                <td className="text-center">
                                                    <span className="badge bg-danger/20 text-danger rounded-full hover:top-0">Pending</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="">#04</td>
                                                <td className="whitespace-nowrap">Nov 29, 2021</td>
                                                <td className="whitespace-nowrap">Dan Hart</td>
                                                <td>₹1,647.55</td>
                                                <td className="text-center">
                                                    <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="">#05</td>
                                                <td className="whitespace-nowrap">Nov 24, 2021</td>
                                                <td className="whitespace-nowrap">Jake Ross</td>
                                                <td>₹927.43</td>
                                                <td className="text-center">
                                                    <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="">#06</td>
                                                <td className="whitespace-nowrap">Jan 26, 2022</td>
                                                <td className="whitespace-nowrap">Anna Bell</td>
                                                <td>₹250.00</td>
                                                <td className="text-center">
                                                    <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>

    );
};

export default Index;
