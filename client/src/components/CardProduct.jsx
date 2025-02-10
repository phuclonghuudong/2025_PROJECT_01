import React from "react";
import { Link } from "react-router-dom";
import DisplayPriceInVND from "../utils/DisplayPriceInVND";
import validURLConvert from "../utils/validURLConvert";

const CardProduct = ({ data }) => {
  const url = `/${validURLConvert(data?.name)}-${data?._id}`;
  return (
    <Link
      to={`/product${url}`}
      className="border p-2 grid gap-2 lg:gap-4 h-72 min-w-44 max-w-96 lg:max-w-64 xl:max-w-80 rounded cursor-pointer bg-white  "
    >
      <div className="min-h-20 max-h-24 rounded overflow-hidden ">
        <img
          src={data?.image[0]}
          className="w-full h-full object-scale-down "
        />
      </div>
      <div className="p-[1px] px-2 text-sm bg-green-100 rounded text-green-600 w-fit">
        10 min
      </div>
      <div className="font-medium text-ellipsis lg:text-base text-sm line-clamp-2 ">
        {data?.name}
      </div>
      <div className="w-fit p-2 text-sm">{data?.unit}</div>

      <div className="flex items-center justify-between gap-3 px-2 lg:px-0">
        <div className="font-semibold text-sm">
          {DisplayPriceInVND(data?.price)}
        </div>
        <div className="">
          <button className="bg-green-500 hover:bg-green-700 text-white px-4 rounded">
            Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
