import type { Chat } from "@/types/chats";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const ChatRow = ({ chat, roomId }: Chat) => {
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
      {chat?.unread > 0 && (
        <div className="w-[20px] h-[20px] bg-red-500 rounded-full flex justify-center items-center font-bold text-neutral-800">
          {chat?.unread}
        </div>
      )}
    </button>
  );
};

export default ChatRow;
