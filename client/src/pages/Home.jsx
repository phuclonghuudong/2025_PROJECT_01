import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Banner from "../assets/banner.jpg";
import validURLConvert from "../utils/validURLConvert";
import CategoryWiseProductDisplay from "./CategoryWiseProductDisplay";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductList = async (id, cat) => {
    const subCategoryId = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });
      return filterData ? true : null;
    });
    if (!subCategoryId) {
      toast.error("Category is updating");
      return;
    }

    const url = `/${validURLConvert(cat)}-${id}/${validURLConvert(
      subCategoryId?.name
    )}-${subCategoryId?._id}`;

    if (url) {
      navigate(url);
    }
  };

  return (
    <section className="bg-white ">
      <div className="container mx-auto px-4">
        <div
          className={`w-full h-full bg-blue-100 rounded  ${
            !Banner && "animate-pulse "
          } `}
        >
          <img src={Banner} className="w-full h-full" alt="banner" />
        </div>
      </div>

      <div className="container mx-auto px-4 my-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {loadingCategory
          ? new Array(10).fill(null).map((c, index) => {
              return (
                <div
                  key={index + "loadingCategory"}
                  className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                >
                  <div className="bg-blue-200 min-h-20 rounded"></div>
                  <div className="bg-blue-200 h-8 rounded"></div>
                </div>
              );
            })
          : categoryData.map((cat, index) => {
              return (
                <div
                  className="w-full h-full "
                  key={index + "categoryData" + cat?._id}
                  onClick={() => handleRedirectProductList(cat?._id, cat?.name)}
                >
                  <div>
                    <img
                      src={cat?.image}
                      alt="imageCategory"
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                </div>
              );
            })}
      </div>

      <div className="py-4 ">
        {categoryData.map((c, index) => {
          return (
            <CategoryWiseProductDisplay
              key={c?._id + "categoryByProductDisplay"}
              id={c?._id}
              name={c?.name}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Home;
