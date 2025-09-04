import type { ChatRoom } from "@/types/chats";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/lib/fetchData";
import { io } from "socket.io-client";
import { useState } from "react";
import clsx from "clsx";

const ChatInterface = ({ room }: ChatRoom) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<string>>([]);
  const token = JSON.parse(localStorage.getItem("token") as string);

  const { data } = useQuery({
    queryKey: [room],
    queryFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/api/messages/${room}`;
      return fetchData(url);
    },
  });

  const socket = io(import.meta.env.VITE_SERVER_URL);

  const sendMessage = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit(
      "message",
      message,
      token,
      room,
      (res: { success: boolean }) => {
        if (res.success) {
          alert("Message sent success!");
        }
      }
    );

    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <div className="flex flex-col justify-between w-full">
      {/* Render messages here */}
      <div className="flex flex-col justify-end items-end h-full px-10 gap-2">
        {messages.map((message) => {
          return (
            <div
              className="border border-border bg-secondary rounded-lg p-2 px-3 w-fit font-light text-[14px]"
              key={crypto.randomUUID()}
            >
              {message}
            </div>
          );
        })}
      </div>

      {/* Send message input interface */}
      <form
        className="flex justify-center items-center gap-1 w-full p-4"
        onSubmit={sendMessage}
      >
        <Input
          type="text"
          className="w-[100%] rounded-full"
          placeholder="Aa"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></Input>
        <button
          className={clsx(
            "p-2 rounded-full !cursor-default",
            message !== "" && "hover:bg-neutral-800 !cursor-pointer"
          )}
          type="submit"
          disabled={message === ""}
        >
          <SendHorizontal
            className={clsx(message === "" && "stroke-neutral-500")}
          ></SendHorizontal>
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
