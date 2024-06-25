import React from 'react'
import { DNA } from 'react-loader-spinner';
export default function ShortPageLoader() {
    return (
        <div>
            <DNA
                visible={true}
                height="100"
                width="100"
                ariaLabel="dna-loading"
                wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                wrapperClass="dna-wrapper"
            />

        </div>
    )
}
