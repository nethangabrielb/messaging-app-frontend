import type { ChatRoom, EndUser } from "@/types/chats";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/lib/fetchData";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import Message from "@/components/chats/Message";
import { useForm } from "react-hook-form";
import type { MessageInterface } from "@/types/messages";
import type { User } from "@/types/user";
import { socket } from "../../socket";

const ChatInterface = ({ roomId, user, token, userChats }: ChatRoom) => {
  const [messages, setMessages] = useState<
    Array<{
      message: string;
      senderId: number;
      sending: boolean;
      messageId: number;
    }>
  >([]);
  const [endUser, setEndUser] = useState<EndUser | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { register, getValues, watch, resetField, handleSubmit } = useForm();

  const { data: chatMessages } = useQuery({
    queryKey: [roomId],
    queryFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/api/messages/${roomId}`;
      return fetchData(url);
    },
  });

  const statusClasses = clsx(
    "w-[8px] h-[8px] rounded-full",
    endUser?.status === "OFFLINE" && "bg-neutral-500",
    endUser?.status === "ONLINE" && "bg-green-500",
    endUser?.status === "BUSY" && "bg-red-500",
    endUser?.status === null && "bg-neutral-500"
  );

  useEffect(() => {
    const endUserValue = userChats?.filter((chats) => {
      return chats.id === roomId;
    });
    if (endUserValue) {
      setEndUser(endUserValue[0].users[0]);
    }
  }, [roomId, userChats]);

  useEffect(() => {
    const messageHandler = (
      message: string,
      sender: User,
      randomId: number
    ) => {
      const updatedMessages = messages.map((mess) => {
        if (mess.messageId === randomId) {
          return {
            message: message,
            senderId: sender.id,
            sending: false,
            messageId: randomId,
          };
        } else {
          return mess;
        }
      });
      if (sender.id === user?.id) {
        setMessages(updatedMessages);
      } else if (sender.username === endUser?.username) {
        setMessages((prev) => [
          ...prev,
          {
            message: message,
            senderId: sender.id,
            sending: false,
            messageId: randomId,
          },
        ]);
      }
      // socket.emit("notification", roomId, sender.id);
    };

    socket.on("message", messageHandler);

    return () => {
      socket.off("message", messageHandler);
    };
  }, [messages]);

  // join chatroom associated to room
  useEffect(() => {
    socket.emit("join room", roomId);
    setMessages([]);
  }, [roomId]);

  // scroll automatically on bottom of chat when refreshing or going to chat
  useEffect(() => {
    window.addEventListener("load", () => {
      setTimeout(() => {
        messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [roomId, messages]);

  const sendMessage = () => {
    const message = getValues("message");
    const randomId = Math.floor(Math.random() * 99999999);
    setMessages((prev) => [
      ...prev,
      { message, senderId: user.id, sending: true, messageId: randomId },
    ]);
    resetField("message");
    socket.emit(
      "message",
      message,
      token,
      roomId,
      randomId,
      (res: { success: boolean }) => {
        if (res.success) {
          console.log("message sent success");
        }
      }
    );
  };

  return (
    <div className="flex flex-col justify-end w-full max-h-[796px]">
      <div className="flex items-center gap-2 bg-secondary p-3 rounded-tr-lg w-full top-0 mb-auto border border-b-border border-t-0 border-l-0 border-r-0">
        <img
          src={`${
            endUser?.avatar
              ? `${import.meta.env.VITE_R2_PUBLIC_URL}/${endUser?.avatar}`
              : "/default.jpg"
          }`}
          alt="user avatar"
          className="object-cover w-[38px] h-[38px]  rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-light">{endUser?.username}</p>
          <div className="flex items-center gap-1">
            <div className={statusClasses}></div>
            <p className="font-thin text-xs">
              {!endUser?.status ? "OFFLINE" : endUser?.status}
            </p>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col items-end px-10 gap-2 overflow-y-auto  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-transparent
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 mt-2"
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
                "flex items-center gap-2",
                message.senderId !== user?.id ? "self-start" : "self-end"
              )}
              key={crypto.randomUUID()}
            >
              <div className="border border-border bg-secondary rounded-lg p-2 px-3 w-fit font-light text-[14px]">
                {message.message}
              </div>
              {message.sending && (
                <div className="p-2 border border-t-primary animate-spin rounded-full"></div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Send message input interface */}
      <form
        className="flex justify-center items-center gap-1 w-full p-2 static"
        onSubmit={handleSubmit(sendMessage)}
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
