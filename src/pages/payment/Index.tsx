
import React, { useEffect, useState } from 'react';
import AccountingCard from './AccountingCard';
import rozorpay from "../../assets/images/rozorpay.png";
import gpay from "../../assets/images/gpay.png";
import stripe1 from "../../assets/images/stripe.png";
import paypal from "../../assets/images/paypal.png";
import phonepe from "../../assets/images/phonepay.png";
import amazon from "../../assets/images/amazon.png";
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import axios from 'axios';
import { RiHome4Line } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

const App = () => {
  const [gateWay, setGateWay] = useState({});
  const [enabledGateay, setEnabledGateway] = useState("");
  const [razorPay, setRazorPay] = useState<any>("");
  const [stripe, setStripe] = useState<any>("");
  const [paytm, setPaytm] = useState<any>("");
  const [phonePe, setPhonePe] = useState<any>("");
  const [payPal, setPayPal] = useState<any>("");
  const [amazonPay, setAmazonPay] = useState<any>("");
  const [googlePay, setGooglePay] = useState<any>("");
  const accountingTools = [
    { title: 'Phone Pay', imageSrc: phonepe },
    { title: 'Google Pay', imageSrc: gpay },
    { title: 'Stripe', imageSrc: stripe1 },
    { title: 'Amazon Pay', imageSrc: amazon },
    { title: 'Rozorpay', imageSrc: rozorpay },
    { title: 'Paypal', imageSrc: paypal },

  ];
  const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken
  );
  const[isLoading,setIsLoading]=useState(false)
  const[paymentGateways,setPaymentGateways]=useState([])
  console.log(paymentGateways)

  useEffect(() => {
    fetchPaymentGteWay();
  }, []);
  const fetchPaymentGteWay = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: "https://cdn.onetapdine.com/api/payment-gateways",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crmToken,
        },
      });
      console.log(response.data.paymentGateways);

      if (response.data.status == "success") {
        setPaymentGateways(response.data.paymentGateways);
      }
    } catch (error) {
      // alert("errror");
    } finally {
      setIsLoading(false);
    }
  };

  

  useEffect(() => {
    const z = paymentGateways.find((p: any) => p.is_enabled == true);
    if (z) setEnabledGateway(z.gateway_name);
    const a = paymentGateways.find((p: any) => p.gateway_name == "razorpay");
    setRazorPay(
      a ? a : { gateway_name: "razorpay", environment: "0", is_enabled: "0" }
    );
    const b = paymentGateways.find((p: any) => p.gateway_name == "stripe");
    setStripe(
      b ? b : { gateway_name: "stripe", environment: "0", is_enabled: "0" }
    );
    const c = paymentGateways.find((p: any) => p.gateway_name == "paytm");
    setPaytm(
      c ? c : { gateway_name: "paytm", environment: "0", is_enabled: "0" }
    );
    const d = paymentGateways.find((p: any) => p.gateway_name == "phonepay");
    setPhonePe(
      d ? d : { gateway_name: "phonepay", environment: "0", is_enabled: "0" }
    );
    const e = paymentGateways.find((p: any) => p.gateway_name == "paypal");
    setPayPal(
      e ? e : { gateway_name: "paypal", environment: "0", is_enabled: "0" }
    );

    const g = paymentGateways.find((p: any) => p.gateway_name == "googlepay");
    setGooglePay(
      g ? g : { gateway_name: "googlepay", environment: "0", is_enabled: "0" }
    );
    const f = paymentGateways.find((p: any) => p.gateway_name == "amazon");
    setAmazonPay(
      f ? f : { gateway_name: "amazon", environment: "0", is_enabled: "0" }
    );
    console.log(razorPay);
    console.log(stripe);
    console.log(paytm);
    console.log(phonePe);
    console.log(amazonPay);
  }, [paymentGateways]);

  return (
    <>
     <div className="panel flex justify-between items-center overflow-x-auto whitespace-nowrap p-1.5 rounded-none ">
               <div className="flex  items-center overflow-x-auto whitespace-nowrap " >
               <div className="rounded-full p-1.5   ltr:mr-3 rtl:ml-3">
                <RiHome4Line className=' opacity' size={20} color='gray' />

                </div>
                <IoIosArrowForward className='ltr:mr-3 opacity-25 font-thin' color='gray' />

                <a href="/" style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }}  className="block hover:underline text-gray-600  ltr:mr-3 rtl:ml-3" rel="noreferrer">
                    Home
                </a>
                <IoIosArrowForward className='font-thin opacity-25' color='gray' />

                <p style={{letterSpacing:'1px', fontFamily:'Poppins', fontSize:'0.85rem', fontWeight:'400', lineHeight:'25px' }} className='ltr:ml-3 text-blue-700' >Payment</p>
           
               </div>
           <div>
         {/* <NavLink to='#' >
         <button  onClick={() => {
                  storeOrUpdate(null);
                }} 
                type="button" className="btn  poppins-btn btn-sm btn-dark shadow-none mr-5">Add Payment</button>
         </NavLink> */}
          
           </div>
            </div>

            <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Payment</h1>
       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {paymentGateways.map((tool, index) => (
          <AccountingCard key={index} title={tool.gateway_name} imageSrc={tool.imageSrc} alldata={tool} paymentGateways={paymentGateways}  />
        ))}
      </div>
    </div>
    </>
    
  );
};

export default App;