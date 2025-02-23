import React from "react";
import { FaHandPointRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EMPTY_CART from "../assets/empty-cart.webp";
import { userGlobalContext } from "../provider/GlobalProvider";
import DisplayPriceInVND from "../utils/DisplayPriceInVND";
import { PriceWithDiscount } from "../utils/PriceWithDiscount";
import validURLConvert from "../utils/validURLConvert";
import AddToCartButton from "./AddToCartButton";

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice } = userGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  return (
    <section className="bg-neutral-600 fixed top-0 left-0 bottom-0 right-0 bg-opacity-70 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex items-center p-2 shadow-md justify-between">
          <h2 className="font-semibold">Cart</h2>
          <Link to={"/"} onClick={close} className="lg:hidden">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block">
            <IoClose size={25} />
          </button>
        </div>

        {cartItem[0] ? (
          <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-120px)] bg-blue-50 p-2 flex flex-col gap-2">
            <div className="flex items-center px-4 py-2 bg-blue-100 text-blue-500 rounded-full justify-between">
              <p>Your total savings</p>
              <p>{DisplayPriceInVND(notDiscountTotalPrice - totalPrice)}</p>
            </div>
            <div className="bg-white rounded-lg p-2 grid gap-5 overflow-auto">
              {cartItem[0] &&
                cartItem.map((c, index) => {
                  return (
                    <div
                      key={c._id + "cart-Item-product" + index}
                      className="flex w-full gap-4"
                    >
                      <Link
                        onClick={close}
                        className="w-16 h-16 min-h-16 max-h-16 bg-red-50 border rounded"
                        to={`/product/${validURLConvert(
                          c?.productId[0]?.name
                        )}-${c?.productId[0]?._id}`}
                      >
                        <img
                          className="object-scale-down"
                          src={c?.productId[0]?.image[0]}
                        />
                      </Link>
                      <div className="w-full max-w-sm">
                        <Link
                          onClick={close}
                          to={`/product/${validURLConvert(
                            c?.productId[0]?.name
                          )}-${c?.productId[0]?._id}`}
                        >
                          <p className="text-xs text-ellipsis line-clamp-2">
                            {c?.productId[0]?.name}
                          </p>
                        </Link>
                        <p className="text-xs font-semibold ">
                          {DisplayPriceInVND(
                            PriceWithDiscount(
                              c?.productId[0]?.price,
                              c?.productId[0]?.discount
                            )
                          )}
                        </p>
                      </div>
                      <div>
                        <AddToCartButton data={c?.productId[0]} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="p-2">
          {cartItem[0] ? (
            <div className="bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between">
              <div>{DisplayPriceInVND(totalPrice)}</div>
              <button className="flex items-center gap-2">
                PROCEED
                <span>
                  <FaHandPointRight className="text-yellow-500" />
                </span>
              </button>
            </div>
          ) : (
            <div className="bg-white flex-col justify-center flex items-center">
              <img
                src={EMPTY_CART}
                className="w-full h-full object-scale-down"
              />
              <Link onClick={close} to={"/"} className="block">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DisplayCartItem;
