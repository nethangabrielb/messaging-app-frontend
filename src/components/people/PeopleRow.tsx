import type { Props } from "@/types/user";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

interface Acknowledgement {
  success: boolean;
  message: string;
  room: {
    id: number;
    name: string;
  };
}

const PeopleRow = ({ user }: Props) => {
  const navigate = useNavigate();

  const statusClasses = clsx(
    "w-[8px] h-[8px] rounded-full",
    user.status === "OFFLINE" && "bg-neutral-500",
    user.status === "ONLINE" && "bg-green-500",
    user.status === "BUSY" && "bg-red-500",
    user.status === null && "bg-neutral-500"
  );

  const chatHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonEvent = e.target as HTMLButtonElement;

    // Get token from LocalStorage to get current user data
    const token = JSON.parse(localStorage.getItem("token") as string);

    // Tell our io server to create a room for us and the person we
    // want to chat with
    socket.emit(
      "create room",
      token,
      buttonEvent.id,
      (res: Acknowledgement) => {
        if (res.success) {
          navigate(`/chat/${res.room.name}`);
        } else {
          toast.error(res.message);
        }
      }
    );
  };

  return (
    <section className="flex justify-between items-center p-4 border-border border rounded-lg w-[80%]">
      <div className="flex gap-4 items-center">
        <img
          src={`${
            user.avatar
              ? `${import.meta.env.VITE_R2_PUBLIC_URL}/${user.avatar}`
              : "/default.jpg"
          }`}
          alt="user avatar"
          className="object-cover w-[38px] h-[38px] rounded-full"
        />
        <div className="flex flex-col overflow-hidden">
          <h1 className="text-foreground text-[16px] font-light w-[100px]">
            {user.username}
          </h1>
          {user.bio !== null && (
            <p className="max-w-[100px] text-[11px] font-thin">{user.bio}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 self-center mx-auto">
        <div className={statusClasses}></div>
        <p className="font-light text-xs">
          {!user.status ? "OFFLINE" : user.status}
        </p>
      </div>

      <Button
        className="flex self-center"
        onClick={chatHandler}
        id={String(user.id)}
      >
        Chat
      </Button>
    </section>
  );
};

export default PeopleRow;
