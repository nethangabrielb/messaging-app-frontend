import type { User } from "@/types/user";

// interface for overview of chats in chats row
interface ChatOverview {
  id: number;
  unread: number;
  users: [
    {
      username: string;
      avatar: string;
    }
  ];
}

interface EndUser {
  avatar: string;
  status: string | null;
  username: string;
}

// interface for user chats with room and users associated to room information
interface UserChats {
  id: number;
  name: string;
  users: Array<EndUser>;
}

// type props for chatrow component
type Chat = {
  chat: ChatOverview;
  roomId: number;
};

// type for room name
type ChatRoom = {
  roomId: number;
  user: User;
  token: string;
  userChats: Array<UserChats>;
};

export type { ChatOverview, Chat, ChatRoom, UserChats, EndUser };
