const { Router } = require("express");
const {
  addToCartItemController,
  getCartItemController,
  updateCartItemQtyController,
  deleteCartItemQtyController,
} = require("../controllers/cart.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const cartRouter = Router();
cartRouter.post("/create", auth, addToCartItemController);
cartRouter.get("/get", auth, getCartItemController);
cartRouter.put("/update-qty", auth, updateCartItemQtyController);
cartRouter.delete("/delete-cart-item", auth, deleteCartItemQtyController);

module.exports = cartRouter;
