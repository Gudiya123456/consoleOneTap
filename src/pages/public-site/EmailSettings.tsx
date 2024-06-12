import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function EmailSettings() {

const [isLoading,setIsLoading]=useState(false);
const crmToken=useSelector((state:IRootState)=>state.themeConfig.crmToken);
console.log('emailSettingg token', crmToken)
const [email,setEmail]=useState('')

const navigate=useNavigate();
  const emailSettings=async()=>{
setIsLoading(true);
    try {
      const response= await axios({
        method:'get',
        url:'https://cdn.onetapdine.com/api/settings/emails',
        headers:{
          'Content-Type':'application/json',
          Authorization: ' Bearer ' + crmToken
        }
      })
      if(response.data.status=='success') {
        storeOrUpdate(response.data.email)
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
    emailSettings();
  },[])

  const [defaultParams] = useState({
    id: '',
    mailer: '',
    host: '',
    port: '',
    username: '',
    password: '',
    encryption: '',
    from_address: '',
    from_name: '',
   
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
    if (!params.username) {
        errors = { ...errors, username: 'username  is required' };
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
            url: 'https://cdn.onetapdine.com/api/settings/emails',
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
            emailSettings()

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
    data.append("mailer", params.mailer);
    data.append("host", params.host);
    data.append("port", params.port);
    data.append("username", params.username);
    data.append("password", params.password);
    data.append("encryption", params.encryption);
    data.append("from_address", params.from_address);
    data.append("from_name", params.from_name);
    storeOrUpdateApi(data);
};


const storeOrUpdate = (data) => {
    setErros({});
    if (data) {
        setParams({
            id: data.id,
            mailer: data.mailer ? data.mailer : '',
            host: data.host ? data.host : '',
            port: data.port ? data.port : '',
            username: data.username ? data.username : '',
            password: data.password ? data.password : '',
            encryption: data.encryption ? data.encryption : '',
            from_address: data.from_address ? data.from_address : '',
            from_name: data.from_name ? data.from_name : '',
        });



    } else {
        const defaltData = JSON.parse(JSON.stringify(defaultParams));
        setParams(defaltData);
    }

}

  return (
    <div>
         <div className=" mt-6">
        <h1 className=" font-[600] text-[20px] mb-2">Email Settings</h1>
        <div className=" mt-3 2xl:w-3/4 grid md:grid-cols-2 xl:grid-cols-3 ml-2 gap-4">
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              User Name
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                placeholder=" Enter User Name "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
                name='username'
                value={params.username}
                onChange={(e)=>changeValue(e)}
              />
              <MdModeEdit size={18} />
            </div>
            {errors?.username ? <div className="text-danger mt-1">{errors.username}</div> : ''}

          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Password
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] rounded-full dark:bg-[#202125] border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
               
                placeholder=" Enter Password "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
                name='password'
                value={params.password}
                onChange={(e)=>changeValue(e)}
              />
              <MdModeEdit size={18} />
            </div>
            {errors?.password ? <div className="text-danger mt-1">{errors.password}</div> : ''}

          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Port
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                placeholder=" Enter Port "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
                name='port'
                value={params.port}
                onChange={(e)=>changeValue(e)}
              />
              <MdModeEdit size={18} />
            </div>
            {errors?.port ? <div className="text-danger mt-1">{errors.port}</div> : ''}

          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Encryption
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                placeholder=" Enter Encryption "
                className=" text-[12px] font-[500] bg-transparent  flex-1 outline-none pr-1"
                name='encryption'
                value={params.encryption}
                onChange={(e)=>changeValue(e)}
              />
              <MdModeEdit size={18} />
            </div>
            {errors?.encryption ? <div className="text-danger mt-1">{errors.encryption}</div> : ''}

          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Mailer
            </label>
            <div className="bg-[#FFFFFF] dark:bg-[#202125] border-[0.2px] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                placeholder=" Enter Mailer"
                className=" text-[12px] font-[500]  bg-transparent flex-1 outline-none pr-1"
                name='mailer'
                value={params.mailer}
                onChange={(e)=>changeValue(e)}
              />
              <MdModeEdit size={18} />
            </div>
            {errors?.mailer ? <div className="text-danger mt-1">{errors.mailer}</div> : ''}

          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Name
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                placeholder=" Enter Name "
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
                name='from_name'
                value={params.from_name}
                onChange={(e)=>changeValue(e)}
              />
              <MdModeEdit size={18} />
            </div>
            {errors?.from_name ? <div className="text-danger mt-1">{errors.from_name}</div> : ''}

          </div>
          <div>
            <label
              htmlFor=""
              className=" text-[15px] font-[400] leading-[14px] ml-2"
            >
              Address
            </label>
            <div className="bg-[#FFFFFF] border-[0.2px] dark:bg-[#202125] rounded-full border-[#4E4E4E] w-[301px] h-[30px] flex items-center px-2">
              <input
                type="text"
                placeholder=" Enter Address"
                className=" text-[12px] font-[500] bg-transparent flex-1 outline-none pr-1"
                name='from_address'
                value={params.from_address}
                onChange={(e)=>changeValue(e)}
              />
              <MdModeEdit size={18} />
            </div>
            {errors?.from_address ? <div className="text-danger mt-1">{errors.from_address}</div> : ''}

          </div>
        </div>
      </div>
      <button onClick={()=>{formSubmit()}} className=" px-2 py-1 rounded-xl float-right mr-20 bg-[#DDDDDD] text-black dark:bg-black dark:text-white" >
       {
        btnLoading?'Please Wait':' Save changes'
       }
        
        </button>

    </div>
  )
}
