import React from 'react'
import { Bars } from 'react-loader-spinner';
export default function PageLoader() {
    return (
        <div>
            <Bars
                height="75"
                width="75"
                color="black"
                ariaLabel="bars-loading"
                wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                wrapperClass="m-auto"
                visible={true}
            />

        </div>
    )
}
