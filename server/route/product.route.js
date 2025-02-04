const { Router } = require("express");
const {
  createProductController,
  getProductController,
  getProductByCategory,
} = require("../controllers/product.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const productRouter = Router();
productRouter.post("/create", auth, createProductController);
productRouter.post("/get", getProductController);
productRouter.post("/get-product-by-category", getProductByCategory);

module.exports = productRouter;
