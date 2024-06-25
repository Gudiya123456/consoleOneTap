// import React, { useRef, useState } from 'react'
// import { FiSearch } from 'react-icons/fi';
// import Sheet, { SheetRef } from 'react-modal-sheet';

// export default function SearchItem({searchData}) {
//     console.log('search data', searchData);
//     const [inputValue, setInputValue] = useState('');
//     const [modal, setModal] = useState(false);

//     const handleInputChange = (event) => {
//         const newValue = event.target.value;
//         setInputValue(newValue);
//         // You can perform any action here with the new input value
//         console.log('Input value:', newValue);
//         setModal(true);
//     };
//     const ref = useRef<SheetRef>();
//     const [search, setSearch] = useState('');
//     const data = searchData;
//     const [searchData, setSearchData] = useState([]);
//     const [searched, setSearched] = useState(true);
//     const searchRef = useRef();
//     const onSearch = search => {
//         if (search !== '') {
//           let tempData = data.filter(item => {
//             return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
//           });
//           setSearchData(tempData);
//         } else {
//           setSearchData([]);
//         }
//         setSearched(true)
//       };
//   return (
//     <div>
//         <div className='mt-2' >
//                     <div className="relative">
//                         <input type="text" placeholder="Search items" value={searchData} onChange={onSearch} className="bg-white form-input placeholder:tracking-wider shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)]" />
//                         <button type="button" onClick={() => { { alert('sccesss'), setInputValue(''), setModal(false) } }} className="btn h-6 w-6 btn-dark absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full p-0 flex items-center justify-center"><FiSearch /></button>
//                     </div>
//                 </div>

//                 {
//                     modal ? (
//                         <Sheet
//                             ref={ref}
//                             isOpen={modal}
//                             onClose={() => setModal(false)}
//                             snapPoints={[960, 450, 100, 0]}
//                             initialSnap={0}
//                             onSnap={snapIndex => console.log('> Current snap point index:', snapIndex)}
//                         >
//                             <Sheet.Container style={{ background: 'transparent', boxShadow: 'none' }} className='bg-transparent'>
//                                 <Sheet.Header className='flex justify-center items-center mb-2 ' >
//                                     <button className=' bg-red-400 text-white rounded-full p-2 mantine-Checkbox-body' onClick={() => { { setModal(false), setInputValue('') } }}>x</button>
//                                 </Sheet.Header>
//                                 <Sheet.Content style={{ background: 'white', boxShadow: 'rgba(0, 0, 0, 0.3) 0px -2px 16px' }} >
//                                     <div className='p-1' >
//                                         <div>
//                                             <div className="relative ">
//                                                 <input type="text" placeholder="Search items" value={inputValue} onChange={handleInputChange} className="bg-white form-input placeholder:tracking-wider shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)]" />
//                                                 <button type="button" onClick={() => { { alert('sccesss'), setInputValue(''), setModal(false) } }} className="btn h-6 w-6 btn-dark absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full p-0 flex items-center justify-center"><FiSearch /></button>
//                                             </div>
//                                         </div>
//                                         <h1>{inputValue}</h1>
//                                         {
//                                             searchData?.length?"helllooooo":'no wayyy'
//                                         }
//                                     </div>
//                                 </Sheet.Content>
//                             </Sheet.Container>
//                         </Sheet >
//                     ) : ''
//                 }
//     </div>
//   )
// }
