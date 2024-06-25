import React, { useState } from 'react'
import { GoStarFill } from 'react-icons/go'
import { MdAccessTime } from 'react-icons/md'
import { Rating } from 'react-simple-star-rating'

export default function Feedback() {
    const [rating, setRating] = useState(0)

    // Catch Rating value
    const handleRating = (rate: number) => {
        setRating(rate)

        // other logic
    }
    // Optinal callback functions
    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = () => console.log('Leave')
    const onPointerMove = (value: number, index: number) => console.log(value, index)


    return (
        <div>
            <div className='panel' >
                <h1 className='flex justify-center font-bold text-[20px]' >Feedback</h1>
                <form action="">
                    <div className=' flex justify-between'>
                        <span> <b className='text-[12px] '>Table Id</b></span>
                        <span className='flex items-center gap-1' ><b className='text-[12px] '>#56849505</b></span>
                    </div>
                    <div className=' flex justify-between'>
                        <span> <b className='text-[12px] '>Order Date</b></span>
                        <span className='flex items-center gap-1' ><b className='text-[12px] '>10-Apr-2024</b></span>
                    </div>

                    <div className=' flex justify-between'>
                        <span> <b className='text-[12px] '>Service Rating</b></span>
                        <span className='flex items-center gap-1' >
                            <GoStarFill className='font-bold text-[12px] text-black' />
                            <GoStarFill className='font-bold text-[12px] text-black' />
                            <GoStarFill className='font-bold text-[12px] text-black' />
                            <GoStarFill className='font-bold text-[12px] text-black' />
                        </span>

                        {/* <Rating
                            size={13}
                            onClick={handleRating}
                            onPointerEnter={onPointerEnter}
                            onPointerLeave={onPointerLeave}
                            onPointerMove={onPointerMove}
                            SVGstyle={{ 'display': 'inline' }}
                            allowFraction={true}
                        /> */}
                    </div>

                    <div className=' flex justify-between'>
                        <span> <b className='text-[12px] '>Item Name </b></span>
                        <span className='flex items-center gap-1' > <b className='text-[12px] '>Rating</b></span>
                    </div>
                    <div className=' flex justify-between'>
                        <span className='text-[12px] '>Chicken Tikka</span>
                        <span className='flex items-center gap-1' >
                            <GoStarFill className='font-bold text-[12px] text-black' />
                            <GoStarFill className='font-bold text-[12px] text-black' />
                            <GoStarFill className='font-bold text-[12px] text-black' />
                            <GoStarFill className='font-bold text-[12px] text-black' />
                        </span>

                        {/* <Rating
                            size={13}
                            onClick={handleRating}
                            onPointerEnter={onPointerEnter}
                            onPointerLeave={onPointerLeave}
                            onPointerMove={onPointerMove}
                            SVGstyle={{ 'display': 'inline' }}
                            allowFraction={true}
                        /> */}
                    </div>
                    <div className=' flex justify-between'>
                        <span className='text-[12px] '> Hydrabadi Biryani</span>
                        <span className='flex items-center gap-1' >
                            <GoStarFill className='font-bold text-[12px] text-black' />
                            <GoStarFill className='font-bold text-[12px] text-black' />
                            <GoStarFill className='font-bold text-[12px] text-black' />
                            <GoStarFill className='font-bold text-[12px] text-black' />
                        </span>

                        {/* <Rating
                            size={13}
                            onClick={handleRating}
                            onPointerEnter={onPointerEnter}
                            onPointerLeave={onPointerLeave}
                            onPointerMove={onPointerMove}
                            SVGstyle={{ 'display': 'inline' }}
                            allowFraction={true}
                        /> */}
                    </div>

                    <div className=' flex justify-between'>
                        <span className='text-[12px] '> Line Soda</span>
                        <span className='flex items-center gap-1' >
                            <GoStarFill className='font-bold text-[12px] text-black' />
                            <GoStarFill className='font-bold text-[12px] text-black' />
                            <GoStarFill className='font-bold text-[12px] text-black' />
                            <GoStarFill className='font-bold text-[12px] text-black' />
                        </span>

                        {/* <Rating
                            size={13}
                            onClick={handleRating}
                            onPointerEnter={onPointerEnter}
                            onPointerLeave={onPointerLeave}
                            onPointerMove={onPointerMove}
                            SVGstyle={{ 'display': 'inline' }}
                            allowFraction={true}
                        /> */}
                    </div>

                    <div className=' flex gap-2 justify-between'>
                        <span> <b className='text-[12px] '>Review </b></span>
                        <textarea id="message" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your Feedback here..."></textarea>
                    </div>
                    <div className='items-center flex justify-center mt-2'>
                        <button className='btn btn-dark btn-sm ' onClick={() => { alert('under process..') }} >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
