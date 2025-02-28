import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../common/SummaryApi";
import { userGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";

const AddAddress = ({ close }) => {
  const { fetchAddress } = userGlobalContext();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.createAddress,
        data: {
          address_line: data.address_line,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          country: data.country,
          mobile: data.mobile,
        },
      });

      const { data: responseData } = response;
      if (responseData?.success) {
        toast.success(responseData?.message);
        if (close) {
          close();
          reset();
          fetchAddress();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-black fixed top-0 left-0 bottom-0 right-0 z-50 bg-opacity-70 h-screen overflow-auto">
      <div className="bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Add Address</h2>
          <p>
            <IoClose onClick={() => close()} size={25} />
          </p>
        </div>

        <form className="mt-4 grid gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-1">
            <label htmlFor="address_line">Address Line:</label>
            <input
              type="text"
              name="address_line"
              id="address_line"
              className="border bg-blue-50 p-2 rounded"
              {...register("address_line", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              name="city"
              id="city"
              className="border bg-blue-50 p-2 rounded"
              {...register("city", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              name="state"
              id="state"
              className="border bg-blue-50 p-2 rounded"
              {...register("state", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="pinCode">PinCode:</label>
            <input
              type="text"
              name="pinCode"
              id="pinCode"
              className="border bg-blue-50 p-2 rounded"
              {...register("pincode", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              name="country"
              id="country"
              className="border bg-blue-50 p-2 rounded"
              {...register("country", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="mobile">Mobile No:</label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              className="border bg-blue-50 p-2 rounded"
              {...register("mobile", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-300 w-full p-2 rounded font-semibold hover:text-white "
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAddress;
