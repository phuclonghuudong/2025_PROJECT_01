const { Router } = require("express");
const {
  createProductController,
} = require("../controllers/product.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const productRouter = Router();
productRouter.post("/create", auth, createProductController);

module.exports = productRouter;
