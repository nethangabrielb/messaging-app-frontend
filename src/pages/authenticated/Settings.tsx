import { Outlet, useLocation, NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { User, Settings } from "lucide-react";
import useWidth from "@/stores/widthStore";
import { useEffect } from "react";

const AccountSettings = () => {
  const location = useLocation();
  const width = useWidth((state) => state.width);
  const navigate = useNavigate();

  useEffect(() => {
    if (width >= 466) {
      if (location.pathname === "/settings") {
        navigate("/settings/profile");
      }
    } else if (location.pathname !== "/settings") {
      console.log("oh no");
      navigate("/settings");
    }
  }, [location.pathname, width, navigate]);

  return (
    <main className="border-border bg-card row-start-2 flex max-h-full rounded-sm border lg:col-start-2 lg:col-end-3">
      {/* Sidebar should be here */}

      <aside className="border-r-border flex w-[30%] flex-col gap-2 border-r p-2 sm:w-[250px]">
        <NavLink
          className={clsx(
            "flex-start hover:bg-secondary flex w-full cursor-pointer gap-4 rounded-lg p-4 transition duration-100",
            location.pathname === "/settings/profile" && "bg-secondary",
          )}
          to={"/settings/profile"}
        >
          <User></User>
          <p>Profile</p>
        </NavLink>
        <NavLink
          className={clsx(
            "flex-start hover:bg-secondary flex w-full cursor-pointer gap-4 rounded-lg p-4 transition duration-100",
            location.pathname === "/settings/account" && "bg-secondary",
          )}
          to={"/settings/account"}
        >
          <Settings></Settings>
          <p>Password</p>
        </NavLink>
      </aside>
      {/* Content of the sidebar selection should be here */}
      <Outlet></Outlet>
    </main>
  );
};

export default AccountSettings;
