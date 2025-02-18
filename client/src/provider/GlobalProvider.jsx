import { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import { handleAddItemCart } from "../store/cartProduct";
import Axios from "../utils/Axios";

export const GlobalContext = createContext(null);

export const userGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    fetchCartItem();
  }, []);
  return (
    <GlobalContext.Provider value={{ fetchCartItem }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
