import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid lg:grid-cols-[200px,1fr]">
        {/* left for menu */}
        <div className="max-h-[calc(100vh-120px)] py-4  top-24 overflow-y-auto hidden lg:block border-r">
          <UserMenu />
        </div>

        {/* right for content */}
        <div className="min-h-[72vh]">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
