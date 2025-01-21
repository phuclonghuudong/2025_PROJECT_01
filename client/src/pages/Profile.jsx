import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import UserProfileAvatar from "../components/UserProfileAvatar";
import { setUserDetails } from "../store/userSlice";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openUserProfileAvatar, setOpenUserProfileAvatar] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setUserData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;

      if (responseData?.success) {
        toast.success(responseData.message);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails?.data?.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pl-4">
      <div className="w-20 h-20 bg-blue-500 flex justify-center rounded-full items-center overflow-hidden">
        {user?.avatar ? (
          <img src={user?.avatar} alt={user?.name} className="w-full h-full" />
        ) : (
          <FaUserCircle size={60} />
        )}
      </div>

      <button
        onClick={() => setOpenUserProfileAvatar((pre) => !pre)}
        className="text-xs min-w-20 border-blue-500 hover:bg-blue-300 border px-3 py-1 rounded-full mt-3"
      >
        Edit
      </button>

      {openUserProfileAvatar && (
        <UserProfileAvatar
          close={() => setOpenUserProfileAvatar((pre) => !pre)}
        />
      )}

      {/* name, mobile, email, change password */}
      <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="p-2 bg-blue-100 rounded outline-none border focus-within:border-blue-300"
            name="name"
            value={userData.name}
            onChange={handleOnchange}
          />
        </div>

        <div className="grid">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="p-2 bg-blue-100 rounded outline-none border focus-within:border-blue-300"
            name="email"
            value={userData.email}
            onChange={handleOnchange}
            required
          />
        </div>

        <div className="grid">
          <label htmlFor="mobile">Phone:</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your mobile"
            value={userData.mobile}
            onChange={handleOnchange}
            name="mobile"
            className="p-2 bg-blue-100 rounded outline-none border focus-within:border-blue-300"
            required
          />
        </div>

        <button className="border px-4 py-2 font-semibold border-blue-500 hover:bg-blue-500 hover:text-white">
          {loading ? "Update ...." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
