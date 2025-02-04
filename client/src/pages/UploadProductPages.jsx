import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import AddFieldComponent from "../components/AddFieldComponent";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SuccessAlert from "../utils/SuccessAlert";
import uploadImage from "../utils/UploadImage";

const UploadProductPages = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageUrl, setViewImageUrl] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const [moreField, setMoreField] = useState([]);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setImageLoading(true);

    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;

    setData((pre) => {
      return {
        ...pre,
        image: [...pre.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (e) => {
    data.image.splice(e, 1);
    setData((pre) => {
      return { ...pre };
    });
  };

  const handleRemoveCategory = async (e) => {
    data.category.splice(e, 1);

    setData((pre) => {
      return { ...pre };
    });
  };

  const handleRemoveSubCategory = async (e) => {
    data.subCategory.splice(e, 1);

    setData((pre) => {
      return { ...pre };
    });
  };

  const handleAddField = () => {
    setData((pre) => {
      return {
        ...pre,
        more_details: {
          ...pre.more_details,
          [fieldName]: "",
        },
      };
    });

    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data,
      });
      const { data: responseProduct } = response;

      if (responseProduct?.success) {
        // toast.success(responseProduct?.message);
        SuccessAlert(responseProduct?.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }

      if (responseProduct?.error) {
        toast.error(responseProduct?.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>

      <div className="grid p-3">
        <form className="grid gap-3" onSubmit={handleSubmitForm}>
          <div className="grid gap-1">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              autoFocus
              id="name"
              name="name"
              placeholder="Enter product name"
              value={data.name}
              onChange={handleOnChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-blue-300 rounded"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Enter product description"
              value={data.description}
              onChange={handleOnChange}
              required
              rows={4}
              className="bg-blue-50 p-2 outline-none border focus-within:border-blue-300 rounded resize-none"
            />
          </div>

          <div className="">
            <p className="font-semibold">Image</p>
            <div>
              <label
                htmlFor="imageProduct"
                className="bg-blue-50 h-24 border rounded flex justify-center items-center"
              >
                <div className="text-center flex justify-center items-center flex-col">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={38} />
                      <p>Upload Image</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="imageProduct"
                  name="imageProduct "
                  className="hidden"
                  onChange={handleUploadImage}
                />
              </label>
              {/*  */}
              <div className="flex flex-wrap gap-2">
                {data.image.map((cat, index) => {
                  return (
                    <div
                      key={index + cat}
                      className="w-20 h-20 mt-1 min-w-20 bg-blue-100 border relative group"
                    >
                      <img
                        src={cat}
                        alt={cat}
                        className="w-full h-full object-scale-down cursor-pointer"
                        onClick={() => setViewImageUrl(cat)}
                      />
                      <div
                        onClick={() => handleDeleteImage(index)}
                        className="absolute bottom-0 right-0 p-1 text-red-500 cursor-pointer bg-white hover:bg-red-500 hover:text-white hidden group-hover:block"
                      >
                        <MdDeleteForever size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label className="font-semibold">Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);

                  setData((pre) => {
                    return {
                      ...pre,
                      category: [...pre.category, category],
                    };
                  });
                  setSelectCategory("");
                }}
              >
                <option value="" className="text-neutral-600">
                  Select Category
                </option>
                {allCategory.map((cat, index) => {
                  return (
                    <option key={index} value={cat?._id}>
                      {cat?.name}
                    </option>
                  );
                })}
              </select>

              <div className="flex flex-wrap gap-2">
                {data.category.map((cat, index) => {
                  return (
                    <div
                      key={cat._id + index + "productSelection"}
                      className="flex items-center gap-1 bg-blue-50 mt-1"
                    >
                      <p className="text-sm">{cat.name}</p>
                      <div
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label className="font-semibold">Sub Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(
                    (el) => el._id === value
                  );

                  setData((pre) => {
                    return {
                      ...pre,
                      subCategory: [...pre.subCategory, subCategory],
                    };
                  });
                  setSelectSubCategory("");
                }}
              >
                <option value="" className="text-neutral-600">
                  Select Sub Category
                </option>
                {allSubCategory.map((cat, index) => {
                  return (
                    <option key={index} value={cat?._id}>
                      {cat?.name}
                    </option>
                  );
                })}
              </select>

              <div className="flex flex-wrap gap-2">
                {data.subCategory.map((cat, index) => {
                  return (
                    <div
                      key={cat._id + index + "productSelection"}
                      className="flex items-center gap-1 bg-blue-50 mt-1"
                    >
                      <p className="text-sm">{cat.name}</p>
                      <div
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="unit" className="font-semibold">
              Unit
            </label>
            <input
              type="text"
              id="unit"
              name="unit"
              placeholder="Enter product unit"
              value={data.unit}
              onChange={handleOnChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-blue-300 rounded"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="stock" className="font-semibold">
              Number of stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Enter product stock"
              value={data.stock}
              onChange={handleOnChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-blue-300 rounded"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="price" className="font-semibold">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter product price"
              value={data.price}
              onChange={handleOnChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-blue-300 rounded"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="discount" className="font-semibold">
              Discount
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              placeholder="Enter product price"
              value={data.discount}
              onChange={handleOnChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-blue-300 rounded"
            />
          </div>

          {/* add more field */}

          {Object.keys(data?.more_details)?.map((a, index) => {
            return (
              <div className="grid gap-1" key={index}>
                <label htmlFor={a + index} className="font-semibold">
                  {a}
                </label>
                <input
                  type="number"
                  id={a + index}
                  name={a + index}
                  placeholder={`Enter product ${a}`}
                  value={data?.more_details[a]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setData((pre) => {
                      return {
                        ...pre,
                        more_details: {
                          ...pre.more_details,
                          [a]: value,
                        },
                      };
                    });
                  }}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-blue-300 rounded"
                />
              </div>
            );
          })}

          <div
            onClick={() => setOpenAddField((pre) => !pre)}
            className=" hover:bg-yellow-200 py-1 px-3 w-36 text-center border border-yellow-300 hover:text-neutral-700 font-semibold cursor-pointer rounded"
          >
            Add Fields
          </div>

          <button className="bg-yellow-300 p-2 rounded hover:bg-yellow-600 font-semibold hover:text-white">
            {loading ? "Submit ...." : "Submit"}
          </button>
        </form>
      </div>

      {ViewImageUrl && (
        <ViewImage url={ViewImageUrl} close={() => setViewImageUrl("")} />
      )}

      {openAddField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
};

export default UploadProductPages;
