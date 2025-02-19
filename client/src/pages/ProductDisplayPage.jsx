import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import AddToCartButton from "../components/AddToCartButton";
import Divider from "../components/Divider";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import DisplayPriceInVND from "../utils/DisplayPriceInVND";
import { PriceWithDiscount } from "../utils/PriceWithDiscount";

const ProductDisplayPage = () => {
  const params = useParams();
  const productId = params?.product?.split("-")?.slice(-1)[0];
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [image, setImage] = useState(0);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });
      const { data: responseData } = response;
      if (responseData?.success) {
        setData(responseData?.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2 ">
      <div className="">
        <div className="bg-white  lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-52 w-full h-full">
          <img
            src={data.image[image]}
            className="w-full h-full object-scale-down"
          />
        </div>

        <div className="flex justify-center items-center gap-3 my-2">
          {data.image.map((img, index) => {
            return (
              <div
                key={index + "imageList"}
                className={`bg-slate-200 lg:w-5 lg:h-5 w-3 h-3 rounded-full ${
                  index === image && "bg-slate-300"
                }`}
              >
                {/* <img src={img} /> */}
              </div>
            );
          })}
        </div>

        <div className="grid relative">
          <div
            ref={imageContainer}
            className="flex gap-3 z-10 relative items-center w-full overflow-x-auto scrollbar-none"
          >
            {data.image.map((img, index) => {
              return (
                <div
                  className="w-20 h-20  min-w-20  shadow-md cursor-pointer"
                  key={index + "imageProductDetails"}
                >
                  <img
                    src={img}
                    onClick={() => setImage(index)}
                    className="w-full h-full object-scale-down"
                    alt="min-product-list"
                  />
                </div>
              );
            })}
          </div>

          <div className="w-full h-full -ml-3 hidden lg:flex justify-between absolute items-center">
            <button
              onClick={handleScrollLeft}
              className="z-10 bg-white relative p-1 rounded-full shadow-lg"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="z-10 bg-white relative p-1 rounded-full shadow-lg"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="my-4 gap-3 grid">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data?.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data?.unit}</p>
          </div>
          <div>
            {data?.more_details &&
              Object.keys(data?.more_details).map((m, index) => {
                console.log("check m: ", m);
                return (
                  <div key={index + "moreDetails"} className="">
                    <p className="font-semibold">{m}</p>
                    <p className="text-base">{data?.more_details[m]}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="p-4 lg:pl-6 text-base lg:text-lg">
        <p className="bg-green-200 rounded-full w-fit px-2">10Min</p>
        <h2 className="text-lg font-semibold lg:text-3xl">{data?.name}</h2>
        <p className="">{data?.unit}</p>
        <div>
          <Divider />
        </div>
        <div className="gap-3">
          <p>Price</p>
          <div className="flex justify-starts items-center gap-4">
            <div className="border border-green-500 p-4 rounded bg-green-50 w-fit">
              <p className="font-semibold text-lg lg:text-xl">
                {DisplayPriceInVND(
                  PriceWithDiscount(data?.price, data?.discount)
                )}
              </p>
            </div>

            {data?.discount && (
              <div className="absolute -mt-14 ml-24">
                <p className="relative italic text-sm bg-red-300 rounded-full px-2 text-red-600">
                  {data?.discount} %
                </p>
              </div>
            )}
            <div>
              <p className="italic text-md bg-slate-300 rounded-full px-2 text-slate-400 line-through">
                {DisplayPriceInVND(data?.price)} %
              </p>
            </div>
          </div>
        </div>
        <div className="my-4 ">
          <AddToCartButton data={data} />
        </div>{" "}
        <Divider />
      </div>
    </section>
  );
};

export default ProductDisplayPage;
