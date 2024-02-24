import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import ErrorPage from "../pages/shared/ErrorPage.jsx";
import Homepage from "../pages/homepage/Homepage.jsx";
import Trade from "../pages/trade/Trade.jsx";
import Information from "../pages/information/Information.jsx";
import My from "../pages/my/My.jsx";
import Wallet from "../pages/my/myNav/wallet/Wallet.jsx";
import CustomerService from "../pages/my/myNav/customerService/CustomerService.jsx";
import AboutTeam from "../pages/information/AboutTeam.jsx";
import BuisnessLicense from "../pages/information/BuisnessLicense.jsx";
import MsbLicense from "../pages/information/MsbLicense.jsx";
import AboutPlatform from "../pages/information/AboutPlatform.jsx";
import AboutRecharge from "../pages/information/AboutRecharge.jsx";
import AboutWithdrawal from "../pages/information/AboutWithdrawal.jsx";
import TermsAndPolicy from "../pages/information/TermsAndPolicy.jsx";
import Recharge from "../pages/my/myNav/wallet/Recharge.jsx";
import Withdraw from "../pages/my/myNav/wallet/Withdraw.jsx";
import Invitation from "../pages/my/myOption/Invitation.jsx";
import BindUsdt from "../pages/my/myOption/BindUsdt.jsx";
import Team from "../pages/my/myOption/team/Team.jsx";
import Set from "../pages/my/myOption/set/Set.jsx";
import SetWithdrawalPassword from "../pages/my/myOption/set/SetWithdrawalPassword.jsx";
import SetLoginPassword from "../pages/my/myOption/set/SetLoginPassword.jsx";
import SetAvatar from "../pages/my/myOption/set/SetAvatar.jsx";
import TradeHistory from "../pages/my/myOption/TradeHistory.jsx";
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
        path: "/information",
        element: <Information />,
      },
      {
        path: "/information/buisness-license",
        element: <BuisnessLicense />,
      },
      {
        path: "/information/msb-license",
        element: <MsbLicense />,
      },
      {
        path: "/information/about-platform",
        element: <AboutPlatform />,
      },
      {
        path: "/information/about-recharge",
        element: <AboutRecharge />,
      },
      {
        path: "/information/about-withdrawal",
        element: <AboutWithdrawal />,
      },
      {
        path: "/information/about-team",
        element: <AboutTeam />,
      },
      {
        path: "/information/terms-and-policy",
        element: <TermsAndPolicy />,
      },
      {
        element: <PrivateRoute />,
        loader: userLoader,
        id: "user",
        children: [
          {
            path: "/trade",
            element: <Trade />,
          },
          {
            path: "/my",
            element: <My />,
          },
          {
            path: "/my/wallet",
            element: <Wallet />,
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
            path: "/my/chat",
            element: <ChatList />,
          },
          {
            path: "/my/chat/:client",
            element: <Chat />,
          },
          {
            path: "/my/trade-history",
            element: <TradeHistory />,
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
            path: "/my/bind-id",
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
                path: "/client/:userId",
                element: <Client />,
              },
              {
                path: "/client/:userId/team",
                element: <Team />,
              },
              {
                path: "/my/client-list",
                element: <ClientList />,
              },
              {
                path: "/my/set/configuration",
                element: <SetConfiguration />,
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
