import React from "react";
import ImageNoData from "../assets/6763427.webp";

const NoData = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 gap-2">
      <img src={ImageNoData} alt="no data" className="w-36" />
      <p className="font-semibold text-neutral-500">No Data</p>
    </div>
  );
};

export default NoData;
