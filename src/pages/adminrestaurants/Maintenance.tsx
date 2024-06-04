import React, { useEffect, useState } from 'react';

const Maintenance = () => {
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 4); // 4 minutes and 4 seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-800 to-red-800 rounded-tl-full rounded-tr-full blur-lg"></div>
          <div className="relative bg-black rounded-tl-full rounded-tr-full w-64 h-64 flex items-center justify-center">
            <div>
              <p className="text-lg">Under Maintenance</p>
              <div className="mt-4">
                <span className="text-4xl">{formatTime(timeLeft)}</span>
                {/* <span className="text-4xl">9999</span> */}

                <p className="text-sm">Hrs Mins Sec</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;



// import React, { useEffect, useState } from 'react';

// const Maintenance = () => {
//   const [timeLeft, setTimeLeft] = useState(4 * 60 + 4); // 4 minutes and 4 seconds

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const formatTime = (time) => {
//     const minutes = String(Math.floor(time / 60)).padStart(2, '0');
//     const seconds = String(time % 60).padStart(2, '0');
//     return `${minutes}:${seconds}`;
//   };
 
//   return (
//     <div className="flex items-center justify-center h-screen bg-black text-white">
//       <div className="text-center">
//         <div className="relative inline-block">
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-800 to-red-800 rounded-t-full blur-lg"></div>
//           <div className="relative bg-[url(/restaurant/kot/images/auth/ eclips.svg)] rounded-t-full w-64 h-64 flex items-center justify-center">
//             <div>
//               <p className="text-lg">Under Maintenance</p>
//               <div className="mt-4">
//                 {/* <span className="text-4xl">{formatTime(timeLeft)}</span> */}
//                 <span className="text-4xl">9999</span>

//                 <p className="text-sm">Hrs Mins Sec</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Maintenance;