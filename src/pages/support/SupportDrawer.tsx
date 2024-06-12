import React, { useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import themeConfig from '../../theme.config';
import logo from "../../assets/images/auth/profile.svg";
import dlogo from "../../assets/images/dlogo.svg";
import Chat from './Chat';


export default function SupportDrawer({ showDrawer, setShowDrawer,authList }) {
    console.log('object',authList);
    const fileLogoRef = useRef<HTMLInputElement>(null);
    const [logoPriview, setLogoPriview] = useState<any>(
      themeConfig.theme == "dark" ? logo : logo
  );
    return (
        <div>
            <div className={`${(showDrawer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} ></div>

            <nav
                className={`${(showDrawer && 'ltr:!right-0 rtl:!left-0') || ''
                    } bg-white fixed ltr:-right-[800px] rtl:-left-[800px] top-0 bottom-0 w-full max-w-[600px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-1000 z-[51] dark:bg-black p-4`}
            >

                <div className="flex flex-col h-screen overflow-hidden">
                    <div className="w-full text-center border-b border-grey p-4">
                        <button type="button" className="px-4 py-4 absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowDrawer(false)}>
                            <IoCloseSharp className=" w-5 h-5" />
                        </button>

                        <h4 className="mb-1 dark:text-white font-bold">Live Support chat</h4>
                    </div>

                    <Chat/>
                    {/* <footer className="w-full text-center border-t border-grey p-4">
                        <div className='flex justify-end gap-5 py-2'>
                            <button className='btn shadow' onClick={() => setShowDrawer(false)}>Cancel</button>
                            <button className='btn btn-dark'>Submit</button>
                        </div>
                    </footer> */}
                </div>
            </nav>
        </div>
    )
}