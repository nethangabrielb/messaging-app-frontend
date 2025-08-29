import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts/Layout";
import LoginPage from "@/pages/guest/Auth";
import protectedLoader from "@/lib/protectedLoader";
import People from "@/pages/authenticated/People";

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
        <div className="col-start-2 col-end-3 row-start-2 p-2 border border-border bg-card rounded-md">
          Home
        </div>
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
