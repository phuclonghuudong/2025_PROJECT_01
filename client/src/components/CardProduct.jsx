import React from "react";
import { Link } from "react-router-dom";
import DisplayPriceInVND from "../utils/DisplayPriceInVND";
import validURLConvert from "../utils/validURLConvert";

const CardProduct = ({ data }) => {
  const url = `/${validURLConvert(data?.name)}-${data?._id}`;
  return (
    <Link
      to={`/product${url}`}
      className="border p-2 grid gap-3 max-w-52 lg:min-w-52 rounded"
    >
      <div className="min-h-20 max-h-32 bg-white rounded ">
        <img src={data?.image[0]} className="w-full h-full object-scale-down" />
      </div>
      <div className="p-[1px] px-2 text-sm bg-green-100 rounded text-green-600 w-fit">
        10 min
      </div>
      <div className="font-medium text-ellipsis line-clamp-2 ">
        {data?.name}
      </div>
      <div className="w-fit">{data?.unit}</div>

      <div className="flex items-center justify-between gap-3">
        <div className="font-semibold">{DisplayPriceInVND(data?.price)}</div>
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
