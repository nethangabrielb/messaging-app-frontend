import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import ChatRow from "@/components/chats/ChatRow";
import type { ChatOverview } from "@/types/chats";
import fetchData from "@/lib/fetchData";
import ChatInterface from "@/components/chats/ChatInterface";
import useUser from "@/hooks/useUser";
import { useEffect } from "react";
import { socket } from "../../socket";

const Chats = () => {
  const { roomId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token") as string);

  const { data: userChats, refetch } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/api/chats`;
      return fetchData(url);
    },
  });

  useEffect(() => {
    if (userChats?.data.length >= 1) {
      if (!roomId) {
        navigate(`/chat/${userChats?.data[0].id}`);
      }
    }
  }, [roomId, userChats?.data]);

  useEffect(() => {
    const notificationHandler = (success: boolean) => {
      if (success) {
        console.log("RECEIVED CHAT");
        refetch();
      }
    };

    socket.on("notification", notificationHandler);

    return () => {
      socket.off("notification", notificationHandler);
    };
  }, []);

  useEffect(() => {
    const clearNotifications = () => {
      userChats?.data.forEach((chat: ChatOverview) => {
        if (chat.id === Number(roomId)) {
          if (chat.Notification.length > 0) {
            socket.emit(
              "clear notifications",
              user?.data[0]?.id,
              Number(roomId)
            );
          }
        }
      });
    };

    const clearNotificationsHandler = (success: boolean) => {
      if (success) {
        refetch();
      }
    };

    clearNotifications();

    socket.on("clear notifications", clearNotificationsHandler);

    return () => {
      socket.off("clear notifications", clearNotificationsHandler);
    };
  }, [roomId, user, userChats, refetch]);

  return (
    <main className="flex col-start-2 col-end-3 row-start-2 border border-border bg-card rounded-sm max-h-full">
      <aside className="w-[30%] p-2 border-r border-r-border flex flex-col gap-2">
        {userChats?.data?.map((chat: ChatOverview) => {
          return (
            <ChatRow
              key={chat.id}
              chat={chat}
              roomId={Number(roomId)}
              user={user?.data[0]}
            ></ChatRow>
          );
        })}
      </aside>
      {roomId && (
        <ChatInterface
          roomId={Number(roomId)}
          user={user?.data[0]}
          token={token}
          userChats={userChats?.data}
        ></ChatInterface>
      )}
    </main>
  );
};

export default Chats;
