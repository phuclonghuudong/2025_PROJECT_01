import React from "react";
import ImageNoData from "../assets/empty-cart.webp";

const NoData = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 gap-2">
      <p className="font-semibold text-neutral-500 text-lg">No Data</p>

      <img src={ImageNoData} alt="no data" className="w-full h-full" />
    </div>
  );
};

export default NoData;
