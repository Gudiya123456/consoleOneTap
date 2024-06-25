import React, { useEffect, useState } from 'react'
import PageLoader from './PageLoader';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setCustOrderId, setCustomerToken } from '../store/themeConfigSlice';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

export default function OrderDetails() {

    const location = useLocation();
    const dispatch = useDispatch();
    const orderId = location.state.orderId;
    console.log('order idddd', orderId)
    const customerToken = useSelector((state: IRootState) => state.themeConfig.customerToken);
    const custOrderId = useSelector((state: IRootState) => state.themeConfig.custOrderId);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetchOrderDetails();
    }, [])

    const [order, setOrder] = useState({});
    const [currency, setCurrency] = useState('');
    const fetchOrderDetails = async () => {
        setIsLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + "/api/restaurant/customers/order-details/" + orderId,
                headers: { 'Content-Type': 'application/json', 'current-order': custOrderId, Authorization: `Bearer ${customerToken}` }
            });
            if (response.data.status == "success") {
                setOrder(response.data.order)
                setCurrency(response.data.currency)
            } else if (response.data.status == "error") {
                // Not Needed
                if (response.data.action == "remove-order-token") dispatch(setCustOrderId(''));
            }

        } catch (error) {
            if (error.response.status == 401) {
                dispatch(setCustomerToken(''));
            }
        } finally {
            setIsLoading(false)
        }
    }

    const [isDownloading, setIsDownloading] = useState(false);

    const downloadInvoive = async () => {
        setIsDownloading(true);
        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + "/api/restaurant/customers/download-invoice/" + orderId,
                responseType: 'blob',
                headers: { 'Content-Type': 'application/json', responseType: 'blob', Authorization: `Bearer ${customerToken}` }
            });
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(response.data);
            a.download = 'Invoice-' + orderId + '.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.log(error)
        } finally {
            setIsDownloading(false);
        }

    }

    const [isSharing, setIsSharing] = useState(false);

    const shareInvoice = async () => {
        setIsSharing(true);
        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + "/api/restaurant/customers/download-invoice/" + orderId,
                responseType: 'blob',
                headers: { 'Content-Type': 'application/json', responseType: 'blob', Authorization: `Bearer ${customerToken}` }
            });
            const blob = await response.data;
            const file = new File([blob], 'Invoice-' + orderId + '.pdf', { type: blob.type });
            shareFile(file, 'Invoice-' + orderId, "Invoice");
        } catch (error) {
            console.log(error)
        } finally {
            setIsSharing(false);
        }
    }


    const shareFile = (file, title, text) => {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator
                .share({ files: [file], title, text })
                .then(() => console.log("Share was successful."))
                .catch((error) => console.log("Sharing failed", error));
        } else {
            console.log(`Your system doesn't support sharing files.`);
        }
    };


    const [show, setShow] = useState(0);

    function changeState(id) {
        console.log('idd', id)
        if (show == id) setShow(null);
        else setShow(id)

    }

    return (



        <>

            {isLoading ? <PageLoader /> : (
                <div className='' >
                    <>
                        <b>Order Details</b>
                        <section className='panel bg-[#f7f7fc] py-2 shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] mb-2'>
                            <div className='flex justify-between'>
                                <span className='font-bold text-black/70'>Table</span>
                                <span className='font-bold badge bg-dark text-white'>{order?.table?.table_id}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-bold text-black/70'>Order Id</span>
                                <span className='font-bold text-black'>#{order?.order_id}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-bold text-black/70'>Date Time</span>
                                <span className='font-bold text-black'>{order.created_at}</span>
                            </div>
                        </section>
                        <b>Scanned Members</b>
                        <section className='panel bg-[#f7f7fc] py-2 shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] mb-2'>
                            {order?.customers?.map((customer) => (
                                <div className='flex justify-between' key={customer.id}>
                                    <span className='font-bold text-black/70'>{customer.name}</span>
                                    <span className='font-bold  text-black'>{customer.phone}</span>
                                </div>
                            ))}
                        </section>
                        <b>Order Timeline</b>

                        <section>
                            {order?.orderTimelines?.map((timeline, i) => (
                                <div className=' py-2 mb-2 '>
                                    <div className="h-full bg-white w-full shadow-[4px_6px_10px_-3px_#bfc9d4] border border-white-light dark:border-0 dark:bg-secondary-dark-light dark:shadow-none rounded-lg">
                                        <div className='bg-rose-50 rounded-lg p-1 flex justify-between'>
                                            <div>
                                                <h5 className="text-dark text-[15px] font-bold ">#{order?.orderTimelines.length - i} {timeline.is_waiter ? 'Waiter' : timeline.customer.name + '-' + timeline.customer.phone}</h5>
                                                <h5 className="text-[#d6d3d1] text-[14px] ">confirmed at {timeline.created_at}</h5>
                                            </div>
                                            <div onClick={() => { changeState(i) }}>
                                                {
                                                    show == i ? <TiArrowSortedUp size={24} /> : <TiArrowSortedDown size={24} />
                                                }
                                            </div>

                                        </div>
                                        <div>
                                            {
                                                show == i ? (
                                                    <>
                                                        {timeline?.orderItems?.map((item) => (
                                                            <>
                                                                {/* <NavLink to='#'> */}
                                                                    <div className=" px-2">
                                                                        <div className="grid grid-cols-12 ">
                                                                            <div className="col-span-7 ">
                                                                                <div className="text-dark text-[15px] font-bold   ">
                                                                                    <span>
                                                                                        <div className='flex items-center'>
                                                                                            <img className='w-3 h-3 ' src='data:image/png;base64,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' />
                                                                                            <b className='px-1'>
                                                                                                {item?.item_name}   {item.variation ? '(' + JSON.parse(item.variation).name + "-" + JSON.parse(item.variation).price + ')' : ''}

                                                                                            </b>
                                                                                        </div>


                                                                                        {item?.extras ? <span className='text-[12px]'><b>Extras </b>{JSON.parse(item?.extras).map((extra) => (<>{extra.name}- {extra.price}, </>))}</span> : ''}
                                                                                        {item?.addons ? <span className='text-[12px]'> <b>Addons </b>{JSON.parse(item?.addons).map((addon) => (<>{addon.item_name}- {addon.price}, </>))}</span> : ''}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-span-5' >
                                                                                <div className='grid grid-cols-2' >
                                                                                    <h5 className="text-dark text-[15px]">Qty: <b>{item.qty}</b></h5>
                                                                                    <h5 className="text-dark text-[15px]  ">Sub Total: <b>{currency}{item.sub_total}</b></h5>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                {/* </NavLink> */}
                                                            </>
                                                        ))}
                                                    </>
                                                ) : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                        <section className='flex justify-between panel py-2 mb-2 bg-[#f7f7fc]'>
                            <p className='font-bold text-black/60'>Total</p>
                            <b>{currency}{order?.subtotal.toFixed(2)}</b>
                        </section>
                        {order.order_status == "COMPLETED" ? (
                            <div className='flex justify-around mb-2'>
                                <NavLink to={'/invoice'} state={{ orderId: orderId }}>
                                    <button className='btn btn-sm btn-info'>View Invoive</button>
                                </NavLink>

                                <button className='btn btn-sm btn-info' disabled={isDownloading} onClick={() => downloadInvoive()}>
                                    {isDownloading ? 'Downloading...' : 'Download Invoice'}
                                </button>
                                <button className='btn btn-sm btn-info' disabled={isSharing} onClick={() => shareInvoice()}>
                                    {isSharing ? 'Loading...' : 'Share Invoice'}
                                </button>
                            </div>
                        ) : order.order_status != 'CANCELD' ? (
                            <div className='flex justify-around mb-2'>
                                <NavLink to={'/'}>
                                    <button className='btn btn-sm btn-secondary  m-auto'>Go Back</button>
                                </NavLink>
                                <NavLink to={'/checkout'} state={{ orderId: custOrderId }}>
                                    <button className='btn btn-sm btn-secondary  m-auto'>Checkout</button>
                                </NavLink>
                            </div>
                        ) : ''}

                    </>
                </div>
            )}
        </>
    )
}
