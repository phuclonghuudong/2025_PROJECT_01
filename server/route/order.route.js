const { Router } = require("express");
const {
  CashOnDeliveryOrderController,
  paymentController,
  webhookStripe,
  getOrderDetails,
} = require("../controllers/order.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const orderRouter = Router();
orderRouter.post("/cash-on-delivery", auth, CashOnDeliveryOrderController);
orderRouter.post("/checkout", auth, paymentController);
orderRouter.post("/webhook", webhookStripe);
orderRouter.get("/order-list", auth, getOrderDetails);

module.exports = orderRouter;
