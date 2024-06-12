import React, { useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import themeConfig from '../../theme.config';
import logo from "../../assets/images/auth/profile.svg";
import dlogo from "../../assets/images/dlogo.svg";


export default function FeatureDrawer({ showDrawer, setShowDrawer,authList }) {
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
                    } bg-white fixed ltr:-right-[800px] rtl:-left-[800px] top-0 bottom-0 w-full max-w-[500px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-1000 z-[51] dark:bg-black p-4`}
            >

                {/* {showDrawer && (<button
                    type="button"
                    className="bg-danger ltr:rounded-tl-full rtl:rounded-tr-full ltr:rounded-bl-full rtl:rounded-br-full absolute ltr:-left-12 rtl:-right-12 top-0 bottom-0 my-auto w-12 h-10 flex justify-center items-center text-white cursor-pointer"
                    onClick={() => setShowDrawer(!showDrawer)}
                >
                    <IoCloseSharp className=" w-5 h-5" />
                </button>)} */}



                <div className="flex flex-col h-screen overflow-hidden">
                    <div className="w-full text-center border-b border-grey p-4">
                        <button type="button" className="px-4 py-4 absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowDrawer(false)}>
                            <IoCloseSharp className=" w-5 h-5" />
                        </button>

                        <h4 className="mb-1 dark:text-white font-bold">Update Features</h4>
                    </div>

                    <section className="flex-1 overflow-y-auto overflow-x-hidden perfect-scrollbar mt-5">
                        <form action="" method="post" className='p-5'>
                       {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-2' > */}

                      

                            <div className='mb-4 poppins-font'>
                                <label htmlFor="fullname" className='text-white-dark text-style poppins-font'>Feature</label>
                                <input id="fullname" type="text" placeholder="Enter Feature" className="input-form poppins-font placeholder-black " />
                            </div>

                           

                        </form>
                    </section>
                    <footer className="w-full text-center border-t border-grey p-4">
                        <div className='flex justify-end gap-5 py-2'>
                            <button className='btn shadow' onClick={() => setShowDrawer(false)}>Cancel</button>
                            <button className='btn btn-dark'>Submit</button>
                        </div>
                    </footer>
                </div>
            </nav>
        </div>
    )
}