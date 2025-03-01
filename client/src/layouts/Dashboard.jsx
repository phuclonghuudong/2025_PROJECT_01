import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import { userGlobalContext } from "../provider/GlobalProvider";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const { fetchCartItem, fetchAddress, fetchOrder } = userGlobalContext();

  useEffect(() => {
    if (user?._id && user?._id !== "") {
      fetchCartItem();
      fetchAddress();
      fetchOrder();
    }
  }, [user]);

  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid lg:grid-cols-[200px,1fr]">
        {/* left for menu */}
        <div className="max-h-[calc(100vh-120px)] py-4  top-24 overflow-y-auto hidden lg:block border-r">
          <UserMenu />
        </div>

        {/* right for content */}
        <div className="min-h-[72vh] bg-white">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
