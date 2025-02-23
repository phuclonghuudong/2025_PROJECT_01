import React from "react";
import { FaAnglesRight, FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userGlobalContext } from "../provider/GlobalProvider";
import DisplayPriceInVND from "../utils/DisplayPriceInVND";

const CartMobileLink = () => {
  const { totalQty, totalPrice } = userGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);

  return (
    <>
      {cartItem[0] && (
        <div className="sticky bottom-4 p-2">
          <div
            className="bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm flex justify-between 
    lg:hidden items-center"
          >
            <div className="flex items-center gap-2">
              <div className="bg-green-500 p-2 rounded w-fit">
                <FaCartShopping />
              </div>
              <div className="text-xs">
                <p>{totalQty} items</p>
                <p>{DisplayPriceInVND(totalPrice)} </p>
              </div>
            </div>

            <Link to="/cart" className="flex items-center gap-1">
              <span className="text-sm">View Cart</span>
              <FaAnglesRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobileLink;
