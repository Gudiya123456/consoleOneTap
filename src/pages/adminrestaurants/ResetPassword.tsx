import React, { useState } from 'react'
import logo1 from '../../assets/images/auth/Logo 1.svg'
import { NavLink } from 'react-router-dom';

const ResetPassword = () => {
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <>
      <div>
        <div className="relative flex min-h-screen items-center justify-center bg-cover bg-[url(/restaurant/kot/images/auth/forgot-bg.jpeg)] bg-[#050100] bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
          <div className="relative flex w-full max-w-[1502px] flex-col justify-between bg-cover bg-center bg-no-repeat overflow-hidden rounded-md   lg:flex-row lg:gap-10 xl:gap-0">

            <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6

                            ">
              <div className='w-full max-w-[440px] bg-white rounded-xl lg:mt-16 p-10' >

                <form className="space-y-1 dark:text-white h-full rounded-xl">
                  <h1 className="text-2xl mt-1 font-bold  !leading-snug text-black md:text-2xl text-center">
                    <img className='text-center ml-20 mb-2 items-center w-1/2' src={logo1} alt="" />
                  </h1>

                  <div style={{ fontFamily: 'Roboto', fontWeight: 200, fontStyle: 'normal', fontSize: '14px' }}>
                    <input type="password" placeholder='New Password' className="w-full rounded-lg border border-black bg-white px-4 py-2 text-sm font-normal  text-black mb-1 " />
                  </div>
                  <div style={{ fontFamily: 'Roboto', fontWeight: 200, fontStyle: 'normal', fontSize: '14px' }}>
                    <input type="password" placeholder='Confirm Password' className="w-full rounded-lg border border-black bg-white px-4 py-2 text-sm focus font-normal text-black mb-1 " />

                  </div>
                  <NavLink to='/loginn' >
                    <button type="button" style={{ fontFamily: 'Roboto', fontWeight: 600, fontStyle: 'normal', fontSize: '14px' }} className="btn bg-black text-white  w-full rounded-lg border-0 !mt-2 ">
                      {btnLoading ? 'Please Wait...' : 'Reset Password'}
                    </button>
                  </NavLink>


                </form>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )


};

export default ResetPassword;
