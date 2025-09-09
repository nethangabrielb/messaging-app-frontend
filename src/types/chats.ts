import type { User } from "@/types/user";

// interface for overview of chats in chats row
interface ChatOverview {
  id: number;
  name: string;
  users: [
    {
      username: string;
      avatar: string;
    }
  ];
}

// type props for chatrow component
type Chat = {
  chat: ChatOverview;
  room: string | undefined;
};

// type for room name
type ChatRoom = {
  room: string;
  user: User;
  token: string;
};

export type { ChatOverview, Chat, ChatRoom };
