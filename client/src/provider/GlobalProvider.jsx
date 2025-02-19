import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import { handleAddItemCart } from "../store/cartProduct";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { PriceWithDiscount } from "../utils/PriceWithDiscount";

export const GlobalContext = createContext(null);

export const userGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const cartItem = useSelector((state) => state.cartItem.cart);

  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {}
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: qty,
        },
      });

      const { data: responseData } = response;

      if (responseData?.success) {
        fetchCartItem();
        // toast.success(responseData.message);
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: cartId,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        fetchCartItem();
        toast.success(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

  useEffect(() => {
    const qty = cartItem.reduce((pre, curr) => {
      return pre + curr.quantity;
    }, 0);
    setTotalQty(qty);

    const tPrice = cartItem.reduce((pre, curr) => {
      const priceAfterDiscount = PriceWithDiscount(
        curr.productId[0].price,
        curr.productId[0].discount
      );
      return pre + curr.quantity * priceAfterDiscount;
    }, 0);
    setTotalPrice(tPrice);
  }, [cartItem]);
  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        totalPrice,
        totalQty,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
