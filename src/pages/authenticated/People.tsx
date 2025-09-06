import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { User } from "@/types/user";
import PeopleRow from "@/components/people/PeopleRow";
import { socket } from "../../socket";

const People = () => {
  // Upon mounting component, query all people
  const { data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const token = JSON.parse(localStorage.getItem("token") as string);
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const users = res.json();
      return users;
    },
  });

  useEffect(() => {
    const refetchUsers = (shouldRefetch: { refetch: boolean }) => {
      console.log("refetched!");
      if (shouldRefetch.refetch) {
        refetch();
      }
    };
    socket.on("set online", refetchUsers);
  }, []);

  return (
    <main className="flex flex-col items-center col-start-2 col-end-3 row-start-2 p-2 border border-border bg-card rounded-md gap-4 h-full">
      <Input
        type="search"
        className="w-[50%] mb-8"
        placeholder="Search someone..."
      ></Input>

      {/* A list of users should be here */}
      {data?.data.map((user: User) => {
        return <PeopleRow key={user.id} user={user}></PeopleRow>;
      })}
    </main>
  );
};

export default People;
