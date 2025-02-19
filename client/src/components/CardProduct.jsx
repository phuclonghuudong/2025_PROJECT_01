import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DisplayPriceInVND from "../utils/DisplayPriceInVND";
import { PriceWithDiscount } from "../utils/PriceWithDiscount";
import validURLConvert from "../utils/validURLConvert";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const navigate = useNavigate();
  const clickOk = () => {
    const url = `/product/${validURLConvert(data?.name)}-${data?._id}`;
    if (url) {
      navigate(url);
    }
  };
  const [loading, setLoading] = useState(false);

  return (
    <Link
      onClick={clickOk}
      className="border p-4 grid gap-2 lg:h-96 lg:gap-2 h-72 min-w-44 max-w-96 lg:max-w-64 xl:max-w-80 rounded cursor-pointer bg-white "
    >
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
        <img
          src={data?.image[0]}
          className="w-full h-full object-scale-down lg:scale-125"
        />
      </div>

      <div className="flex gap-2 items-center">
        <div className="p-[1px] px-2 text-xs bg-green-100 rounded text-green-600 w-fit h-fit">
          10 min
        </div>
        {Boolean(data?.discount) && (
          <p className="text-green-600 bg-green-100 px-2 w-fit text-xs rounded-md">
            {data?.discount} %
          </p>
        )}
        {/* {Boolean(data?.price) && (
          <p className="text-slate-600 bg-slate-100 text-sm px-4 italic line-through">
            {DisplayPriceInVND(data?.price)}
          </p>
        )} */}
      </div>
      <div className="lg:h-15 font-medium text-ellipsis lg:text-base text-sm line-clamp-2">
        {data?.name}
      </div>
      <div className="w-fit text-sm ">{data?.unit}</div>

      <div className="flex items-center justify-between gap-3 px-2 lg:px-0">
        <div className="font-semibold text-sm">
          {DisplayPriceInVND(PriceWithDiscount(data?.price, data?.discount))}
        </div>
        <div className="">
          <AddToCartButton data={data} />
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
