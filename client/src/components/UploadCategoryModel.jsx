import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import uploadImage from "../utils/UploadImage";

const UploadCategoryModel = ({ close }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => {
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
        ...SummaryApi.addCategory,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const response = await uploadImage(file);

    const { data: ImageResponse } = response;

    setData((pre) => {
      return {
        ...pre,
        image: ImageResponse.data.url,
      };
    });
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-3" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="categoryName">Name:</label>
            <input
              type="text"
              id="categoryName"
              name="name"
              placeholder="Enter for category"
              value={data.name}
              onChange={handleOnChange}
              className="bg-blue-100 p-2 border border-blue-200 rounded focus-within:border-blue-500 outline-none"
            />
          </div>

          <div className="grid gap-1">
            <p>Image:</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-100 h-36 w-full lg:w-36 rounded border-blue-200 items-center justify-center flex">
                {data.image ? (
                  <img
                    alt="category"
                    src={data.image}
                    className="w-full h-fill object-scale-down"
                  />
                ) : (
                  <p className="text-sm">No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`${
                    !data.name
                      ? "bg-gray-400"
                      : "border border-blue-500 bg-blue-100 hover:bg-blue-500 "
                  } p-2 rounded cursor-pointer font-medium `}
                >
                  Upload Image
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            className={`${
              data.image && data.name
                ? "bg-blue-500 text-white hover:bg-blue-700"
                : "bg-gray-400"
            } py-2 rounded font-semibold cursor-pointer`}
          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
