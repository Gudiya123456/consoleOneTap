import React from "react";
import { Tab } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { SiRazorpay } from "react-icons/si";
import { PiStripeLogoLight } from "react-icons/pi";
import { SiPaytm } from "react-icons/si";
import { SiPhonepe } from "react-icons/si";
import { FaPaypal } from "react-icons/fa";
import { FaCcAmazonPay } from "react-icons/fa";
import IconEye from "../../components/Icon/IconEye";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import IconUserPlus from "../../components/Icon/IconUserPlus";
import IconSearch from "../../components/Icon/IconSearch";
import IconUser from "../../components/Icon/IconUser";
import IconX from "../../components/Icon/IconX";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { setPageTitle } from "../../store/themeConfigSlice";
import PageLoader from "../../components/Layouts/PageLoader";
import axios from "axios";
import { IRootState } from "../../../../console/store";


const Payment = () => {
    const dispatch = useDispatch();
    const restaurantToken = useSelector((state: IRootState) => state.themeConfig.restaurantToken);
    const currentBranch = useSelector((state: IRootState) => state.themeConfig.currentBranch);
    useEffect(() => {
        dispatch(setPageTitle('Payment'));
    });

    const [isLoading, setIsLoading] = useState(true);

    const [paymentGateways, setPaymentGateways] = useState([]);

    const fetchPaymentGteWay = async () => {
        setIsLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: window.location.origin + "/api/restaurant/dashboard/payment-gateways",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + restaurantToken,
                    'Current-Branch': currentBranch.id
                },
            });

            if (response.data.status == "success") {
                setPaymentGateways(response.data.paymentGateways)
            }
        } catch (error) {

            alert("errror")

        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        fetchPaymentGteWay()
    }, [])

    const [gateWay, setGateWay] = useState({});
    const [enabledGateay, setEnabledGateway] = useState('');
    const [razorPay, setRazorPay] = useState<any>('');
    const [stripe, setStripe] = useState<any>('');
    const [paytm, setPaytm] = useState<any>('');
    const [phonePe, setPhonePe] = useState<any>('');
    const [payPal, setPayPal] = useState<any>('');
    const [amazonPay, setAmazonPay] = useState<any>('');
    useEffect(() => {

        const z = paymentGateways.find((p: any) => p.is_enabled == true);
        if (z) setEnabledGateway(z.gateway_name)
        const a = paymentGateways.find((p: any) => p.gateway_name == "RazorPay");
        setRazorPay(a ? a : { gateway_name: "RazorPay", environment: '0', is_enabled: '0' })
        const b = paymentGateways.find((p: any) => p.gateway_name == "Stripe");
        setStripe(b ? b : { gateway_name: "Stripe", environment: '0', is_enabled: '0' })
        const c = paymentGateways.find((p: any) => p.gateway_name == "Paytm");
        setPaytm(c ? c : { gateway_name: "Paytm", environment: '0', is_enabled: '0' })
        const d = paymentGateways.find((p: any) => p.gateway_name == "PhonePe");
        setPhonePe(d ? d : { gateway_name: "PhonePe", environment: '0', is_enabled: '0' })
        const e = paymentGateways.find((p: any) => p.gateway_name == "PayPal");
        setPayPal(e ? e : { gateway_name: "PayPal", environment: '0', is_enabled: '0' })
        const f = paymentGateways.find((p: any) => p.gateway_name == "AmazonPay");
        setAmazonPay(f ? f : { gateway_name: "AmazonPay", environment: '0', is_enabled: '0' })

        console.log(razorPay)
    }, [paymentGateways])

    const [errors, setErros] = useState<any>({});

    const validate = (gateWay) => {
        setErros({});
        let errors = {};
        if (!gateWay.payment_gateway_name) errors = { ...errors, payment_gateway_name: "payment gateway name is required" };
        if (gateWay.environment == '') errors = { ...errors, environment: "environment is required" };
        if (!gateWay.key) errors = { ...errors, key: "key is required" };
        if (!gateWay.secret) errors = { ...errors, secret: "secret is required" };
        setErros(errors);

        console.log(errors)
        return { totalErrors: Object.keys(errors).length };
    };


    const storeOrUpdateApi = async (data) => {

        try {

            const response = await axios({
                method: 'post',
                url:"https://cdn.onetapdine.com/api/payment-gateways",
                data,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + restaurantToken,
                    'Current-Branch': currentBranch.id
                },
            });
            console.log('jdkjkgffgf')

            if (response.data.status == "success") {
                setPaymentGateways(response.data.paymentGateways)
                Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });
            }

        } catch (error) {
            console.log(error)

        } finally {


        }
    }

    const configPaymentGateWay = async (a) => {

        console.log(razorPay)
        setGateWay(a.payment_gateway_name)
        const isValid = validate(a);
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("payment_gateway_name", a.payment_gateway_name);
        data.append("environment", a.environment);
        data.append("secret", a.secret);
        data.append("key", a.key);
        data.append("is_enabled", a.is_enabled);
        storeOrUpdateApi(data);
    }

    return (
        <div>

            {isLoading ? <PageLoader /> : (

                <>
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-xl font-bold dark:text-white-light">
                            Payment Credentials
                        </h5>
                    </div>
                    <div className="panel p-1" id="line">
                        <div className="mb-5">
                            <Tab.Group>
                                <Tab.List className="flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected
                                                    ? "text-secondary !outline-none before:!w-full"
                                                    : ""
                                                    }
                                                    before:inline-block' relative -mb-[1px] flex items-center p-3 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-1 before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                            >
                                                <SiRazorpay className="ltr:mr-2 rtl:ml-2" />
                                                Razorpay
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected
                                                    ? "text-secondary !outline-none before:!w-full"
                                                    : ""
                                                    }
                                                before:inline-block' relative -mb-[1px] flex items-center p-3 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-1 before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                            >
                                                <PiStripeLogoLight className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                                Stripe
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected
                                                    ? "text-secondary !outline-none before:!w-full"
                                                    : ""
                                                    }
                                                before:inline-block' relative -mb-[1px] flex items-center p-3 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-1 before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                            >
                                                <SiPaytm className="ltr:mr-2 rtl:ml-2 text-lg" />
                                                Paytm
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected
                                                    ? "text-secondary !outline-none before:!w-full"
                                                    : ""
                                                    }
                                                before:inline-block' relative -mb-[1px] flex items-center p-3 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-1 before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                            >
                                                <SiPhonepe className="ltr:mr-2 rtl:ml-2" />
                                                PhonePe
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected
                                                    ? "text-secondary !outline-none before:!w-full"
                                                    : ""
                                                    }
                                                before:inline-block' relative -mb-[1px] flex items-center p-3 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-1 before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                            >
                                                <FaPaypal className="ltr:mr-2 rtl:ml-2" />
                                                Paypal
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected
                                                    ? "text-secondary !outline-none before:!w-full"
                                                    : ""
                                                    }
                                                before:inline-block' relative -mb-[1px] flex items-center p-3 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-1 before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                            >
                                                <FaCcAmazonPay className="ltr:mr-2 rtl:ml-2" />
                                                Amazon Payment
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected
                                                    ? "text-secondary !outline-none before:!w-full"
                                                    : ""
                                                    }
                                                before:inline-block' relative -mb-[1px] flex items-center p-3 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-1 before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                            >
                                                <LiaMoneyBillWaveSolid className="ltr:mr-2 rtl:ml-2" />
                                                Offline Payment
                                            </button>
                                        )}
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                        <div className="active pt-5 p-2.5">
                                            <form>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="ctnEmail">
                                                                Select Environment
                                                            </label>
                                                            <select className="form-select text-white-dark"
                                                                value={razorPay?.environment ? razorPay.environment : ''}
                                                                onChange={(e) => setRazorPay({ ...razorPay, environment: e.target.value })}
                                                            >
                                                                <option value="">
                                                                    Open this select menu
                                                                </option>
                                                                <option value={1}>Live</option>
                                                                <option value={0}>Demo</option>
                                                            </select>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "RazorPay" && errors.environment ? errors.environment : ''}</span>
                                                    </div>


                                                    <div className="mb-5">
                                                        <label htmlFor="number">Status</label>
                                                        <div>
                                                            <label className="inline-flex">
                                                                <input
                                                                    id="status5"
                                                                    name="status"
                                                                    type="radio"
                                                                    className="form-radio text-success peer"
                                                                    defaultChecked={razorPay.is_enabled == 1 ? true : false}
                                                                    value={1}
                                                                    onClick={(e) => setRazorPay({ ...razorPay, is_enabled: 1 })}
                                                                />
                                                                <span className="peer-checked:text-success">Enabled</span>
                                                            </label>
                                                            <label className="inline-flex ml-3">
                                                                <input
                                                                    id="status4"
                                                                    name="status"
                                                                    type="radio"
                                                                    defaultChecked={razorPay.is_enabled == 0 ? true : false}
                                                                    value={0}
                                                                    onClick={(e) => setRazorPay({ ...razorPay, is_enabled: 0 })}
                                                                    className="form-radio text-danger peer"
                                                                />
                                                                <span className="peer-checked:text-danger">Blocked</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "RazorPay" && errors.is_enabled ? errors.is_enabled : ''}</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="">
                                                                Test Razorpay Key{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. AW-Ydt5KHz2FwhAikHsObpRrpB55qE8MyvUkHbQsFb_6_2Unv3WNBSmBxEqA8N74JzOaFTPBUI-MG4sB"
                                                                className="form-input"
                                                                value={razorPay?.key ? razorPay.key : ''}
                                                                onChange={(e) => setRazorPay({ ...razorPay, key: e.target.value })}
                                                            />
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "RazorPay" && errors.key ? errors.key : ''}</span>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="">
                                                            Test Razorpay Secret{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <div className="flex">
                                                            <input
                                                                id="iconRight"
                                                                type="text"
                                                                className="form-input ltr:rounded-r-none rtl:rounded-l-none"
                                                                value={razorPay?.secret ? razorPay.secret : ''}
                                                                onChange={(e) => setRazorPay({ ...razorPay, secret: e.target.value })}
                                                            />
                                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                                <IconEye className="text-white-dark" />
                                                            </div>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "RazorPay" && errors.secret ? errors.secret : ''}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-info"
                                                        onClick={() => configPaymentGateWay(razorPay)}
                                                    >
                                                        Config
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div className="active pt-5 p-2.5">
                                            <form>


                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="ctnEmail">
                                                                Select Environment
                                                            </label>
                                                            <select className="form-select text-white-dark"
                                                                value={stripe?.environment ? stripe.environment : ''}
                                                                onChange={(e) => setStripe({ ...stripe, environment: e.target.value })}
                                                            >
                                                                <option value="">
                                                                    Open this select menu
                                                                </option>
                                                                <option value={1}>Live</option>
                                                                <option value={0}>Demo</option>
                                                            </select>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "Stripe" && errors.environment ? errors.environment : ''}</span>
                                                    </div>


                                                    <div className="mb-5">
                                                        <label htmlFor="number">Status</label>
                                                        <div>
                                                            <label className="inline-flex">
                                                                <input
                                                                    id="status5"
                                                                    name="status"
                                                                    type="radio"
                                                                    className="form-radio text-success peer"
                                                                    defaultChecked={stripe.is_enabled == 1 ? true : false}
                                                                    value={1}
                                                                    onClick={(e) => setStripe({ ...stripe, is_enabled: 1 })}
                                                                />
                                                                <span className="peer-checked:text-success">Enabled</span>
                                                            </label>
                                                            <label className="inline-flex ml-3">
                                                                <input
                                                                    id="status4"
                                                                    name="status"
                                                                    type="radio"
                                                                    defaultChecked={stripe.is_enabled == 0 ? true : false}
                                                                    value={0}
                                                                    onClick={(e) => setStripe({ ...stripe, is_enabled: 0 })}
                                                                    className="form-radio text-danger peer"
                                                                />
                                                                <span className="peer-checked:text-danger">Blocked</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "Stripe" && errors.is_enabled ? errors.is_enabled : ''}</span>
                                                    </div>
                                                </div>


                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="">
                                                                Test Stripe Publishable Key{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. AW-Ydt5KHz2FwhAikHsObpRrpB55qE8MyvUkHbQsFb_6_2Unv3WNBSmBxEqA8N74JzOaFTPBUI-MG4sB"
                                                                className="form-input"
                                                                value={stripe?.key ? stripe.key : ''}
                                                                onChange={(e) => setStripe({ ...stripe, key: e.target.value })}
                                                            />
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "Stripe" && errors.key ? errors.key : ''}</span>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="">
                                                            Test Stripe Secret{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <div className="flex">
                                                            <input
                                                                id="iconRight"
                                                                type="text"
                                                                className="form-input ltr:rounded-r-none rtl:rounded-l-none"
                                                                value={stripe?.secret ? stripe.secret : ''}
                                                                onChange={(e) => setStripe({ ...stripe, secret: e.target.value })}
                                                            />
                                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                                <IconEye className="text-white-dark" />
                                                            </div>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "Stripe" && errors.secret ? errors.secret : ''}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-info"
                                                        onClick={() => configPaymentGateWay(stripe)}
                                                    >
                                                        Config
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div className="active pt-5 p-2.5">
                                            <form>


                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="ctnEmail">
                                                                Select Environment
                                                            </label>
                                                            <select className="form-select text-white-dark"
                                                                value={paytm?.environment ? paytm.environment : ''}
                                                                onChange={(e) => setPaytm({ ...paytm, environment: e.target.value })}
                                                            >
                                                                <option value="">
                                                                    Open this select menu
                                                                </option>
                                                                <option value={1}>Live</option>
                                                                <option value={0}>Demo</option>
                                                            </select>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "Paytm" && errors.environment ? errors.environment : ''}</span>
                                                    </div>


                                                    <div className="mb-5">
                                                        <label htmlFor="number">Status</label>
                                                        <div>
                                                            <label className="inline-flex">
                                                                <input
                                                                    id="status5"
                                                                    name="status"
                                                                    type="radio"
                                                                    className="form-radio text-success peer"
                                                                    defaultChecked={paytm.is_enabled == 1 ? true : false}
                                                                    value={1}
                                                                    onClick={(e) => setPaytm({ ...paytm, is_enabled: 1 })}
                                                                />
                                                                <span className="peer-checked:text-success">Enabled</span>
                                                            </label>
                                                            <label className="inline-flex ml-3">
                                                                <input
                                                                    id="status4"
                                                                    name="status"
                                                                    type="radio"
                                                                    defaultChecked={paytm.is_enabled == 0 ? true : false}
                                                                    value={0}
                                                                    onClick={(e) => setPaytm({ ...paytm, is_enabled: 0 })}
                                                                    className="form-radio text-danger peer"
                                                                />
                                                                <span className="peer-checked:text-danger">Blocked</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "Paytm" && errors.is_enabled ? errors.is_enabled : ''}</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="">
                                                                Test Paytm Key{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. AW-Ydt5KHz2FwhAikHsObpRrpB55qE8MyvUkHbQsFb_6_2Unv3WNBSmBxEqA8N74JzOaFTPBUI-MG4sB"
                                                                className="form-input"
                                                                value={paytm?.key ? paytm.key : ''}
                                                                onChange={(e) => setPaytm({ ...paytm, key: e.target.value })}
                                                            />
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "Paytm" && errors.key ? errors.key : ''}</span>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="">
                                                            Test Paytm Secret{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <div className="flex">
                                                            <input
                                                                id="iconRight"
                                                                type="text"
                                                                className="form-input ltr:rounded-r-none rtl:rounded-l-none"
                                                                value={paytm?.secret ? paytm.secret : ''}
                                                                onChange={(e) => setPaytm({ ...paytm, secret: e.target.value })}
                                                            />
                                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                                <IconEye className="text-white-dark" />
                                                            </div>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "Paytm" && errors.secret ? errors.secret : ''}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-info"
                                                        onClick={() => configPaymentGateWay(paytm)}
                                                    >
                                                        Config
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        {" "}
                                        <div className="active pt-5 p-2.5">
                                            <form>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="ctnEmail">
                                                                Select Environment
                                                            </label>
                                                            <select className="form-select text-white-dark"
                                                                value={phonePe?.environment ? phonePe.environment : ''}
                                                                onChange={(e) => setPhonePe({ ...phonePe, environment: e.target.value })}
                                                            >
                                                                <option value="">
                                                                    Open this select menu
                                                                </option>
                                                                <option value={1}>Live</option>
                                                                <option value={0}>Demo</option>
                                                            </select>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "PhonePe" && errors.environment ? errors.environment : ''}</span>
                                                    </div>


                                                    <div className="mb-5">
                                                        <label htmlFor="number">Status</label>
                                                        <div>
                                                            <label className="inline-flex">
                                                                <input
                                                                    id="status5"
                                                                    name="status"
                                                                    type="radio"
                                                                    className="form-radio text-success peer"
                                                                    defaultChecked={phonePe.is_enabled == 1 ? true : false}
                                                                    value={1}
                                                                    onClick={(e) => setPhonePe({ ...phonePe, is_enabled: 1 })}
                                                                />
                                                                <span className="peer-checked:text-success">Enabled</span>
                                                            </label>
                                                            <label className="inline-flex ml-3">
                                                                <input
                                                                    id="status4"
                                                                    name="status"
                                                                    type="radio"
                                                                    defaultChecked={phonePe.is_enabled == 0 ? true : false}
                                                                    value={0}
                                                                    onClick={(e) => setPhonePe({ ...phonePe, is_enabled: 0 })}
                                                                    className="form-radio text-danger peer"
                                                                />
                                                                <span className="peer-checked:text-danger">Blocked</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "PhonePe" && errors.is_enabled ? errors.is_enabled : ''}</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="">
                                                                Test PhonePe Key{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. AW-Ydt5KHz2FwhAikHsObpRrpB55qE8MyvUkHbQsFb_6_2Unv3WNBSmBxEqA8N74JzOaFTPBUI-MG4sB"
                                                                className="form-input"
                                                                value={phonePe?.key ? phonePe.key : ''}
                                                                onChange={(e) => setPhonePe({ ...phonePe, key: e.target.value })}
                                                            />
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "PhonePe" && errors.key ? errors.key : ''}</span>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="">
                                                            Test PhonePe Secret{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <div className="flex">
                                                            <input
                                                                id="iconRight"
                                                                type="text"
                                                                className="form-input ltr:rounded-r-none rtl:rounded-l-none"
                                                                value={phonePe?.secret ? phonePe.secret : ''}
                                                                onChange={(e) => setPhonePe({ ...phonePe, secret: e.target.value })}
                                                            />
                                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                                <IconEye className="text-white-dark" />
                                                            </div>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "PhonePe" && errors.secret ? errors.secret : ''}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-info"
                                                        onClick={() => configPaymentGateWay(phonePe)}
                                                    >
                                                        save
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div className="active pt-5 p-2.5">
                                            <form>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="ctnEmail">
                                                                Select Environment
                                                            </label>
                                                            <select className="form-select text-white-dark"
                                                                value={payPal?.environment ? payPal.environment : ''}
                                                                onChange={(e) => setPayPal({ ...payPal, environment: e.target.value })}
                                                            >
                                                                <option value="">
                                                                    Open this select menu
                                                                </option>
                                                                <option value={1}>Live</option>
                                                                <option value={0}>Demo</option>
                                                            </select>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "PayPal" && errors.environment ? errors.environment : ''}</span>
                                                    </div>


                                                    <div className="mb-5">
                                                        <label htmlFor="number">Status</label>
                                                        <div>
                                                            <label className="inline-flex">
                                                                <input
                                                                    id="status5"
                                                                    name="status"
                                                                    type="radio"
                                                                    className="form-radio text-success peer"
                                                                    defaultChecked={payPal.is_enabled == 1 ? true : false}
                                                                    value={1}
                                                                    onClick={(e) => setPayPal({ ...payPal, is_enabled: 1 })}
                                                                />
                                                                <span className="peer-checked:text-success">Enabled</span>
                                                            </label>
                                                            <label className="inline-flex ml-3">
                                                                <input
                                                                    id="status4"
                                                                    name="status"
                                                                    type="radio"
                                                                    defaultChecked={payPal.is_enabled == 0 ? true : false}
                                                                    value={0}
                                                                    onClick={(e) => setPayPal({ ...payPal, is_enabled: 0 })}
                                                                    className="form-radio text-danger peer"
                                                                />
                                                                <span className="peer-checked:text-danger">Blocked</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "PayPal" && errors.is_enabled ? errors.is_enabled : ''}</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="">
                                                                Paypal Client Id{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. AW-Ydt5KHz2FwhAikHsObpRrpB55qE8MyvUkHbQsFb_6_2Unv3WNBSmBxEqA8N74JzOaFTPBUI-MG4sB"
                                                                className="form-input"
                                                                value={payPal?.key ? payPal.key : ''}
                                                                onChange={(e) => setPayPal({ ...payPal, key: e.target.value })}
                                                            />
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "PayPal" && errors.key ? errors.key : ''}</span>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="">
                                                            Paypal Secret{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <div className="flex">
                                                            <input
                                                                id="iconRight"
                                                                type="text"
                                                                className="form-input ltr:rounded-r-none rtl:rounded-l-none"
                                                                value={payPal?.secret ? payPal.secret : ''}
                                                                onChange={(e) => setPayPal({ ...payPal, secret: e.target.value })}
                                                            />
                                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                                <IconEye className="text-white-dark" />
                                                            </div>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "PayPal" && errors.secret ? errors.secret : ''}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-info"
                                                        onClick={() => configPaymentGateWay(payPal)}
                                                    >
                                                        Config
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div className="active pt-5 p-2.5">
                                            <form>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="ctnEmail">
                                                                Select Environment
                                                            </label>
                                                            <select className="form-select text-white-dark"
                                                                value={amazonPay?.environment ? amazonPay.environment : ''}
                                                                onChange={(e) => setAmazonPay({ ...amazonPay, environment: e.target.value })}
                                                            >
                                                                <option value="">
                                                                    Open this select menu
                                                                </option>
                                                                <option value={1}>Live</option>
                                                                <option value={0}>Demo</option>
                                                            </select>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "AmazonPay" && errors.environment ? errors.environment : ''}</span>
                                                    </div>


                                                    <div className="mb-5">
                                                        <label htmlFor="number">Status</label>
                                                        <div>
                                                            <label className="inline-flex">
                                                                <input
                                                                    id="status5"
                                                                    name="status"
                                                                    type="radio"
                                                                    className="form-radio text-success peer"
                                                                    defaultChecked={amazonPay.is_enabled == 1 ? true : false}
                                                                    value={1}
                                                                    onClick={(e) => setAmazonPay({ ...amazonPay, is_enabled: 1 })}
                                                                />
                                                                <span className="peer-checked:text-success">Enabled</span>
                                                            </label>
                                                            <label className="inline-flex ml-3">
                                                                <input
                                                                    id="status4"
                                                                    name="status"
                                                                    type="radio"
                                                                    defaultChecked={amazonPay.is_enabled == 0 ? true : false}
                                                                    value={0}
                                                                    onClick={(e) => setAmazonPay({ ...amazonPay, is_enabled: 0 })}
                                                                    className="form-radio text-danger peer"
                                                                />
                                                                <span className="peer-checked:text-danger">Blocked</span>
                                                            </label>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "AmazonPay" && errors.is_enabled ? errors.is_enabled : ''}</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="">
                                                                Test AmazonPay Key{" "}
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. AW-Ydt5KHz2FwhAikHsObpRrpB55qE8MyvUkHbQsFb_6_2Unv3WNBSmBxEqA8N74JzOaFTPBUI-MG4sB"
                                                                className="form-input"
                                                                value={amazonPay?.key ? amazonPay.key : ''}
                                                                onChange={(e) => setAmazonPay({ ...amazonPay, key: e.target.value })}
                                                            />
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "AmazonPay" && errors.key ? errors.key : ''}</span>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="">
                                                            Test AmazonPay Secret{" "}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <div className="flex">
                                                            <input
                                                                id="iconRight"
                                                                type="text"
                                                                className="form-input ltr:rounded-r-none rtl:rounded-l-none"
                                                                value={amazonPay?.secret ? amazonPay.secret : ''}
                                                                onChange={(e) => setAmazonPay({ ...amazonPay, secret: e.target.value })}
                                                            />
                                                            <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                                <IconEye className="text-white-dark" />
                                                            </div>
                                                        </div>
                                                        <span className="text-danger font-black mx-3">{gateWay == "AmazonPay" && errors.secret ? errors.secret : ''}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-info"
                                                        onClick={() => configPaymentGateWay(amazonPay)}
                                                    >
                                                        Config
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div>

                                        </div>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
};

export default Payment;
