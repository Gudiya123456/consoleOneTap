import { lazy } from 'react';
import ContactUs from '../pages/scan&order/privacy/ContactUs';
import Cookies from '../pages/scan&order/privacy/Cookies';
import AbountUs from '../pages/scan&order/privacy/AboutUs';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Otp from '../pages/auth/Otp';
import Feedback from '../pages/Feedback';

const Index = lazy(() => import('../pages/Index'));
const Cart = lazy(() => import('../pages/Cart'));
const MyOrders = lazy(() => import('../pages/MyOrders'));
const OrderDetails = lazy(() => import('../pages/OrderDetails'));
const Invoice = lazy(() => import('../pages/Invoice'));
const Checkout = lazy(() => import('../pages/Checkout'));
const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },

    {
        path: '/cookies',
        element: <Cookies />,
        layout: 'blank',
    },
    {
        path: '/contact-us',
        element: <ContactUs />,
        layout: 'blank',
    },
    {
        path: '/about-us',
        element: <AbountUs />,
        layout: 'blank',
    },


    // {
    //     path: '/checkout',
    //     element: <Checkout />,
    //     layout: 'blank',
    // },
    // {
    //     path: '/order-details',
    //     element: <OrderDetails />,
    //     layout: 'blank',
    // },

    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/otp',
        element: <Otp />,
        layout: 'blank',
    },
    {
        path: '/login1',
        element: <ForgotPassword />,
        layout: 'blank',
    },
    {
        path: '/reset',
        element: <ResetPassword />,
        layout: 'blank',
    },

    {
        path: '/cart',
        element: <Cart />,
        layout: 'default',
    },

    {
        path: '/my-orders',
        element: <MyOrders />,
        layout: 'default',
    },
    {
        path: '/order-details',
        element: <OrderDetails />,
        layout: 'default',
    },

    {
        path: '/invoice',
        element: <Invoice />,
        layout: 'default',
    },
    {
        path: '/checkout',
        element: <Checkout />,
        layout: 'default',
    },
    {
        path: '/feedback',
        element: <Feedback />,
        layout: 'default',
    }

];

export { routes };
