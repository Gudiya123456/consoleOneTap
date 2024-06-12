
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import React,{ useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';


import greybottom from "../../assets/images/sidebarIcons/greybottom.svg";
import blackbottom from "../../assets/images/sidebarIcons/blackbottom.svg";


// buttom images based on routers
import authbottom from "../../assets/images/sidebarIcons/authbottom.svg";
import authBottomDark from "../../assets/images/sidebarIcons/authBottomDark.svg";
import billBo from "../../assets/images/sidebarIcons/billBo.svg";
import billingDarkBo from "../../assets/images/sidebarIcons/billingDarkBo.png";

import supportBottom from "../../assets/images/sidebarIcons/supportBottom.svg";
import supportDarkBottom from "../../assets/images/sidebarIcons/supportDarkBottom.svg";

import setting from "../../assets/images/sidebarIcons/setting.svg";
import darksetting from "../../assets/images/sidebarIcons/darksetting.svg";

import invoiceBottom from "../../assets/images/sidebarIcons/invoiceBottom.svg";
import invoiceDarkBottom from "../../assets/images/sidebarIcons/invoiceDarkBottom.png";

import paymentb from "../../assets/images/sidebarIcons/payment.svg";
import paymentdark from "../../assets/images/sidebarIcons/paymentdark.svg";

import logo1 from "../../assets/images/auth/logo.svg"



import { RiDashboardFill } from "react-icons/ri";
import { FaBellConcierge } from "react-icons/fa6";
import { IoIosFingerPrint, IoMdPricetags } from "react-icons/io";
import { LiaCoinsSolid } from "react-icons/lia";

import { BsCardHeading } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { FiSettings } from "react-icons/fi";

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);
const height=window.innerHeight;
    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    const path = window.location.pathname
    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light" src={logo1} alt="logo" />
                            {/* <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('VRISTO')}</span> */}
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                   
                     <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-2">
                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/" className="group">
                                            <div className="flex items-center">
                                                <RiDashboardFill className=" group-empty:text-white  shrink-0" />
                                                <span style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }}  className="ltr:pl-4 rtl:pr-4 text-[16px] font-medium text-black dark:text-white tracking-wide dark:group-hover:text-white">{t('Dashboard')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                   
                                    <li className="nav-item">
                                        <NavLink to="/restaurants" className="group">
                                            <div className="flex items-center">
                                                <FaBellConcierge className=" shrink-0" />
                                                <span style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }} className="ltr:pl-4 rtl:pr-4  text-black text-[16px] font-medium dark:text-white dark:group-hover:text-white">{t(' Restaurant')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/authorization" className="group">
                                            <div className="flex items-center">
                                                <IoIosFingerPrint className=" shrink-0" />
                                                <span style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }} className="ltr:pl-4 rtl:pr-4 text-black text-[16px] font-medium dark:text-white dark:group-hover:text-white">{t('Authorization')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/payment" className="group">
                                            <div className="flex items-center">
                                                <LiaCoinsSolid className=" shrink-0" />
                                                <span style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }} className="ltr:pl-4 rtl:pr-4 text-black text-[16px] font-medium dark:text-white dark:group-hover:text-white">{t('Payment')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/invoice" className="group">
                                            <div className="flex items-center">
                                                <BsCardHeading className=" shrink-0" />
                                                <span style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }} className="ltr:pl-4 rtl:pr-4 text-[16px] font-medium text-black dark:text-white dark:group-hover:text-white">{t('Invoice')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/pricing" className="group">
                                            <div className="flex items-center">
                                                <IoMdPricetags className=" shrink-0" />
                                                <span style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }} className="ltr:pl-4 rtl:pr-4 text-[16px] font-medium text-black dark:text-white dark:group-hover:text-white">{t('Pricing')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    

                                

                                    <li className="nav-item">
                                        <NavLink to="/billing" className="group">
                                            <div className="flex items-center">
                                                <HiOutlineNewspaper className=" shrink-0" />
                                                <span style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }} className="ltr:pl-4 rtl:pr-4 text-[16px] font-medium text-black dark:text-white dark:group-hover:text-white">{t('Billing')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/settings" className="group">
                                    <div className="flex items-center">
                                        <FiSettings  className=" text-black  shrink-0" />
                                        <span style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }} className="ltr:pl-4 rtl:pr-4 text-black dark:text-white text-[16px] font-medium  dark:group-hover:text-white">{t('Settings')}</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                        <NavLink to="/support" className="group">
                                            <div className="flex items-center">
                                                <MdSupportAgent className=" shrink-0" />
                                                <span style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }} className="ltr:pl-4 rtl:pr-4 text-black text-[16px] font-medium dark:text-white dark:group-hover:text-white">{t('Support')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                            <div>
                                {
                                     height > 750 &&  <div className="fixed bottom-0">
                                    <img src={
                                       
                                        themeConfig.theme=="dark"  ? blackbottom
                                        :themeConfig.theme=='dark' && path=='/'?blackbottom
                                        :themeConfig.theme=='dark' && path=='/authorization'?authBottomDark
                                        :themeConfig.theme=='dark' && path=='/restaurants'?blackbottom
                                        :themeConfig.theme=='dark' && path=='/billing'?billingDarkBo
                                        :themeConfig.theme=='dark' && path=='/payment'?paymentdark
                                        :themeConfig.theme=='dark' && path=='/pricing'?paymentdark
                                        :themeConfig.theme=='dark' && path=='/invoice'?invoiceDarkBottom
                                        :themeConfig.theme=='dark' && path=='/support'?supportDarkBottom
                                        :themeConfig.theme=='dark' && path=='/settings'?darksetting
    
                                        // :themeConfig.theme == 'light' ? greybottom
                                        :themeConfig.theme=='light' && path=='/'?greybottom
                                        :themeConfig.theme=='light' && path=='/authorization'?authbottom
                                        :themeConfig.theme=='light' && path=='/restaurants'?greybottom
                                        :themeConfig.theme=='light' && path=='/billing'?billBo
                                        :themeConfig.theme=='light' && path=='/payment'?paymentb
                                        :themeConfig.theme=='light' && path=='/pricing'?paymentb
                                        :themeConfig.theme=='light' && path=='/invoice'?invoiceBottom
                                        :themeConfig.theme=='light' && path=='/support'?supportBottom
                                        :themeConfig.theme=='light' && path=='/settings'?setting
                                        
                                        : greybottom
    
                                    } alt="" className="sm:w-[200px] md:w-[250px] lg:w-[200px] xl:w-[200px] 2xl:w-[250px] -ml-5" />
    
                                </div>
                                }
                            </div>

                          
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
