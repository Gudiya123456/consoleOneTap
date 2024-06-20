import React, { useState } from 'react';
import AddPayment from './AddPayment';
import gpay from "../../assets/images/gpay.png";

const AccountingCard = ({ title, imageSrc,alldata }) => {
const [showDrawer, setShowDrawer] = useState(false);
console.log(alldata)
const[data,setData]=useState(alldata)

const handleDrawer=()=>{
  // setData(data.is_enabled);
  setShowDrawer(true);
}

  return (
    <div className="border bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
        <img  src={gpay} alt={title} className="mb-4 h-20 w-20 object-contain" />
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <button onClick={()=>{handleDrawer()}} className="text-yellow-500">Explore Now &gt;</button>
        <AddPayment showDrawer={showDrawer} setShowDrawer={setShowDrawer} title={title} alldata={alldata}  />
    </div>
  );
};

export default AccountingCard;