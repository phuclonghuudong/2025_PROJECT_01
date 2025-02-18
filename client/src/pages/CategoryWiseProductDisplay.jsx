import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "../components/CardLoading";
import CardProduct from "../components/CardProduct";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import validURLConvert from "../utils/validURLConvert";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const fetchCategoryByProductDisplay = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryByProductDisplay();
  }, []);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 230;
  };
  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 230;
  };

  const handleRedirectProductListPage = () => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });

    if (!subcategory) {
      toast.error("Category is updating");
      return;
    }
    const url = `/${validURLConvert(name)}-${id}/${validURLConvert(
      subcategory?.name
    )}-${subcategory?._id}`;

    if (url) {
      navigate(url);
    }
  };
  const loadingCardNumber = new Array(6).fill();
  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <div
          onClick={() => handleRedirectProductListPage()}
          className="text-green-600 hover:text-green-400 "
        >
          See all
        </div>
      </div>

      <div className="relative flex items-center ">
        <div
          className="flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
          ref={containerRef}
        >
          {loading &&
            loadingCardNumber.map((_, index) => {
              return <CardLoading key={index + "cardLoadingNumber"} />;
            })}

          {data.map((c, index) => {
            return (
              <CardProduct
                data={c}
                key={index + "categoryWiseProductDisplay"}
              />
            );
          })}
        </div>
        <div className="w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between ">
          <button
            onClick={handleScrollLeft}
            className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
