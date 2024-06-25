import React from 'react'
import { BiSolidErrorCircle } from "react-icons/bi";
export default function Error({ error }) {
    return (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400 }} >
            <div className="flex items-center p-3.5 rounded text-white bg-danger">
                <span className="text-white me-2">
                    <BiSolidErrorCircle size={30} />
                </span>
                <span>
                    <strong className="ltr:mr-1 rtl:ml-1">{error}</strong>
                </span>

            </div>
        </div>
    )
}
