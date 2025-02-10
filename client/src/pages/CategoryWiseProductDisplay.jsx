import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "../components/CardLoading";
import CardProduct from "../components/CardProduct";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();

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

  const loadingCardNumber = new Array(6).fill();
  return (
    <div className="">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link to="" className="text-green-600 hover:text-green-400">
          See all
        </Link>
      </div>

      <div className="relative flex items-center">
        <div
          className="flex items-center gap-4 md:gap-6 lg:gap-8 container px-4 mx-auto overflow-x-scroll overflow-hidden scroll-smooth scrollbar-none"
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

          <div className="w-full h-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between items-center scroll-smooth ">
            <button
              onClick={handleScrollLeft}
              className="z-10 relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-gray-200 "
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="z-10 relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-gray-200"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
