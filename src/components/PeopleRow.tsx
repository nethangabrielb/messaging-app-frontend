import type { Props } from "@/types/user";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import { toast } from "sonner";

const PeopleRow = ({ user }: Props) => {
  const statusClasses = clsx(
    "w-[8px] h-[8px] rounded-full",
    user.status === "OFFLINE" && "bg-neutral-500",
    user.status === "ONLINE" && "bg-green-500",
    user.status === "BUSY" && "bg-red-500",
    user.status === null && "bg-neutral-500"
  );

  const chatHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonEvent = e.target as HTMLButtonElement;
    const socket = io(import.meta.env.VITE_SERVER_URL);

    // Get token from LocalStorage to get current user data
    const token = JSON.parse(localStorage.getItem("token") as string);

    // Tell our io server to create a room for us and the person we
    // want to chat with
    socket.emit(
      "create room",
      token,
      buttonEvent.id,
      (res: { success: boolean }) => {
        if (res.success) {
          toast.success("Chatroom created successfully!");
        }
      }
    );
  };

  return (
    <section className="flex justify-between items-center p-4 border-border border rounded-lg w-[80%]">
      <div>
        <h1 className="text-foreground text-[14px] font-light w-[100px]">
          {user.username}
        </h1>
        {user.bio !== null && <p>{user.bio}</p>}
      </div>

      <div className="flex items-center gap-2 self-center mx-auto">
        <div className={statusClasses}></div>
        <p className="font-light text-xs">
          {!user.status ? "Offline" : user.status}
        </p>
      </div>

      <Button
        className="flex self-end"
        onClick={chatHandler}
        id={String(user.id)}
      >
        Chat
      </Button>
    </section>
  );
};

export default PeopleRow;
