import { RouterProvider } from "react-router-dom";
import router from "@/routes/routes";
import { useQuery } from "@tanstack/react-query";
import BackendLoading from "@/components/BackendLoading";
import useWidth from "@/stores/widthStore";
import { useEffect } from "react";

function App() {
  const updateWidth = useWidth((state) => state.updateWidth);
  const { isPending } = useQuery({
    queryKey: ["init"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/ping`).then((res) =>
        res.json(),
      ),
    retry: true,
    retryDelay: 5000,
  });

  useEffect(() => {
    const changeWidthHandler = () => {
      updateWidth(window.innerWidth);
    };
    window.addEventListener("load", changeWidthHandler);
    window.addEventListener("resize", changeWidthHandler);

    return () => {
      window.removeEventListener("load", changeWidthHandler);
      window.removeEventListener("resize", changeWidthHandler);
    };
  }, [updateWidth]);

  return isPending ? (
    <BackendLoading></BackendLoading>
  ) : (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
