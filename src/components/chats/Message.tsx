import clsx from "clsx";
import type { MessageInterface } from "@/types/messages";

type Props = {
  message: MessageInterface;
  userId: number;
};

const Message = ({ message, userId }: Props) => {
  return (
    <div
      className={clsx(
        "border border-border bg-secondary rounded-lg p-2 px-3 w-fit font-light text-[14px]",
        userId !== message.senderId ? "self-start" : "self-end"
      )}
    >
      {message.message}
    </div>
  );
};

export default Message;
