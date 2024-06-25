import React, { useEffect, useState } from 'react'
import PageLoader from './PageLoader';
import axios from 'axios';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';

export default function Invoice() {

    const location = useLocation();
    const dispatch = useDispatch();
    const orderId = location.state?.orderId;
    const customerToken = useSelector((state: IRootState) => state.themeConfig.customerToken);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchInvoiceData()
    }, [])

    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [invoice, setInvoice] = useState({});
    const [currency, setCurrency] = useState('');
    console.log('invoice invoice invoice', invoice);

    const fetchInvoiceData = async () => {
        setIsLoading(true)
        try {

            const response = await axios({
                method: 'get',
                url: window.location.origin + "/api/restaurant/customers/view-invoice/" + orderId,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${customerToken}` }
            });

            if (response.data.status == "success") {
                setOrder(response.data.order)
                setOrderItems(response.data.orderItems)
                setInvoice(response.data.invoice)
                setCurrency(response.data.currency)
            }

        } catch (error) {

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

    return (
        <>
            {isLoading ? <PageLoader /> : (
                <>
                    <div className='grid grid-cols-12 gap-2'>



                        <div className='panel col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12'>
                            <div className='grid grid-cols-1 gap-2'>
                                <h1 className='text-center text-lg' >{invoice.company_name}</h1>
                                <div className='text-center ' >
                                    <p className='text-[12px] font-bold'>{invoice.header_line_1}
                                        <br /> {invoice.header_line_2}
                                        <br /> {invoice.header_line_3}
                                        <br /> {invoice.company_tax_code}

                                    </p>
                                </div>
                                <hr />

                                <div className=''>
                                    <div className='flex justify-between font-bold' >
                                        <h1>Order ID</h1>
                                        <h1>{order?.order_id}</h1>
                                    </div>
                                    <div className='flex justify-between font-bold text-xs'>
                                        <h6>Date Time</h6>
                                        <h6>{order.created_at}</h6>
                                    </div>
                                    <div className='flex justify-between font-light text-xs'>
                                        <p>Type</p>
                                        <p>Dine In</p>
                                    </div>
                                    <div className='flex justify-between font-light text-xs'>
                                        <p>Table Id</p>
                                        <p>Table 1</p>
                                    </div>
                                    <div className='flex justify-between font-light text-xs'>
                                        <p>Waiter Id</p>
                                        <p>{order.user_id ? order.user_id : '-'}</p>
                                    </div>
                                    <div className='flex mb-2 justify-between font-light text-xs'>
                                        <p>Client Id</p>
                                        <p>{order.payment_customer_id}</p>
                                    </div>
                                    <hr />

                                    <table>
                                        <tbody className='text-left'>
                                            <tr className='border-b-2 border-black border-dotted'>
                                                <th>#</th>
                                                <th>Item</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Sub Total </th>
                                            </tr>
                                        </tbody>
                                        <tbody>

                                            {orderItems?.map((item, index = 0) => (
                                                <>
                                                    <tr className='border-b-2 border-black border-dotted'>
                                                        <td>{index + 1}</td>
                                                        <td className='font-bold text-[12px]'>{item.item_name} {item.variation ? JSON.parse(item.variation).name : ''}</td>
                                                        <td className='text-xs'> {item.variation ? Number(JSON.parse(item.variation).price) + Number(item.price) : item.price}</td>
                                                        <td className='text-xs'>{item.qty}</td>
                                                        <td className='text-xs'>{item.variation ? (Number(JSON.parse(item.variation).price) + Number(item.price)) * item.qty : item.price * item.qty}</td>
                                                    </tr>

                                                    {item.addons ?
                                                        JSON.parse(item.addons).map((item, i) => (
                                                            <tr className='border-b-2 border-black border-dotted'>
                                                                <td>{index + 2 + i}</td>
                                                                <td className='text-xs' >{item.item_name} {item.variation ? item.variation.name : ''}</td>
                                                                <td className='text-xs'> {item.variation ? Number(item.variation.price) + Number(item.price) : item.price}</td>
                                                                <td>1</td>
                                                                <td className='text-xs'>{item.variation ? (Number(item.variation.price) + Number(item.price)) * 1 : item.price * 1}</td>
                                                            </tr>
                                                        ))
                                                        : ''}

                                                    {item.extras ?
                                                        JSON.parse(item.extras).map((item, i) => (
                                                            <tr className='border-b-2 border-black border-dotted'>
                                                                <td>{index + 3 + i}</td>
                                                                <td className='text-xs'>{item.name} </td>
                                                                <td className='text-xs'> {item.price}</td>
                                                                <td className='text-xs'>1</td>
                                                                <td className='text-xs'>{item.price * 1}</td>
                                                            </tr>
                                                        ))
                                                        : ''}


                                                </>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className='mt-1'>
                                        <div className='flex justify-between font-bold text-xs'>
                                            <h6>Gross Amount</h6>
                                            <h6>{currency}{order.sub_total}</h6>
                                        </div>
                                        {/* <div className='flex justify-between font-bold text-xs'>
                    <h6>Total Amount</h6>
                    <h6>2700</h6>
                </div> */}
                                    </div>
                                    <hr />

                                    {/* <div className='flex mt-1 justify-between font-light text-xs'>
                <p>Service Charge @ 10%</p>
                <p>₹487.50</p>
            </div>
            <div className='flex mt-1 justify-between font-light text-xs'>
                <p>Convenience Fee @ 0%</p>
                <p>₹0.00</p>
            </div>

            <hr /> */}

                                    {invoice.is_tax ? (<>
                                        <div className='flex mt-1 justify-between font-light text-xs'>
                                            <p>{invoice.tax_name} @ {invoice.tax_value}%</p>
                                            <p>{currency}{order.tax}</p>
                                        </div>

                                        {/* <div className='flex justify-between font-light text-xs'>
                <p>SGST @ 2.5%</p>
                <p>₹121.75</p>
            </div> */}

                                        <div className='flex justify-between font-bold text-xs'>
                                            <h6>Tax Total</h6>
                                            <h6>{currency}{order.tax}</h6>
                                        </div>
                                        <hr />
                                    </>) : ''}



                                    {/* <div className='flex mt-1 justify-between font-light text-xs'>
                <p> Round off</p>
                <p>₹00.00</p>
            </div>
            <hr /> */}
                                    <div className='flex mt-1 justify-between font-bold text-xs'>
                                        <h6>Net Amount To Pay</h6>
                                        <h6>{currency}{order.payable_amount}</h6>
                                    </div>

                                    {invoice.is_feedback_qr ? (
                                        <div className='mb-2'>
                                            <p>Leave feedback at</p>
                                            <img className='-ml-4' src="data:image/png;base64,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" alt="" />
                                        </div>
                                    ) : ''}


                                    <div className='text-center'>
                                        {invoice.footer_thanks ? (<h1>{invoice.footer_thanks}</h1>) : ''}
                                        {invoice.footer_note ? (<p className='text-[10px]'>{invoice.footer_note}</p>) : ''}
                                    </div>




                                </div>



                            </div>
                        </div>


                    </div>
                    <div className='flex justify-between gap-2 p-2'>
                        <NavLink to='/'>
                            <button className='btn btn-sm btn-dark p-1' >Back to Home</button>
                        </NavLink>

                        <button className='btn btn-sm btn-secondary p-1' disabled={isSharing} onClick={() => shareInvoice()}>
                            {isSharing ? 'Loading...' : 'Share Invoice'}
                        </button>
                        <button className='btn btn-sm btn-info p-1' disabled={isDownloading} onClick={() => downloadInvoive()}>
                            {isDownloading ? 'Downloading...' : 'Download Invoice'}
                        </button>

                    </div>
                </>
            )}
        </>
    )
}
