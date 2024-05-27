// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { IRootState } from '../../store';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import PageLoader from '../../components/Layouts/PageLoader';

// export default function General() {

//     const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     useEffect(() => {
//         fetchGeneralSettings();
//     }, [])

//     const [isLoading, setIsLoading] = useState(true);
//     const [settings, setSettings] = useState([]);

//     const fetchGeneralSettings = async () => {

//         setIsLoading(true)
//         try {
//             const response = await axios({
//                 method: 'get',
//                 url: window.location.origin + "/api/dashboard/settings",
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: 'Bearer ' + crmToken,
//                 },
//             });
//             if (response.data.status == 'success') {
//                 setSettings(response.data.setting)
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
//                 <div>
//                     <h1>General Settings</h1>
//                     <img className='w-48' src={window.location.origin + '/storage/' + settings.logo} alt="a" /> <br />
//                     <img className='w-48' src={window.location.origin + '/storage/' + settings.fav_icon} alt="a" /> <br />
//                     <b>Mode :  {settings?.mode}</b> <br />
//                     <b>contact_indian_number :  {settings?.contact_indian_number}</b> <br />
//                     <b>contact_indian_number 2 :  {settings?.contact_indian_number2}</b> <br />
//                     <b>contact_usa_number :  {settings?.contact_usa_number}</b> <br />
//                     <b>contact_usa_number 2 :  {settings?.contact_usa_number2}</b> <br />
//                     <b>contact_uae_number :  {settings?.contact_uae_number}</b> <br />
//                     <b>contact_uae_number2 :  {settings?.contact_uae_number2}</b> <br />
//                     <b>contact_indian_email :  {settings?.contact_indian_email}</b> <br />
//                     <b>contact_indian_email2 :  {settings?.contact_indian_email2}</b> <br />
//                     <b>contact_usa_email :  {settings?.contact_usa_email}</b> <br />
//                     <b>contact_usa_email2 :  {settings?.contact_usa_email2}</b> <br />
//                     <b>contact_uae_email :  {settings?.contact_uae_email}</b> <br />
//                     <b>contact_uae_email2 :  {settings?.contact_uae_email2}</b> <br />
//                 </div>
//             )}
//         </>
//     )
// }

import React from 'react'

export default function General() {
  return (
    <div>General</div>
  )
}
