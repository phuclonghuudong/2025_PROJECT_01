import React from "react";
import { useSelector } from "react-redux";
import Banner from "../assets/banner-1.webp";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`w-full h-full bg-blue-100 rounded  ${
            !Banner && "animate-pulse "
          } `}
        >
          <img
            src={Banner}
            className="w-full h-full object-scale-down"
            alt="banner"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 my-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {loadingCategory
          ? new Array(10).fill(null).map((c, index) => {
              return (
                <div className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse">
                  <div className="bg-blue-200 min-h-20 rounded"></div>
                  <div className="bg-blue-200 h-8 rounded"></div>
                </div>
              );
            })
          : categoryData.map((cat, index) => {
              return (
                <div className="w-full h-full">
                  <div>
                    <img
                      src={cat?.image}
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default Home;
