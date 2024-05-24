
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import ReactApexChart from 'react-apexcharts';
import { setPageTitle } from '../store/themeConfigSlice'
import PageLoader from '../components/PageLoader'
import axios from 'axios';
import { BsFillPersonVcardFill } from 'react-icons/bs';
import { HiBuildingStorefront } from 'react-icons/hi2';
import { MdVerifiedUser } from 'react-icons/md';
import { IoFastFood } from 'react-icons/io5';
import box1 from '../assets/images/box1.png';

import box2 from '../assets/images/box2.png';
import box3 from '../assets/images/box3.png';
const Index = () => {
    const dispatch = useDispatch();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const navigate = useNavigate();
    const [homeData, setHomeData] = useState([])
    const colors = useSelector((state: IRootState) => state.themeConfig.colors);

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
                url:"https://cdn.onetapdine.com/api/home-data",

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            console.log(" Home Data", response.data);
            if (response.data.status == 'success') {
                setHomeData(response.data);
            }
        } catch (error) {
            if (error.response.status == 401) navigate('/login')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
{isLoading ? <PageLoader /> : (
    
<div className="  grid lg:grid-cols-3 md:grid-cols-2 gap-10">
<div className="rounded-lg  ">
    <div
        className={`${colors == '#C65BCF' ? "bg-[#C65BCF] text-white "
                : colors == "#03AED2" ? "bg-[#03AED2] text-white"
                    : colors == "#344C64" ? "bg-[#344C64] text-white"
                        : colors == "#0A6847" ? "bg-[#0A6847] text-white"
                            : 'bg-white dark:bg-[#0e1826] dark:text-white '} rounded-t-3xl rounded-br-3xl  firstbox flex items-center`}

    >
        <h2
            className={`${colors == '#C65BCF' || colors == "#03AED2" || colors == "#344C64" || colors == "#0A6847" ? " text-white "
                    : 'dark:text-white text-black '} ml-7 font-medium text-xl`}
        >
            Number of restaurants
        </h2>
    </div>
    <div className=" flex ">
        <div

            className={`${colors == '#C65BCF' ? "bg-[#C65BCF] text-white "
                    : colors == "#03AED2" ? "bg-[#03AED2] text-white"
                        : colors == "#344C64" ? "bg-[#344C64] text-white"
                            : colors == "#0A6847" ? "bg-[#0A6847] text-white"
                                : 'bg-white dark:bg-[#0e1826] dark:text-white '} flex-1 rounded-b-3xl  secondbox `}


        >
            <h1
             className={`${colors == '#C65BCF' || colors == "#03AED2" || colors == "#344C64" || colors == "#0A6847" ? " text-white "
             : 'dark:text-white text-black '} ml-7 font-bold text-4xl`}

            >{homeData.restaurants}</h1>
        </div>
        <div
        className={`${colors == '#C65BCF' ? "bg-[#C65BCF] text-white "
        : colors == "#03AED2" ? "bg-[#03AED2] text-white"
            : colors == "#344C64" ? "bg-[#344C64] text-white"
                : colors == "#0A6847" ? "bg-[#0A6847] text-white"
                    : 'bg-white dark:bg-[#0e1826] dark:text-white '} w-5 h-5 `}

        ></div>
        <div className=" dark:bg-[#202125] bg-[#f2f2f2]     w-28   flex  justify-center items-center rounded-tl-2xl  -ml-5 -mt-0">
            <img
                src={box1}
                alt=""
                srcset=""
                className=" object-contain  w-12 h-12 "
            />
        </div>
    </div>
</div>
<div className="rounded-lg  ">
    <div
        className={`${colors == '#C65BCF' ? "bg-[#C65BCF] text-white "
                : colors == "#03AED2" ? "bg-[#03AED2] text-white"
                    : colors == "#344C64" ? "bg-[#344C64] text-white"
                        : colors == "#0A6847" ? "bg-[#0A6847] text-white"
                            : 'bg-white dark:bg-[#0e1826] dark:text-white '} rounded-t-3xl rounded-br-3xl  firstbox flex items-center`}>
        <h2
            className={`${colors == '#C65BCF' || colors == "#03AED2" || colors == "#344C64" || colors == "#0A6847" ? " text-white "
                    : 'dark:text-white text-black '} ml-7 font-medium text-xl`}
        >
           Total Number of Employee
        </h2>
    </div>
    <div className=" flex ">
        <div

            className={`${colors == '#C65BCF' ? "bg-[#C65BCF] text-white "
                    : colors == "#03AED2" ? "bg-[#03AED2] text-white"
                        : colors == "#344C64" ? "bg-[#344C64] text-white"
                            : colors == "#0A6847" ? "bg-[#0A6847] text-white"
                                : 'bg-white dark:bg-[#0e1826] dark:text-white '} flex-1 rounded-b-3xl  secondbox `}


        >
            <h1
             className={`${colors == '#C65BCF' || colors == "#03AED2" || colors == "#344C64" || colors == "#0A6847" ? " text-white "
             : 'dark:text-white text-black '} ml-7 font-bold text-4xl`}

            >{homeData.employees}</h1>
        </div>
        <div
        className={`${colors == '#C65BCF' ? "bg-[#C65BCF] text-white "
        : colors == "#03AED2" ? "bg-[#03AED2] text-white"
            : colors == "#344C64" ? "bg-[#344C64] text-white"
                : colors == "#0A6847" ? "bg-[#0A6847] text-white"
                    : 'bg-white dark:bg-[#0e1826] dark:text-white '} w-5 h-5 `}

        ></div>
        <div className=" dark:bg-[#202125] bg-[#f2f2f2]     w-28   flex  justify-center items-center rounded-tl-2xl  -ml-5 -mt-0">
            <img
                src={box2}
                alt=""
                srcset=""
                className=" object-contain  w-12 h-12 "
            />
        </div>
    </div>
</div>
</div>
 )}

</>

    );
};

export default Index;
