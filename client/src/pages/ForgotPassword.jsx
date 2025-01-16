import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });

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
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response?.data?.error) {
        toast.error(response?.data?.message);
      }

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setData({
          email: "",
        });
        navigate("/verification-otp", { state: data });
      }
    } catch (error) {
      console.log("check", error);
      AxiosToastError(error);
    }
  };

  return (
    <section className=" w-full container mx-auto px-2">
      <div className="bg-white my-4 max-w-lg mx-auto rounded p-4">
        <p className="font-bold text-lg mb-3">Forgot Password</p>

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

          <button
            disabled={!validateValue}
            className={` ${
              validateValue
                ? "bg-orange-500 hover:bg-orange-700"
                : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-2 tracking-wide"`}
          >
            Send OTP
          </button>
        </form>

        <p>
          Already have account ?{" "}
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

export default ForgotPassword;
