import React from 'react'
// import logo1 from '../../assets/images/auth/Logo 1.svg'
import logo1 from '../../assets/images/auth/doll.svg'



export default function ActivatePassword() {

    return (
        <div>
            {/* <div className="relative flex min-h-screen items-center justify-center bg-cover bg-[linear-gradient(to_bottom,rgba(0,0,0,0)53%,rgba(0,2,0.8)95%),url(/restaurant/kot/images/auth/create.jpg)] bg-[#050100] bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"> */}
            <div className="relative flex min-h-screen items-center justify-center bg-cover bg-[url(/restaurant/kot/images/auth/create2.png)] bg-red-600 bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between bg-cover bg-center bg-no-repeat overflow-hidden rounded-md     lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 ">
                        <div className='w-full max-w-[440px] bg-white dark:bg-[#161616] rounded-xl lg:mt-16 p-10' >
                            <form className="space-y-1 dark:text-white h-full rounded-xl">
                                <h1 className="text-2xl  font-bold flex justify-center  !leading-snug text-black md:text-2xl text-center">
                                    
                                    <img className='  text-center  mb-2 items-center w-1/4' src={logo1} alt="" />
                                </h1>
                                <h1 className='text-2xl mt-1 font-bold flex justify-center  !leading-snug text-black dark:text-white md:text-2xl text-center' >Hi Gudiya</h1>
                                <p className=' flex justify-center text-black dark:text-white ' >Please create new password to continue </p>


                                <div style={{ fontFamily: 'Roboto', fontWeight: 200, fontStyle: 'normal', fontSize: '14px' }}>
                                    <input type="password" placeholder='Create New Password' className="w-full rounded-lg  bg-[#F2F2F2] px-4 py-2 mt-2 text-xs font-normal  text-black mb-1 " />

                                </div>
                                <div style={{ fontFamily: 'Roboto', fontWeight: 200, fontStyle: 'normal', fontSize: '14px' }}>
                                    <input type="password" placeholder='Confirm Password' className="w-full rounded-lg  bg-[#F2F2F2] px-4 py-2 text-xs focus font-normal text-black mb-1 " />

                                </div>
                                <button type="button" style={{ fontFamily: 'Roboto', fontWeight: 600, fontStyle: 'normal', fontSize: '14px' }} className="btn shadow-none bg-gradient-to-r from-[#1C2BB9] to-[#EE030D] text-white  w-full rounded-lg border-0 !mt-2 ">
                                    Activate
                                </button>
                                <div className='mt-5 '>

                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
