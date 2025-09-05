import type { ChatRoom } from "@/types/chats";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/lib/fetchData";
import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import Message from "@/components/chats/Message";
import { useForm } from "react-hook-form";
import type { MessageInterface } from "@/types/messages";

const ChatInterface = ({ room, user, token }: ChatRoom) => {
  const [messages, setMessages] = useState<
    Array<{ message: string; id: number }>
  >([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { register, getValues, watch, resetField } = useForm();
  const socket = io(import.meta.env.VITE_SERVER_URL);

  const { data: chatMessages } = useQuery({
    queryKey: [room],
    queryFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/api/messages/${room}`;
      return fetchData(url);
    },
  });

  useEffect(() => {
    console.log("MESSAGES in UseEffect FN:");
    console.log(messages);
    socket.emit("join room", room);

    socket.on("message", (message, senderData) => {
      setMessages([...messages, { message, id: senderData.id }]);
    });

    setMessages([]);

    return () => {
      socket.disconnect();
    };
  }, [room]);

  useEffect(() => {
    window.addEventListener("DOMContentLoaded", () => {
      messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    });
    requestAnimationFrame(() => {
      messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [room, messages]);

  const sendMessage = (e: React.MouseEvent<HTMLFormElement>) => {
    const message = getValues("message");
    e.preventDefault();
    console.log("MESSAGES in SendMessage FN:");
    console.log(message);
    console.log(messages);
    socket.emit(
      "message",
      message,
      token,
      room,
      (res: { success: boolean }) => {
        if (res.success) {
          console.log("message sent");
        }
        setMessages([...messages, { message, id: user.id }]);
      }
    );
    resetField("message");
  };

  console.log(messages);

  return (
    <div className="flex flex-col justify-end w-full max-h-[827px]">
      <div
        className="flex flex-col items-end px-10 gap-2 overflow-y-auto  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 mt-2"
      >
        {/* Render backend chat history here */}
        {chatMessages?.data.map((message: MessageInterface) => {
          return (
            <Message
              message={message}
              userId={user?.id}
              key={crypto.randomUUID()}
            ></Message>
          );
        })}

        {/* 
          Render newly sent messages here and the reason why
          why I did not render the Message component below is because
          the purpose of it is to just render immediate feedback when sending a message
          while it is not saved in the database.

          For the above, we use the Message component as we will be using information such as senderId
        */}
        {messages.map((message) => {
          return (
            <div
              className={clsx(
                "border border-border bg-secondary rounded-lg p-2 px-3 w-fit font-light text-[14px]",
                message.id !== user?.id ? "self-start" : "self-end"
              )}
              key={crypto.randomUUID()}
            >
              {message.message}
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Send message input interface */}
      <form
        className="flex justify-center items-center gap-1 w-full p-4 static"
        onSubmit={sendMessage}
      >
        <Input
          {...register("message")}
          type="text"
          className="w-[100%] rounded-full"
          placeholder="Aa"
          autoComplete="off"
        ></Input>
        <button
          className={clsx(
            "p-2 rounded-full !cursor-default",
            watch("message") !== "" && "hover:bg-neutral-800 !cursor-pointer"
          )}
          type="submit"
          disabled={watch("message") === ""}
        >
          <SendHorizontal
            className={clsx(watch("message") === "" && "stroke-neutral-500")}
          ></SendHorizontal>
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
