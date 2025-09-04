import type { ChatRoom } from "@/types/chats";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";

const ChatInterface = ({ room }: ChatRoom) => {
  return (
    <div className="w-full relative">
      {/* Render messages here */}

      {/* Send message input interface */}
      <div className="flex justify-center absolute bottom-0 h-max items-center gap-1 w-full p-4">
        <Input
          type="text"
          className="w-[80%] rounded-full"
          placeholder="Aa"
        ></Input>
        <button className=" p-2 rounded-full hover:bg-neutral-800">
          <SendHorizontal></SendHorizontal>
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
