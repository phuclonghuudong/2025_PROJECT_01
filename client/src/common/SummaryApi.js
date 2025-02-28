export const baseURl = "http://localhost:2410";

const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  forgot_password: {
    url: "/api/user/forgot-password",
    method: "put",
  },
  forgot_password_otp_verification: {
    url: "/api/user/verify-forgot-password-otp",
    method: "put",
  },
  reset_password: {
    url: "/api/user/reset-password",
    method: "put",
  },
  refresh_token: {
    url: "/api/user/refresh-token",
    method: "post",
  },
  user_details: {
    url: "/api/user/user-details",
    method: "get",
  },
  logout: {
    url: "/api/user/logout",
    method: "post",
  },
  uploadAvatar: {
    url: "/api/user/update-avatar",
    method: "put",
  },
  updateUserDetails: {
    url: "/api/user/update-user",
    method: "put",
  },
  getCategory: {
    url: "/api/category/get",
    method: "get",
  },
  uploadImage: {
    url: "/api/file/upload",
    method: "post",
  },
  addCategory: {
    url: "/api/category/add-category",
    method: "post",
  },
  updateCategory: {
    url: "/api/category/update",
    method: "put",
  },
  deleteCategory: {
    url: "/api/category/delete",
    method: "delete",
  },
  getSubCategory: {
    url: "/api/subcategory/get",
    method: "get",
  },
  addSubCategory: {
    url: "/api/subcategory/add-subcategory",
    method: "post",
  },
  updateSubCategory: {
    url: "/api/subcategory/update",
    method: "put",
  },
  deleteSubCategory: {
    url: "/api/subcategory/delete",
    method: "delete",
  },
  createProduct: {
    url: "/api/product/create",
    method: "post",
  },
  getProduct: {
    url: "/api/product/get",
    method: "post",
  },
  getProductByCategory: {
    url: "/api/product/get-product-by-category",
    method: "post",
  },
  getProductByCategoryAndSubCategory: {
    url: "/api/product/get-product-by-category-and-subcategory",
    method: "post",
  },
  getProductDetails: {
    url: "/api/product/get-product-details",
    method: "post",
  },
  deleteProduct: {
    url: "/api/product/delete",
    method: "delete",
  },
  countAllProduct: {
    url: "/api/product/count-all-product",
    method: "get",
  },
  updateProductDetails: {
    url: "/api/product/update",
    method: "put",
  },
  searchProduct: {
    url: "/api/product/search-product",
    method: "post",
  },
  addToCart: {
    url: "/api/cart/create",
    method: "post",
  },
  getCartItem: {
    url: "/api/cart/get",
    method: "get",
  },
  updateCartItemQty: {
    url: "/api/cart/update-qty",
    method: "put",
  },
  deleteCartItem: {
    url: "/api/cart/delete-cart-item",
    method: "delete",
  },
  createAddress: {
    url: "/api/address/create",
    method: "post",
  },
  getAddress: {
    url: "/api/address/get",
    method: "get",
  },
  deleteAddress: {
    url: "/api/address/disabled",
    method: "delete",
  },
  updateAddress: {
    url: "/api/address/update",
    method: "put",
  },
  CashOnDeliveryOrder: {
    url: "/api/order/cash-on-delivery",
    method: "post",
  },
  paymentURL: {
    url: "/api/order/checkout",
    method: "post",
  },
};

export default SummaryApi;
