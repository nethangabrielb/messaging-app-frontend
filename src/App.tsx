import { RouterProvider } from "react-router-dom";
import router from "@/routes/routes";
import { useQuery } from "@tanstack/react-query";
import BackendLoading from "@/components/BackendLoading";

function App() {
  const { isPending } = useQuery({
    queryKey: ["init"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/ping`).then((res) =>
        res.json(),
      ),
    retry: true,
    retryDelay: 5000,
  });

  return isPending ? (
    <BackendLoading></BackendLoading>
  ) : (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
