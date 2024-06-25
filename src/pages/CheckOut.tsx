// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { IRootState } from '../store';
// import PageLoader from './PageLoader';
// import axios from 'axios';
// import { setCustOrderId, setCustomerToken } from '../store/themeConfigSlice';
// import Swal from 'sweetalert2';
// import { RiArrowGoBackFill } from 'react-icons/ri';
// export default function CheckOut() {

//     const navigate = useNavigate()
//     const dispatch = useDispatch();
//     const customerToken = useSelector((state: IRootState) => state.themeConfig.customerToken);
//     const custOrderId = useSelector((state: IRootState) => state.themeConfig.custOrderId);
//     const cartItems = useSelector((state: IRootState) => state.themeConfig.cartItems);
//     const [isLoading, setIsLoading] = useState(true);



//     useEffect(() => {
//         fetchCheckOut();
//     }, [])

//     const [order, setOrder] = useState();
//     const [payment, setPayment] = useState(null);
//     const [items, setItems] = useState();
//     const [calculation, setCalculation] = useState();
//     const [currency, setCurrency] = useState('');
//     const fetchCheckOut = async () => {
//         setIsLoading(true)
//         try {
//             const response = await axios({
//                 method: 'get',
//                 url: window.location.origin + "/api/restaurant/customers/get-check-out",
//                 headers: { 'Content-Type': 'application/json', 'current-order': custOrderId, Authorization: `Bearer ${customerToken}` }
//             });

//             if (response.data.status == "success") {
//                 setOrder(response.data.order)
//                 setPayment(response.data.payment)
//                 setItems(response.data.finalItems)
//                 setCalculation(response.data.calculation)
//                 setCurrency(response.data.currency)
//             } else if (response.data.status == "error") {
//                 if (response.data.action == "remove-order-token") dispatch(setCustOrderId(''));
//             }
//         } catch (error) {

//             if (error.response.status == 401) {
//                 dispatch(setCustomerToken(''));
//             }
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const [btnLoading, setBtnLoading] = useState(false);

//     const checkOut = async (r) => {
//         setBtnLoading(true)
//         try {

//             const response = await axios({
//                 method: 'post',
//                 url: window.location.origin + "/api/restaurant/customers/razor-pay-success",
//                 data: r,
//                 headers: { 'Content-Type': 'application/json', 'current-order': custOrderId, Authorization: `Bearer ${customerToken}` }
//             });

//             if (response.data.status == "success") {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Success',
//                     text: response.data.message,
//                     padding: '2em',
//                     customClass: 'sweet-alerts',
//                 });
//                 dispatch(setCustOrderId(''));
//                 navigate('/invoice', { state: { orderId: order?.order_id } })

//             } else if (response.data.status == "error") {
//                 if (response.data.action == "remove-order-token") dispatch(setCustOrderId(''));
//             }

//         } catch (error) {
//             if (error.response.status == 401) {
//                 dispatch(setCustomerToken(''));
//             }
//         } finally {
//             setBtnLoading(false)
//         }
//     }



//     const RazorPayPayment = () => {
//         setBtnLoading(true)
//         var options = {
//             "key": `${payment?.key}`,
//             "amount": `${payment?.amount}`,
//             "currency": "INR",
//             "name": restaurantName,
//             "description": "Order Payment",
//             "image": window.location.origin + FAV_ICON,
//             "order_id": `${payment?.payment_order_id}`,
//             "handler": function (response) {
//                 checkOut(response)
//             },
//             "prefill": {
//                 "name": payment.name,
//                 "contact": payment.phone
//             },
//             "theme": {
//                 "color": "#3399cc"
//             },
//             "modal": {
//                 "ondismiss": function () {
//                     setBtnLoading(false)
//                 }
//             }
//         };
//         var rzp1 = new Razorpay(options);

//         rzp1.on('payment.failed', function (response) {
//             setBtnLoading(false)
//             console.log(response)
//         });

//         rzp1.open()
//     }

//     const PhonePePayment = () => {
//         const optionss = {
//             method: 'post',
//             url: payment['url'],
//             headers: {
//                 accept: 'application/json',
//                 "X-VERIFY": payment['x-verify']
//             },
//             data: {
//                 request: payment['request'],
//             }
//         };

//         axios
//             .request(optionss)
//             .then(function (response) {
//                 console.log(response.data);

//                 if (response.data.success) {
//                     console.log(response.data.data.instrumentResponse.redirectInfo.url)
//                     location.href = response.data.data.instrumentResponse.redirectInfo.url;
//                 }
//             })
//             .catch(function (error) {
//                 console.error(error);
//             });
//     }

//     const makePayment = () => {
//         if (payment.gateWay == "RazorPay") RazorPayPayment();
//         else if (payment.gateWay == "PhonePe") PhonePePayment();
//     }

//     return (

//         <>
//             {isLoading ? <PageLoader /> : (
//                 <div>
//                     <NavLink to='/' className="text-xs font-medium inline-flex mb-3 items-center gap-1 text-primary px-1"><RiArrowGoBackFill /><span>Back to Menus</span></NavLink>

//                     <div className='text-center flex justify-between px-2'>
//                         <span><b>CheckOut </b></span>
//                         <span><b>#{order?.order_id}</b></span>
//                     </div>

//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Item</th>
//                                 <th>Price</th>
//                                 <th>Qty</th>
//                                 <th>Subtotal</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {items.map((item, i) => (
//                                 <tr key={i}>
//                                     <td className='text-[14px] font-bold'>{i + 1}</td>
//                                     <td className='text-[14px] font-bold'>{item.item_name}</td>
//                                     <td className='text-[14px] font-bold text-end'>{item.price}</td>
//                                     <td className='text-[14px] font-bold text-end'>{item.qty}</td>
//                                     <td className='text-[14px] font-bold text-end'>{item.sub_total}</td>
//                                 </tr>
//                             ))}

//                             <tr>
//                                 <th colSpan="3" className='text-end'>Sub Total: </th>
//                                 <th className='text-end'>&nbsp;{currency}{calculation?.subTotal}</th>
//                             </tr>
//                             {calculation?.taxName ? (
//                                 <tr>
//                                     <th colSpan="3" className='text-end'>Tax: </th>
//                                     <th className='text-end'>&nbsp;{currency}{calculation?.tax}</th>
//                                 </tr>
//                             ) : ''}

//                             <tr>
//                                 <th colSpan="3" className='text-end'>Payable Amount: </th>
//                                 <th className='text-end'>&nbsp;{currency}{calculation?.payableAmount}</th>
//                             </tr>

//                         </tbody>
//                     </table>



//                     <div className='mt-4'>
//                         <button className='btn btn-sm btn-dark m-auto' disabled={btnLoading} onClick={() => makePayment()}>
//                             {btnLoading ? 'Loading...' : 'Make Payment'}
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>

//     )
// }

import React from 'react'

export default function CheckOut() {
  return (
    <div>CheckOut</div>
  )
}
