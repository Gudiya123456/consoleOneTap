import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import PageLoader from './PageLoader';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import axios from 'axios';
import { setCustomerToken } from '../store/themeConfigSlice';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { MdAccessTime } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { FcMoneyTransfer } from "react-icons/fc";
import { TbClockHour5 } from "react-icons/tb";


export default function MyOrders() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const customerToken = useSelector((state: IRootState) => state.themeConfig.customerToken);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        if (customerToken) fetchMyOrders();
        else navigate('/')
    }, [customerToken])


    const [orders, setOrders] = useState([]);
    const fetchMyOrders = async () => {
        setIsloading(true);
        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + "/api/restaurant/customers/my-orders",
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${customerToken}` }
            });
            console.log('myorders', response.data);

            if (response.data.status == "success") setOrders(response.data.orders)

        } catch (error) {
            if (error.response.status == 401) {
                dispatch(setCustomerToken(''));
            }
        } finally {
            setIsloading(false);
        }
    }
    return (

        <>
            <div className='panel' >
                {isLoading ? <PageLoader /> : (

                    <>
                        <div className='flex gap-5' >
                            <NavLink to='/' className="text-xs font-medium inline-flex  items-center gap-1 text-primary px-1"><RiArrowGoBackFill /><span>Back to Menus</span></NavLink>
                            <div className='text-center font-bold' >
                                My Orders
                            </div>
                        </div>


                        <section>
                            {orders?.map((order) => (
                                <div className='panel p-2 rounded-xl border border-grey  shadow-none py-1 mb-2' key={order.id}>
                                    <NavLink to={`${order.order_status == 'COMPLETED' ? '/invoice' : '/order-details'}`} state={{ orderId: order.order_id }}>
                                        <div className=' flex justify-between'>
                                            <span> <b className='text-[12px] '>Table Id{order.table_name}</b></span>
                                            <span className='flex items-center gap-1' > <MdAccessTime size={16} /><b className='text-[12px] '>{order.created_at}</b></span>
                                        </div>
                                        <div className='flex justify-between font-bold text-[12px] items-center '>


                                            <span className='text-[14px]'>#{order.order_id}</span>
                                            <span className={`badge ${order.order_status == "COMPLETED" ? 'white text-green-600' :
                                                order.order_status == "PENDING" ? ' text-warning' :
                                                    order.order_status == "CANCELD" ? 'bg-danger' :
                                                        order.order_status == "ONGOING" ? 'bg-WARNING' : ''
                                                } p-0 px-1`}>{order.order_status == 'PENDING' ? <div className='flex items-center gap-1'><TbClockHour5 />Pending</div> : order.order_status == 'COMPLETED' ? <div className='flex items-center gap-1'><FcApproval />Completed</div> : 'jiii'}</span>
                                        </div>

                                        {order.order_status == "COMPLETED" ? (<div className=' text-[12px] font-bold '>

                                            <div className=' flex justify-between  p-1  text-center'>
                                                <div className='flex items-center gap-1' >
                                                    <HiOutlineCurrencyRupee color='blue' size={20} />
                                                    <div>
                                                        <p>Sub Total</p>
                                                        <p>{order.currency}{order.sub_total}</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-1' >
                                                    <FcMoneyTransfer color='grey' size={20} />
                                                    <div>
                                                        <p>Tax</p>
                                                        <p>{order.currency}{order.tax}</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-1' >
                                                    <HiOutlineCurrencyRupee color='blue' size={20} />
                                                    <div>
                                                        <p>Total</p>
                                                        <p>{order.currency}{order.payable_amount}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        ) : ('')}

                                    </NavLink>
                                </div>
                            ))}

                        </section>
                    </>

                )}

            </div>
        </>

    )
}
