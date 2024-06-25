import React, { useState, Fragment, useEffect } from 'react'
import Banner from './Banner'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { SiSteem } from "react-icons/si";
import { FiSearch } from "react-icons/fi";
import PageLoader from './PageLoader';
import { Dialog, Transition } from '@headlessui/react';
import { IoMdCloseCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import ShortPageLoader from './ShortPageLoader';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setCartItems } from '../store/themeConfigSlice';

export default function Home({ homeData }) {

    const [selectedCategory, setSelectedCategory] = useState(0);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [shortLoader, setShortLoader] = useState(false);
    useEffect(() => {
        setShortLoader(true)
        selectedCategory ? setFilteredSubCategories(homeData.subcategories.filter(category => category.id == selectedCategory)) : setFilteredSubCategories(homeData.subcategories)
        setTimeout(() => {
            setShortLoader(false)
        }, 500)

    }, [selectedCategory])

    return (
        <>
            <Banner banners={homeData.banners} />
            <div className='flex justify-between mt-2 items-center'>
                <div>
                    <button className='badge bg-success/50 me-2'>Veg</button>
                    <button className='badge bg-danger'>Non-Veg</button>
                </div>
                <div>
                    <div className="relative">
                        <input type="text" placeholder="Search items" className="bg-white form-input placeholder:tracking-wider shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)]" />
                        <button type="button" className="btn h-6 w-6 btn-dark absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full p-0 flex items-center justify-center"><FiSearch /></button>
                    </div>
                </div>
            </div>
            <div className="overflow-auto whitespace-nowrap mt-2">
                <button className={`badge ${!selectedCategory ? 'bg-black' : 'bg-black/50'} text-[14px] me-2 p-1 px-3`} onClick={() => setSelectedCategory(0)}>All</button>
                {homeData?.categories?.map((category) => (
                    <button className={`badge ${selectedCategory == category.id ? 'bg-black' : 'bg-black/50'}  text-[14px] me-2 p-1 px-3`} onClick={() => setSelectedCategory(category.id)} key={category.id}>{category.category_name}</button>
                ))}
            </div>
            <section className='mt-2'>
                {shortLoader ? <ShortPageLoader /> : <SubCategory subCategories={filteredSubCategories} items={homeData.items} />}
                {/* <div className='flex justify-between bg-primary/10 p-1 rounded shadow mb-2'>
                    <span className='flex items-center gap-1'>
                        <SiSteem color='gray' size={15} /><b>Subcategory</b>
                    </span>
                    <span><IoIosArrowDropupCircle size={24} /></span>
                </div> */}
            </section>
        </>
    )
}




const SubCategory = ({ subCategories, items }) => {
    return (
        <>
            {subCategories.map((subcategory) => (
                <div className='bg-primary/10 p-1 rounded  mb-2' key={subcategory.id}>
                    <div className='flex justify-between mb-2'>
                        <span className='flex items-center gap-1'>
                            <SiSteem color='gray' size={15} /><b>{subcategory.sub_category_name} {subcategory.id}</b>
                        </span>
                        <span><IoIosArrowDropdownCircle size={24} /></span>
                    </div>
                    <Items items={items.filter(item => item.sub_category_id == subcategory.id)} />
                </div>
            ))}
        </>

    )
}


const Items = ({ items }) => {
    const cartItems = useSelector((state: IRootState) => state.themeConfig.cartItems);
    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const dispatch=useDispatch();
    const [addedItems, setAddedItems] = useState([]);

    useEffect(() => {
        setAddedItems(cartItems.map(i => i.item_id))
    }, [cartItems])

    // console.log(selectedItem)
    // console.log("selectedItem",selectedItem?.addons?.length==0 ? 'doest not have addpns':'else has addons')

    // console.log("addedItems",addedItems)
    // console.log('itemss', items);
    const [modalItem, setModalItem] = useState({})
    const [already, setAlready] = useState(false);

    useEffect(() => {
        if (cartItems.length && cartItems.find((i) => i.item_id == selectedItem.id)) {
            const cartItem = cartItems.find((i) => i.item_id == selectedItem.id);
            setAlready(true)
            setModalItem({
                item_image: cartItem.item_image,
                item_id: cartItem.item_id,
                item_name: cartItem.item_name,
                description: cartItem.description,
                qty: cartItem.qty,
                price: cartItem.price,
                sub_total: cartItem.sub_total,
                variation: null,
                extras: null,
                addons:null,

            })
        } else setModalItem({
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
    }, [])
    useEffect(() => {
        if (already) {
            const index = cartItems.findIndex((c: any) => c.item_id == modalItem.item_id);
            let newArr = [...cartItems];

            console.log(newArr[index])
            newArr[index] = {
                ...newArr[index],
                qty: modalItem.qty,
                variation: null,
                extras: null,
                sub_total: modalItem.sub_total,
                addons:null
            };
            dispatch(setCartItems(newArr))
        }
    }, [modalItem])




    const addToCart = (item) => {
        // console.log("itemitem",item)
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
                    variation:null,
                    extras: null,
                    addons: null
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
                variation: null,
                extras: null,
                addons:null
            }]))
        }
        // setModal(false)
    }

    const calculatePrice = (action, data) => {
        let price = 0;
        console.log('action',action);
        console.log('data',data);
        console.log('price', price);

        switch (action) {
            case 'qty':
                console.log("qty change", data)
                price +=  data * selectedItem.price;
                break;

            default:
        }
        return price
    }

    const updateQty = (id: any, action: boolean) => {
        console.log('iddd',id);
        console.log('modalItem',modalItem);
        let qty = action ? modalItem.qty + 1 : modalItem.qty != 1 ? modalItem.qty - 1 : modalItem.qty;
        setModalItem({ ...modalItem, qty: qty, sub_total: calculatePrice('qty', qty) })
    }

    return (
        <>
            {items.map((item) => (
                <div className='grid grid-cols-12 mb-2 bg-white shadow rounded' key={item.id}>
                    <div className='col-span-3'>
                        <img src={window.location.origin + '/storage/' + item.item_image} className='p-2 rounded-2xl' />
                    </div>
                    <div className=' col-span-9'>
                        <h6 className='font-bold text-[18px] mt-2'>{item.item_name}</h6>
                        <p className='text-[14px] '>{item.description}  </p>
                        <div className='flex justify-between items-center me-2'>
                            <b>₹{item.price}</b>

                            {/* onClick={() => addToCart(modalItem)} */}

                           <div>
                           <button className={`badge ${addedItems.includes(item.id) ? 'bg-[#f1f2f3]' : 'bg-[#1b2e4b]'} `}  onClick={() => {
                            {
                                item.addons.length || item.extras.length || item.variations.length ? ( setModal(true), setSelectedItem(item), 'custpmisable'):( console.log(' Added'), addToCart(item),setSelectedItem(item))
                            }
                                // setSelectedItem(item)
                                // setModal(true)
                            }}>  {addedItems.includes(item.id) ?  <div className='flex gap-2 badge bg-[#f1f2f3] rounded items-center'>
                            <div onClick={() =>{{updateQty(item.id)}}} ><AiFillMinusCircle  size={20} color='black' /></div>
                            <div><b className='text-black'>1</b></div>
                            <div ><AiFillPlusCircle  onClick={() => {{updateQty(item.id)}}} size={20} color='black' /></div>
                        </div> : 'Add'}


                         </button>
                         {/* <div>
                        {
                            selectedItem?.addons?.length ||  selectedItem?.extras?.length || selectedItem?.variations?.length ? 'customisable':'not customersables'
                        }
                       </div> */}


                           </div>
                        </div>
                    </div>
                </div>
            ))}
                    <div>
                        {
                            selectedItem?.addons?.length ||  selectedItem?.extras?.length || selectedItem?.variations?.length ? 'customisable':''
                        }
                       </div>

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

                                        <SetModalItem selectedItem={selectedItem} setModal={setModal} />

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



const SetModalItem = ({ selectedItem, setModal }) => {

    // console.log(selectedItem)
    const [modalItem, setModalItem] = useState({})
    const [already, setAlready] = useState(false);
    const cartItems = useSelector((state: IRootState) => state.themeConfig.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cartItems.length && cartItems.find((i) => i.item_id == selectedItem.id)) {
            const cartItem = cartItems.find((i) => i.item_id == selectedItem.id);
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
        } else setModalItem({
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
    }, [])



    useEffect(() => {
        if (already) {
            const index = cartItems.findIndex((c: any) => c.item_id == modalItem.item_id);
            let newArr = [...cartItems];

            // console.log(newArr[index])
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
    return (
        <div className="px-2">
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

            {selectedItem?.variations?.length ? (
                <div>
                    <b className='text-[16px]'> {selectedItem.variations[0].attribute}</b>
                    <div className="overflow-auto whitespace-nowrap ">
                        {selectedItem?.variations?.map((variation) => (
                            <button
                                key={variation.id}
                                className={`badge ${modalItem?.variation?.id == variation.id ? 'bg-dark' : 'bg-black/50'} text-[14px] me-2 p-1 h-10 px-4`}
                                onClick={() => addVariation(variation)}>
                                {variation.name}<br />₹{variation.price ? variation.price : 0}
                            </button>
                        ))}
                    </div>
                </div>
            ) : ''}


            {selectedItem?.extras?.length ? (<div>
                <b className='text-[16px]'> Extras</b>
                <div className="overflow-auto whitespace-nowrap ">
                    {selectedItem?.extras?.map((extra) => (
                        <button key={extra.id} className={`badge ${modalItem?.extras?.find(e => e.id == extra.id) ? 'bg-dark' : 'bg-black/50'}  text-[14px] me-2 p-1 h-10 px-4`}
                            onClick={() => handleExtras(extra)} >
                            {extra.name} <br /> ₹{extra.price ? extra.price : 0}
                        </button>
                    ))}
                </div>
            </div>) : ''}

            {selectedItem?.addons?.length ? (<div>
                <b className='text-[16px]'> Addons</b>
                <div className="overflow-auto whitespace-nowrap ">
                    {selectedItem?.addons?.map((addon, i) => (
                        <button key={i + 1} className={`badge ${modalItem?.addons?.find(e => e.id == addon.id) ? 'bg-dark' : 'bg-black/50'}  text-[14px] me-2 p-1 h-10 px-4`}
                            onClick={() => handleAddons(addon)} >
                            {addon.item_name} - {addon.variation ? addon.variation.name : ''
                            } <br /> ₹{addon.variation ? Number(addon.variation.price) + addon.price : addon.price ? addon.price : 0}
                        </button>
                    ))}
                </div>
            </div>) : ''}

            {/* <div>
                <b className='text-[16px]'> Addons</b>
                <div className="overflow-auto whitespace-nowrap ">

                    <div className='grid grid-cols-12 w-[230px] rounded bg-[#eee] items-center'>
                        <div className='col-span-3'>
                            <img src="https://assets.winni.in/product/primary/2022/9/73530.jpeg" className='rounded' alt="" />
                        </div>
                        <div className='col-span-9 px-1 rounded p-1'>
                            <p className='text-[14px]' style={{ whiteSpace: ' pre-lin' }}> <b> Name of the Item</b></p>
                            <div className='flex gap-1 items-center justify-between'>
                                <p><b className='text-[14px]'>150000.00</b></p>
                                <div className='flex gap-1 badge bg-white/30 rounded items-center'>
                                    <div><AiFillMinusCircle size={16} color='black' /></div>
                                    <div><b className='text-black'>1</b></div>
                                    <div><AiFillPlusCircle size={16} color='black' /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="flex justify-center items-center mt-8 gap-10 mb-3">
                {already ? (<><button className='btn btn-sm btn-danger shadow' onClick={() => removeFromCart(modalItem)}>Remove</button></>) :
                    (<button type="button" onClick={() => addToCart(modalItem)} className="btn btn-sm w-full btn-dark">
                        {already ? 'Update' : 'Add'} To Cart - ₹{modalItem.sub_total}
                    </button>)}

            </div>
        </div>
    )
}
