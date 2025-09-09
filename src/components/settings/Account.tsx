import useUser from "@/hooks/useUser";

const Account = () => {
  const { user } = useUser();

  return <div>hello world account</div>;
};

export default Account;
