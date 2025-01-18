import React from "react";
import { IoClose } from "react-icons/io5";
import UserMenu from "../components/UserMenu";

const UserMenuMobile = () => {
  return (
    <section className="bg-white h-full w-full py-2">
      <button
        onClick={() => window.history.back()}
        className="text-neutral-800 block w-fit ml-auto"
      >
        <IoClose size={25} />
      </button>
      <div className="container mx-auto px-5 pb-6">
        <UserMenu />
      </div>
    </section>
  );
};

export default UserMenuMobile;
