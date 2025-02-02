import React from "react";
import { useSelector } from "react-redux";
import LOGO from "../assets/6763427.webp";
import isAdmin from "../utils/isAdmin";

const AdminPermission = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {isAdmin(user.role) ? (
        children
      ) : (
        <div className="justify-center items-center grid bg-red-100 h-full">
          <p className="text-red-500 p-4 font-semibold text-4xl">
            Do not have permission
          </p>
          <img src={LOGO} className="w-46" />
        </div>
      )}
    </>
  );
};

export default AdminPermission;
