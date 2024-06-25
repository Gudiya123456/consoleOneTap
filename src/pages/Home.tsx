import React, { useState, Fragment, useEffect, useRef } from 'react'
import Banner from './Banner'
import { SiSteem } from "react-icons/si";
import { FiSearch } from "react-icons/fi";
import PageLoader from './PageLoader';
import { Dialog, Transition } from '@headlessui/react';
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import ShortPageLoader from './ShortPageLoader';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setCartItems } from '../store/themeConfigSlice';
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import nonveg from '../assets/non-veg.png';
import veg from '../assets/veg.png';
import { Rating } from 'react-simple-star-rating'
import { RiErrorWarningFill } from "react-icons/ri";
import { MdNoFood } from "react-icons/md";

export default function Home({ homeData }) {
    // console.log('home', homeData);

    const [selectedCategory, setSelectedCategory] = useState(0);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [shortLoader, setShortLoader] = useState(false);
    const currency = homeData.currency;
    const [categories, setCategories] = useState(homeData.categories);

    useEffect(() => {
        setShortLoader(true)

        setupSubcategories()

        setTimeout(() => {
            setShortLoader(false)
        }, 500)

    }, [selectedCategory])

    const setupSubcategories = () => {

        if (selectedCategory) {
            setFilteredSubCategories(homeData.subcategories.filter(category => category.category_id == selectedCategory))
        } else {
            setFilteredSubCategories(homeData.subcategories)
        }
    }

    const [wantVeg, setWantVeg] = useState(true);
    const [wantNonVeg, setWantNonVeg] = useState(true);



    const [items, setItems] = useState(homeData.items)
    useEffect(() => {
        if (wantVeg && !wantNonVeg) setItems(homeData.items.filter((i) => i.item_type == 1))
        else if (!wantVeg && wantNonVeg) setItems(homeData.items.filter((i) => i.item_type == 0))
        else setItems(homeData.items)
    }, [wantVeg, wantNonVeg])



    const [inputValue, setInputValue] = useState('');
    const [modal, setModal] = useState(false);

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        // You can perform any action here with the new input value
        console.log('Input value:', newValue);
        setModal(true);
    };
    const ref = useRef<SheetRef>();

    return (
        <div className=''>
            <>
                <Banner banners={homeData.banners} />



                {/* <SearchItem searchData={homeData.items} /> */}


                <div className='flex justify-between  items-center mx-3'>
                    <div className='flex justify-between mt-2 items-center'>
                        <button className={`badge ${wantVeg ? 'bg-success/50 border' : 'bg-dark'} flex items-center gap-2 me-2`} onClick={() => setWantVeg(!wantVeg)}>
                            <img className='w-3 h-3' src={veg} alt="" />
                            <span> Veg</span>
                        </button>
                        <button className={`badge ${wantNonVeg ? 'bg-danger' : 'bg-[#1b2e4b]'} flex items-center gap-2 me-2`} onClick={() => setWantNonVeg(!wantNonVeg)}>
                            <img className='w-3 h-3' src={nonveg} alt="" />
                            <span> Non-Veg</span>
                        </button>
                    </div>
                </div>




                <div className="overflow-auto whitespace-nowrap  mx-3" style={{ scrollbarColor: 'white white' }}>
                    <button className={`badge ${!selectedCategory ? 'bg-black' : 'bg-black/50'} text-[14px] me-2 p-1 px-3`} onClick={() => setSelectedCategory(0)}>All</button>

                    {categories?.map((category) => (
                        <button className={`badge ${selectedCategory == category.id ? 'bg-black' : 'bg-black/50'} text-[14px] me-2 p-1 px-3`} onClick={() => setSelectedCategory(category.id)} key={category.id}>{category.category_name}</button>
                    ))}
                </div>

                <section className='mt-2 '>
                    {shortLoader ? <ShortPageLoader /> : <SubCategory subCategories={filteredSubCategories} items={items} currency={currency} />}
                </section>


            </>
        </div>
    )
}




const SubCategory = ({ subCategories, items, currency }) => {
    const [show, setShow] = useState(0);

    function changeState(id) {
        if (show == id) setShow(null);
        else setShow(id)
    }
    return (
        <>

            {subCategories.map((subcategory, index) => (
                <div className={`bg-white p-1 rounded mb-2`} key={subcategory.id}>
                    <div className='flex justify-between mt-2 mb-2' onClick={() => { changeState(index) }}>
                        <span className='flex items-center gap-1'>
                            <SiSteem color='gray' size={15} /><b>{subcategory.sub_category_name} </b>
                        </span>
                        <span  >
                            {show == index ? <TiArrowSortedUp size={24} /> : <TiArrowSortedDown size={24} />}
                        </span>
                    </div>
                    {show == index ? (<Items items={items.filter(item => item.sub_category_id == subcategory.id)} currency={currency} />) : ''}
                </div>
            ))}
        </>

    )
}

import Sheet, { SheetRef } from 'react-modal-sheet';

import { motion, AnimatePresence } from "framer-motion"
import SearchItem from './SearchItem';

const Items = ({ items, currency }) => {
    // console.log('items',items);
    // console.log('currency',currency);

    const ref = useRef<SheetRef>();
    const cartItems = useSelector((state: IRootState) => state.themeConfig.cartItems);
    const [selectedItem, setSelectedItem] = useState('');
    const [addedItems, setAddedItems] = useState([]);
    const [modal, setModal] = useState(false);
    const [cautionModal, setCautionModal] = useState([false, {}])
    const bottomSheetRef = useRef(null);
    const [isOpen, setIsOpen] = useState(null);
    useEffect(() => {
        setAddedItems(cartItems.map(i => i.item_id))
    }, [cartItems])


    const paragraphStyle = {
        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box', fontFamily: "Rubik, sans-serif", fontSize: "0.65rem"
    }
    return (
        <>
            {items.length ? (
                items.map((item) => (
                    <div className=' my-3' key={item.id} >
                        <div className='grid grid-cols-12 mb-2 gap-1 rounded' >
                            <div className=' col-span-3'>
                                <img src={item.item_image ? window.location.origin + '/storage/' + item.item_image : '/default/no-image.png'} className='p-1 h-20 rounded-2xl overflow-hidden object-cover' />
                            </div>
                            <div className=' p-2 col-span-9'>
                                <div className='flex gap-1 items-center' >
                                    {item.item_type == 1 ? <img className='w-3 h-3 ' src={veg} /> : <img className='w-3 h-3 ' src={nonveg} />}
                                    {
                                        item?.label ? (
                                            <span className='px-1.5 rounded' style={{ background: item.label.background }}>
                                                <h6 className='text-white text-[10px] tracking-[.15em] ' style={{ lineHeight: 2, color: item.label.color }} >{item.label.label}</h6>
                                            </span>
                                        ) : ''
                                    }


                                </div>
                                <div className='flex gap-1'>
                                    <h6 className='font-bold text-[15px] text-[#30363e] '>{item.item_name}</h6>
                                    {/* <RiErrorWarningFill className='mt-1' onClick={()=>{setCautionModal([true,item])}} color='grey' size={15} /> */}

                                </div>

                                {
                                    item?.rating ? (
                                        <div>
                                            <Rating
                                                size={13}
                                                SVGstyle={{ 'display': 'inline' }}
                                                initialValue={item.rating.rating}
                                                readonly={true}

                                            />
                                            <span className='text-[10px] mt-2 px-1' > {item.rating.count} ratings</span>
                                        </div>
                                    ) : ''
                                }


                                <div className='flex ' >
                                    <p style={isOpen == item.id ? { fontFamily: "Rubik, sans-serif", fontSize: "0.65rem" } : paragraphStyle} className='text-[14px] text-[#7d8086] leading-3'>
                                        {item.description}
                                    </p>
                                </div>
                                {
                                    item?.description?.length > 20 ?
                                        <p className='text-[14px] text-black/99 leading-3' onClick={() => {
                                            setIsOpen((e) => {
                                                if (e == item.id) return null;
                                                else return item.id
                                            })
                                        }} >{isOpen == item.id ? 'read less...' : 'read more'}</p> : ''

                                }
                                <div className='flex justify-between items-center me-2'>
                                    <p className='font-semibold text-[15px] text-[#30363e]'>{currency}{item.price}</p>
                                    <button className={`badge ${addedItems.includes(item.id) ? 'bg-[#ea5162]' : 'bg-[#fff6f7] border border-[#bb8b96] text-[#ea5162] w-14 h-6'} `} onClick={() => {
                                        setSelectedItem(item)
                                        setModal(true)
                                    }}> {addedItems.includes(item.id) ? 'Added' : 'Add +'} </button>
                                </div>

                            </div>

                        </div>
                        <hr className='border-dotted border-b-2 border-[#e5e7eb]' />
                        {/* for caution  */}
                        <Transition appear show={cautionModal[0]} as={Fragment}>
                            <Dialog as="div" open={cautionModal[0]} onClose={() => setCautionModal([false, {}])}>
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
                                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                                    <div className="font-bold text-lg">{cautionModal[1].item_name}</div>

                                                    <div onClick={() => { setCautionModal([false, {}]) }}>
                                                        x
                                                    </div>
                                                </div>
                                                <div className="p-5">

                                                    <h1>{cautionModal[1].caution} </h1>


                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>


                ))
            ) : (<>
                <div className='flex gap-2 bg-danger-light p-2mx-6 rounded-2xl justify-center items-center w-40 m-auto h-8 font-black mb-1'>
                    <span><MdNoFood /></span>
                    <span>No Item Found!</span>
                </div>
            </>)}
            <div>

                <motion.div

                    animate={
                        modal ? { opacity: 0.6, zIndex: 3 } : { opacity: 0, display: 'none' }
                    }
                    initial={{ opacity: 0 }}
                    className='fixed top-0 buttom-0 left-0 h-full w-screen bg-black'

                />

                <AnimatePresence initial={false} >

                    {
                        modal && (
                            <motion.div

                                key='content'
                                initial='collapsed'
                                animate='open'
                                exit='collapsed'
                                variants={{
                                    open: { y: 0, height: 'auto' },
                                    collapsed: { y: '100%', height: 0 },
                                }}
                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                className='border-gray-50 fixed bottom-0 right-0 left-0 z-10 w-full bg-transparent shadown-[0px_ -8px_20px_ -6px_rgba(0,0,0.3)'

                            >
                                <div ref={bottomSheetRef} className=' '>
                                    <div>
                                        <div className=' items-center flex justify-center' onClick={() => { setModal(false) }} >
                                            <div className=' bg-red-400 text-white rounded-full p-2 mantine-Checkbox-body mb-2' >
                                                X
                                            </div>

                                        </div>
                                    </div>
                                    <div className=' flex bg-white rounded-t-3xl border-2 border-b-0 flex-col space-y-3'>
                                        <SetModalItem selectedItem={selectedItem} setModal={setModal} currency={currency} />


                                    </div>

                                </div>

                            </motion.div>
                        )
                    }

                </AnimatePresence>

            </div>
        </>
    )
}
const SetModalItem = ({ selectedItem, setModal, currency }) => {
    // console.log('selectedItem',selectedItem);
    // console.log('setModal', setModal);
    // console.log('currency',currency);

    const [modalItem, setModalItem] = useState({})
    const [already, setAlready] = useState(false);
    const cartItems = useSelector((state: IRootState) => state.themeConfig.cartItems);
    const dispatch = useDispatch();

    console.log('cartItems', cartItems);
    console.log('modal itemsss', modalItem);

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
                item_type: cartItem.item_type

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
            addons: null,
            item_type: selectedItem.item_type
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
                variation: modalItem.variation,
                extras: modalItem.extras,
                sub_total: modalItem.sub_total,
                addons: modalItem.addons,
                item_type: modalItem.item_type

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
                    addons: item.addons,
                    item_type: item.item_type,


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
                addons: item.addons,
                item_type: item.item_type,
            }]))
        }
        setModal(false)
    }


    const calculatePrice = (action, data) => {
        console.log('action', action);
        console.log('data', data);
        let price = 0;

        if (action != 'extra') {
            if (modalItem.extras && modalItem.extras.length) price += modalItem.extras.reduce((accumulator, currentValue) => {
                console.log('currentValue', currentValue);
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
                price += modalItem?.variation?.price ? (Number(modalItem.variation.price) + Number(selectedItem.price)) * Number(data) : data * selectedItem.price
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
                price += modalItem?.variation?.price ? (Number(modalItem.variation.price) + Number(selectedItem.price)) * Number(modalItem.qty) : modalItem.qty * selectedItem.price
                break;

            case 'addon':
                console.log("addon change", data)
                if (data && data.length) price += data.reduce((accumulator, currentValue) => {
                    if (currentValue.variation && currentValue.variation.price) {
                        return accumulator + Number(currentValue.variation.price) + Number(currentValue.price)
                    } else return accumulator + Number(currentValue.price);
                }, 0)
                price += modalItem?.variation?.price ? (Number(modalItem.variation.price) + Number(selectedItem.price)) * Number(modalItem.qty) : modalItem.qty * selectedItem.price
                break;
            default:
        }
        return price
    }

    const updateQty = (id: any, action: boolean) => {
        let qty = action ? modalItem.qty + 1 : modalItem.qty != 1 ? modalItem.qty - 1 : modalItem.qty;
        setModalItem({ ...modalItem, qty: qty, sub_total: calculatePrice('qty', qty).toFixed(2) })
    }




    const removeFromCart = (item) => {
        dispatch(setCartItems(cartItems.filter((d: any) => d.item_id !== item.item_id)));
        setAlready(null)
        setModalItem({ ...selectedItem, qty: 1 })
        setModal(false)
    }

    const addVariation = (variation) => {
        console.log('variation', variation);
        console.log('modalss', modalItem);
        setModalItem({
            ...modalItem, variation: variation,
            sub_total: calculatePrice('variation', variation.price).toFixed(2)
        })
    }


    const handleExtras = (extra) => {
        let extras = [];
        if (modalItem.extras) {
            const a = modalItem?.extras?.map(extra => extra.id);
            if (a.includes(extra.id)) {
                extras = modalItem?.extras?.filter((e) => extra.id != e.id);
                setModalItem({ ...modalItem, extras: extras.length ? extras : null, sub_total: calculatePrice('extra', extras).toFixed(2) })
            } else {
                extras = [...modalItem.extras, extra];
                setModalItem({ ...modalItem, extras: extras, sub_total: calculatePrice('extra', extras).toFixed(2) })
            }
        } else {
            extras = [extra];
            setModalItem({ ...modalItem, extras: extras, sub_total: calculatePrice('extra', extras).toFixed(2) })
        }
    }


    const handleAddons = (addon) => {
        let addons = [];
        if (modalItem.addons) {
            const a = modalItem?.addons?.map(addon => addon.id);
            if (a.includes(addon.id)) {
                addons = modalItem?.addons?.filter((e) => addon.id != e.id)
                setModalItem({ ...modalItem, addons: addons.length ? addons : null, sub_total: calculatePrice('addon', addons).toFixed(2) })
            } else {
                addons = [...modalItem.addons, addon]
                setModalItem({ ...modalItem, addons: addons, sub_total: calculatePrice('addon', addons).toFixed(2) })
            }
        } else {
            addons = [addon]
            setModalItem({ ...modalItem, addons, sub_total: calculatePrice('addon', addons).toFixed(2) })
        }
    }
    return (
        <div className="px-2">
            <div className='grid grid-cols-12'>
                <div className='col-span-3 mt-1'>
                    <img src={window.location.origin + '/storage/' + modalItem.item_image} className='p-2 rounded-2xl' alt="" />
                </div>

                <div className='col-span-9 mt-2'>
                    <h2 className='font-bold text-[16px]'>{modalItem.item_name}</h2>
                    <p className='text-[12px] font-bold '>{modalItem.description}</p>
                </div>
            </div>

            <div className='flex justify-between px-2 items-center'>
                <div><b>{currency}{modalItem.sub_total}</b></div>
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
                                className={`badge ${modalItem?.variation?.id == variation.id ? 'bg-[#dceaff] text-black border border-[#5594ff] ' : 'bg-[#f7f7fc] text-black'} text-[14px] me-2 p-1 h-10 px-4`}
                                onClick={() => addVariation(variation)}>
                                {variation.name}<br />{variation.price ? variation.price : 0}
                            </button>
                        ))}
                    </div>
                </div>
            ) : ''}


            {selectedItem?.extras?.length ? (<div>
                <b className='text-[16px]'> Extras</b>
                <div className="overflow-auto whitespace-nowrap ">
                    {selectedItem?.extras?.map((extra) => (
                        <button key={extra.id} className={`badge ${modalItem?.extras?.find(e => e.id == extra.id) ? 'bg-[#dceaff] text-black border border-[#5594ff]' : 'text-black border border-[#edeef5]'} text-[14px] me-2 p-1 h-10 px-4`}
                            onClick={() => handleExtras(extra)} >
                            {extra.name} <br />{extra.price ? extra.price : 0}
                        </button>
                    ))}
                </div>
            </div>) : ''}


            {selectedItem?.addons?.length ? (<div>
                <b className='text-[16px]'> Addons </b>
                <div className="overflow-auto whitespace-nowrap p-0 m-0 ">
                    {selectedItem?.addons?.map((addon, i) => (
                        <button key={i + 1} className={` ${modalItem?.addons?.find(e => e.id == addon.id) ? 'bg-[#dceaff] text-black border border-[#5594ff] ' : 'text-black border border-[#edeef5]'} text-[14px] me-2 `}
                            onClick={() => handleAddons(addon)} >
                            <div className='flex gap-2'>
                                <div className='col-span-4' >
                                    <img src={window.location.origin + '/storage/' + addon.item_image} className='w-20 h-10 p-0 m-0 object-cover' alt="" />
                                    {/* <img className='w-20 h-10 p-0 m-0 object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJkZM79sNZ6cXInWRlsMnUW6tqZWeveXNvOQ&s" alt="" /> */}
                                </div>
                                <div className='col-span-8' >
                                    {addon.item_name} - {addon.variation ? addon.variation.name : ''
                                    } <br />{addon.variation ? (Number(addon.variation.price) + Number(addon.price)).toFixed(2) : addon.price ? addon.price : 0}
                                </div>
                            </div>


                        </button>
                    ))}
                </div>
            </div>) : ''}

            <div className="flex justify-center items-center mt-8 gap-10 mb-3">
                {already ? (<><button className='btn btn-sm btn-danger shadow' onClick={() => removeFromCart(modalItem)}>Remove</button></>) :
                    (<button type="button" onClick={() => addToCart(modalItem)} className="btn btn-sm w-full btn-dark">
                        {already ? 'Update' : 'Add'} To Cart - {currency}{modalItem.sub_total}
                    </button>)}

            </div>
        </div>
    )
}

