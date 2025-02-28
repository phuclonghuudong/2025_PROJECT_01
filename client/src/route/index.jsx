import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminPermission from "../layouts/AdminPermission";
import Dashboard from "../layouts/Dashboard";
import Address from "../pages/Address";
import Cancel from "../pages/Cancel";
import CartMobile from "../pages/CartMobile";
import CategoryPage from "../pages/CategoryPage";
import CheckoutPage from "../pages/CheckoutPage";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import MyOrder from "../pages/MyOrder";
import OtpVerification from "../pages/OtpVerification";
import ProductAdmin from "../pages/ProductAdmin";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import ProductListPage from "../pages/ProductListPage";
import Profile from "../pages/Profile";
import RegisterPage from "../pages/RegisterPage";
import ResetPassword from "../pages/ResetPassword";
import SearchPage from "../pages/SearchPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import Success from "../pages/Success";
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
            element: (
              <AdminPermission>
                <CategoryPage />
              </AdminPermission>
            ),
          },
          {
            path: "subcategory",
            element: (
              <AdminPermission>
                <SubCategoryPage />
              </AdminPermission>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermission>
                <UploadProductPages />
              </AdminPermission>
            ),
          },
          {
            path: "product",
            element: (
              <AdminPermission>
                <ProductAdmin />
              </AdminPermission>
            ),
          },
        ],
      },
      {
        path: ":category",
        children: [
          {
            path: ":subCategory",
            element: <ProductListPage />,
          },
        ],
      },
      {
        path: "product/:product",
        element: <ProductDisplayPage />,
      },
      {
        path: "cart",
        element: <CartMobile />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
    ],
  },
]);

export default router;
