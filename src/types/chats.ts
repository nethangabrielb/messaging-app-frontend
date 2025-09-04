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

export type { ChatOverview, Chat };
