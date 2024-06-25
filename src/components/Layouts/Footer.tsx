import { NavLink } from "react-router-dom";
import React from "react";

const Footer = () => {
    return (
        <div className="pt-0 mt-auto p-2 bg-dark text-white">
            <div className="dark:text-white-dark  text-[14px] text-center ltr:sm:text-left rtl:sm:text-right mt-2">© {new Date().getFullYear()}. 
                {/* {restaurantName}  */}
                All rights reserved.</div>
            <div className="flex justify-around  text-[12px]">
                <NavLink to='/cookies'>
                <span>Cookies Policy</span>
                    </NavLink>
                    <NavLink to='/about-us' >
                    <span>About Us</span>

                    </NavLink>
                    <NavLink to='/contact-us'>


                <span>Contact Us</span>
                </NavLink>
            </div>
        </div>
    )

};

export default Footer;
