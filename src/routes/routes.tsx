import { createBrowserRouter } from "react-router-dom";
// import Layout from "@/layouts/Layout";
import LoginPage from "@/pages/guest/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage></LoginPage>,
  },
]);

export default router;
