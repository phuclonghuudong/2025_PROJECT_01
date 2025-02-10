import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import {
  setAllSubCategory,
  setLoadingSubCategory,
} from "../store/productSlice";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import uploadImage from "../utils/UploadImage";

const UploadSubCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
    category: [],
  });
  const [loading, setLoading] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setLoading(true);
    const response = await uploadImage(file);

    const { data: ImageResponse } = response;

    setLoading(false);

    setData((pre) => {
      return {
        ...pre,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const index = data.category.findIndex((el) => el._id === categoryId);
    data.category.splice(index, 1);
    setData((pre) => {
      return { ...pre };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addSubCategory,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchSubCategory();
      }
      if (fetchData) {
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubCategory = async () => {
    try {
      dispatch(setLoadingSubCategory(true));
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
      }
    } catch (error) {
    } finally {
      dispatch(setLoadingSubCategory(false));
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 z-50 bg-opacity-70 flex justify-center items-center ">
      <div className="w-full max-w-6xl bg-white p-4 rounded">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold">Add Sub Category</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3" onSubmit={handleSubmit}>
          <div className="grid gap-3">
            <div className="grid gap-1">
              <label htmlFor="name"> Name</label>
              <input
                id="name"
                name="name"
                placeholder="Enter for sub category"
                value={data.name}
                onChange={handleOnChange}
                className="p-3 bg-blue-100 border outline-none focus-within:border-blue-300 rounded"
              />
            </div>

            <div className="grid gap-1">
              <p>Image</p>
              <div className="flex flex-col lg:flex-row items-center gap-3">
                <div className="border h-36 w-full lg:w-36  bg-blue-100  rounded justify-center items-center flex">
                  {!data.image ? (
                    <p className="text-sm text-neutral-400">No Image</p>
                  ) : (
                    <img
                      alt="image"
                      src={data.image}
                      className="object-scale-down w-full h-full"
                    />
                  )}
                </div>
                <label htmlFor="image">
                  <div className="border border-blue-500 bg-blue-100 hover:bg-blue-500 px-4  py-2 rounded cursor-pointer font-medium">
                    {loading ? "Upload Image..." : "Upload Image"}
                  </div>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="hidden"
                    onChange={handleUploadSubCategoryImage}
                  />
                </label>
              </div>
            </div>

            <div className="grid gap-1">
              <label>Select Category</label>

              <div className="border focus-within:border-blue-500 rounded">
                {/* display value */}
                <div className="flex flex-wrap gap-2">
                  {data.category.map((cat, index) => {
                    return (
                      <p
                        key={cat._id + "selectedValue"}
                        className="bg-white shadow-md px-1 m-1 flex justify-between items-center gap-2"
                      >
                        {cat.name}
                        <div
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => handleRemoveCategorySelected(cat._id)}
                        >
                          <IoClose size={20} />
                        </div>
                      </p>
                    );
                  })}
                </div>
                {/* select */}
                <select
                  className="w-full p-2 bg-transparent outline-none border"
                  onChange={(e) => {
                    const value = e.target.value;
                    const categoryDetails = allCategory.find(
                      (el) => el._id == value
                    );

                    setData((pre) => {
                      return {
                        ...pre,
                        category: [...pre.category, categoryDetails],
                      };
                    });
                  }}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {allCategory.map((category, index) => {
                    return (
                      <option
                        key={category?._id + "subcategory"}
                        value={category?._id}
                      >
                        {category?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <button
              className={`px-4 py-2  ${
                data?.image && data?.name && data?.category[0]
                  ? "bg-blue-500 text-white hover:bg-blue-700"
                  : "bg-gray-400"
              } rounded font-semibold cursor-pointer`}
            >
              Add Sub Category
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
