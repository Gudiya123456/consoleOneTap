import { lazy } from 'react';
import Dashboard from '../pages/Dashboard';
import Restaurant from '../pages/restaurant/Index';
import Authorization from '../pages/authorization/Index';
import Activation from '../pages/authorization/Activation';
import Pricing from '../pages/package/Index';
import Payment from '../pages/payment/Index';


import Features from '../pages/features/Index';
import Roles from '../pages/roles/Roles';
import RestaurantView from '../pages/restaurant/Show';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Banner from '../pages/public-site/Banner';
import Integration from '../pages/public-site/Integration';
import Settings from '../pages/public-site/Settings';
import View from '../pages/roles/View';
import Demorequest from '../pages/public-site/Demorequest';
import RolesView from '../pages/roles/View';
import SettingsIndex from '../pages/public-site/Index';
import Profile from '../pages/profile/Index';
import Support from '../pages/support/Support';
import Billing from '../pages/billing/Billing';
import Invoice from '../pages/invoice/Invoice';
import NewForgot from '../pages/auth/NewForgot';
import NewResetPassword from '../pages/auth/NewResetPassword';

const routes = [
    // dashboard
    // {
    //     path: '/',
    //     element: <Index/>,
    //     layout: 'blank',
    // },
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/forgotpassword',
        element: <NewForgot />,
        layout: 'blank',
    },
    {
        path: '/reset',
        element: <NewResetPassword />,
        layout: 'blank',
    },

    {
        path: '/',
        element: <Dashboard />,
        layout: 'default',
    },

    //Restaurant
    {
        path: '/restaurants',
        element: <Restaurant />,
        layout: 'default',
    },
    {
        path: '/restaurants/view',
        element: <RestaurantView />,
        layout: 'default',
    },
    {
        path: '/profile',
        element: <Profile />,
        layout: 'default',
    },



    //Authorization
    {
        path: '/authorization',
        element: <Authorization />,
        layout: 'default',
    },

    {
        path: '/support',
        element: <Support />,
        layout: 'default',
    },
    {
        path: '/billing',
        element: <Billing />,
        layout: 'default',
    },
    {
        path: '/invoice',
        element: <Invoice />,
        layout: 'default',
    },

    {
        path: '/activation',
        element: <Activation />,
        layout: 'blank'
    }
    ,
    //Packages
    {
        path: '/pricing',
        element: <Pricing />,
        layout: 'default',
    },

    {
        path: '/pricing/features',
        element: <Features />,
        layout: 'default',
    },

    {
        path: '/pricing/features',
        element: <Features />,
        layout: 'default',
    },

    //Packages
    {
        path: '/payment',
        element: <Payment />,
        layout: 'default',
    },

    //Public Site
    {
        path: '/banner',
        element: <Banner />,
        layout: 'default',
    },

    {
        path: '/demorequest',
        element: <Demorequest />,
        layout: 'default',
    },

    {
        path: '/integrations',
        element: <Integration />,
        layout: 'default',
    },

    {
        path: '/settings',
        element: <SettingsIndex />,
        layout: 'default',
    },


    //Roles
    {
        path: '/authorization/roles',
        element: <Roles />,
        layout: 'default',
    },

    {
        path: '/authorization/roles/view',
        element: <RolesView />,
        layout: 'default',
    },

];


export { routes };
