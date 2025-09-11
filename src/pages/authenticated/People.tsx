import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { User } from "@/types/user";
import PeopleRow from "@/components/people/PeopleRow";
import { socket } from "../../socket";
import { SelectPeople } from "@/components/people/SelectFilterPeople";

const People = () => {
  const [statusFilter, setStatusFilter] = useState<null | string>(null);
  const [search, setSearch] = useState<null | string>(null);

  // Upon mounting component, query all people
  const { data, refetch } = useQuery({
    queryKey: ["users", statusFilter, search],
    queryFn: async () => {
      const token = JSON.parse(localStorage.getItem("token") as string);
      let url = `${import.meta.env.VITE_SERVER_URL}/api/users`;
      if (statusFilter && search) {
        url = `${url}?filter=${statusFilter}&search=${search}`;
      } else if (statusFilter) {
        url = `${url}?filter=${statusFilter}`;
      } else if (search) {
        url = `${url}?search=${search}`;
      }
      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const users = await res.json();
      return users;
    },
  });

  useEffect(() => {
    const refetchUsers = (shouldRefetch: { refetch: boolean }) => {
      if (shouldRefetch.refetch) {
        refetch();
      }
    };
    socket.on("set status", refetchUsers);
  }, []);

  return (
    <main className="flex flex-col items-center col-start-2 col-end-3 row-start-2 p-2 border border-border bg-card rounded-sm gap-4 h-full">
      <div className="flex gap-2 mb-10 mt-5 w-[50%]">
        <Input
          type="search"
          className="w-[50%] grow-1"
          placeholder="Search someone..."
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
        <SelectPeople setStatusFilter={setStatusFilter}></SelectPeople>
      </div>

      {/* A list of users should be here */}
      {data?.data.map((user: User) => {
        return <PeopleRow key={user.id} user={user}></PeopleRow>;
      })}
    </main>
  );
};

export default People;
