const { Router } = require("express");
const {
  addToCartItemController,
  getCartItemController,
} = require("../controllers/cart.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const cartRouter = Router();
cartRouter.post("/create", auth, addToCartItemController);
cartRouter.get("/get", auth, getCartItemController);

module.exports = cartRouter;
