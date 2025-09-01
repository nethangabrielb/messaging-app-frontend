import type { Chat } from "@/types/chats";
import { useNavigate } from "react-router-dom";

const ChatRow = ({ chat }: Chat) => {
  const navigate = useNavigate();

  const openChatHandler = () => {
    navigate(`/chat/${chat.name}`);
  };

  return (
    <button
      className="flex flex-start p-4 hover:bg-secondary rounded-sm transition duration-100 cursor-pointer w-full"
      onClick={openChatHandler}
    >
      <h1>{chat.users[0].username}</h1>
    </button>
  );
};

export default ChatRow;
