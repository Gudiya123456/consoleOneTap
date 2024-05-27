// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { IRootState } from '../../store';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import PageLoader from '../../components/Layouts/PageLoader';

// export default function Notification() {

//     const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);

//     const navigate = useNavigate();
//     useEffect(() => {
//         fetchNotificationSettings();
//     }, [])

//     const [isLoading, setIsLoading] = useState(true);
//     const [firebase, setFirebase] = useState({});
//     const [email, setEmail] = useState({});

//     const fetchNotificationSettings = async () => {
//         setIsLoading(true)
//         try {
//             const response = await axios({
//                 method: 'get',
//                 url: window.location.origin + "/api/dashboard/settings/notifications",
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: 'Bearer ' + crmToken,
//                 },
//             });
//             if (response.data.status == 'success') {
//                 setFirebase(response.data.firebase)
//                 setEmail(response.data.email)
//             }
//         } catch (error) {
//             console.log(error)
//             if (error.response.status == 401) navigate('/login')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     return (
//         <>

//             {isLoading ? <PageLoader /> : (

//                 <>
//                     <div>
//                         <b>Firebase</b>
//                         <p>api_key             : {firebase?.api_key}</p>
//                         <p>auth_domain         : {firebase?.auth_domain}</p>
//                         <p>project_id          : {firebase?.project_id}</p>
//                         <p>storage_bucket      : {firebase?.storage_bucket}</p>
//                         <p>messaging_sender_id : {firebase?.messaging_sender_id}</p>
//                         <p>app_id              : {firebase?.app_id}</p>
//                         <p>server_key          : {firebase?.server_key}</p>
//                         <p>key_pair            : {firebase?.key_pair}</p>
//                     </div>

//                     <div className='mt-5'>
//                         <b>Email</b>

//                         <p>mailer       : {email?.mailer}</p>
//                         <p>host         : {email?.host}</p>
//                         <p>port         : {email?.port}</p>
//                         <p>username     : {email?.username}</p>
//                         <p>password     : {email?.password}</p>
//                         <p>encryption   : {email?.encryption}</p>
//                         <p>from_address : {email?.from_address}</p>
//                         <p>from_name    : {email?.from_name}</p>
//                     </div>
//                 </>
//             )}
//         </>
//     )
// }
import React from 'react'

export default function Notification() {
  return (
    <div>Notification</div>
  )
}
