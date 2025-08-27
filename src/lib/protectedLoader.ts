import { redirect } from "react-router-dom";

const protectedLoader = () => {
  const token = JSON.parse(localStorage.getItem("token") as string);
  if (token) {
    return;
  } else {
    return redirect("/");
  }
};

export default protectedLoader;
