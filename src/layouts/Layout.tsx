import type { ReactProps } from "@/types/reactNode";
import { ModeToggle } from "@/components/ModeToggle";
import { NavLink, useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useEffect } from "react";
import protectedLoader from "@/lib/protectedLoader";
import useUser from "@/hooks/useUser";
import { HeaderDropdown } from "@/layouts/HeaderDropdown";
import ChangeStatus from "@/layouts/ChangeStatus";

const Layout = ({ children }: ReactProps) => {
  const navigate = useNavigate();
  const { user, refetchUser } = useUser();
  const token = JSON.parse(localStorage.getItem("token") as string);

  useEffect(() => {
    const isAuthenticated = protectedLoader();

    window.addEventListener("load", () => {
      if (isAuthenticated) {
        socket.connect();
        refetchUser();
      }
    });
  }, []);

  const logoutHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Delete token then navigate back home
    socket.emit("set status", token, "OFFLINE", (res: { success: true }) => {
      if (res.success) {
        socket.disconnect();
      }
    });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <main className="grid grid-cols-[1fr_1024px_1fr] grid-rows-[62px_1fr_28px] p-4 gap-2 h-full max-h-full">
      <header className="flex justify-between items-center h-fit p-3 col-start-2 col-end-3 row-start-1 row-end-2 border-border border bg-card rounded-sm">
        <nav className="flex list-none gap-4">
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4"
                : "no-underline hover:underline hover:underline-offset-4"
            }
          >
            Chats
          </NavLink>
          <NavLink
            to="/people"
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4"
                : "no-underline hover:underline hover:underline-offset-4"
            }
          >
            People
          </NavLink>
        </nav>
        <div className="flex items-center gap-3 ">
          <ChangeStatus
            user={user?.data[0]}
            refetch={refetchUser}
          ></ChangeStatus>
          <ModeToggle></ModeToggle>
          <HeaderDropdown
            user={user?.data[0]}
            logoutHandler={logoutHandler}
          ></HeaderDropdown>
        </div>
      </header>
      {children}
      <footer className="col-start-2 col-end-3 p-2 rounded-sm flex justify-center items-center pt-5">
        <p>made with ♡ by nethan</p>
      </footer>
    </main>
  );
};

export default Layout;
