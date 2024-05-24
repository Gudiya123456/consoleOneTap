import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import IconLoader from '../../components/Icon/IconLoader';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IRootState } from '../../store/index';
import { setPageTitle } from '../../store/themeConfigSlice';
import PageLoader from "../../components/PageLoader";

const Notifications = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const defaultParams={
    //     id:1,
    //     whatsapp:'',
    //     user_name:'',
    //     password:'',
    //     token:'',
    //     whatsapp_id:''

    // }

    // const[params, setParams]=useState<any>({});
    // const[errors,setErros]=useState<any>({});

    // const changeValue=(e:any)=>{
    //     const{value, name}=e.target;
    //     setErros({...errors,[name]:''});
    //     setParams({...params,[name]:value});
    //     console.log(params)
    // }

    // const validate=()=>{
    //     setErros({});
    //     let errors={};
    // if (!params.token) errors = { ...errors, token: 'The token name field is required.' };
    // }
    // setErros(errors);
    // return { totalErrors: Object.keys(errors).length };




    /////////////////////////////////////////////////
    // email Notifications
    const [mailer1, setMailer] = useState('');
    const [mailPort, setMailPort] = useState('')
    const [mailPassword, setMailPassword] = useState('')
    const [mailAddress, setMailAddress] = useState('')
    const [mailHost, setMailHost] = useState('')
    const [mailUsername, setMailUsername] = useState('')
    const [mailEncription, setmailEntryption] = useState('')
    const [mailName, setMailName] = useState('')
    const [emailAction, setEmailAction] = useState('');

    // firebase Notifications

    const [apiKey, setApiKey] = useState('')
    const [authDomain, setAuthDomain] = useState('')
    const [projectId, setProjectId] = useState('')
    const [storageBucket, setStorageBucket] = useState('')
    const [senderId, setSenderId] = useState('')
    const [appId, setAppid] = useState('')
    const [serverKey, setServerKey] = useState('')
    const [keyPair, setKeyPair] = useState('')


    // whatsapp Notifications

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [whatsappId, setWhatsappId] = useState('')



    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);

    //   const crmToken =localStorage.getItem("crmToken");

    useEffect(() => {
        fetchEmailNoti();
        fetchFirebaseNoti();
        fetchWhatsappNoti();
    }, [])

    const fetchEmailNoti = async () => {

        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + '/api/dashboard/settings/notifications',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            console.log(response.data)

            if (response.data.status === 'success') {
                console.log(response.data.firebase);
                console.log(response.data.email);

                const settings = response.data.email;
                setMailer(settings.mailer);
                setMailHost(settings.host);
                setMailPort(settings.port);
                setMailUsername(settings.username);
                setMailPassword(settings.password);
                setmailEntryption(settings.encryption);
                setMailAddress(settings.from_address);
                setMailName(settings.from_name);


            } else {
                alert('aaaaaaaaaaaaa');
            }
        } catch (error: any) {
            if (error.response.status == 401) navigate('/login')
        }
    };

    const fetchFirebaseNoti = async () => {

        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + '/api/dashboard/settings/notifications',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            console.log(response.data)

            if (response.data.status === 'success') {
                console.log(response.data.firebase);
                const settings = response.data.firebase;
                setApiKey(settings.api_key);
                setProjectId(settings.project_id);
                setAuthDomain(settings.auth_domain);
                setStorageBucket(settings.storage_bucket);
                setSenderId(settings.messaging_sender_id);
                setAppid(settings.app_id);
                setServerKey(settings.server_key);
                setKeyPair(settings.key_pair);



            } else {
                alert('aaaaaaaaaaaaa');
            }
        } catch (error: any) {
            if (error.response.status == 401) navigate('/login')
        }
    };

    const fetchWhatsappNoti = async () => {

        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + '/api/dashboard/settings/notifications',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            console.log(response.data)

            if (response.data.status === 'success') {
                console.log("whatssapp", response.data.whatsapp);
                const settings = response.data.whatsapp;
                setUserName(settings.user_name);
                setPassword(settings.password);
                setToken(settings.token);
                setWhatsappId(settings.whatsapp_id);




            } else {
                alert('aaaaaaaaaaaaa');
            }
        } catch (error: any) {
            if (error.response.status == 401) navigate('/login')
        }
    };


    useEffect(() => {
        dispatch(setPageTitle('Validation'));
    });


    const emailSave = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: window.location.origin + '/api/dashboard/settings/notifications/store',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },

                data: {
                    action: 'email',
                    mailer: mailer1,
                    host: mailHost,
                    port: mailPassword,
                    username: mailUsername,
                    password: mailPassword,
                    encryption: mailEncription,
                    from_address: mailAddress,
                    from_name: mailName,

                },

            })
            console.log(response.data);

            if (response.data.status == 'success') {
                alert('Updated successfully')
            }


        } catch (error: any) {

            if (error.response.status == 401) navigate('/login')

        }

    }

    const saveFirebase = async () => {
        alert(99)

        try {
            const response = await axios({
                method: 'POST',
                url: window.location.origin + '/api/dashboard/settings/notifications/store',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },

                data: {
                    action: 'firebase',
                    api_key: apiKey,
                    project_id: projectId,
                    auth_domain: authDomain,
                    storage_bucket: storageBucket,
                    messaging_sender_id: senderId,
                    app_id: appId,
                    server_key: serverKey,
                    key_pair: keyPair,


                },

            })
            console.log(response.data);
            if (response.data.status == 'success') {
                alert('updated successfully')
            }


        } catch (error: any) {

            if (error.response.status == 401) navigate('/login')

        }

    }

    const saveWhatsapp = async () => {

        try {
            const response = await axios({
                method: 'POST',
                url: window.location.origin + '/api/dashboard/settings/notifications/store',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },

                data: {
                    action: 'whatsapp',
                    user_name: userName,
                    password: password,
                    token: token,
                    whatsapp_id: whatsappId,


                },

            })
            console.log(response.data);
            if (response.data.status == 'success') {
                alert(response.data.message)
            }


        } catch (error: any) {

            if (error.response.status == 401) navigate('/login')

        }

    }

    return (
        <div>
            <div className="panel" id="justify_center_pills">
                <div className="mb-5 flex items-center justify-between">
                    <h5 className="text-2xl font-semibold dark:text-white-light">Notifications</h5>

                </div>
                <div className="mb-5">
                    <Tab.Group>
                        <Tab.List className="mt-3 flex flex-wrap justify-center space-x-2 rtl:space-x-reverse">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-primary text-white !outline-none text-lg' : ''}
                                                    before:inline-block' -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white text-lg`}
                                    >
                                        Email Notification
                                    </button>
                                )}
                            </Tab>

                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button

                                        className={`${selected ? 'bg-primary text-white !outline-none text-lg' : ''}
                                                    before:inline-block' -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white text-lg`}
                                    >
                                        FireBase Notification
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button

                                        className={`${selected ? 'bg-dark text-white !outline-none text-lg' : ''}
                                                    before:inline-block' -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white text-lg`}
                                    >
                                        Whatsapp Notification
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="panel">
                                    <div className="prose bg-[#f1f2f3] px-4 py-9 sm:px-8 rounded max-w-full dark:bg-[#1b2e4b] dark:text-white-light w-full mb-5">
                                        <form>
                                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                                                <div className="flex mb-2">
                                                    <div className="grid grid-cols-3">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm" >Mail_Mailer</span>
                                                        </div>


                                                        <div className="col-span-2">
                                                            <input id="spiLeft" type="text" onChange={(e) => setMailer(e.target.value)} value={mailer1} placeholder="mail_mailer" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                        </div>
                                                        {!mailer1 ? <div className="text-danger mt-1">Mailer is required</div> : ''}

                                                    </div>
                                                </div>
                                                <div>


                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Mail_Host</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setMailHost(e.target.value)} value={mailHost} placeholder="mail_host" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />

                                                    </div>
                                                    {!mailHost ? <div className="text-danger mt-1">mailHost is required</div> : ''}


                                                </div>
                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Mail_Port</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setMailPort(e.target.value)} value={mailPort} placeholder="mail_port" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />

                                                    </div>
                                                    {!mailPort ? <div className="text-danger mt-1">mailPort is required</div> : ''}
                                                </div>
                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Mail_UserName</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setMailUsername(e.target.value)} value={mailUsername} placeholder="mail_username" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!mailUsername ? <div className="text-danger mt-1">mailUsername is required</div> : ''}

                                                </div>
                                                <div>


                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Mail_Password</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setMailPassword(e.target.value)} value={mailPassword} placeholder="mail_password" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!mailPassword ? <div className="text-danger mt-1">mailPassword is required</div> : ''}

                                                </div>
                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Mail_Encryption</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setmailEntryption(e.target.value)} value={mailEncription} placeholder="mail_encryption" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!mailEncription ? <div className="text-danger mt-1">mailEncription is required</div> : ''}
                                                </div>
                                                <div>


                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Mail From Address</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setMailAddress(e.target.value)} value={mailAddress} placeholder="mail_from_address" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!mailAddress ? <div className="text-danger mt-1">mailAddress is required</div> : ''}
                                                </div>

                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Mail From Name</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setMailName(e.target.value)} value={mailName} placeholder="Mail_from_name" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!mailName ? <div className="text-danger mt-1">mailName is required</div> : ''}
                                                </div>

                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button type="button" className="btn btn-primary mt-6" onClick={emailSave} >
                                                    Update
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="panel">
                                    <div className="prose bg-[#f1f2f3] px-4 py-9 sm:px-8 rounded max-w-full dark:bg-[#1b2e4b] dark:text-white-light w-full mb-5">
                                        <form>
                                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Api_Key</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setApiKey(e.target.value)} value={apiKey} placeholder="api_key" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!apiKey ? <div className="text-danger mt-1">apiKey is required</div> : ''}
                                                </div>


                                                <div><div className="flex mb-2">
                                                    <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                        <span className="text-white text-sm">Auth_Domain</span>
                                                    </div>
                                                    <input id="spiLeft" type="text" onChange={(e) => setAuthDomain(e.target.value)} value={authDomain} placeholder="auth_domain" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                </div>
                                                    {!authDomain ? <div className="text-danger mt-1">auth domain is required</div> : ''}
                                                </div>

                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Project_Id</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setProjectId(e.target.value)} value={projectId} placeholder="project_id" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!projectId ? <div className="text-danger mt-1">projectId is required</div> : ''}
                                                </div>

                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Storage_bucket</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setStorageBucket(e.target.value)} value={storageBucket} placeholder="storage_bucket" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!storageBucket ? <div className="text-danger mt-1">storageBucket is required</div> : ''}
                                                </div>

                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Message_Id</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setSenderId(e.target.value)} value={senderId} placeholder="message_id" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!senderId ? <div className="text-danger mt-1">senderId is required</div> : ''}
                                                </div>


                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">App_Id</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" placeholder="app_id" onChange={(e) => setAppid(e.target.value)} value={appId} className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!appId ? <div className="text-danger mt-1">appId is required</div> : ''}
                                                </div>

                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Server_Key</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setServerKey(e.target.value)} value={serverKey} placeholder="server_key" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!serverKey ? <div className="text-danger mt-1">serverKey is required</div> : ''}
                                                </div>
                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">KeyPair</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setKeyPair(e.target.value)} value={keyPair} placeholder="keypair" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!keyPair ? <div className="text-danger mt-1">keyPair is required</div> : ''}
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button type="button" onClick={() => { saveFirebase() }} className="btn btn-primary mt-6">
                                                    Update
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="panel">
                                    <div className="prose bg-[#f1f2f3] px-4 py-9 sm:px-8 rounded max-w-full dark:bg-[#1b2e4b] dark:text-white-light w-full mb-5">
                                        <form>
                                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-2">
                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Username</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setUserName(e.target.value)} value={userName} placeholder="userName" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!userName ? <div className="text-danger mt-1">userName is required</div> : ''}
                                                </div>

                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Password</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!password ? <div className="text-danger mt-1">password is required</div> : ''}
                                                </div>

                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Token</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setToken(e.target.value)} value={token} placeholder="token" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!token ? <div className="text-danger mt-1">token is required</div> : ''}
                                                </div>
                                                <div>
                                                    <div className="flex mb-2">
                                                        <div className="bg-[#1b2e4b] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                            <span className="text-white text-sm">Whatsapp_Id</span>
                                                        </div>
                                                        <input id="spiLeft" type="text" onChange={(e) => setWhatsappId(e.target.value)} value={whatsappId} placeholder="whatsappId" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                                                    </div>
                                                    {!whatsappId ? <div className="text-danger mt-1">whatsappId is required</div> : ''}
                                                </div>


                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button type="button" onClick={() => { saveWhatsapp() }} className="btn btn-primary mt-6">
                                                    Update
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
