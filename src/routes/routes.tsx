import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts/Layout";
import LoginPage from "@/pages/guest/Auth";
import protectedLoader from "@/lib/protectedLoader";

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
        <div>Home</div>
      </Layout>
    ),
  },
]);

export default router;
