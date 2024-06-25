// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';

// // import './styles.css';

// // import required modules
// import { Navigation } from 'swiper/modules';

// export default function Banner({ banners }) {
//     // console.log("banners",banners)
//     return (
//         <>
//             {banners.status==0?null :banners.length ? (<Swiper navigation={true} modules={[Navigation]} autoplay={true} loop={true} className="mySwiper">
//                 {banners.map((banner) => (
//                     <SwiperSlide key={banner.id}>
//                         <img src={window.location.origin + '/storage/' + banner.banner_image} className='rounded-2xl w-full h-40' />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>) : ''}
//         </>
//     );
// }

import React from 'react'

export default function Banner() {
  return (
    <div>Banner</div>
  )
}
