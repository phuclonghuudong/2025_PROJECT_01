import React from "react";
import toast from "react-hot-toast";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import Divider from "./Divider";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(logout());
        localStorage.clear();
        window.history.back();
        navigate("/");
        if (close) {
          close();
        }
      }
      if (response?.data?.error) {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };
  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex gap-2 items-center">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}{" "}
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="hover:text-orange-500"
        >
          <FaExternalLinkAlt size={15} />
        </Link>
      </div>

      <Divider />

      <div className="text-sm grid gap-2">
        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-orange-300 py-1"
        >
          My Order
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-2 hover:bg-orange-300 py-1"
        >
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-orange-300 py-1"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
