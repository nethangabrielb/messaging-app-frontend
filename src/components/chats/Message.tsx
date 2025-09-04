import clsx from "clsx";

type Props = {
  message: string;
};

const Message = ({ message }: Props) => {
  return (
    <div
      className={clsx(
        "border border-border bg-secondary rounded-lg p-2 px-3 w-fit font-light text-[14px]"
      )}
    >
      {message}
    </div>
  );
};

export default Message;
