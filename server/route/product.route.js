const { Router } = require("express");
const {
  createProductController,
  getProductController,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductDetails,
  deleteProductController,
  countAllProduct,
  updateProductDetails,
  searchProduct,
} = require("../controllers/product.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");
const admin = require("../middleware/Admin");

const productRouter = Router();
productRouter.post("/create", auth, createProductController);
productRouter.post("/get", getProductController);
productRouter.get("/count-all-product", countAllProduct);
productRouter.post("/get-product-by-category", getProductByCategory);
productRouter.post(
  "/get-product-by-category-and-subcategory",
  getProductByCategoryAndSubCategory
);
productRouter.post("/get-product-details", getProductDetails);

// delete product
productRouter.delete("/delete", deleteProductController);

// update product
productRouter.put("/update", auth, admin, updateProductDetails);

// search product
productRouter.post("/search-product", searchProduct);

module.exports = productRouter;
