import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import ErrorPage from "../pages/shared/ErrorPage.jsx";
import Homepage from "../pages/homepage/Homepage.jsx";
import About from "../pages/about/About.jsx";
import My from "../pages/my/My.jsx";
import CustomerService from "../pages/my/myNav/customerService/CustomerService.jsx";
import AboutTeam from "../pages/about/AboutTeam.jsx";
import BuisnessLicense from "../pages/about/BuisnessLicense.jsx";
import MsbLicense from "../pages/about/MsbLicense.jsx";
import AboutPlatform from "../pages/about/AboutPlatform.jsx";
import AboutRecharge from "../pages/about/AboutRecharge.jsx";
import AboutWithdrawal from "../pages/about/AboutWithdrawal.jsx";
import TermsAndPolicy from "../pages/about/TermsAndPolicy.jsx";
import Recharge from "../pages/my/myNav/Recharge.jsx";
import Withdraw from "../pages/my/myNav/Withdraw.jsx";
import Invitation from "../pages/my/myOption/Invitation.jsx";
import BindUsdt from "../pages/my/myOption/BindUsdt.jsx";
import Team from "../pages/my/myOption/team/Team.jsx";
import Set from "../pages/my/myOption/set/Set.jsx";
import SetWithdrawalPassword from "../pages/my/myOption/set/SetWithdrawalPassword.jsx";
import SetLoginPassword from "../pages/my/myOption/set/SetLoginPassword.jsx";
import SetAvatar from "../pages/my/myOption/set/SetAvatar.jsx";
import OrderHistory from "../pages/my/myOption/OrderHistory.jsx";
import FundHistory from "../pages/my/myOption/FundHistory.jsx";
import Registration from "../pages/auth/Registration.jsx";
import Login from "../pages/auth/Login.jsx";
import TxidSubmit from "../pages/my/myOption/TxidSubmit.jsx";
import PrivateRoute from "../pages/auth/PrivateRoute.jsx";
import userLoader from "./userLoader.js";
import ChatList from "../pages/my/myNav/customerService/ChatList.jsx";
import Chat from "../pages/my/myNav/customerService/Chat.jsx";
import AdminRoute from "../pages/auth/AdminRoute.jsx";
import SetConfiguration from "../pages/my/myOption/set/SetConfiguration.jsx";
import configurationLoader from "./configurationLoader.js";
import ClientList from "../pages/my/myOption/clients/ClientList.jsx";
import Client from "../pages/my/myOption/clients/Client.jsx";
import SetPersonalInfo from "../pages/my/myOption/set/SetPersonalInfo.jsx";
import Authentication from "../pages/my/myOption/Authentication.jsx";
import Start from "../pages/product/Start.jsx";
import PendingNid from "../pages/my/myOption/PendingNid.jsx";
import AboutRealNameAuthentication from "../pages/about/AboutRealNameAuthentication.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: configurationLoader,
    id: "configuration",
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/about/buisness-license",
        element: <BuisnessLicense />,
      },
      {
        path: "/about/msb-license",
        element: <MsbLicense />,
      },
      {
        path: "/about/about-platform",
        element: <AboutPlatform />,
      },
      {
        path: "/about/about-recharge",
        element: <AboutRecharge />,
      },
      {
        path: "/about/about-withdrawal",
        element: <AboutWithdrawal />,
      },
      {
        path: "/about/about-team",
        element: <AboutTeam />,
      },
      {
        path: "/about/about-real-name-authentication",
        element: <AboutRealNameAuthentication />,
      },
      {
        path: "/about/terms-and-policy",
        element: <TermsAndPolicy />,
      },
      {
        element: <PrivateRoute />,
        loader: userLoader,
        id: "user",
        children: [
          {
            path: "/product",
            element: <Start />,
          },
          {
            path: "/my",
            element: <My />,
          },
          {
            path: "/my/recharge",
            element: <Recharge />,
          },
          {
            path: "/my/withdraw",
            element: <Withdraw />,
          },
          {
            path: "/my/invitation",
            element: <Invitation />,
          },
          {
            path: "/my/customer-service",
            element: <CustomerService />,
          },
          {
            path: "/my/chat/:client",
            element: <Chat />,
          },
          {
            path: "/my/authentication",
            element: <Authentication />,
          },
          {
            path: "/my/order-history",
            element: <OrderHistory />,
          },
          {
            path: "/my/txid-submit",
            element: <TxidSubmit />,
          },
          {
            path: "/my/fund-history",
            element: <FundHistory />,
          },
          {
            path: "/my/bind-usdt",
            element: <BindUsdt />,
          },
          {
            path: "/my/team",
            element: <Team />,
          },
          {
            path: "/my/set",
            element: <Set />,
          },
          {
            path: "/my/set/info",
            element: <SetPersonalInfo />,
          },
          {
            path: "/my/set/avatar",
            element: <SetAvatar />,
          },
          {
            path: "/my/set/login-password",
            element: <SetLoginPassword />,
          },
          {
            path: "/my/set/withdrawal-password",
            element: <SetWithdrawalPassword />,
          },
          {
            element: <AdminRoute />,
            children: [
              {
                path: "/my/chat",
                element: <ChatList />,
              },
              {
                path: "/client/:userId",
                element: <Client />,
              },
              {
                path: "/client/:userId/team",
                element: <Team />,
              },
              {
                path: "/client/:userId/fund-history",
                element: <FundHistory />,
              },
              {
                path: "/client/:userId/order-history",
                element: <OrderHistory />,
              },
              {
                path: "/my/client-list",
                element: <ClientList />,
              },
              {
                path: "/my/set/configuration",
                element: <SetConfiguration />,
              },
              {
                path: "/my/pending-nid",
                element: <PendingNid />,
              },
            ],
          },
        ],
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
