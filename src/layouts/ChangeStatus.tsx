import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@/types/user";
import { socket } from "../socket";
import type {
  RefetchOptions,
  QueryObserverResult,
} from "@tanstack/react-query";

type Props = {
  user: User;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
};

const ChangeStatus = ({ user, refetch }: Props) => {
  const token = JSON.parse(localStorage.getItem("token") as string);

  const status = user?.status;
  let placeholder;

  switch (status) {
    case "ONLINE":
      placeholder = "🟢 Online";
      break;
    case "OFFLINE":
      placeholder = "⚫ Offline";
      break;
    case "BUSY":
      placeholder = "🔴 Busy";
      break;
  }

  const valueChangeHandler = (value: string) => {
    socket.emit("set online", token, value, (res: { success: true }) => {
      if (res.success) {
        refetch();
      }
    });
  };

  if (user)
    return (
      <Select onValueChange={valueChangeHandler}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ONLINE">{"🟢 Online"}</SelectItem>
          <SelectItem value="OFFLINE">{"⚫ Offline"}</SelectItem>
          <SelectItem value="BUSY">{"🔴 Busy"}</SelectItem>
        </SelectContent>
      </Select>
    );
};

export default ChangeStatus;
