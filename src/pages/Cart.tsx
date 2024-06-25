import React, { useEffect, useState, Fragment } from 'react'
import PageLoader from './PageLoader';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import axios from 'axios';
import { setCartItems, setCustOrderId, setCustomerToken } from '../store/themeConfigSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const CrmSwal = withReactContent(Swal)
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdArrowDropright, IoMdCloseCircle } from "react-icons/io";
import { Dialog, Transition } from '@headlessui/react';
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import nonveg from '../assets/non-veg.png';
import veg from '../assets/veg.png';
export default function Cart() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const customerToken = useSelector((state: IRootState) => state.themeConfig.customerToken);
    const custOrderId = useSelector((state: IRootState) => state.themeConfig.custOrderId);
    const cartItems = useSelector((state: IRootState) => state.themeConfig.cartItems);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('cartitems', cartItems)
    }, [])

    console.log('cartitems', cartItems)


    const removeFromCart = (item) => {
        console.log("item", item)
        dispatch(setCartItems(cartItems.filter((d: any) => d.item_id !== item.item_id)));
    }
    const [btnLoading, setBtnLoading] = useState(false);

    const placeOrder = async () => {
        setBtnLoading(true)
        try {

            console.log(cartItems);
            const response = await axios({
                method: 'post',
                url: window.location.origin + "/api/restaurant/customers/place-order",
                data: { cartItems: JSON.stringify(cartItems) },
                headers: { 'Content-Type': 'application/json', 'current-order': custOrderId, Authorization: `Bearer ${customerToken}` }
            });

            if (response.data.status == "success") {
                dispatch(setCartItems([]));
                CrmSwal.fire({
                    title: "Order Placed Successfully!",
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    showCancelButton: false,
                    width: 500,
                    timer: 2000,
                    customClass: {
                        popup: "color-success"
                    }
                });
            } else if (response.data.status == "error") {
                if (response.data.action == "remove-order-token") dispatch(setCustOrderId(''));
            }


        } catch (error) {
            if (error.response.status == 401) {
                dispatch(setCustomerToken(''));
            }
        } finally {
            setBtnLoading(false)
        }

    }
    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const [addedItems, setAddedItems] = useState([]);

    useEffect(() => {
        setAddedItems(cartItems.map(i => i.item_id))
    }, [cartItems])


    const query = new URLSearchParams(location.search);
    const table = query.get('table')

    useEffect(() => {

        if (customerToken && custOrderId) getHomeData();
        else {
            setTimeout(() => {
                setIsLoading(false)
            }, 1500)
        }
    }, [custOrderId, customerToken])

    const [homeData, setHomeData] = useState([]);
    const [currency, setCurrency] = useState('');
    const getHomeData = async () => {
        setIsLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + "/api/restaurant/customers/home-data",
                headers: {
                    'Content-Type': 'application/json',
                    'current-order': custOrderId,
                    Authorization: `Bearer ${customerToken}`
                }
            });
            if (response.data.status == "success") {
                setTimeout(() => {
                    setIsLoading(false)
                    setHomeData(response.data.items);
                    setCurrency(response.data.currency)
                }, 1000)
            } else if (response.data.status == "error") {
                if (response.data.action == "remove-order-token") dispatch(setCustOrderId(''));
            }
        } catch (error) {
            if (error.response.status == 401) {
                dispatch(setCustomerToken(''));
            }
        }
    }

    console.log('homeDatahomeData', homeData);
    console.log('cartItems', cartItems);
    const [realData, setRealData] = useState({})
    const editHandler = (item) => {
        setSelectedItem(item)
        setModal(true)
        const newHomeData = homeData.filter((d: any) => d.id == item.item_id)
        console.log("select new dataa", newHomeData)
        setRealData(newHomeData[0])
        console.log("itemdd", item)
    }
    return (
        <>

            {isLoading ? <PageLoader /> : (
                <section >
                    <div>
                        <NavLink to='/' className="text-xs font-medium inline-flex mb-3 items-center gap-1 text-primary px-1"><RiArrowGoBackFill /><span>Back to Menus</span></NavLink>
                    </div>
                    {cartItems.length ? (<>
                        {cartItems.map((item, i) => (
                            <div className='bg-white p-2 rounded mb-2 ' key={i + 1}>
                                <div className='grid grid-cols-12  '>

                                    <div className='col-span-12'>
                                        <div className='flex justify-between' >
                                            <div className='flex gap-2' >
                                                {
                                                    item.item_type == 1 ? <img className='w-3 h-3 mt-1 ' src={veg} /> : <img className='w-3 h-3 mt-1 ' src={nonveg} />
                                                }
                                                <b>  {item.item_name}</b></div>

                                            <div onClick={() => removeFromCart(item)} >
                                                <MdDelete color='red' size='20' />
                                            </div>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div> <b className='ml-5' >Qty {item.qty}</b></div>
                                            <div><b>{currency}{item?.sub_total}</b></div>

                                        </div>

                                    </div>
                                </div>
                                <div className='leading-3'>
                                    {item?.variations?.length ? (
                                        <div >
                                            {item?.variations.map((variation) => (
                                                <>
                                                    <span className='text-[14px] ml-5 text-black/70 leading-3' > {variation.name},</span>
                                                </>


                                            ))}
                                        </div>
                                    ) : ''}

                                    {item?.extras?.length ? (
                                        <div >
                                            {item?.extras.map((extra) => (
                                                <>

                                                    <span className='text-[14px] ml-5 text-black/70 leading-3' > {extra.name},</span>


                                                </>


                                            ))}
                                        </div>
                                    ) : ''}


                                    {item?.addons?.length ? (
                                        <div>


                                            {item?.addons?.map((addon) => (
                                                <>

                                                    <span className='text-[14px]  ml-5 text-black/70 leading-3'>  {addon.item_name},</span>




                                                </>

                                            ))}
                                        </div>
                                    ) : ''}
                                </div>

                                <div className=' me-2'>
                                    <button className={`badge ${addedItems.includes(item.id) ? 'bg-[#ea5162] text- ' : ' border border-[#bb8b96] text-[#ea5162]  w-14 h-6'} `} onClick={() => {
                                        editHandler(item)
                                    }}>  {addedItems.includes(item.id) ? 'Update' : <div className='flex items-center  ' >Edit <IoMdArrowDropright className='' size={20} color='red' /></div>} </button>
                                </div>
                            </div>
                        ))}
                        <div className='bg-danger  rounded  p-4 bg-primary/10 shadow'>
                            <div className='flex justify-around'>
                                <div>
                                    <span>
                                        {/* <b>₹
                                            {cartItems.reduce((accumulator, currentValue) => {
                                                return (accumulator + currentValue.sub_total?currentValue?.sub_total:currentValue.sub_total.toFixed(2));
                                            }, 0)}</b> */}

                                        <b>{currency}
                                            {cartItems.reduce((accumulator, currentValue) => {
                                                return (accumulator + Number(currentValue?.sub_total));
                                            }, 0).toFixed(2)}
                                        </b>

                                    </span>
                                    <p>TOTAL</p>

                                </div>

                                <button className='btn btn-sm btn-dark w-[200px] ' disabled={btnLoading} onClick={() => placeOrder()}>
                                    {btnLoading ? 'Loading...' : 'Place Order'}
                                </button>
                            </div>

                        </div>
                    </>) : (<>

                        <div className='text-center'>
                            <div className='h-40'>
                                <img src="/restaurant/customer/no-item.png" className='rounded-3xl m-auto max-w-[400px] ' alt="" />
                            </div>
                            <div className='flex justify-around mt-4 px-10'>
                                <NavLink to={'/'}>
                                    <button className='btn btn-sm btn-dark shadow-warning' >Back to Menus</button>
                                </NavLink>
                                <NavLink to="/order-details" state={{ orderId: custOrderId }}>
                                    <button className='btn btn-sm btn-dark shadow-warning' >View Order</button>
                                </NavLink>

                            </div>
                        </div>
                    </>)}
                </section >
            )
            }


            <div className="mb-5">
                <Transition appear show={modal} as={Fragment}>
                    <Dialog as="div" open={modal} onClose={() => setModal(true)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                            <div className="flex items-start justify-center min-h-screen px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-end px-1 pt-1">
                                            <button type="button" onClick={() => setModal(false)} className="text-white-dark hover:text-dark">
                                                <IoMdCloseCircle size={24} />
                                            </button>
                                        </div>

                                        <SetModalItem selectedItem={selectedItem} setModal={setModal} realData={realData} currency={currency} />


                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>

        </>
    )
}


const SetModalItem = ({ selectedItem, setModal, realData, currency }) => {

    console.log("selectedItem", selectedItem.variation);
    const [modalItem, setModalItem] = useState({})
    const [already, setAlready] = useState(false);
    const cartItems = useSelector((state: IRootState) => state.themeConfig.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cartItems.length && cartItems.find((i) => i.item_id == selectedItem.item_id)) {

            const cartItem = cartItems.find((i) => i.item_id == selectedItem.item_id);
            setAlready(true)
            setModalItem({
                item_image: cartItem.item_image,
                item_id: cartItem.item_id,
                item_name: cartItem.item_name,
                description: cartItem.description,
                qty: cartItem.qty,
                price: cartItem.price,
                sub_total: cartItem.sub_total,
                variation: cartItem.variation,
                extras: cartItem.extras,
                addons: cartItem.addons,

            })
        } else {
            alert('hiii')
            setModalItem({

                item_image: selectedItem.item_image,
                item_id: selectedItem.id,
                item_name: selectedItem.item_name,
                description: selectedItem.description,
                qty: 1,
                price: selectedItem.price,
                sub_total: selectedItem.price,
                variation: null,
                extras: null,
                addons: null
            })
        }
    }, [])



    useEffect(() => {
        if (already) {
            const index = cartItems.findIndex((c: any) => c.item_id == modalItem.item_id);
            let newArr = [...cartItems];

            console.log(newArr[index])
            newArr[index] = {
                ...newArr[index],
                qty: modalItem.qty,
                variation: modalItem.variation,
                extras: modalItem.extras,
                sub_total: modalItem.sub_total,
                addons: modalItem.addons
            };
            dispatch(setCartItems(newArr))
        }
        console.log(modalItem)
    }, [modalItem])




    const addToCart = (item) => {


        if (cartItems.length) {
            if (cartItems.find((i) => i.item_id == item.item_id)) {
                const index = cartItems.findIndex((c: any) => c.item_id == item.item_id);
                let newArr = [...cartItems];
                newArr[index] = {
                    ...newArr[index], qty: item.qty
                };
                dispatch(setCartItems(newArr))
            } else {
                dispatch(setCartItems([...cartItems, {
                    item_id: item.item_id,
                    item_name: item.item_name,
                    item_image: item.item_image,
                    description: item.description,
                    qty: item.qty,
                    price: item.price,
                    sub_total: item.sub_total,
                    variation: item.variation,
                    extras: item.extras,
                    addons: item.addons
                }]))
            }
        } else {
            dispatch(setCartItems([{
                item_id: item.item_id,
                item_name: item.item_name,
                item_image: item.item_image,
                description: item.description,
                qty: item.qty,
                price: item.price,
                sub_total: item.sub_total,
                variation: item.variation,
                extras: item.extras,
                addons: item.addons
            }]))
        }
        setModal(false)
    }


    const calculatePrice = (action, data) => {
        let price = 0;
        if (action != 'extra') {
            if (modalItem.extras && modalItem.extras.length) price += modalItem.extras.reduce((accumulator, currentValue) => {
                return accumulator + Number(currentValue.price);
            }, 0)
        }

        if (action != 'addon') {
            if (modalItem.addons && modalItem.addons.length) price += modalItem.addons.reduce((accumulator, currentValue) => {
                if (currentValue.variation && currentValue.variation.price) {
                    return accumulator + Number(currentValue.variation.price) + Number(currentValue.price)
                } else return accumulator + Number(currentValue.price);
            }, 0)
        }

        switch (action) {
            case 'qty':
                console.log("qty change", data)
                price += modalItem?.variation?.price ? (Number(modalItem.variation.price) + selectedItem.price) * Number(data) : data * selectedItem.price
                break;
            case 'variation':
                console.log("variation change", data)
                price += (Number(selectedItem.price) + Number(data)) * Number(modalItem.qty);
                break;
            case 'extra':
                console.log("extra change", data)
                if (data && data.length) price += data.reduce((accumulator, currentValue) => {
                    return accumulator + Number(currentValue.price);
                }, 0)
                price += modalItem?.variation?.price ? (Number(modalItem.variation.price) + selectedItem.price) * Number(modalItem.qty) : modalItem.qty * selectedItem.price
                break;

            case 'addon':
                console.log("addon change", data)
                if (data && data.length) price += data.reduce((accumulator, currentValue) => {
                    if (currentValue.variation && currentValue.variation.price) {
                        return accumulator + Number(currentValue.variation.price) + Number(currentValue.price)
                    } else return accumulator + Number(currentValue.price);
                }, 0)
                price += modalItem?.variation?.price ? (Number(modalItem.variation.price) + selectedItem.price) * Number(modalItem.qty) : modalItem.qty * selectedItem.price
                break;
            default:
        }
        return price
    }

    const updateQty = (id: any, action: boolean) => {
        let qty = action ? modalItem.qty + 1 : modalItem.qty != 1 ? modalItem.qty - 1 : modalItem.qty;
        setModalItem({ ...modalItem, qty: qty, sub_total: calculatePrice('qty', qty) })
    }



    const removeFromCart = (item) => {
        dispatch(setCartItems(cartItems.filter((d: any) => d.item_id !== item.item_id)));
        setAlready(null)
        setModalItem({ ...selectedItem, qty: 1 })
        setModal(false)
    }

    const addVariation = (variation) => {
        setModalItem({
            ...modalItem, variation: variation,
            sub_total: calculatePrice('variation', variation.price)
        })
    }
    const handleExtras = (extra) => {
        let extras = [];
        if (modalItem.extras) {
            const a = modalItem?.extras?.map(extra => extra.id);
            if (a.includes(extra.id)) {
                extras = modalItem?.extras?.filter((e) => extra.id != e.id);
                setModalItem({ ...modalItem, extras: extras.length ? extras : null, sub_total: calculatePrice('extra', extras) })
            } else {
                extras = [...modalItem.extras, extra];
                setModalItem({ ...modalItem, extras: extras, sub_total: calculatePrice('extra', extras) })
            }
        } else {
            extras = [extra];
            setModalItem({ ...modalItem, extras: extras, sub_total: calculatePrice('extra', extras) })
        }
    }


    const handleAddons = (addon) => {
        let addons = [];
        if (modalItem.addons) {
            const a = modalItem?.addons?.map(addon => addon.id);
            if (a.includes(addon.id)) {
                addons = modalItem?.addons?.filter((e) => addon.id != e.id)
                setModalItem({ ...modalItem, addons: addons.length ? addons : null, sub_total: calculatePrice('addon', addons) })
            } else {
                addons = [...modalItem.addons, addon]
                setModalItem({ ...modalItem, addons: addons, sub_total: calculatePrice('addon', addons) })
            }
        } else {
            addons = [addon]
            setModalItem({ ...modalItem, addons, sub_total: calculatePrice('addon', addons) })
        }
    }


    const [homeData, setHomeData] = useState([]);
    const customerToken = useSelector((state: IRootState) => state.themeConfig.customerToken);
    const custOrderId = useSelector((state: IRootState) => state.themeConfig.custOrderId);
    const [isLoading, setIsLoading] = useState(false);
    console.log('dddjjjgjgjf', homeData)
    useEffect(() => {
        getHomeData()
    }, [])
    const getHomeData = async () => {
        setIsLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + "/api/restaurant/customers/home-data",
                headers: {
                    'Content-Type': 'application/json',
                    'current-order': custOrderId,
                    Authorization: `Bearer ${customerToken}`
                }
            });
            if (response.data.status == "success") {
                setTimeout(() => {
                    setIsLoading(false)
                    setHomeData(response.data.items);
                }, 1000)
            } else if (response.data.status == "error") {
                if (response.data.action == "remove-order-token") dispatch(setCustOrderId(''));
            }
        } catch (error) {
            if (error.response.status == 401) {
                dispatch(setCustomerToken(''));
            }
        }
    }
    console.log('hommmm', homeData)
    const [hero, setHero] = useState([])


    console.log('hero', hero)

    return (
        <div className="px-2 mb-4">
            <div className='grid grid-cols-12'>
                <div className='col-span-3'>
                    <img src={window.location.origin + '/storage/' + modalItem.item_image} className='p-2 rounded-2xl' alt="" />
                </div>

                <div className='col-span-9  mt-2'>
                    <h2 className='font-bold text-[16px]'>{modalItem.item_name}</h2>
                    <p className='text-[12px] font-bold '>{modalItem.description}</p>
                </div>
            </div>

            <div className='flex justify-between px-2 items-center'>
                <div><b>₹{modalItem.sub_total}</b></div>
                <div className='flex gap-2 items-center'>
                    <div>
                        <b className='text-[16px]'> Quantity: </b></div>
                    <div className='flex gap-2 badge bg-[#f1f2f3] rounded items-center'>
                        <div onClick={() => updateQty(modalItem.id, false)}><AiFillMinusCircle size={20} color='black' /></div>
                        <div><b className='text-black'>{modalItem.qty}</b></div>
                        <div onClick={() => updateQty(modalItem.id, true)}><AiFillPlusCircle size={20} color='black' /></div>
                    </div>
                </div>
            </div>
            {/* <h1>kkk</h1> */}
            {realData?.variations?.length ? (
                <div>
                    <b className='text-[16px]'> {realData.variations[0].attribute}</b>
                    <div className="overflow-auto whitespace-nowrap ">
                        {realData?.variations?.map((variation) => (
                            <button
                                key={variation.id}
                                className={`badge ${modalItem?.variation?.id == variation.id ? 'bg-[#dceaff] text-black border border-[#5594ff] ' : 'bg-[#f7f7fc] text-black'} text-[14px] me-2 p-1 h-10 px-4`}
                                onClick={() => addVariation(variation)}>
                                {variation.name}<br />{variation.price ? variation.price : 0}
                            </button>
                        ))}
                    </div>
                </div>
            ) : ''}


            {realData?.extras?.length ? (<div>
                <b className='text-[16px]'> Extras</b>
                <div className="overflow-auto whitespace-nowrap ">
                    {realData?.extras?.map((extra) => (
                        <button key={extra.id} className={`badge ${modalItem?.extras?.find(e => e.id == extra.id) ? 'bg-[#dceaff] text-black border border-[#5594ff]' : 'text-black border border-[#edeef5]'}  text-[14px] me-2 p-1 h-10 px-4`}
                            onClick={() => handleExtras(extra)} >
                            {extra.name} <br /> ₹{extra.price ? extra.price : 0}
                        </button>
                    ))}
                </div>
            </div>) : ''}


            {realData?.addons?.length ? (<div>
                <b className='text-[16px]'> Addons</b>
                <div className="overflow-auto whitespace-nowrap p-0 m-0 ">
                    {realData?.addons?.map((addon, i) => (
                        <button key={i + 1} className={` ${modalItem?.addons?.find(e => e.id == addon.id) ? 'bg-[#dceaff] text-black border border-[#5594ff] ' : 'text-black border border-[#edeef5]'}  text-[14px] me-2 `}
                            onClick={() => handleAddons(addon)} >
                            <div className='flex gap-2'>
                                <div className='col-span-4' >
                                    <img src={window.location.origin + '/storage/' + addon.item_image} className='w-20 h-11 p-0 m-0 object-cover' alt="" />

                                    {/* <img className='w-20  h-10 p-0 m-0 object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJkZM79sNZ6cXInWRlsMnUW6tqZWeveXNvOQ&s" alt="" /> */}
                                </div>
                                <div className='col-span-8' >
                                    {addon.item_name} - {addon.variation ? addon.variation.name : ''
                                    } <br /> ₹{addon.variation ? Number(addon.variation.price) + addon.price : addon.price ? addon.price : 0}
                                    <br />
                                    ${modalItem?.addons?.find(e => e.id == addon.id) ? addon.id : addon.id}
                                </div>
                            </div>

                        </button>
                    ))}
                </div>
            </div>) : ''}


        </div>
    )
}






