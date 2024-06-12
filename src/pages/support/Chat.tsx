import React from 'react';
import { IoSend } from "react-icons/io5";

const Chat = () => {
  return (
    <div className="max-w-4xl mt-4 ">
      <div className="bg-white rounded-lg ">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div>
              <p className=""><strong>Restaurant Name:</strong> A2B </p>
              <p className=""><strong>Branch Name:</strong> Kengeri</p>
            <p className=""><strong>Name:</strong> Arun Prashath D</p>

            </div>
          </div>
          <div>
            <p className=""><strong>Email Id:</strong> ArunAP@gmail.com</p>
            <p className=""><strong>Number:</strong> 987654431</p>
            <p className=""><strong>Title:</strong> Late Delivery </p>
          </div>
        </div>
        <div className="bg-[#EFEFEF] p-4 rounded-lg min-h-[300px]">
          {/* Placeholder for chat messages */}
          <h1 className='' >Hiii</h1>
          <h1 className=' float-right' >Hello</h1>
        </div>
        <div className='flex justify-between mt-4'>
          <button className='btn btn-sm btn-danger' >Close</button>
          <div className="flex">
          <input
            type="text"
            className="flex-grow w-[430px] border rounded-l-lg p-2"
            placeholder="Type a message..."
          />
          <button className="bg-blue-500 text-white p-2 rounded-r-lg">
         
            <IoSend/>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
