import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Header from '../../../components/Layouts/Header';
import Footer from '../../../components/Layouts/Footer';



export default function ContactUs() {
    const [model2, setModel2] = useState(false);

  return (
    <div className='p-4'>
         {/* header  */}
         <Header/>

        <h1 className='font-bold text-lg' >Contact Us (Content not given)</h1>
        <div className='text-justify' >
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
        <Footer/>
    </div>
  )
}
