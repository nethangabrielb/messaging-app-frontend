import { Outlet } from "react-router-dom";

const Settings = () => {
  return (
    <main className="flex col-start-2 col-end-3 row-start-2 border border-border bg-card rounded-md max-h-full">
      {/* Sidebar should be here */}

      {/* Content of the sidebar selection should be here */}
      <Outlet></Outlet>
    </main>
  );
};

export default Settings;
