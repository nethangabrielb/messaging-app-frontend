import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts/Layout";
import LoginPage from "@/pages/guest/Auth";
import protectedLoader from "@/lib/protectedLoader";

import People from "@/pages/authenticated/People";
import Chats from "@/pages/authenticated/Chats";
import AccountSettings from "@/pages/authenticated/Settings";
import Profile from "@/components/settings/Profile";
import Account from "@/components/settings/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/chat",
    loader: protectedLoader,
    element: (
      <Layout>
        <Chats></Chats>
      </Layout>
    ),
  },
  {
    path: "/chat/:room",
    loader: protectedLoader,
    element: (
      <Layout>
        <Chats></Chats>
      </Layout>
    ),
  },
  {
    path: "/people",
    loader: protectedLoader,
    element: (
      <Layout>
        <People></People>
      </Layout>
    ),
  },
  {
    path: "/settings",
    loader: protectedLoader,
    element: (
      <Layout>
        <AccountSettings></AccountSettings>
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Profile></Profile>,
      },
      {
        path: "account",
        element: <Account></Account>,
      },
    ],
  },
]);

export default router;
