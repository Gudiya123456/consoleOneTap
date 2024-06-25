import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    Keyboard,
  } from 'react-native';
  import React, { useRef, useState } from 'react';
  import { useNavigation } from '@react-navigation/native';
  import { EvilIcons } from "@expo/vector-icons";
  const Search = ({ items }) => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const data = items;
    const [searchData, setSearchData] = useState([]);
    const [searched, setSearched] = useState(true);
    const searchRef = useRef();


    const onSearch = search => {
      if (search !== '') {
        let tempData = data.filter(item => {
          return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
        setSearchData(tempData);
      } else {
        setSearchData([]);
      }
      setSearched(true)
    };

    const searchContinue = (s) => {
      Keyboard.dismiss();
      if (!searchData.length) return false;
      setSearched(false)
      setSearchData([])
      setSearch('')

      navigation.navigate('SearchedProduct', { search: s })
    }

    return (
      <ScrollView  keyboardShouldPersistTaps={'handled'}>
        <View
          style={{
            elevation: 1,
            height: 'auto',
            alignSelf: 'center',
            width: '90%',
            backgroundColor: '#fff',
            borderRadius: 10,
            alignContent: 'center',
          }}>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="Search.."
              value={search}
              ref={searchRef}
              onChangeText={txt => {
                onSearch(txt);
                setSearch(txt);
              }}
              style={{
                width: '85%',
                height: 50,
                alignSelf: 'center',
                paddingLeft: 20,
              }}
            />
            <TouchableOpacity style={{ padding: 15 }} onPress={() => {
              searchContinue(search)
            }}>
              <Text> <EvilIcons name="search" size={24} color="black" /></Text>
            </TouchableOpacity>
          </View>


          {searchData.length ? (
            <FlatList
              data={searchData}
              style={{ width: '100%', marginTop: 0 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      height: 40,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      searchContinue(item.name)
                    }}>
                    <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : searched && search ? (<View style={{ height: 50, justifyContent: "center" }}>
            <Text style={{ fontSize: 16, justifyContent: 'center', textAlign: 'center' }}>No data found!</Text>
          </View>) : null}
        </View>
      </ScrollView>
    );
  };

  export default Search;

// import React, { useEffect, useState, Fragment } from 'react'
// import PageLoader from './PageLoader';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { IRootState } from '../store';
// import axios from 'axios';
// import { setCartItems, setCustOrderId, setCustomerToken } from '../store/themeConfigSlice';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// const CrmSwal = withReactContent(Swal)
// import { AiFillMinusCircle } from "react-icons/ai";
// import { AiFillPlusCircle } from "react-icons/ai";
// import { IoMdArrowDropright, IoMdCloseCircle } from "react-icons/io";
// import { Dialog, Transition } from '@headlessui/react';
// import { RiArrowGoBackFill } from "react-icons/ri";
// import { MdDelete } from "react-icons/md";
// import nonveg from '../assets/non-veg.png';
// import veg from '../assets/veg.png';
// export default function Cart() {

//     const navigate = useNavigate()
//     const dispatch = useDispatch();
//     const customerToken = useSelector((state: IRootState) => state.themeConfig.customerToken);
//     const custOrderId = useSelector((state: IRootState) => state.themeConfig.custOrderId);
//     const cartItems = useSelector((state: IRootState) => state.themeConfig.cartItems);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         console.log('cartitems', cartItems)
//     }, [])

//     console.log('cartitems', cartItems)


//     const removeFromCart = (item) => {
//         console.log(item)
//         dispatch(setCartItems(cartItems.filter((d: any) => d.item_id !== item.item_id)));
//     }
//     const [btnLoading, setBtnLoading] = useState(false);

//     const placeOrder = async () => {
//         setBtnLoading(true)
//         try {

//             const response = await axios({
//                 method: 'post',
//                 url: window.location.origin + "/api/restaurant/customers/place-order",
//                 data: { cartItems: JSON.stringify(cartItems) },
//                 headers: { 'Content-Type': 'application/json', 'current-order': custOrderId, Authorization: `Bearer ${customerToken}` }
//             });

//             if (response.data.status == "success") {
//                 dispatch(setCartItems([]));
//                 CrmSwal.fire({
//                     title: "Order Placed Successfully!",
//                     toast: true,
//                     position: 'top',
//                     showConfirmButton: false,
//                     showCancelButton: false,
//                     width: 500,
//                     timer: 2000,
//                     customClass: {
//                         popup: "color-success"
//                     }
//                 });
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
//     const [modal, setModal] = useState(false);
//     const [selectedItem, setSelectedItem] = useState('');

//     const [addedItems, setAddedItems] = useState([]);

//     useEffect(() => {
//         setAddedItems(cartItems.map(i => i.item_id))
//     }, [cartItems])

//     const updateQty = (item: any, action: boolean) => {

//         let qty = action ? item.qty + 1 : item.qty != 1 ? item.qty - 1 : item.qty;
//         console.log('item',qty)
//        const index=cartItems.findIndex(i=>i.item_id==item.item_id)
//         const newArray=[...cartItems]
//         newArray[index]={... newArray[index], qty:qty, sub_total:Number(newArray[index].sub_total)*qty , newTotal:Number(newArray[index].price)*qty}
//         dispatch(setCartItems(newArray));
//        console.log('index',index);
//     }


//     const query = new URLSearchParams(location.search);
//     const table = query.get('table')

//     useEffect(() => {

//      if (customerToken && custOrderId) getHomeData();
//         else {
//             setTimeout(() => {
//                 setIsLoading(false)
//             }, 1500)
//         }
//     }, [custOrderId, customerToken])

//     const [homeData, setHomeData] = useState([]);
//     const getHomeData = async () => {
//         setIsLoading(true)
//         try {
//             const response = await axios({
//                 method: 'get',
//                 url: window.location.origin + "/api/restaurant/customers/home-data",
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'current-order': custOrderId,
//                     Authorization: `Bearer ${customerToken}`
//                 }
//             });
//             if (response.data.status == "success") {
//                 setTimeout(() => {
//                     setIsLoading(false)
//                     setHomeData(response.data.items);
//                 }, 1000)
//             } else if (response.data.status == "error") {
//                 if (response.data.action == "remove-order-token") dispatch(setCustOrderId(''));
//             }
//         } catch (error) {
//             if (error.response.status == 401) {
//                 dispatch(setCustomerToken(''));
//             }
//         }
//     }
//     console.log('homeDatahomeData',homeData);
//     console.log('cartItems',cartItems);
//     const[realData,setRealData]=useState({})
//     const editHandler=(item)=>{
//         setSelectedItem(item)
//         setModal(true)
//         const newHomeData= homeData.filter((d: any) => d.id == item.item_id)
//         console.log("select new dataa",newHomeData)
//         setRealData(newHomeData[0])
//         // setrealData(newHomeData[0])
//         console.log(item)
//     }
//     return (
//         <>

//             {isLoading ? <PageLoader /> : (
//                 <section >
//                     <div>
//                         <NavLink to='/' className="text-xs font-medium inline-flex mb-3 items-center gap-1 text-primary px-1"><RiArrowGoBackFill /><span>Back to Menus</span></NavLink>
//                     </div>
//                     {cartItems.length ? (<>
//                         {cartItems.map((item, i) => (
//                             <div className='bg-white p-2 rounded mb-2' key={i + 1}>
//                                 <div className='grid grid-cols-12  '>

//                                     <div className='col-span-12'>
//                                         <div className='flex justify-between' >
//                                             <div className='flex gap-2' >
//                                                 {
//                                                     item.item_type==1?  <img className='w-3 h-3 mt-1 ' src={veg} />:  <img className='w-3 h-3 mt-1 ' src={nonveg} />
//                                                 }
//                                                 {/* <img className='w-3 h-3 mt-1' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACUCAMAAACtIJvYAAAAkFBMVEX9/f0BfwEAfwD////39vcAeAAAegAAcQD4//nv++/S5dKv0q/B3sEYgBjQ5tGFuIXh8uEbfht1sHVElkQZhxlPlE/m8uY8jzwohigOfg4igCKdxJ6lyKWWxJavz68AbACPwo+/1r91qnRQnFCQupBpp2mMu4xgomExiDFHkkfv9e9YnVg+jD641LjH38c2kDf6pK9GAAAFL0lEQVR4nO2ciXLiOBCGLfWqZXPFQMIRQzLjcGRgCO//dmslZBdmkNySmhmnyn9SSbkA669Pso5Wi+SfJir52wauqnLVaZqMq1Rjs/ScGVdKyEZJf7iSQlS/jZCx8ulKinm/GZqLM1bq26AR6iz1GSvdhWaop89YVa6SJqhydcnqbxt6V8uKrgtWzXTV1qBTLSu6WlZ0tazoalnR1Y44dH2BGmxZOdWyoqtlRRc/q2qNyeGKh9XnqjfNsiz9vIhwxcCqMpB1vhej8b3SRup+PFp+72ShxhhYGUuH8qGvlEIhTz9YXd0/lN0wY9GjM8Dk8KI1CiGluPiRQqDW48PE31dkDQLkq6lCezBOopqucl9fUTUI0BlVlOR/cH5hdfqHetTx8xXDCrKVMAHCumiilEqsMq87B7OCpDdX4gqca5cCRS/xuHcoK8jW2iO4K4VaT+g3D2MF8PYTf8XjYGUucPpGbV1hrAAKdDx4FqEqiLaCWEGyUdd5uFiZvnWT0goIYAVpqcO2C6Rek2wFsKpMqatdVD2rqo8oKbb8WQGsA0l90NoSbPmzgpWSTh7u16RakVz5jc6w1LUlu1/T3+oL8axBGKjg2vuUHtSW4leDkE/tgwyRlRCveV0xfqxgG49KCLWtd+XBCg7agYfKilCODyuYvDKQMnp1j9RerGBTvYeDlVR3da7IrGAS0X1eSmonLB9WMFJuBGRW1bRmVOOKygo6QyZSRn1Xp+XB6jTU8LCSauN2RRxxYCdEbWFkV9Uc0NGy6DUIXc1YgcJdFrkG4QcFAZmVFD8YWEH+yIpKiEf7aEhmBU8oWVlJXLhcEdtVicyssLSWRWUFuyMytysx21lLI7KCXHFnQUltbVhkVl1NREBm5SqNyuqOY7p3KWUdC8msHpCdFVp7LDKrGTuqqrnbwg5EVpA+khHQ3/hoC7URR2fIhzdwNbQ9hMQaNK741e9E1uCgfwNWc9vMj8qqcsUvl6svzKozvEHabTSrZj6DGfecz8jVX5FYVX07P6uZLexHHnHGN2B1jB6d1zcYna0BIzKrgnfdZaSX0awGN5j1vZFYOeft94LZlRDR8/Yk3bKvcfbWyDt9PVgo5vWgI/BOXzu/zZnHnLm1WXmwSn8yt6upfevEIybDvMpxhUY9YjJmncrIyr5G9YvWrjmfQtw6SvKJQB6QMQKJB2oEsiZam+75YOGDa5vQK7Lde2Zj9VxTksf+IOyRyRW+sO1N8PWkEu096MmVz57XRrGwqtnG8dwfhLTP0eBxbp0thLCq6pDKw/laj3cv1cxJY5uW1LW79L6ZAwB7Fcmqev4IrvyyLCAb++ftnJPCcX2CWECWRT7HCFY4r9ugD2FlbM3CH0Sc2WJWcaxMKETULw4tS8A5xVRYVhjk06C2JXFKqL4kMCssgclYB7DSY2JqX2BuLcAGvV3h5rZ5fcZWF712dqTCLjmVNSJfdFIiklkhlvTEzJjcWoCn40fKaB2z6sbHJ5+c38g85OUULV3qeceJ0+Wfy0M2H8+Ko8mPdmBCfSy8kpCTSFbm87DrvQzx9wfy9NjhcH/YeSe4x59QAIB8Uc60ek+8/18Cle6XizzkMADLaQ6AdDdY7vtDhYjK/EE17O+Xg10SdnCC6+TL+5GSbNB7WhRFsXjqDbKYQyasp4Quvvgh6kbtiSqy2nOpdH2BGmxZOdWyoqtlRVfLiq52xKHrC9Rgy8qplhVdLSu6fmPVDF2wwv1dM7RVZ6zevyqgCcKLb6ekx6jDItsenzKu/gVY5Z0orZRceAAAAABJRU5ErkJggg==" alt="" /> */}
//                                                 <b>  {item.item_name}</b></div>
//                                             {/* <div className='flex gap-2 badge bg-[#f1f2f3] rounded items-center'>
//                                                 <div onClick={() => updateQty(item,false)}><AiFillMinusCircle size={20} color='black' /></div>
//                                                 <div><b className='text-black'>{item.qty}</b></div>
//                                                 <div onClick={() => updateQty(item,true)}><AiFillPlusCircle size={20} color='black' /></div>
//                                             </div> */}
//                                              {/* <button className='btn btn-sm btn-danger shadow'>Remove</button> */}
//                                              <div onClick={() => removeFromCart(item)} >
//                                                 <MdDelete color='red' size='20' />
//                                              </div>
//                                         </div>
//                                         <div className='flex justify-between'>
//                                             <div> <b>Qty {item.qty}</b></div>
//                                             <div><b>₹{item.price}</b></div>

//                                         </div>

//                                     </div>
//                                 </div>

//                                 {item?.extras?.length ? (
//                                     <div >
//                                         <p className='text-[14px] '><b>Extras: </b></p>
//                                         {item?.extras.map((extra) => (
//                                             <>
//                                                 <div className='grid grid-cols-12  '>

//                                                     <div className='col-span-12'>
//                                                         <div className='flex justify-between' >
//                                                             <div className='flex gap-2' >
//                                                                 <img className='w-3 h-3 mt-1' src="data:image/png;base64,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" alt="" />
//                                                                 <b>  {extra.name}</b></div>
//                                                                 <div>
//                                                 <MdDelete color='red' size='20' />
//                                              </div>
//                                                                 {/* <button className='btn btn-sm btn-danger shadow'>Remove</button> */}
//                                                             {/* <div className='flex gap-2 badge bg-[#f1f2f3] rounded items-center'>
//                                                                 <div onClick={() => updateQty(item.id, false)}><AiFillMinusCircle size={20} color='black' /></div>
//                                                                 <div><b className='text-black'>{item.qty}</b></div>
//                                                                 <div onClick={() => updateQty(item.id, true)}><AiFillPlusCircle size={20} color='black' /></div>
//                                                             </div> */}
//                                                         </div>
//                                                         <div className='flex justify-between'>
//                                                             <div><b>₹{extra.price}</b></div>
//                                                             <div><b>₹{extra.price * item.qty}</b></div>

//                                                         </div>

//                                                     </div>
//                                                 </div>

//                                             </>


//                                         ))}
//                                     </div>
//                                 ) : ''}


//                                 {item?.addons?.length ? (
//                                     <div>
//                                         <p className='text-[14px] px-2'><b>Addons</b></p>

//                                         {item?.addons?.map((addon) => (
//                                             <>
//                                                 <div className='grid grid-cols-12  '>

//                                                     <div className='col-span-12'>
//                                                         <div className='flex justify-between' >
//                                                             <div className='flex gap-2' >
//                                                                 <img className='w-3 h-3 mt-1' src="data:image/png;base64,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" alt="" />
//                                                                 <b>  {addon.item_name}</b></div>
//                                                             {/* <div className='flex gap-2 badge bg-[#f1f2f3] rounded items-center'>
//                                                                 <div onClick={() => updateQty(item.id, false)}><AiFillMinusCircle size={20} color='black' /></div>
//                                                                 <div><b className='text-black'>{item.qty}</b></div>
//                                                                 <div onClick={() => updateQty(item.id, true)}><AiFillPlusCircle size={20} color='black' /></div>
//                                                             </div> */}
//                                                             {/* <button className='btn btn-sm btn-danger shadow'>Remove</button> */}
//                                                             <div>
//                                                 <MdDelete color='red' size='20' />
//                                              </div>
//                                                         </div>
//                                                         <div className='flex justify-between'>
//                                                             <div><b>₹{addon.price}</b></div>
//                                                             <div><b>₹{addon.price * item.qty}</b></div>

//                                                         </div>

//                                                     </div>
//                                                 </div>
//                                             </>

//                                         ))}
//                                     </div>
//                                 ) : ''}

//                                 <div className=' me-2'>
//                                 <button className={`badge ${addedItems.includes(item.id) ? 'bg-[#ea5162]' : 'bg-[#fff6f7] border border-[#bb8b96] text-[#ea5162]  w-14 h-6'} `} onClick={() => {
//                                     editHandler(item)
//                                 }}>  {addedItems.includes(item.id) ? 'Update' : <div className='flex items-center  ' >Edit <IoMdArrowDropright className='' size={20} color='red' /></div>} </button>
//                             </div>
//                             </div>
//                         ))}
//                         {/* style={{position:'fixed',  bottom: '1.5rem'}} */}
//                         <div className='bg-danger  rounded  p-4 bg-primary/10 shadow'>
//                             <div className='flex justify-around'>
//                                 <div>
//                                     <span>
//                                         <b>₹
//                                         {cartItems.reduce((accumulator, currentValue) => {
//                                         return accumulator + currentValue.sub_total ;
//                                     }, 0)}</b>

//                                     </span>
//                                     <p>TOTAL</p>

//                                 </div>

//                                 <button className='btn btn-sm btn-dark w-[200px] ' disabled={btnLoading} onClick={() => placeOrder()}>
//                                     {btnLoading ? 'Loading...' : 'Place Order'}
//                                 </button>
//                             </div>

//                         </div>
//                     </>) : (<>

//                         <div className='text-center'>
//                             <div className='h-40'>
//                                 <img src="/restaurant/customer/no-item.png" className='rounded-3xl m-auto max-w-[400px] ' alt="" />
//                             </div>
//                             <div className='flex justify-around mt-4 px-10'>
//                                 <NavLink to={'/'}>
//                                     <button className='btn btn-sm btn-dark shadow-warning' >Back to Menus</button>
//                                 </NavLink>
//                                 <NavLink to="/order-details" state={{ orderId: custOrderId }}>
//                                     <button className='btn btn-sm btn-dark shadow-warning' >View Order</button>
//                                 </NavLink>

//                             </div>
//                         </div>
//                     </>)}
//                 </section >
//             )
//             }


//             <div className="mb-5">
//                 <Transition appear show={modal} as={Fragment}>
//                     <Dialog as="div" open={modal} onClose={() => setModal(true)}>
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0"
//                             enterTo="opacity-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100"
//                             leaveTo="opacity-0"
//                         >
//                             <div className="fixed inset-0" />
//                         </Transition.Child>
//                         <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
//                             <div className="flex items-start justify-center min-h-screen px-4">
//                                 <Transition.Child
//                                     as={Fragment}
//                                     enter="ease-out duration-300"
//                                     enterFrom="opacity-0 scale-95"
//                                     enterTo="opacity-100 scale-100"
//                                     leave="ease-in duration-200"
//                                     leaveFrom="opacity-100 scale-100"
//                                     leaveTo="opacity-0 scale-95"
//                                 >
//                                     <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
//                                         <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-end px-1 pt-1">
//                                             <button type="button" onClick={() => setModal(false)} className="text-white-dark hover:text-dark">
//                                                 <IoMdCloseCircle size={24} />
//                                             </button>
//                                         </div>

//                                         <SetModalItem selectedItem={selectedItem} setModal={setModal} realData={realData}/>


//                                     </Dialog.Panel>
//                                 </Transition.Child>
//                             </div>
//                         </div>
//                     </Dialog>
//                 </Transition>
//             </div>

//         </>
//     )
// }


// const SetModalItem = ({ selectedItem, setModal,realData }) => {

//     console.log("selectedItem",selectedItem.variation);
//     const [modalItem, setModalItem] = useState({})
//     const [already, setAlready] = useState(false);
//     const cartItems = useSelector((state: IRootState) => state.themeConfig.cartItems);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (cartItems.length && cartItems.find((i) => i.item_id == selectedItem.item_id)) {

//             const cartItem = cartItems.find((i) => i.item_id == selectedItem.item_id);
//             setAlready(true)
//             setModalItem({
//                 item_image: cartItem.item_image,
//                 item_id: cartItem.item_id,
//                 item_name: cartItem.item_name,
//                 description: cartItem.description,
//                 qty: cartItem.qty,
//                 price: cartItem.price,
//                 sub_total: cartItem.sub_total,
//                 variation: cartItem.variation,
//                 extras: cartItem.extras,
//                 addons: cartItem.addons,

//             })
//         } else {
//             alert('hiii')
//             setModalItem({

//                 item_image: selectedItem.item_image,
//                 item_id: selectedItem.id,
//                 item_name: selectedItem.item_name,
//                 description: selectedItem.description,
//                 qty: 1,
//                 price: selectedItem.price,
//                 sub_total: selectedItem.price,
//                 variation: null,
//                 extras: null,
//                 addons: null
//             })
//         }
//     }, [])



//     useEffect(() => {
//         if (already) {
//             const index = cartItems.findIndex((c: any) => c.item_id == modalItem.item_id);
//             let newArr = [...cartItems];

//             console.log(newArr[index])
//             newArr[index] = {
//                 ...newArr[index],
//                 qty: modalItem.qty,
//                 variation: modalItem.variation,
//                 extras: modalItem.extras,
//                 sub_total: modalItem.sub_total,
//                 addons: modalItem.addons
//             };
//             dispatch(setCartItems(newArr))
//         }
//         console.log(modalItem)
//     }, [modalItem])




//     const addToCart = (item) => {


//         if (cartItems.length) {
//             if (cartItems.find((i) => i.item_id == item.item_id)) {
//                 const index = cartItems.findIndex((c: any) => c.item_id == item.item_id);
//                 let newArr = [...cartItems];
//                 newArr[index] = {
//                     ...newArr[index], qty: item.qty
//                 };
//                 dispatch(setCartItems(newArr))
//             } else {
//                 dispatch(setCartItems([...cartItems, {
//                     item_id: item.item_id,
//                     item_name: item.item_name,
//                     item_image: item.item_image,
//                     description: item.description,
//                     qty: item.qty,
//                     price: item.price,
//                     sub_total: item.sub_total,
//                     variation: item.variation,
//                     extras: item.extras,
//                     addons: item.addons
//                 }]))
//             }
//         } else {
//             dispatch(setCartItems([{
//                 item_id: item.item_id,
//                 item_name: item.item_name,
//                 item_image: item.item_image,
//                 description: item.description,
//                 qty: item.qty,
//                 price: item.price,
//                 sub_total: item.sub_total,
//                 variation: item.variation,
//                 extras: item.extras,
//                 addons: item.addons
//             }]))
//         }
//         setModal(false)
//     }


//     const calculatePrice = (action, data) => {
//         let price = 0;
//         if (action != 'extra') {
//             if (modalItem.extras && modalItem.extras.length) price += modalItem.extras.reduce((accumulator, currentValue) => {
//                 return accumulator + Number(currentValue.price);
//             }, 0)
//         }

//         if (action != 'addon') {
//             if (modalItem.addons && modalItem.addons.length) price += modalItem.addons.reduce((accumulator, currentValue) => {
//                 if (currentValue.variation && currentValue.variation.price) {
//                     return accumulator + Number(currentValue.variation.price) + Number(currentValue.price)
//                 } else return accumulator + Number(currentValue.price);
//             }, 0)
//         }

//         switch (action) {
//             case 'qty':
//                 console.log("qty change", data)
//                 price += modalItem?.variation?.price ? (Number(modalItem.variation.price) + selectedItem.price) * Number(data) : data * selectedItem.price
//                 break;
//             case 'variation':
//                 console.log("variation change", data)
//                 price += (Number(selectedItem.price) + Number(data)) * Number(modalItem.qty);
//                 break;
//             case 'extra':
//                 console.log("extra change", data)
//                 if (data && data.length) price += data.reduce((accumulator, currentValue) => {
//                     return accumulator + Number(currentValue.price);
//                 }, 0)
//                 price += modalItem?.variation?.price ? (Number(modalItem.variation.price) + selectedItem.price) * Number(modalItem.qty) : modalItem.qty * selectedItem.price
//                 break;

//             case 'addon':
//                 console.log("addon change", data)
//                 if (data && data.length) price += data.reduce((accumulator, currentValue) => {
//                     if (currentValue.variation && currentValue.variation.price) {
//                         return accumulator + Number(currentValue.variation.price) + Number(currentValue.price)
//                     } else return accumulator + Number(currentValue.price);
//                 }, 0)
//                 price += modalItem?.variation?.price ? (Number(modalItem.variation.price) + selectedItem.price) * Number(modalItem.qty) : modalItem.qty * selectedItem.price
//                 break;
//             default:
//         }
//         return price
//     }

//     const updateQty = (id: any, action: boolean) => {
//         let qty = action ? modalItem.qty + 1 : modalItem.qty != 1 ? modalItem.qty - 1 : modalItem.qty;
//         setModalItem({ ...modalItem, qty: qty, sub_total: calculatePrice('qty', qty) })
//     }



//     const removeFromCart = (item) => {
//         dispatch(setCartItems(cartItems.filter((d: any) => d.item_id !== item.item_id)));
//         setAlready(null)
//         setModalItem({ ...selectedItem, qty: 1 })
//         setModal(false)
//     }

//     const addVariation = (variation) => {
//         setModalItem({
//             ...modalItem, variation: variation,
//             sub_total: calculatePrice('variation', variation.price)
//         })
//     }
//     const handleExtras = (extra) => {
//         let extras = [];
//         if (modalItem.extras) {
//             const a = modalItem?.extras?.map(extra => extra.id);
//             if (a.includes(extra.id)) {
//                 extras = modalItem?.extras?.filter((e) => extra.id != e.id);
//                 setModalItem({ ...modalItem, extras: extras.length ? extras : null, sub_total: calculatePrice('extra', extras) })
//             } else {
//                 extras = [...modalItem.extras, extra];
//                 setModalItem({ ...modalItem, extras: extras, sub_total: calculatePrice('extra', extras) })
//             }
//         } else {
//             extras = [extra];
//             setModalItem({ ...modalItem, extras: extras, sub_total: calculatePrice('extra', extras) })
//         }
//     }


//     const handleAddons = (addon) => {
//         let addons = [];
//         if (modalItem.addons) {
//             const a = modalItem?.addons?.map(addon => addon.id);
//             if (a.includes(addon.id)) {
//                 addons = modalItem?.addons?.filter((e) => addon.id != e.id)
//                 setModalItem({ ...modalItem, addons: addons.length ? addons : null, sub_total: calculatePrice('addon', addons) })
//             } else {
//                 addons = [...modalItem.addons, addon]
//                 setModalItem({ ...modalItem, addons: addons, sub_total: calculatePrice('addon', addons) })
//             }
//         } else {
//             addons = [addon]
//             setModalItem({ ...modalItem, addons, sub_total: calculatePrice('addon', addons) })
//         }
//     }


//     const [homeData, setHomeData] = useState([]);
//     const customerToken = useSelector((state: IRootState) => state.themeConfig.customerToken);
//     const custOrderId = useSelector((state: IRootState) => state.themeConfig.custOrderId);
//     const [isLoading, setIsLoading] = useState(false);
//     useEffect(()=>{
//         getHomeData()
//     },[])
//     const getHomeData = async () => {
//         setIsLoading(true)
//         try {
//             const response = await axios({
//                 method: 'get',
//                 url: window.location.origin + "/api/restaurant/customers/home-data",
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'current-order': custOrderId,
//                     Authorization: `Bearer ${customerToken}`
//                 }
//             });
//             if (response.data.status == "success") {
//                 setTimeout(() => {
//                     setIsLoading(false)
//                     setHomeData(response.data.items);
//                 }, 1000)
//             } else if (response.data.status == "error") {
//                 if (response.data.action == "remove-order-token") dispatch(setCustOrderId(''));
//             }
//         } catch (error) {
//             if (error.response.status == 401) {
//                 dispatch(setCustomerToken(''));
//             }
//         }
//     }
//     console.log('hommmm', homeData)
//     const[hero,setHero]=useState([])

//     //    const index=cartItems.findIndex(i=>i.item_id==item.item_id)
//     //    const hello=( )=>{
//     //    console.log('jjjjj')
//     //    console.log('selectedItemssssfdggfhy',selectedItem)
//     //    console.log('homeData',homeData)


//     //    const newHomeData= homeData.filter((d: any) => d.id == selectedItem.item_id)
//     //    console.log("select new dataa",newHomeData)
//     //    setHero(newHomeData[0])
//     //    console.log('jjjjj')

//     // }
//     console.log('hero',hero)

//     return (
//         <div className="px-2">
//             <div className='grid grid-cols-12'>
//                 <div className='col-span-3'>
//                     <img src={window.location.origin + '/storage/' + modalItem.item_image} className='p-2 rounded-2xl' alt="" />
//                 </div>

//                 <div className='col-span-9  mt-2'>
//                     <h2 className='font-bold text-[16px]'>{modalItem.item_name}</h2>
//                     <h2 className='font-bold text-[16px]'>{realData.item_name}</h2>
//                     <p className='text-[12px] font-bold '>{modalItem.description}</p>
//                 </div>
//             </div>

//             <div className='flex justify-between px-2 items-center'>
//                 <div><b>₹{modalItem.sub_total}</b></div>
//                 <div className='flex gap-2 items-center'>
//                     <div>
//                         <b className='text-[16px]'> Quantity: </b></div>
//                     <div className='flex gap-2 badge bg-[#f1f2f3] rounded items-center'>
//                         <div onClick={() => updateQty(modalItem.id, false)}><AiFillMinusCircle size={20} color='black' /></div>
//                         <div><b className='text-black'>{modalItem.qty}</b></div>
//                         <div onClick={() => updateQty(modalItem.id, true)}><AiFillPlusCircle size={20} color='black' /></div>
//                     </div>
//                 </div>
//             </div>
//             {/* <h1>kkk</h1> */}
//             {realData?.variations?.length ? (
//                 <div>
//                     <b className='text-[16px]'> {realData.variations[0].attribute}</b>
//                     <div className="overflow-auto whitespace-nowrap ">
//                         {realData?.variations?.map((variation) => (
//                             <button
//                                 key={variation.id}
//                                 className={`badge ${modalItem?.variation?.id == variation.id ? 'bg-[#dceaff] text-black border border-[#5594ff] ' : 'bg-[#f7f7fc] text-black'} text-[14px] me-2 p-1 h-10 px-4`}
//                                 onClick={() => addVariation(variation)}>
//                                 {variation.name}<br />₹{variation.price ? variation.price : 0}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             ) : ''}


//                {realData?.extras?.length ? (<div>
//                 <b className='text-[16px]'> Extras</b>
//                 <div className="overflow-auto whitespace-nowrap ">
//                     {realData?.extras?.map((extra) => (
//                         <button key={extra.id} className={`badge ${modalItem?.extras?.find(e => e.id == extra.id) ? 'bg-[#dceaff] text-black border border-[#5594ff]' : 'text-black border border-[#edeef5]'}  text-[14px] me-2 p-1 h-10 px-4`}
//                             onClick={() => handleExtras(extra)} >
//                             {extra.name} <br /> ₹{extra.price ? extra.price : 0}
//                         </button>
//                     ))}
//                 </div>
//             </div>) : ''}


//             {realData?.addons?.length ? (<div>
//                 <b className='text-[16px]'> Addons</b>
//                 <div className="overflow-auto whitespace-nowrap p-0 m-0 ">
//                     {realData?.addons?.map((addon, i) => (
//                         <button key={i + 1} className={` ${modalItem?.addons?.find(e => e.id == addon.id) ? 'bg-[#dceaff] text-black border border-[#5594ff] ' : 'text-black border border-[#edeef5]'}  text-[14px] me-2 `}
//                             onClick={() => handleAddons(addon)} >
//                             <div className='flex gap-2'>
//                                 <div className='col-span-4' >
//                                     <img className='w-20  h-10 p-0 m-0 object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJkZM79sNZ6cXInWRlsMnUW6tqZWeveXNvOQ&s" alt="" />
//                                 </div>
//                                 <div className='col-span-8' >
//                                     {addon.item_name} - {addon.variation ? addon.variation.name : ''
//                                     } <br /> ₹{addon.variation ? Number(addon.variation.price) + addon.price : addon.price ? addon.price : 0}
//                                     <br />
//                                     ${modalItem?.addons?.find(e => e.id == addon.id)?addon.id:addon.id}
//                                 </div>
//                             </div>


//                         </button>
//                     ))}
//                 </div>
//             </div>) : ''}

//             <div className="flex justify-center items-center mt-8 gap-10 mb-3">
//                 {/* <button onClick={()=>{hello()}}>hhhhhhhh</button> */}
//                 {/* {already ? (<><button className='btn btn-sm btn-danger shadow' onClick={() => removeFromCart(modalItem)}>Remove</button></>) :
//                     (<button type="button" onClick={() => addToCart(modalItem)} className="btn btn-sm w-full btn-dark">
//                         {already ? 'Update' : 'Add'} To Cart - ₹{modalItem.sub_total}
//                     </button>)} */}

//             </div>
//         </div>
//     )
// }








// import React, { useState, Fragment, useEffect, useRef } from 'react'
// import Banner from './Banner'
// import { IoIosArrowDropdownCircle } from "react-icons/io";
// import { IoIosArrowDropupCircle } from "react-icons/io";
// import { SiSteem } from "react-icons/si";
// import { FiSearch } from "react-icons/fi";
// import PageLoader from './PageLoader';
// import { Dialog, Transition } from '@headlessui/react';
// import { IoMdCloseCircle } from "react-icons/io";
// import { AiFillMinusCircle } from "react-icons/ai";
// import { AiFillPlusCircle } from "react-icons/ai";
// import ShortPageLoader from './ShortPageLoader';
// import { useDispatch, useSelector } from 'react-redux';
// import { IRootState } from '../store';
// import { setCartItems } from '../store/themeConfigSlice';
// export default function Home({ homeData }) {

//     const [selectedCategory, setSelectedCategory] = useState(0);
//     const [filteredSubCategories, setFilteredSubCategories] = useState([]);
//     const [shortLoader, setShortLoader] = useState(false);
//     useEffect(() => {
//         setShortLoader(true)
//         selectedCategory ? setFilteredSubCategories(homeData.subcategories.filter(category => category.id == selectedCategory)) : setFilteredSubCategories(homeData.subcategories)
//         setTimeout(() => {
//             setShortLoader(false)
//         }, 500)

//     }, [selectedCategory])

//     const [inputValue, setInputValue] = useState('');
// const [showModal, setShowModal] = useState(false);
// const [modal,setModal]=useState(false);

//   const handleInputChange = (event) => {
//     const newValue = event.target.value;
//     setInputValue(newValue);
//     // You can perform any action here with the new input value
//     console.log('Input value:', newValue);
//     setModal(true);
//   };
//   const ref = useRef<SheetRef>();
//     return (
//         <>
//             <Banner banners={homeData.banners} />
//             <div className='flex justify-between mt-2 items-center'>
//                 <div>
//                     <button className='badge bg-success/50 me-2'>Veg</button>
//                     <button className='badge bg-danger'>Non-Veg</button>
//                 </div>

//                 <div>
//                     <div className="relative">
//                         <input type="text" placeholder="Search items"   value={inputValue} onChange={handleInputChange} className="bg-white form-input placeholder:tracking-wider shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)]" />
//                         <button type="button" onClick={()=>{{ alert('sccesss'), setInputValue(''), setModal(false)}}} className="btn h-6 w-6 btn-dark absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full p-0 flex items-center justify-center"><FiSearch /></button>
//                     </div>
//                 </div>
//             </div>

//             {
//                 modal?(
//                     <Sheet
//                     ref={ref}
//                     isOpen={modal}
//                     onClose={() => setModal(false)}
//                     snapPoints={[460, 450, 100, 0]}
//                     initialSnap={0}
//                     onSnap={snapIndex =>
//                         console.log('> Current snap point index:', snapIndex)
//                     }
//                 >

//                     <Sheet.Container style={{background:'transparent', boxShadow:'none'}} className='bg-transparent'>
//                     <Sheet.Header className='flex justify-center items-center mb-2 ' >
//                 <button className=' bg-red-400 text-white rounded-full p-2 mantine-Checkbox-body' onClick={() => {{setModal(false),setInputValue('')}}}>x</button>

//               </Sheet.Header>

//                         <Sheet.Content style={{background:'white', boxShadow:'rgba(0, 0, 0, 0.3) 0px -2px 16px'}} >
//                             <h1>{inputValue}</h1>

//                         </Sheet.Content>
//                     </Sheet.Container>
//                 </Sheet>
//                 ):''
//             }

//             <div className="overflow-auto whitespace-nowrap mt-2">
//                 <button className={`badge ${!selectedCategory ? 'bg-black' : 'bg-black/50'} text-[14px] me-2 p-1 px-3`} onClick={() => setSelectedCategory(0)}>All</button>
//                 {homeData?.categories?.map((category) => (
//                     <button className={`badge ${selectedCategory == category.id ? 'bg-black' : 'bg-black/50'}  text-[14px] me-2 p-1 px-3`} onClick={() => setSelectedCategory(category.id)} key={category.id}>{category.category_name}</button>
//                 ))}
//             </div>
//             <section className='mt-2'>
//                 {shortLoader ? <ShortPageLoader /> : <SubCategory subCategories={filteredSubCategories} items={homeData.items} />}
//                 {/* <div className='flex justify-between bg-primary/10 p-1 rounded shadow mb-2'>
//                     <span className='flex items-center gap-1'>
//                         <SiSteem color='gray' size={15} /><b>Subcategory</b>
//                     </span>
//                     <span><IoIosArrowDropupCircle size={24} /></span>
//                 </div> */}
//             </section>


//         </>
//     )
// }




// const SubCategory = ({ subCategories, items }) => {
//     return (
//         <>
//             {subCategories.map((subcategory) => (
//                 <div className='bg-primary/10 p-1 rounded  mb-2' key={subcategory.id}>
//                     <div className='flex justify-between mb-2'>
//                         <span className='flex items-center gap-1'>
//                             <SiSteem color='gray' size={15} /><b>{subcategory.sub_category_name} {subcategory.id}</b>
//                         </span>
//                         <span><IoIosArrowDropdownCircle size={24} /></span>
//                     </div>
//                     <Items items={items.filter(item => item.sub_category_id == subcategory.id)} />
//                 </div>
//             ))}
//         </>

//     )
// }

// import Sheet, { SheetRef } from 'react-modal-sheet';


// const Items = ({ items }) => {
//     // const [isOpen, setOpen] = useState(false);
//     const ref = useRef<SheetRef>();
//     const snapTo = (i: number) => ref.current?.snapTo(i);
//     const cartItems = useSelector((state: IRootState) => state.themeConfig.cartItems);
//     const [modal, setModal] = useState(false);
//     const [selectedItem, setSelectedItem] = useState('');

//     const [addedItems, setAddedItems] = useState([]);

//     useEffect(() => {
//         setAddedItems(cartItems.map(i => i.item_id))
//     }, [cartItems])

//     // attribute_id

//     return (
//         <>

//             {items.map((item) => (
//                 <div className='grid grid-cols-12 mb-2 bg-white shadow rounded' key={item.id}>
//                     <div className='col-span-3'>
//                         <img src={window.location.origin + '/storage/' + item.item_image} className='p-2 rounded-2xl' />
//                     </div>
//                     <div className=' col-span-9'>
//                         <h6 className='font-bold text-[18px] mt-2'>{item.item_name}</h6>
//                         <p className='text-[14px] '>{item.description}  </p>
//                         <div className='flex justify-between items-center me-2'>
//                             <b>₹{item.price}</b>
//                             <button className={`badge ${addedItems.includes(item.id) ? 'bg-orange-600' : 'bg-[#1b2e4b]'} `} onClick={() => {
//                                 setSelectedItem(item)
//                                 setModal(true)
//                             }}>  {addedItems.includes(item.id) ? 'Added' : 'Add'} </button>
//                         </div>
//                     </div>
//                 </div>
//             ))}

//             <Sheet
//                 ref={ref}
//                 isOpen={modal}
//                 onClose={() => setModal(false)}
//                 snapPoints={[460, 450, 100, 0]}
//                 initialSnap={0}
//                 onSnap={snapIndex =>
//                     console.log('> Current snap point index:', snapIndex)
//                 }
//             >

//                 <Sheet.Container style={{background:'transparent', boxShadow:'none'}} className='bg-transparent'>
//                 <Sheet.Header className='flex justify-center items-center mb-2 ' >
//             <button className='  bg-red-400 text-white rounded-full p-2 mantine-Checkbox-body' onClick={() => setModal(false)}>x</button>

//           </Sheet.Header>

//                     <Sheet.Content style={{background:'white', boxShadow:'rgba(0, 0, 0, 0.3) 0px -2px 16px'}} >

//                         <SetModalItem selectedItem={selectedItem} setModal={setModal} />
//                     </Sheet.Content>
//                 </Sheet.Container>
//             </Sheet>


//         </>
//     )
// }



// const SetModalItem = ({ selectedItem, setModal }) => {

//     console.log(selectedItem)
//     const [modalItem, setModalItem] = useState({})
//     const [already, setAlready] = useState(false);
//     const cartItems = useSelector((state: IRootState) => state.themeConfig.cartItems);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (cartItems.length && cartItems.find((i) => i.item_id == selectedItem.id)) {
//             const cartItem = cartItems.find((i) => i.item_id == selectedItem.id);
//             setAlready(true)
//             setModalItem({
//                 item_image: cartItem.item_image,
//                 item_id: cartItem.item_id,
//                 item_name: cartItem.item_name,
//                 description: cartItem.description,
//                 qty: cartItem.qty,
//                 price: cartItem.price,
//                 sub_total: cartItem.sub_total,
//                 variation: cartItem.variation,
//                 extras: cartItem.extras,
//                 addons: cartItem.addons,

//             })
//         } else setModalItem({
//             item_image: selectedItem.item_image,
//             item_id: selectedItem.id,
//             item_name: selectedItem.item_name,
//             description: selectedItem.description,
//             qty: 1,
//             price: selectedItem.price,
//             sub_total: selectedItem.price,
//             variation: null,
//             extras: null,
//             addons: null
//         })
//     }, [])



//     useEffect(() => {
//         if (already) {
//             const index = cartItems.findIndex((c: any) => c.item_id == modalItem.item_id);
//             let newArr = [...cartItems];

//             console.log(newArr[index])
//             newArr[index] = {
//                 ...newArr[index],
//                 qty: modalItem.qty,
//                 variation: modalItem.variation,
//                 extras: modalItem.extras,
//                 sub_total: modalItem.sub_total,
//                 addons: modalItem.addons
//             };
//             dispatch(setCartItems(newArr))
//         }
//     }, [modalItem])




//     const addToCart = (item) => {
//         if (cartItems.length) {
//             if (cartItems.find((i) => i.item_id == item.item_id)) {
//                 const index = cartItems.findIndex((c: any) => c.item_id == item.item_id);
//                 let newArr = [...cartItems];
//                 newArr[index] = {
//                     ...newArr[index], qty: item.qty
//                 };
//                 dispatch(setCartItems(newArr))
//             } else {
//                 dispatch(setCartItems([...cartItems, {
//                     item_id: item.item_id,
//                     item_name: item.item_name,
//                     item_image: item.item_image,
//                     description: item.description,
//                     qty: item.qty,
//                     price: item.price,
//                     sub_total: item.sub_total,
//                     variation: item.variation,
//                     extras: item.extras,
//                     addons: item.addons
//                 }]))
//             }
//         } else {
//             dispatch(setCartItems([{
//                 item_id: item.item_id,
//                 item_name: item.item_name,
//                 item_image: item.item_image,
//                 description: item.description,
//                 qty: item.qty,
//                 price: item.price,
//                 sub_total: item.sub_total,
//                 variation: item.variation,
//                 extras: item.extras,
//                 addons: item.addons
//             }]))
//         }
//         setModal(false)
//     }


//     const calculatePrice = (action, data) => {
//         let price = 0;
//         if (action != 'extra') {
//             if (modalItem.extras && modalItem.extras.length) price += modalItem.extras.reduce((accumulator, currentValue) => {
//                 return accumulator + Number(currentValue.price);
//             }, 0)
//         }

//         if (action != 'addon') {
//             if (modalItem.addons && modalItem.addons.length) price += modalItem.addons.reduce((accumulator, currentValue) => {
//                 if (currentValue.variation && currentValue.variation.price) {
//                     return accumulator + Number(currentValue.variation.price) + Number(currentValue.price)
//                 } else return accumulator + Number(currentValue.price);
//             }, 0)
//         }

//         switch (action) {
//             case 'qty':
//                 console.log("qty change", data)
//                 price += modalItem?.variation?.price ? (Number(modalItem.variation.price) + selectedItem.price) * Number(data) : data * selectedItem.price
//                 break;
//             case 'variation':
//                 console.log("variation change", data)
//                 price += (Number(selectedItem.price) + Number(data)) * Number(modalItem.qty);
//                 break;
//             case 'extra':
//                 console.log("extra change", data)
//                 if (data && data.length) price += data.reduce((accumulator, currentValue) => {
//                     return accumulator + Number(currentValue.price);
//                 }, 0)
//                 price += modalItem?.variation?.price ? (Number(modalItem.variation.price) + selectedItem.price) * Number(modalItem.qty) : modalItem.qty * selectedItem.price
//                 break;

//             case 'addon':
//                 console.log("addon change", data)
//                 if (data && data.length) price += data.reduce((accumulator, currentValue) => {
//                     if (currentValue.variation && currentValue.variation.price) {
//                         return accumulator + Number(currentValue.variation.price) + Number(currentValue.price)
//                     } else return accumulator + Number(currentValue.price);
//                 }, 0)
//                 price += modalItem?.variation?.price ? (Number(modalItem.variation.price) + selectedItem.price) * Number(modalItem.qty) : modalItem.qty * selectedItem.price
//                 break;
//             default:
//         }
//         return price
//     }

//     const updateQty = (id: any, action: boolean) => {
//         let qty = action ? modalItem.qty + 1 : modalItem.qty != 1 ? modalItem.qty - 1 : modalItem.qty;
//         setModalItem({ ...modalItem, qty: qty, sub_total: calculatePrice('qty', qty) })
//     }



//     const removeFromCart = (item) => {
//         dispatch(setCartItems(cartItems.filter((d: any) => d.item_id !== item.item_id)));
//         setAlready(null)
//         setModalItem({ ...selectedItem, qty: 1 })
//         setModal(false)
//     }
//     const addVariation = (variation) => {
//         setModalItem({
//             ...modalItem, variation: variation,
//             sub_total: calculatePrice('variation', variation.price)
//         })
//     }
//     const handleExtras = (extra) => {
//         let extras = [];
//         if (modalItem.extras) {
//             const a = modalItem?.extras?.map(extra => extra.id);
//             if (a.includes(extra.id)) {
//                 extras = modalItem?.extras?.filter((e) => extra.id != e.id);
//                 setModalItem({ ...modalItem, extras: extras.length ? extras : null, sub_total: calculatePrice('extra', extras) })
//             } else {
//                 extras = [...modalItem.extras, extra];
//                 setModalItem({ ...modalItem, extras: extras, sub_total: calculatePrice('extra', extras) })
//             }
//         } else {
//             extras = [extra];
//             setModalItem({ ...modalItem, extras: extras, sub_total: calculatePrice('extra', extras) })
//         }
//     }
//     const handleAddons = (addon) => {
//         let addons = [];
//         if (modalItem.addons) {
//             const a = modalItem?.addons?.map(addon => addon.id);
//             if (a.includes(addon.id)) {
//                 addons = modalItem?.addons?.filter((e) => addon.id != e.id)
//                 setModalItem({ ...modalItem, addons: addons.length ? addons : null, sub_total: calculatePrice('addon', addons) })
//             } else {
//                 addons = [...modalItem.addons, addon]
//                 setModalItem({ ...modalItem, addons: addons, sub_total: calculatePrice('addon', addons) })
//             }
//         } else {
//             addons = [addon]
//             setModalItem({ ...modalItem, addons, sub_total: calculatePrice('addon', addons) })
//         }
//     }
//     return (
//         <div className="px-2">
//             <div className='grid grid-cols-12'>
//                 <div className='col-span-3'>
//                     <img src={window.location.origin + '/storage/' + modalItem.item_image} className='p-2 rounded-2xl' alt="" />
//                 </div>

//                 <div className='col-span-9  mt-2'>
//                     <h2 className='font-bold text-[16px]'>{modalItem.item_name}</h2>
//                     <p className='text-[12px] font-bold '>{modalItem.description}</p>
//                 </div>
//             </div>

//             <div className='flex justify-between px-2 items-center'>
//                 <div><b>₹{modalItem.sub_total}</b></div>
//                 <div className='flex gap-2 items-center'>
//                     <div>
//                         <b className='text-[16px]'> Quantity: </b></div>
//                     <div className='flex gap-2 badge bg-[#f1f2f3] rounded items-center'>
//                         <div onClick={() => updateQty(modalItem.id, false)}><AiFillMinusCircle size={20} color='black' /></div>
//                         <div><b className='text-black'>{modalItem.qty}</b></div>
//                         <div onClick={() => updateQty(modalItem.id, true)}><AiFillPlusCircle size={20} color='black' /></div>
//                     </div>
//                 </div>
//             </div>

//             {selectedItem?.variations?.length ? (
//                 <div>
//                     <b className='text-[16px]'> {selectedItem.variations[0].attribute}</b>
//                     <div className="overflow-auto whitespace-nowrap ">
//                         {selectedItem?.variations?.map((variation) => (
//                             <button
//                                 key={variation.id}
//                                 className={`badge ${modalItem?.variation?.id == variation.id ? 'bg-dark' : 'bg-black/50'} text-[14px] me-2 p-1 h-10 px-4`}
//                                 onClick={() => addVariation(variation)}>
//                                 {variation.name}<br />₹{variation.price ? variation.price : 0}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             ) : ''}


//             {selectedItem?.extras?.length ? (<div>
//                 <b className='text-[16px]'> Extras</b>
//                 <div className="overflow-auto whitespace-nowrap ">
//                     {selectedItem?.extras?.map((extra) => (
//                         <button key={extra.id} className={`badge ${modalItem?.extras?.find(e => e.id == extra.id) ? 'bg-dark' : 'bg-black/50'}  text-[14px] me-2 p-1 h-10 px-4`}
//                             onClick={() => handleExtras(extra)} >
//                             {extra.name} <br /> ₹{extra.price ? extra.price : 0}
//                         </button>
//                     ))}
//                 </div>
//             </div>) : ''}

//             {selectedItem?.addons?.length ? (<div>
//                 <b className='text-[16px]'> Addons</b>
//                 <div className="overflow-auto whitespace-nowrap ">
//                     {selectedItem?.addons?.map((addon, i) => (
//                         <button key={i + 1} className={`badge ${modalItem?.addons?.find(e => e.id == addon.id) ? 'bg-dark' : 'bg-black/50'}  text-[14px] me-2 p-1 h-10 px-4`}
//                             onClick={() => handleAddons(addon)} >
//                             {addon.item_name} - {addon.variation ? addon.variation.name : ''
//                             } <br /> ₹{addon.variation ? Number(addon.variation.price) + addon.price : addon.price ? addon.price : 0}
//                         </button>
//                     ))}
//                 </div>
//             </div>) : ''}



//             <div className="flex justify-center items-center mt-8 gap-10 mb-3">
//                 {already ? (<><button className='btn btn-sm btn-danger shadow' onClick={() => removeFromCart(modalItem)}>Remove</button></>) :
//                     (<button type="button" onClick={() => addToCart(modalItem)} className="btn btn-sm w-full btn-dark">
//                         {already ? 'Update' : 'Add'} To Cart - ₹{modalItem.sub_total}
//                     </button>)}

//             </div>
//         </div>
//     )
// }
