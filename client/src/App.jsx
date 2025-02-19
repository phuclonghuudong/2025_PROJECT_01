import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import SummaryApi from "./common/SummaryApi";
import CartMobileLink from "./components/CartMobileLink";
import Footer from "./components/Footer";
import Header from "./components/Header";
import GlobalProvider from "./provider/GlobalProvider";
import { handleAddItemCart } from "./store/cartProduct";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
  setLoadingSubCategory,
} from "./store/productSlice";
import { setUserDetails } from "./store/userSlice";
import Axios from "./utils/Axios";
import fetchUserDetails from "./utils/fetchUserDetails";

function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData?.data?.data));
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };
  const fetchSubCategory = async () => {
    try {
      dispatch(setLoadingSubCategory(true));
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
      }
    } catch (error) {
    } finally {
      dispatch(setLoadingSubCategory(false));
    }
  };
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
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[76vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      <CartMobileLink />
    </GlobalProvider>
  );
}

export default App;
