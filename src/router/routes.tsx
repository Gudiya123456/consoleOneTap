import { lazy } from "react";
import Dashboard from "../pages/Dashboard";
import Restaurant from "../pages/restaurant/Index";
import Authorization from "../pages/authorization/Index";
// import Activation from '../pages/authorization/Activation';
import Pricing from "../pages/package/Index";
import Payment from "../pages/payment/Index";
import Roles from "../pages/roles/Roles";
import Features from "../pages/features/Index";
import Login from "../pages/auth/Login";

import Login1 from "../pages/adminrestaurants/Login";
import ForgotPassword from "../pages/adminrestaurants/ForgotPassword";
import ResetPassword from "../pages/adminrestaurants/ResetPassword";
import ActivatePassword from "../pages/adminrestaurants/ActivatePassword";
import Maintenance from "../pages/adminrestaurants/Maintenance";
import ErrorPage from "../pages/adminrestaurants/ErrorPage";
import Maintenence from "../pages/adminrestaurants/Maintenance2";

import Banner from "../pages/public-site/Banner";
import Integration from "../pages/public-site/Integration";
import Demorequest from "../pages/public-site/Demorequest";
import RolesView from "../pages/roles/View";
import SettingsIndex from "../pages/public-site/Index";
import Support from "../pages/support/Support";
import Billing from "../pages/billing/Billing";
import Invoice from "../pages/invoice/Invoice";
import NewForgot from "../pages/auth/NewForgot";
import NewResetPassword from "../pages/auth/NewResetPassword";
import Show from "../pages/restaurant/Show";
import Activation from "../pages/auth/Activation";
import InvoiceOverview from "../pages/invoice/InvoiceOverview";
import ViewInvoice from "../pages/invoice/ViewInvoice";
import ViewStatement from "../pages/invoice/ViewStatement";
import Tables from "../pages/adminrestaurants/Tables";
import InvoiceFormat from "../pages/invoice/InvoiceFormat";

const routes = [
  {
    path: "/login",
    element: <Login />,
    layout: "blank",
  },
  {
    path: "/forgotpassword",
    element: <NewForgot />,
    layout: "blank",
  },
  {
    path: "/reset",
    element: <NewResetPassword />,
    layout: "blank",
  },

  // admin restautants route
  {
    path: "/activate",
    element: <ActivatePassword />,
    layout: "blank",
  },
  {
    path: "/maintenance",
    element: <Maintenance />,
    layout: "blank",
  },
  {
    path: "/maintenance2",
    element: <Maintenence />,
    layout: "blank",
  },
  {
    path: "/errorpage",
    element: <ErrorPage />,
    layout: "blank",
  },
  {
    path: "/loginn",
    element: <Login1 />,
    layout: "blank",
  },
  {
    path: "/forgot",
    element: <ForgotPassword />,
    layout: "blank",
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
    layout: "blank",
  },

  {
    path: "/tables",
    element: <Tables />,
    layout: "blank",
  },

  {
    path: "/",
    element: <Dashboard />,
    layout: "default",
  },

  //Restaurant
  {
    path: "/restaurants",
    element: <Restaurant />,
    layout: "default",
  },
  {
    path: "/restaurant/view",
    element: <Show />,
    layout: "default",
  },

  //Authorization
  {
    path: "/authorization",
    element: <Authorization />,
    layout: "default",
  },

  {
    path: "/support",
    element: <Support />,
    layout: "default",
  },
  {
    path: "/billing",
    element: <Billing />,
    layout: "default",
  },
  {
    path: "/invoice",
    element: <Invoice />,
    layout: "default",
  },

  {
    path: "/invoice/overview",
    element: <InvoiceOverview />,
    layout: "default",
  },
  {
    path: "/invoice/overview/format",
    element: <InvoiceFormat />,
    layout: "default",
  },
  {
    path: "/invoice/view",
    element: <ViewInvoice />,
    layout: "default",
  },
  {
    path: "/invoice/view/statement",
    element: <ViewStatement />,
    layout: "default",
  },

  {
    path: "/activation",
    element: <Activation />,
    layout: "blank",
  },
  //Packages
  {
    path: "/pricing",
    element: <Pricing />,
    layout: "default",
  },

  {
    path: "/pricing/features",
    element: <Features />,
    layout: "default",
  },

  //Packages
  {
    path: "/payment",
    element: <Payment />,
    layout: "default",
  },

  //Public Site
  {
    path: "/banner",
    element: <Banner />,
    layout: "default",
  },

  {
    path: "/demorequest",
    element: <Demorequest />,
    layout: "default",
  },

  {
    path: "/integrations",
    element: <Integration />,
    layout: "default",
  },

  {
    path: "/settings",
    element: <SettingsIndex />,
    layout: "default",
  },

  //Roles
  {
    path: "/authorization/roles",
    element: <Roles />,
    layout: "default",
  },

  {
    path: "/authorization/roles/view",
    element: <RolesView />,
    layout: "default",
  },
];

export { routes };
