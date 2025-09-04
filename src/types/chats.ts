interface ChatOverview {
  id: number;
  name: string;
  users: [
    {
      username: string;
    }
  ];
}

type Chat = {
  chat: ChatOverview;
  room: string | undefined;
};

type ChatRoom = {
  room: string;
};

export type { ChatOverview, Chat, ChatRoom };
