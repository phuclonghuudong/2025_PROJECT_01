import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (data.confirmPassword !== data.password) {
      toast.error("password and confirm password must be same");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (response?.data?.error) {
        toast.error(response?.data?.message);
      }

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log("check", error);
      AxiosToastError(error);
    }
  };

  return (
    <section className=" w-full container mx-auto px-2">
      <div className="bg-white my-4 max-w-lg mx-auto rounded p-4">
        <p className="font-bold text-lg mb-3">Welcome to PHPMol</p>

        <form className="grid gap-4 mt-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleOnchange}
              autoFocus
              placeholder="Enter your name"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-orange-400"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
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
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password: </label>

            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-orange-400">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnchange}
                placeholder="Enter your confirm password"
                className="w-full outline-none"
              />
              <div
                onClick={() => setShowConfirmPassword((pre) => !pre)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? (
                  <FaEye size={20} />
                ) : (
                  <FaEyeSlash size={20} />
                )}
              </div>
            </div>
          </div>

          <button
            disabled={!validateValue}
            className={` ${
              validateValue
                ? "bg-orange-500 hover:bg-orange-700"
                : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-2 tracking-wide"`}
          >
            Register
          </button>
        </form>

        <p>
          Already haven account ?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-orange-500 hover:text-orange-700"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
