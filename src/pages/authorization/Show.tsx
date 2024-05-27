// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { IRootState } from '../../store';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import PageLoader from '../../components/Layouts/PageLoader';

// export default function Show() {

//     const navigate = useNavigate();
//     const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
//     const location = useLocation()
//     const user = location.state.user;

//     console.log(user)



//     useEffect(() => {
//         fetchUserDetails()
//     }, [])

//     const [isLoading, setIsLoading] = useState(true);
//     const [activities, setActivities] = useState([]);

//     const fetchUserDetails = async () => {
//         setIsLoading(true)

//         try {

//             const response = await axios({
//                 method: 'get',
//                 url: window.location.origin + "/api/dashboard/authorizations/" + user?.id,
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: 'Bearer ' + crmToken,
//                 },
//             });

//             if (response.data.status == 'success') {
//                 setActivities(response.data.activities)
//             }

//         } catch (error:any) {
//             if (error.response.status == 401) navigate('/login')

//         } finally {
//             setIsLoading(false)
//         }
//     }

//     return (
//         <>
//             {isLoading ? <PageLoader /> : (

//                 <div className='flex'>
//                     <div className='w-[300px]'>
//                         <h1>Basic Details</h1>

//                         <p>Name : {user.name}</p>

//                         <p>Email : {user.email}</p>

//                         <p>Phone : {user.phone}</p>

//                         <p>Country : {user.country}</p>

//                         <p>Status : {user.status ? 'Active' : 'Blocked'}</p>
//                     </div>
//                     <div>
//                         <h1>Activities ({activities.length})</h1>

//                         {activities.length ? (<>
//                             {activities.map((activity) => (
//                                 <div key={activity.id} className='mb-4 bg-white p-4'>
//                                     <h6>{activity.title} </h6>
//                                     <p>{activity.message}</p>
//                                     <p>{activity.created_at}</p>
//                                 </div>
//                             ))}
//                         </>) : <>
//                             <h1>No Activity Found</h1>
//                         </>}
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

import React from 'react'

export default function Show() {
  return (
    <div>Show</div>
  )
}
