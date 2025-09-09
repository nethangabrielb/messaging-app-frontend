import type { Chat } from "@/types/chats";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const ChatRow = ({ chat, room }: Chat) => {
  const navigate = useNavigate();

  const openChatHandler = () => {
    navigate(`/chat/${chat.name}`);
  };

  return (
    <button
      className={clsx(
        "flex flex-start items-center gap-4 p-4 hover:bg-secondary rounded-lg transition duration-100 cursor-pointer w-full",
        chat.name === room && "bg-secondary"
      )}
      onClick={openChatHandler}
    >
      <img
        src={`${import.meta.env.VITE_R2_PUBLIC_URL}/${chat?.users[0]?.avatar}`}
        alt="user avatar"
        className="object-contain w-[32px] rounded-full"
      />
      <h1>{chat.users[0].username}</h1>
    </button>
  );
};

export default ChatRow;
