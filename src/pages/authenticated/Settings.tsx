import { Outlet, useLocation, NavLink } from "react-router-dom";
import clsx from "clsx";
import { User, Settings } from "lucide-react";

const AccountSettings = () => {
  const location = useLocation();

  return (
    <main className="border-border bg-card row-start-2 flex max-h-full rounded-sm border lg:col-start-2 lg:col-end-3">
      {/* Sidebar should be here */}
      <aside className="border-r-border flex w-[30%] flex-col gap-2 border-r p-2">
        <NavLink
          className={clsx(
            "flex-start hover:bg-secondary flex w-full cursor-pointer gap-4 rounded-lg p-4 transition duration-100",
            location.pathname === "/settings" && "bg-secondary",
          )}
          to={"/settings"}
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
