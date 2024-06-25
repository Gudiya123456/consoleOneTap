import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Header from '../../../components/Layouts/Header';
import Footer from '../../../components/Layouts/Footer';


export default function Cookies() {
    const [isOpen, setIsOpen] = useState(true);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
  return (
    <div className='p-4'>
    <Header/>

        <h1 className='font-bold text-lg' >Cookies (Content not given)</h1>
        <div className='text-justify' >
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
        <div>
      <button onClick={toggleDropdown}>Toggle Dropdown</button>

    </div>
        <Footer/>
    </div>
  )
}
