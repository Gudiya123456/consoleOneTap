import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import React,{ useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuChat from '../Icon/Menu/IconMenuChat';
import IconMenuMailbox from '../Icon/Menu/IconMenuMailbox';
import IconMenuTodo from '../Icon/Menu/IconMenuTodo';
import IconMenuNotes from '../Icon/Menu/IconMenuNotes';
import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
import IconMenuContacts from '../Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuCalendar from '../Icon/Menu/IconMenuCalendar';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuCharts from '../Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import IconMenuFontIcons from '../Icon/Menu/IconMenuFontIcons';
import IconMenuDragAndDrop from '../Icon/Menu/IconMenuDragAndDrop';
import IconMenuTables from '../Icon/Menu/IconMenuTables';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '../Icon/Menu/IconMenuAuthentication';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';
import lightlogo from '../../assets/images/lightlogo.svg'
import llogo from "../../assets/images/Group 319 (1).svg";


import logo from '../../assets/images/logo.png'
import dashboard from "../../assets/images/dashbaord.svg"
import restaurant from "../../assets/images/Service Bell.png"
import auth from "../../assets/images/auth.png"
import admin from "../../assets/images/admin.png"
import payment from "../../assets/images/payment.png"
import settings from "../../assets/images/Settings.png"
import restaurantd from "../../assets/images/Room Service.svg"
import invoice from "../../assets/images/Invoice.svg"
import support from "../../assets/images/support.svg"

import billing from "../../assets/images/billing.svg"

import bimage from "../../assets/images/buttom2.svg"
import settingDark from '../../assets/images/Settings.svg'
import authDark from '../../assets/images/Fingerprint (1).svg'
import paymentDark from '../../assets/images/paymentDark.svg'
import invoiceDark from '../../assets/images/Invoice (2).svg'
import supportDark from '../../assets/images/Customer Support (2).svg'
import billingDark from '../../assets/images/Purchase Order (2).svg'
import dashboardDark from '../../assets/images/Group 123 (1).svg'
import leftmenubLight from '../../assets/images/leftmenubLight.svg'
import pricing from "../../assets/images/Tags.svg";


// images for sidebar icons for dashboard
import skydashboard from "../../assets/images/sidebarIcons/skydashboard.svg"
import pinkdashboard from "../../assets/images/sidebarIcons/pinkdashboard.svg"
import browndashboard from "../../assets/images/sidebarIcons/browndashboard.svg"
import greendashboard from "../../assets/images/sidebarIcons/greendashboard.svg"

// images for sidebar icons for Restaurant
import pinkrestaurant from "../../assets/images/sidebarIcons/pinkrestaurant.svg"
import skyrestaurant from "../../assets/images/sidebarIcons/skyrestaurant.svg"
import brownrestauarnt from "../../assets/images/sidebarIcons/brownrestauarnt.svg"
import greenrestaurant from "../../assets/images/sidebarIcons/greenrestaurant.svg"

// images for sidebar icons for Auth
import pinkauth from "../../assets/images/sidebarIcons/pinkauth.svg"
import skyauth from "../../assets/images/sidebarIcons/skyauth.svg"
import brownauth from "../../assets/images/sidebarIcons/brownauth.svg"
import greenauth from "../../assets/images/sidebarIcons/greenauth.svg"


// images for sidebar icons for Payments
import pinkpay from "../../assets/images/sidebarIcons/pinkpay.svg"
import skypay from "../../assets/images/sidebarIcons/skypay.svg"
import brownpay from "../../assets/images/sidebarIcons/brownpay.svg"
import greenpay from "../../assets/images/sidebarIcons/greenpay.svg"


// images for sidebar icons for Invoice
import skyinvoice from "../../assets/images/sidebarIcons/skyinvoice.svg"
import pinkinvoice from "../../assets/images/sidebarIcons/pinkinvoice.svg"
import browninvoice from "../../assets/images/sidebarIcons/browninvoice.svg"
import greeninvoice from "../../assets/images/sidebarIcons/greeninvoice.svg"


// images for sidebar icons for Support
import pinksupport from "../../assets/images/sidebarIcons/pinksupport.svg"
import skysupport from "../../assets/images/sidebarIcons/skysupport.svg"
import brownsupport from "../../assets/images/sidebarIcons/brownsupport.svg"
import greensupport from "../../assets/images/sidebarIcons/greensupport.svg"

// images for sidebar icons for Billing
import pinkbill from "../../assets/images/sidebarIcons/pinkbill.svg"
import skybill from "../../assets/images/sidebarIcons/skybill.svg"
import brownbill from "../../assets/images/sidebarIcons/brownbill.svg"
import greenbill from "../../assets/images/sidebarIcons/greenbill.svg"

// images for sidebar icons for Setting
import pinksetting from "../../assets/images/sidebarIcons/pinksetting.svg"
import skysetting from "../../assets/images/sidebarIcons/skysetting.svg"
import brownsetting from "../../assets/images/sidebarIcons/brownsetting.svg"
import greenseeting from "../../assets/images/sidebarIcons/greenseeting.svg"




// images for sidebar bottoms
import pinkbottom from "../../assets/images/sidebarIcons/pinkbuttom.svg";
import skybuttom from "../../assets/images/sidebarIcons/skybuttom.svg";
import brownbottom from "../../assets/images/sidebarIcons/brownbottom.svg";
import greenbottom from "../../assets/images/sidebarIcons/greenbottom.svg";
import greybottom from "../../assets/images/sidebarIcons/greybottom.svg";
import blackbottom from "../../assets/images/sidebarIcons/blackbottom.svg";



// src/assets/images/sidebarIcons/authbottom.svg src/assets/images/sidebarIcons/authBottomDark.svg src/assets/images/sidebarIcons/billBo.svg src/assets/images/sidebarIcons/billingDarkBo.png src/assets/images/sidebarIcons/billBottom.svg src/assets/images/sidebarIcons/billDarkBottom.svg src/assets/images/sidebarIcons/supportBottom.svg src/assets/images/sidebarIcons/supportDarkBottom.svg



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
    const path = window.location.pathname

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

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar  fixed min-h-screen h-full top-0 bottom-0 w-[260px]  z-50 transition-all duration-300 ${semidark ? 'text-white' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full rounded-r-xl">
                    <div className="flex justify-center items-center px-3 h-[120px]">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <span style={{letterSpacing:'1px'}} className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                                <img src={themeConfig.theme == 'dark' ? llogo : lightlogo} alt="" />
                            </span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 ml-2 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/" className="group">
                                            <div className="flex items-center">
                                                <RiDashboardFill className=" group-empty:text-white  shrink-0" />
                                                <span style={{letterSpacing:'1px'}}  className="ltr:pl-4 rtl:pr-4 text-[16px] font-medium text-black dark:text-white tracking-wide dark:group-hover:text-white">{t('Dashboard')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                   
                                    <li className="nav-item">
                                        <NavLink to="/restaurants" className="group">
                                            <div className="flex items-center">
                                                <FaBellConcierge className=" shrink-0" />
                                                <span style={{letterSpacing:'1px'}} className="ltr:pl-4 rtl:pr-4  text-black text-[16px] font-medium dark:text-white dark:group-hover:text-white">{t(' Restaurants')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/authorization" className="group">
                                            <div className="flex items-center">
                                                <IoIosFingerPrint className=" shrink-0" />
                                                <span style={{letterSpacing:'1px'}} className="ltr:pl-4 rtl:pr-4 text-black text-[16px] font-medium dark:text-white dark:group-hover:text-white">{t('Authorization')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/payment" className="group">
                                            <div className="flex items-center">
                                                <LiaCoinsSolid className=" shrink-0" />
                                                <span style={{letterSpacing:'1px'}} className="ltr:pl-4 rtl:pr-4 text-black text-[16px] font-medium dark:text-white dark:group-hover:text-white">{t('Payment')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/invoice" className="group">
                                            <div className="flex items-center">
                                                <BsCardHeading className=" shrink-0" />
                                                <span style={{letterSpacing:'1px'}} className="ltr:pl-4 rtl:pr-4 text-[16px] font-medium text-black dark:text-white dark:group-hover:text-white">{t('Invoice')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/pricing" className="group">
                                            <div className="flex items-center">
                                                <IoMdPricetags className=" shrink-0" />
                                                <span style={{letterSpacing:'1px'}} className="ltr:pl-4 rtl:pr-4 text-[16px] font-medium text-black dark:text-white dark:group-hover:text-white">{t('Pricing')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/support" className="group">
                                            <div className="flex items-center">
                                                <MdSupportAgent className=" shrink-0" />
                                                <span style={{letterSpacing:'1px'}} className="ltr:pl-4 rtl:pr-4 text-black text-[16px] font-medium dark:text-white dark:group-hover:text-white">{t('Support')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                

                                    <li className="nav-item">
                                        <NavLink to="/billing" className="group">
                                            <div className="flex items-center">
                                                <HiOutlineNewspaper className=" shrink-0" />
                                                <span style={{letterSpacing:'1px'}} className="ltr:pl-4 rtl:pr-4 text-[16px] font-medium text-black dark:text-white dark:group-hover:text-white">{t('Billing')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/settings" className="group">
                                    <div className="flex items-center">
                                        <FiSettings  className=" text-black  shrink-0" />
                                        <span style={{letterSpacing:'1px'}} className="ltr:pl-4 rtl:pr-4 text-black dark:text-white text-[16px] font-medium  dark:group-hover:text-white">{t('Settings')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <div className="fixed bottom-0">
                                <img src={
                                   
                                    // themeConfig.theme=="dark"  ? blackbottom
                                    themeConfig.theme=='dark' && path=='/authorization'?authDark


                                    // :themeConfig.theme == 'light' ? greybottom
                                    :themeConfig.theme=='light' && path=='/authorization'?auth

                                    
                                    : blackbottom

                                } alt="" className="sm:w-[200px] md:w-[250px] lg:w-[200px] xl:w-[200px] 2xl:w-[250px] -ml-5" />

                            </div>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
