import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ChatRow from "@/components/chats/ChatRow";
import type { ChatOverview } from "@/types/chats";
import fetchData from "@/lib/fetchData";
import ChatInterface from "@/components/chats/ChatInterface";
import useUser from "@/hooks/useUser";

const Chats = () => {
  const { room } = useParams();
  const token = JSON.parse(localStorage.getItem("token") as string);
  const { user } = useUser();

  const { data: userChats } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/api/chats`;
      return fetchData(url);
    },
  });

  return (
    <main className="flex col-start-2 col-end-3 row-start-2 border border-border bg-card rounded-md max-h-full">
      <aside className="w-[30%] p-2 border-r border-r-border flex flex-col gap-2">
        {userChats?.data?.map((chat: ChatOverview) => {
          return <ChatRow key={chat.id} chat={chat} room={room}></ChatRow>;
        })}
      </aside>
      {room && (
        <ChatInterface
          room={room}
          user={user?.data[0]}
          token={token}
        ></ChatInterface>
      )}
    </main>
  );
};

export default Chats;
