import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import { setUserDetails } from "../store/userSlice";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import fetchUserDetails from "../utils/fetchUserDetails";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleOnchange = (event) => {
    const { name, value } = event.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const validateValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response?.data?.error) {
        toast.error(response?.data?.message);
      }

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        localStorage.setItem("accessToken", response?.data?.data?.accessToken);
        localStorage.setItem(
          "refreshToken",
          response?.data?.data?.refreshToken
        );

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails?.data?.data));

        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className=" w-full container mx-auto px-2">
      <div className="bg-white my-4 max-w-lg mx-auto rounded p-4">
        <p className="font-bold text-lg mb-3">Login</p>

        <form className="grid gap-4 mt-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              autoFocus
              value={data.email}
              onChange={handleOnchange}
              placeholder="Enter your Email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-orange-400"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password">Password: </label>

            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-orange-400">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleOnchange}
                placeholder="Enter your password"
                className="w-full outline-none"
              />
              <div
                onClick={() => setShowPassword((pre) => !pre)}
                className="cursor-pointer"
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </div>
            </div>

            <Link
              to="/forgot-password"
              className="block ml-auto hover:text-orange-500"
            >
              Forgot password
            </Link>
          </div>

          <button
            disabled={!validateValue}
            className={` ${
              validateValue
                ? "bg-orange-500 hover:bg-orange-700"
                : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-2 tracking-wide"`}
          >
            Login
          </button>
        </form>

        <p>
          Don't have account ?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-orange-500 hover:text-orange-700"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
