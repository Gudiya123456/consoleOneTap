// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { IRootState } from '../../store';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import axios from 'axios';
// const CrmSwal = withReactContent(Swal);
// const RolesView = () => {

//     const l = useLocation()
//     const navigate = useNavigate();
//     const C = useSelector((state: IRootState) => state.themeConfig.crmToken);
//     const P = l.state.permissions;
//     const R = l.state.rule;
//     const [A, B] = useState(JSON.parse(R.permissions));
//     const handle = (a, b, c) => {
//         const d = { ...A[b], [c]: a.target.checked };
//         B({ ...A, [b]: d })
//     }
//     const [b, cc] = useState(0);
//     const [e, f] = useState<any>({});


//     const validate = () => {
//         f({});
//         let ee = {};
//         if (!A) ee = { ...ee, permission: 'The permission field is required.' };
//         f(f);
//         return { totalErrors: Object.keys(ee).length };
//     };


//     const storeOrUpdateApi = async (data: any) => {
//         cc(1)
//         try {
//             const response = await axios({
//                 method: 'post',
//                 url: window.location.origin + "/api/dashboard/rules",
//                 data,
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     Authorization: 'Bearer ' + C,
//                 },
//             });

//             if (response.data.status == 'success') {
//                 Swal.fire({
//                     icon: response.data.status,
//                     title: response.data.title,
//                     text: response.data.message,
//                     padding: '2em',
//                     customClass: 'sweet-alerts',
//                 });


//             } else {

//                 alert("Failed")
//             }

//         } catch (error: any) {

//             if (error.response.status == 401) navigate('/login')
//             if (error?.response?.status === 422) {
//                 const a = error.response.data.errors;
//                 let b = {};
//                 for (var c in a) {
//                     b = { ...b, [c]: a[c][0] };
//                 }
//                 f(b);
//                 CrmSwal.fire({
//                     title: "Server Validation Error! Please solve",
//                     toast: true,
//                     position: 'top',
//                     showConfirmButton: false,
//                     showCancelButton: false,
//                     width: 450,
//                     timer: 2000,
//                     customClass: {
//                         popup: "color-danger"
//                     }
//                 });
//             }
//         } finally {
//             cc(0)
//         }
//     };

//     const formSubmit = () => {

//         const isValid = validate();
//         if (isValid.totalErrors) return false;
//         const data = new FormData();
//         data.append("id", R.id);
//         data.append("rule", R.rule);
//         data.append("permissions", JSON.stringify(A));
//         storeOrUpdateApi(data);

//     };

//     return (
//         <div>

//             <div className="panel">
//                 <div className="flex items-center justify-between mb-5">
//                     <h5 className="font-semibold text-lg dark:text-white-light">Role & Permissions <span className='text-danger'>({R.rule})</span></h5>
//                 </div>
//                 <div className="table-responsive mb-5 text-lg">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Page</th>
//                                 <th colSpan={4} className='text-center'>Action</th>

//                             </tr>
//                         </thead>
//                         <tbody>
//                             {Object.keys(P).map((key, index) => (
//                                 <tr key={index + 1}>
//                                     <td>{index + 1}</td>
//                                     <td><b>{key}</b></td>
//                                     {Object.keys(P[key]).map((z, i) => (
//                                         <td key={index + i + 1}>
//                                             <input type="checkbox" className="form-checkbox" defaultChecked={A[key][z]} onClick={(e) => handle(e, key, z)} />
//                                             <b>{z}</b>
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))}

//                         </tbody>
//                     </table>
//                 </div>
//                 {e?.permission ? (
//                     <div className='m-4 text-center'>
//                         <span className='text-danger font-bold'>{e?.permission}</span>
//                     </div>
//                 ) : ('')}


//                 {R.rule != "SUPERADMIN" ? (
//                     <div>
//                         <button className='btn btn-gradient w-[240px] m-auto' onClick={() => formSubmit()} disabled={b}>
//                             {b ? 'Loading...' : 'Update'}
//                         </button>
//                     </div>
//                 ) : ''}

//             </div>

//         </div>
//     );
// };

// export default RolesView;

import React from 'react'

export default function View() {
  return (
    <div>View</div>
  )
}

