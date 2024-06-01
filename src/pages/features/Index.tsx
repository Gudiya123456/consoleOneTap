import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../store/themeConfigSlice";
import Swal from "sweetalert2";
const AddFeatures = () => {

  const features = [
    {
      slno: 1,
      fn: "Live Monitoring",
    },
    {
      slno: 2,
      fn: "Customer Support",
    },
    {
      slno: 3,
      fn: "Oboarding Setup",
    },
    {
      slno: 4,
      fn: "menu Setup",
    },
    {
      slno: 6,
      fn: "POS System",
    },
    {
      slno: 7,
      fn: "Takeaway",
    },
    {
      slno: 8,
      fn: "KOT Dashboard",
    },
    {
      slno: 9,
      fn: "Payment Gateway",
    },
    {
      slno: 10,
      fn: "Menus",
    },
  ];

  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Features'));
        fetchFeatures();

    }, []);
    const [resList, setResList] = useState<any>([]);
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)


    // fetch Restaurant data
    const fetchFeatures = async () => {
        setIsLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: "https://cdn.onetapdine.com/api/features",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            console.log(response.data);


            if (response.data.status == 'success') {
                setResList(response.data.features);
                console.log(response.data);
            }
            else {
                console.log()
            }


        } catch (error: any) {
            if (error.response.status == 401) navigate('/login')

            else console.log(error)

        }

        finally {
            setIsLoading(false)

        }
    };

    const [addContactModal, setAddContactModal] = useState<any>(false);
    const [filteredItems, setFilteredItems] = useState<any>(resList);
    const [search, setSearch] = useState<any>('');
    const[inputvisible,setInputvisible]=useState(false)

    useEffect(() => {
        setFilteredItems(() => {
            return resList.filter((item: any) => {
                return item.feature.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, resList]);

    const [defaultParams] = useState({
        id: null,
        features: '',
    });
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [errors, setErros] = useState<any>({});

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: '' });
        setParams({ ...params, [name]: value });
    };

    const validate = () => {
        setErros({});
        let errors = {};

        if (!params.feature) {
            errors = { ...errors, feature: 'feature is required' };
        }
        console.log(errors)
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };
    const saveUser = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        if (params.id) {
            //update user
            let user = {
                id: params.id,
                features: params.features,

            };
            updateUserToServer(user);
        }
    };

    const updateUserToServer = async (user: any) => {
        try {

            const response = await axios({
                method: 'POST',
                url: 'https://cdn.onetapdine.com/api/features/' + user.id,
                data: { feature: params.feature},
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });

            if (response.data.status === 'success') {
                showMessage('User has been updated successfully.');
               setInputvisible(false)
                fetchFeatures();
                const reslists = response.data.features;
                let user: any = filteredItems.find((d: any) => d.id === reslists.id);
                user.features = reslists.features;
                showMessage('User has been updated successfully.');
                alert('User has been updated successfully')

            }
        } catch (error: any) {
            console.log(error)
            if (error.response.status === 401) navigate('/login')
            if (error.response.status === 422) {
                const serveErrors = error.response.data.errors;
                for (var key in serveErrors) {
                    setErros({ ...errors, [key]: serveErrors[key][0] });
                }
            }
            // else ErrorHandle(error);
        }
    };


    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }

        setErros({});
     setInputvisible(true)
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
  return (
    <div className=" mx-10 dark:bg-[#000000]  bg-[#FFFFFF] p-2 rounded-xl">
      <div className=" grid grid-cols-12 bg-[#EEEEEE] h-[53px] items-center rounded-lg dark:bg-[#35373B] text-black dark:text-white">
        <div className="  col-span-1 justify-center text-center font-semibold">
          SL:No
        </div>
        <div className="justify-center text-center font-semibold">
          Features
        </div>
      </div>
      {filteredItems.map((f) => (
        <div
          key={f.id}
          className=" grid grid-cols-12 bg-[#F2F2F2] h-[53px] items-center rounded-lg mt-1 dark:bg-[#202125]"
        >
          <div className=" col-span-1 justify-center text-center font-semibold">
            {f.id}
          </div>
          <div className=" col-span-2 justify-center ">
            <div>{f.feature}</div>
          </div>

          <div className=" col-span-9 flex justify-end items-center text-center ">
            <div onClick={()=>{editUser(f)}} className=" w-[64px] h-[26px] rounded-full text-white bg-black dark:bg-[#FFFFFF] dark:text-[black]  mx-9">
              Edit
            </div>
           
          </div>
        </div>
      ))}
  {
    inputvisible==true && <div className=" grid md:grid-cols-12 bg-[#F2F2F2] py-3 items-center rounded-lg mt-1">
    <div className=" col-span-1 justify-center text-center font-semibold"></div>
    <div className=" col-span-4 justify-center ">
     
          <input
          type="text"
          placeholder="Type here"
          className="input-form flex-1 focus:outline-none h-[34px]  rounded-3xl w-[289px] px-5 bg-[#FFFFFF]"
          name="feature"
          value={params.feature}
          onChange={(e)=>changeValue(e)}
        />
        {
          errors?.feature?(
            <span className="text-red-500" >{errors.feature}</span>
          ):''
        }

    </div>

    <div className=" col-span-7 flex justify-end mr-12 items-center text-center ">
      <div onClick={()=>{saveUser()}} className=" w-[64px] h-[26px] rounded-full text-white bg-black dark:bg-[#FFFFFF] dark:text-[black]">
       Update
      </div>
    </div>
  </div>
  }
    </div>
  );
};

export default AddFeatures;
