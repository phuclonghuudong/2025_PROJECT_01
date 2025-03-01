import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import AddAddress from "../components/AddAddress";
import Loading from "../components/Loading";
import { userGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import DisplayPriceInVND from "../utils/DisplayPriceInVND";

const CheckoutPage = () => {
  const {
    notDiscountTotalPrice,
    totalPrice,
    totalQty,
    fetchCartItem,
    fetchOrder,
  } = userGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const [selectAddress, setSelectAddress] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addressList = useSelector((state) => state.addresses.addressList);
  const cartItem = useSelector((state) => state.cartItem.cart);

  const handleCashOnDelivery = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItem,
          addressId: addressList[selectAddress]?._id,
          totalQty: totalQty,
          totalAmt: totalPrice,
          subTotalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      if (responseData?.success) {
        toast.success(responseData?.message);

        if (fetchCartItem) {
          fetchCartItem();
        }
        if (fetchOrder) {
          fetchOrder();
        }
        navigate("/success", {
          state: {
            text: "Order",
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnlinePayment = async () => {
    try {
      toast.loading("Loading ....");
      const stripePublic = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripePromise = await loadStripe(stripePublic);

      const response = await Axios({
        ...SummaryApi.paymentURL,
        data: {
          list_items: cartItem,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });
      const { data: responseData } = response;

      stripePromise.redirectToCheckout({ sessionId: responseData.id });

      if (fetchCartItem) {
        fetchCartItem();
      }
      if (fetchOrder) {
        fetchOrder();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-5 justify-between">
        <div className="w-full">
          {/* address */}
          <h3 className="text-lg font-semibold">Choose your address</h3>
          <div className="bg-white p-2 grid gap-3">
            {addressList?.map((a, index) => {
              return (
                <label
                  key={index + "selectAddressList" + a?._id}
                  htmlFor={"selectAddressList" + index}
                  className={`${!a?.status && "hidden"}`}
                >
                  <div
                    key={a?._id + `checkoutPage` + index}
                    className={`border rounded p-3 flex gap-4 hover:bg-blue-50 `}
                  >
                    <div>
                      <input
                        id={`selectAddressList` + index}
                        type="radio"
                        value={index}
                        name="address"
                        onChange={(e) => setSelectAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <p>{a?.address_line}</p>
                      <p>{a?.city}</p>
                      <p>{a?.state}</p>
                      <p>
                        {a?.country} - {a?.pincode}
                      </p>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
          <div
            onClick={() => setOpenAddress((pre) => !pre)}
            className="h-20 bg-blue-50 border-2  border-dashed flex justify-center items-center"
          >
            Address
          </div>
        </div>

        <div className="w-full  max-w-md bg-white py-4 px-2 items-center">
          {/* summary */}
          <h3 className="text-lg font-semibold">Summary</h3>

          <div className="bg-white p-4 ">
            <h3 className="font-semibold">Bill details</h3>
            <div className="flex justify-between ml-1 py-1">
              <p>Items total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-slate-400">
                  {DisplayPriceInVND(notDiscountTotalPrice)}
                </span>
                <span>{DisplayPriceInVND(totalPrice)}</span>
              </p>
            </div>
            <div className="flex justify-between ml-1 py-1">
              <p>Quantity total</p>
              <p className="flex items-center gap-2">{totalQty} item</p>
            </div>
            <div className="flex justify-between ml-1 py-1">
              <p>Delivery Charge</p>
              <p className="flex items-center gap-2">Free</p>
            </div>
            <div className="font-semibold flex items-center justify-between">
              <p>Grand total</p>
              <p className="flex items-center gap-2">
                <span className="">{DisplayPriceInVND(totalPrice)}</span>
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4">
            <button
              onClick={handleOnlinePayment}
              className="py-2 px-4 bg-green-600 rounded hover:bg-green-800 font-semibold text-white"
            >
              Online Payment
            </button>
            <button
              onClick={handleCashOnDelivery}
              className="py-2 px-4 border-2 text-green-600 border-green-700 hover:text-white hover:bg-green-700 font-semibold rounded"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <Loading />
                </div>
              ) : (
                "Cash on Delivery"
              )}
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;
