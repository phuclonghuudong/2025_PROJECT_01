import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../layouts/Dashboard";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import MyOrder from "../pages/MyOrder";
import OtpVerification from "../pages/OtpVerification";
import ProductPage from "../pages/ProductPage";
import Profile from "../pages/Profile";
import RegisterPage from "../pages/RegisterPage";
import ResetPassword from "../pages/ResetPassword";
import SearchPage from "../pages/SearchPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProductPages from "../pages/UploadProductPages";
import UserMenuMobile from "../pages/UserMenuMobile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verification-otp",
        element: <OtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myorders",
            element: <MyOrder />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element: <CategoryPage />,
          },
          {
            path: "subcategory",
            element: <SubCategoryPage />,
          },
          {
            path: "upload-product",
            element: <UploadProductPages />,
          },
          {
            path: "product",
            element: <ProductPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
