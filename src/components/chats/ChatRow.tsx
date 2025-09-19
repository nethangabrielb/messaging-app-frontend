import type { Chat } from "@/types/chats";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const ChatRow = ({ chat, roomId, user }: Chat) => {
  const navigate = useNavigate();

  const openChatHandler = () => {
    navigate(`/chat/${chat.id}`);
  };

  return (
    <button
      className={clsx(
        "flex flex-start justify-between  items-center gap-4 p-4 hover:bg-secondary rounded-lg transition duration-100 cursor-pointer w-full",
        chat.id === roomId ? "bg-secondary" : ""
      )}
      onClick={openChatHandler}
    >
      <div className="flex items-center gap-2">
        <img
          src={`${
            chat?.users[0]?.avatar
              ? `${import.meta.env.VITE_R2_PUBLIC_URL}/${
                  chat?.users[0]?.avatar
                }`
              : "/default.jpg"
          }`}
          alt="user avatar"
          className="object-cover w-[38px] h-[38px]  rounded-full"
        />
        <h1 className="font-light text-[14px]">{chat.users[0].username}</h1>
      </div>
      {chat?.Notification.length > 0 &&
        chat?.Notification[0].userId === user.id && (
          <div className="w-[18px] h-[18px] text-[14px] flex justify-center items-center text-neutral-800 bg-red-500 rounded-full">
            {chat?.Notification[0].count}
          </div>
        )}
    </button>
  );
};

export default ChatRow;
