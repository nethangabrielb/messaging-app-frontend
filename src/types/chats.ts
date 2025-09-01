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
};

export type { ChatOverview, Chat };
