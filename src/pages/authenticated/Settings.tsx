import { Outlet, useLocation, NavLink } from "react-router-dom";
import clsx from "clsx";
import { User, Settings } from "lucide-react";

const AccountSettings = () => {
  const location = useLocation();

  return (
    <main className="flex col-start-2 col-end-3 row-start-2 border border-border bg-card rounded-sm max-h-full">
      {/* Sidebar should be here */}
      <aside className="w-[30%] p-2 border-r border-r-border flex flex-col gap-2">
        <NavLink
          className={clsx(
            "flex flex-start gap-4 p-4 hover:bg-secondary rounded-lg transition duration-100 cursor-pointer w-full",
            location.pathname === "/settings" && "bg-secondary"
          )}
          to={"/settings"}
        >
          <User></User>
          <p>Profile</p>
        </NavLink>
        <NavLink
          className={clsx(
            "flex flex-start gap-4 p-4 hover:bg-secondary rounded-lg transition duration-100 cursor-pointer w-full",
            location.pathname === "/settings/account" && "bg-secondary"
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
