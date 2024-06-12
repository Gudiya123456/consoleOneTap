import React, { useEffect, useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ContactSettings() {
const [isLoading,setIsLoading]=useState(false);
const crmToken=useSelector((state:IRootState)=>state.themeConfig.crmToken);
console.log('contactsSettingg token', crmToken)

const navigate=useNavigate();
  const contactSetting=async()=>{
setIsLoading(true);
    try {
      const response= await axios({
        method:'get',
        url:'https://cdn.onetapdine.com/api/settings/contact-details',
        headers:{
          'Content-Type':'application/json',
          Authorization: ' Bearer ' + crmToken
        }
      })
      if(response.data.status=='success') {
        storeOrUpdate(response.data.contactDetails)
      }
    else storeOrUpdate()
    
    } catch (error) {
      // alert(error)
      
    }
    finally{
      setIsLoading(false)

    }
  }

  useEffect(()=>{
    contactSetting();
  },[])

  const [defaultParams] = useState({
    id: '',
    facebook_url: '',
    x_url: '',
    linkedin_url: '',
    youtube_url: '',
    instagram_url: '',
    pinterest_url: '',
    indian_number: '',
    indian_number2: '',

    indian_email: '',
    indian_email2: '',
    indian_whatsapp: '',

    usa_number: '',
    usa_number2: '',
    usa_email: '',
    usa_email2: '',
    usa_whatsapp: '',

    uae_number: '',
    uae_number2: '',
    uae_email: '',
    uae_email2: '',
    uae_whatsapp: '',


   
});

const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
const [errors, setErros] = useState<any>({});

const changeValue = (e: any) => {
    const { value, name } = e.target;
    setErros({ ...errors, [name]: '' });
    setParams({ ...params, [name]: value });
    console.table(params)
};




const validate = () => {
    setErros({});
    let errors = {};
    if (!params.youtube_url) {
        errors = { ...errors, youtube_url: 'youtube_url  is required' };
    }
    console.log(errors)
    setErros(errors);
    return { totalErrors: Object.keys(errors).length };
};

const [btnLoading, setBtnLoading] = useState(false);

const storeOrUpdateApi = async (data: any) => {
    setBtnLoading(true)
    try {
        const response = await axios({
            method: 'post',
            url: 'https://cdn.onetapdine.com/api/settings/contact-details',
            data,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + crmToken,
            },
        });

        if (response.data.status == 'success') {
            Swal.fire({
                icon: response.data.status,
                title: response.data.title,
                text: response.data.message,
                padding: '2em',
                customClass: 'sweet-alerts',
            });


            // dispatch(setCrmData({ logo: response.data.setting.logo, fav_icon: response.data.setting.fav_icon, mode: response.data.setting.mode }))
            contactSetting()

        } else {

            alert("Failed")
        }

    } catch (error: any) {
        console.log(error)
        if (error.response.status == 401) navigate('/login')
        if (error?.response?.status === 422) {
            const serveErrors = error.response.data.errors;
            let serverErrors = {};
            for (var key in serveErrors) {
                serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
                console.log(serveErrors[key][0])
            }
            setErros(serverErrors);
            CrmSwal.fire({
                title: "Server Validation Error! Please solve",
                toast: true,
                position: 'top',
                showConfirmButton: false,
                showCancelButton: false,
                width: 450,
                timer: 2000,
                customClass: {
                    popup: "color-danger"
                }
            });
        }
    } finally {
        setBtnLoading(false)
    }
};

const formSubmit = () => {
    const isValid = validate();
    if (isValid.totalErrors) return false;
    const data = new FormData();
    data.append("id", params.id);
    data.append("facebook_url", params.facebook_url);
    data.append("x_url", params.x_url);
    data.append("linkedin_url", params.linkedin_url);
    data.append("youtube_url", params.youtube_url);
    data.append("instagram_url", params.instagram_url);
    data.append("pinterest_url", params.pinterest_url);
    data.append("indian_number", params.indian_number);
    data.append("indian_number2", params.indian_number2);
    data.append("indian_email", params.indian_email);
    data.append("indian_email2", params.indian_email2);
    data.append("indian_whatsapp", params.indian_whatsapp);
    data.append("usa_number", params.usa_number);
    data.append("usa_number2", params.usa_number2);
    data.append("usa_email", params.usa_email);
    data.append("usa_email2", params.usa_email2);
    data.append("usa_whatsapp", params.usa_whatsapp);
    data.append("uae_number", params.uae_number);
    data.append("uae_number2", params.uae_number2);
    data.append("uae_email", params.uae_email);
    data.append("uae_email2", params.uae_email2);
    data.append("uae_whatsapp", params.uae_whatsapp);



    storeOrUpdateApi(data);
};


const storeOrUpdate = (data) => {
    setErros({});
    if (data) {
        setParams({
            id: data.id,
            facebook_url: data.facebook_url ? data.facebook_url : '',
            x_url: data.x_url ? data.x_url : '',
            linkedin_url: data.linkedin_url ? data.linkedin_url : '',
            youtube_url: data.youtube_url ? data.youtube_url : '',
            instagram_url: data.instagram_url ? data.instagram_url : '',
            pinterest_url: data.pinterest_url ? data.pinterest_url : '',
            indian_number: data.indian_number ? data.indian_number : '',
            indian_number2: data.indian_number2 ? data.indian_number2 : '',

            indian_email: data.indian_email ? data.indian_email : '',
            indian_email2: data.indian_email2 ? data.indian_email2 : '',
            indian_whatsapp: data.indian_whatsapp ? data.indian_whatsapp : '',
            usa_number: data.usa_number ? data.usa_number : '',
            usa_number2: data.usa_number2 ? data.usa_number2 : '',
            usa_email: data.usa_email ? data.usa_email : '',
            usa_email2: data.usa_email2 ? data.usa_email2 : '',
            usa_whatsapp: data.usa_whatsapp ? data.usa_whatsapp : '',
            uae_number: data.uae_number ? data.uae_number : '',
            uae_number2: data.uae_number2 ? data.uae_number2 : '',
            uae_email: data.uae_email ? data.uae_email : '',
            uae_email2: data.uae_email2 ? data.uae_email2 : '',
            uae_whatsapp: data.uae_whatsapp ? data.uae_whatsapp : '',


        });



    } else {
        const defaltData = JSON.parse(JSON.stringify(defaultParams));
        setParams(defaltData);
    }

}
  return (
    <div>
        <div className=" mt-5">
        <h1 className=" font-[600] text-[20px] mb-2">Contact Details</h1>
        <div className=" 2xl:w-3/4 mt-3 grid md:grid-cols-2 xl:grid-cols-3 ml-2 gap-4">
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Facebook
            </label>
            <div className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Facebook URL "
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              LinkedIn
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter LinkedIn URL "
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              X
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] rounded-full dark:bg-[#202125] border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter X URL "
                className=" text-[12px] font-[500]  bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Instagram
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] rounded-full dark:bg-[#202125] border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Instagram URL "
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Pinterest
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                name=""
                id=""
                placeholder=" Enter Pinterest URL "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
              />
              <MdModeEdit size={18} />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Youtube
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                placeholder=" Enter Youtube URL "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
                name='youtube_url'
                value={params.youtube_url}
                onChange={(e)=>changeValue(e)}
              />
              <MdModeEdit size={18} />
            </div>
            {
              errors.youtube_link?<span className='text-red-700' >{errors.youtube_url}</span>:''
            }
          </div>
        </div>
      </div>
      <div className=" ml-4 mt-6 flex flex-wrap gap-8">
        <div>
          <div className=" flex items-center mt-5">
            <input
              type="radio"
              name="status"
              className=" form-radio border-black dark:border-white w-4 h-4 text-black peer"
            />

            <span className="text-[16px] font-[400]">India</span>
          </div>

          <div className=" flex mt-4 items-center">
            <input
              type="radio"
              name="status"
              className=" form-radio border-black dark:border-white w-4 h-4 text-black peer"
            />

            <span className="text-[16px] font-[400]">UAE</span>
          </div>
          <div className=" flex mt-4 items-center">
            <input
              type="radio"
              name="status"
              className=" form-radio border-black dark:border-white   w-4 h-4 text-black peer"
            />

            <span className="text-[16px] font-[400]">USA</span>
          </div>
        </div>
        <div>
          <div className=" flex gap-6 flex-wrap">
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Email
              </label>
              <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder=" Enter Email"
                  className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Alternative Email
              </label>
              <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=" Enter  Alternative Email "
                  className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
          </div>
          <div className=" flex flex-wrap gap-6 mt-4">
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Phone
              </label>
              <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=" Enter Phone Number "
                  className=" text-[12px] font-[500]  bg-transparent flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Alternative Phone
              </label>
              <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=" Enter  Alternative Phone "
                  className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
          </div>
          <div className=" flex gap-6 mt-4">
            <div>
              <label
                htmlFor=""
                className=" text-[15px] font-[400] leading-[14px] ml-2"
              >
                Whatsapp
              </label>
              <div className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=" Enter  Whatsapp  Number "
                  className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
                />
                <MdModeEdit size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button disabled={btnLoading} onClick={()=>{formSubmit()}} className=" px-2 py-1 rounded-xl float-right mr-20 bg-[#DDDDDD] text-black dark:bg-black dark:text-white" >
        {
          btnLoading?'Please Wait':'Save Changes'
        }
       
        </button>

    </div>
  )
}
