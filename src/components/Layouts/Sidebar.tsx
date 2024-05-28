import PerfectScrollbar from "react-perfect-scrollbar";
import React, { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { toggleSidebar } from "../../store/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { IRootState } from "../../store";
import { useState, useEffect } from "react";


import lightlogo from '../../assets/images/lightlogo.svg'
import llogo from "../../assets/images/Group 319 (1).svg";


// import { MdOutlineSpaceDashboard } from "react-icons/md"
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { FaBellConcierge } from "react-icons/fa6";
import { IoIosFingerPrint, IoMdPricetags } from "react-icons/io";
import { LiaCoinsSolid } from "react-icons/lia";

import { BsCardHeading } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { FiSettings } from "react-icons/fi";


const Sidebar = () => {
    const path = window.location.pathname
    const [currentMenu, setCurrentMenu] = useState<string>("");
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const colors = useSelector((state: IRootState) => state.themeConfig.colors);
    const semidark = useSelector(
        (state: IRootState) => state.themeConfig.semidark
    );
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? "" : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector(
            '.sidebar ul a[href="' + window.location.pathname + '"]'
        );
        if (selector) {
            selector.classList.add("active");
            const ul: any = selector.closest("ul.sub-menu");
            if (ul) {
                let ele: any =
                    ul.closest("li.menu").querySelectorAll(".nav-link") || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? "dark" : ""}>
            <nav
                className={`sidebar fixed min-h-screen  h-full top-0 bottom-0 w-[260px]  z-50 transition-all duration-300 ${semidark ? "text-white-dark" : ""
                    }`}
            >
                <div 


                 className="bg-white pinks:bg-red-700 rounded-r-xl dark:bg-[#0e1826] dark:text-white pinks:bg-red-400 h-full"
                 
                 >

                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink
                            to="/"
                            className="main-logo flex items-center shrink-0"
                        >
                            <img
                                className=" ml-5 flex items-center justify-center"
                                src={themeConfig.theme == 'dark' ? llogo : lightlogo}
                                alt="logo"
                            />
                        </NavLink>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 py-0">


                            <li className="text-xl font-bold my-2">
                                <NavLink to="/" style={{}} className="group">
                                    <div className={`${path == "/" ?  "flex items-center  bg-[#fafafa] text-[#00327b]   p-2" 
                                    : 'flex items-center  text-black dark:text-white p-2'}`}>
                                        <div className="ml-4 h-6 w-6 " >
                                        <RiDashboardFill color="#22205e" className="text-[#22205e]" />
                                       
                                        </div>
                                        <div>
                                            <span
                                               className="ltr:pl-3 rtl:pr-3  text-[15px] font-bold   p-2"
                                            >
                                                Dashboard
                                            </span>

                                        </div>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="text-xl font-bold my-2">
                                <NavLink to="/restaurants" style={{}} className="group">
                                    <div className={`${path == "/restaurants" ?  "flex items-center  bg-[#fafafa] text-[#00327b]  p-2" 
                                    : 'flex items-center  text-black dark:text-white p-2'}`}>
                                        <div className="ml-4 h-6 w-6 " >
                                        <FaBellConcierge color="#22205e" className="text-[#22205e]" />
                                       
                                        </div>
                                        <div>
                                            <span
                                               className="ltr:pl-3 rtl:pr-3  text-[15px] font-bold  p-2"
                                            >
                                               Restaurants
                                            </span>

                                        </div>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="text-xl font-bold my-2">
                                <NavLink to="/authorization" style={{}} className="group">
                                    <div className={`${path == "/authorization" ?  "flex items-center  bg-[#fafafa] text-[#00327b]  p-2" 
                                    : 'flex items-center  text-black dark:text-white p-2'}`}>
                                        <div className="ml-4 h-6 w-6 " >
                                        <IoIosFingerPrint color="#22205e" className="text-[#22205e]" />
                                       
                                        </div>
                                        <div>
                                            <span
                                               className="ltr:pl-3 rtl:pr-3  text-[15px] font-bold     p-2"
                                            >
                                              Authorization
                                            </span>

                                        </div>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="text-xl font-bold my-2">
                                <NavLink to="/payment" style={{}} className="group">
                                    <div className={`${path == "/payment" ?  "flex items-center  bg-[#fafafa] text-[#00327b]  p-2" 
                                    : 'flex items-center  text-black dark:text-white p-2'}`}>
                                        <div className="ml-4 h-6 w-6 " >
                                        <LiaCoinsSolid color="#22205e" className="text-[#22205e]" />
                                       
                                        </div>
                                        <div>
                                            <span
                                               className="ltr:pl-3 rtl:pr-3  text-[15px] font-bold    p-2"
                                            >
                                              Payment
                                            </span>

                                        </div>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="text-xl font-bold my-2">
                                <NavLink to="/invoice" style={{}} className="group">
                                    <div className={`${path == "/invoice" ?  "flex items-center  bg-[#fafafa] text-[#00327b]  p-2" 
                                    : 'flex items-center  text-black dark:text-white p-2'}`}>
                                        <div className="ml-4 h-6 w-6 " >
                                        <BsCardHeading color="#22205e" className="text-[#22205e]" />
                                       
                                        </div>
                                        <div>
                                            <span
                                               className="ltr:pl-3 rtl:pr-3  text-[15px] font-bold  p-2"
                                            >
                                              Invoice
                                            </span>

                                        </div>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="text-xl font-bold my-2">
                                <NavLink to="/pricing" style={{}} className="group">
                                    <div className={`${path == "/pricing" ?  "flex items-center  bg-[#fafafa] text-[#00327b]  p-2" 
                                    : 'flex items-center  text-black dark:text-white p-2'}`}>
                                        <div className="ml-4 h-6 w-6 " >
                                        <IoMdPricetags color="#22205e" className="text-[#22205e]" />
                                       
                                        </div>
                                        <div>
                                            <span
                                               className="ltr:pl-3 rtl:pr-3  text-[15px] font-bold   p-2"
                                            >
                                             Pricing
                                            </span>

                                        </div>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="text-xl font-bold my-2">
                                <NavLink to="/support" style={{}} className="group">
                                    <div className={`${path == "/support" ?  "flex items-center  bg-[#fafafa] text-[#00327b]  p-2" 
                                    : 'flex items-center  text-black dark:text-white p-2'}`}>
                                        <div className="ml-4 h-6 w-6 " >
                                        <MdSupportAgent  className={`${themeConfig.theme=='dark'?'text-[#5e202b]':'text-[#22205e]'}`} />
                                       
                                        </div>
                                        <div>
                                            <span
                                               className="ltr:pl-3 rtl:pr-3  text-[15px] font-bold  text-black dark:text-white  p-2"
                                            >
                                             Support
                                            </span>

                                        </div>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                           
                            </li>

                            <li className="text-xl font-bold my-2">
                                <NavLink to="/billing" style={{}} className="group">
                                    <div className={`${path == "/billing" ?  "flex items-center  bg-[#fafafa] text-[#00327b]  p-2" 
                                    : 'flex items-center  text-black dark:text-white p-2'}`}>
                                        <div className="ml-4 h-6 w-6 " >
                                        <HiOutlineNewspaper color="#22205e" className="text-[#22205e]" />
                                        </div>
                                        <div>
                                            <span
                                               className="ltr:pl-3 rtl:pr-3  text-[15px] font-bold   p-2"
                                            >
                                              Billing
                                            </span>

                                        </div>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="text-xl font-bold my-2">
                                <NavLink to="/settings" style={{}} className="group">
                                    <div className={`${path == "/settings" ?  "flex items-center  bg-[#fafafa] text-[#00327b]  p-2" 
                                    : 'flex items-center  text-black dark:text-white p-2'}`}>
                                        <div className="ml-4 h-6 w-6 " >
                                        <FiSettings color="#22205e" className="text-[#22205e]" />
                                       
                                        </div>
                                        <div>
                                            <span
                                               className="ltr:pl-3 rtl:pr-3  text-[15px] font-bold  p-2"
                                            >
                                              settings
                                            </span>

                                        </div>
                                    </div>
                                </NavLink>
                            </li>

                            {/* <div className="fixed bottom-0">
                                <img src={
                                    themeConfig.theme == 'dark'  &&  colors == '#C65BCF' ? pinkbottom
                                    :themeConfig.theme == 'light'  &&  colors == '#C65BCF' ? pinkbottom

                                    :themeConfig.theme == 'dark'  &&  colors == '#03AED2' ? skybuttom
                                    :themeConfig.theme == 'light'  &&  colors == '#03AED2' ? skybuttom

                                    :themeConfig.theme == 'dark'  &&  colors == '#344C64' ? brownbottom
                                    :themeConfig.theme == 'light'  &&  colors == '#344C64' ? brownbottom

                                    :themeConfig.theme == 'dark'  &&  colors == '#0A6847' ? greenbottom
                                    :themeConfig.theme == 'light'  &&  colors == '#0A6847' ? greenbottom

                                    // :themeConfig.theme == 'dark' ? blackbottom
                                    :themeConfig.theme=="dark" && path=='/authorization' ? authBottomDark
                                    :themeConfig.theme=="dark" && path=='/pricing' ? billDarkBottom
                                    :themeConfig.theme=="dark" && path=='/payment' ? billDarkBottom
                                    :themeConfig.theme=="dark" && path=='/support' ? supportDarkBottom
                                    :themeConfig.theme=="dark" && path=='/billing' ? billDarkBottom
                                    :themeConfig.theme=="dark" && path=='/invoice' ? invoiceDarkBottom
                                   


                                    :themeConfig.theme == 'light'&& path=='/restaurants' ? greybottom
                                    :themeConfig.theme == 'light'&& path=='/' ? greybottom
                                    :themeConfig.theme=="light" && path=='/authorization' ? authbottom
                                    :themeConfig.theme == 'light'&& path=='/pricing' ? billBottom
                                    :themeConfig.theme == 'light'&& path=='/payment' ? billBottom
                                    :themeConfig.theme == 'light'&& path=='/support' ? supportBottom
                                    :themeConfig.theme == 'light'&& path=='/billing' ? billBottom
                                    :themeConfig.theme == 'light'&& path=='/invoice' ? invoiceBottom





                                    : blackbottom

                                } alt="" className="w-[260px]" />

                            </div> */}
                        </ul>

                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
