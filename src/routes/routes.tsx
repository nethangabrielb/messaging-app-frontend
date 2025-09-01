import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts/Layout";
import LoginPage from "@/pages/guest/Auth";
import protectedLoader from "@/lib/protectedLoader";

import People from "@/pages/authenticated/People";
import Chats from "@/pages/authenticated/Chats";

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
]);

export default router;
