import type { ReactProps } from "@/types/reactNode";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";

const Layout = ({ children }: ReactProps) => {
  const navigate = useNavigate();

  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Delete token then navigate back home
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <main className="grid grid-cols-[1fr_1024px_1fr] grid-rows-[38px_1fr] p-4 gap-4">
      <header className="flex justify-between items-center h-fit p-3 col-start-2 col-end-3 row-start-1 row-end-2 border-border border bg-card rounded-md">
        <nav className="flex list-none gap-4">
          <NavLink to="/">Chats</NavLink>
          <NavLink to="/">Chatters</NavLink>
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
