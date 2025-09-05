import type { ReactProps } from "@/types/reactNode";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useEffect } from "react";
import protectedLoader from "@/lib/protectedLoader";

const Layout = ({ children }: ReactProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = protectedLoader();

    window.addEventListener("load", () => {
      if (isAuthenticated) {
        socket.connect();
      }
    });
  }, []);

  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Delete token then navigate back home
    localStorage.removeItem("token");
    navigate("/");
    socket.disconnect();
  };

  return (
    <main className="grid grid-cols-[1fr_1024px_1fr] grid-rows-[38px_1fr] p-4 gap-8 h-full max-h-full">
      <header className="flex justify-between items-center h-fit p-3 col-start-2 col-end-3 row-start-1 row-end-2 border-border border bg-card rounded-md">
        <nav className="flex list-none gap-4">
          <NavLink to="/chat">Chats</NavLink>
          <NavLink to="/people">People</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle></ModeToggle>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      </header>
      {children}
    </main>
  );
};

export default Layout;
