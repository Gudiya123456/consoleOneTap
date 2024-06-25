import React from 'react'
import { BsQrCodeScan } from "react-icons/bs";
export default function Scan() {
    return (
        <div className='pt-8 mx-4'>

            <div className="flex flex-wrap w-full justify-center mb-5">
                <div className="w-full bg-dark border border-gray-500/20 rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 text-center">
                    <div className="text-white-light bg1-white-dark w-20 h-20 rounded-full flex items-center justify-center  mx-auto mb-20 mt-10">
                        <BsQrCodeScan size={100} className='animate-ping' />
                    </div>
                    <h5 className="text-lg font-semibold mb-3.5 text-white-light">Please Scan</h5>
                    <p className="text-white-light text-[15px]  mb-3.5">Scan any table Qrcode</p>

                </div>
            </div>
        </div>
    )
}
