const { Router } = require("express");
const {
  createProductController,
  getProductController,
} = require("../controllers/product.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const productRouter = Router();
productRouter.post("/create", auth, createProductController);
productRouter.post("/get", getProductController);

module.exports = productRouter;
