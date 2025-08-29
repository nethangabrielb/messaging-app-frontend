import type { Props } from "@/types/user";
import clsx from "clsx";

const PeopleRow = ({ user }: Props) => {
  const statusClasses = clsx(
    "w-[8px] h-[8px] rounded-full",
    user.status === "OFFLINE" && "bg-neutral-500",
    user.status === "ONLINE" && "bg-green-500",
    user.status === "BUSY" && "bg-red-500",
    user.status === null && "bg-neutral-500"
  );

  return (
    <section className="flex justify-between items-center w-full p-4 border-border border rounded-lg">
      <div>
        <h1 className="text-foreground text-[14px] font-light">
          {user.username}
        </h1>
        {user.bio !== null && <p>{user.bio}</p>}
      </div>
      <div className="flex items-center gap-2">
        <div className={statusClasses}></div>
        <p className="font-light text-xs">
          {!user.status ? "Offline" : user.status}
        </p>
      </div>
    </section>
  );
};

export default PeopleRow;
