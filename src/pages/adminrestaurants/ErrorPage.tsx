import React from 'react';
import error from '../../assets/images/auth/error.svg'


const ErrorPage = () => {
  return (
    <div className="flex items-center gap-2  min-h-screen bg-white dark:bg-black">
      {/* <div className="text-center"> */}
        <div className="w-[50%] h-full flex justify-center text-center mb-8">
          <img src={error} alt="Error illustration" className="" />
        </div>
        <div className='w-[50%] flex   text-center '>
        <div>
        <h1 className="bg-gradient-to-r from-[#0038FF] to-[#FF0000] inline-block text-transparent text-6xl bg-clip-text">OOPS!</h1>
        <p className="mt-4 text-5xl text-black dark:text-white">Something went wrong</p>
        <p className="mt-2 text-lg text-black dark:text-gray-400">Looks like the page you're looking for does not exist</p>
        <button className="mt-6 px-8 py-1 text-lg font-semibold text-white bg-gradient-to-r from-[#0038FF] to-[#FF0000] rounded-3xl">
          Go Back to home
        </button>
        </div>
        </div>
    </div>
  );
};

export default ErrorPage;