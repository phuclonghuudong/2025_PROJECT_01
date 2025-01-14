const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema(
  {
    productId: [{ type: mongoose.Schema.ObjectId, ref: "product" }],
    quantity: { type: Number, default: 0 },
    userId: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const cartProductModel = mongoose.model("cartProduct", cartProductSchema);

module.exports = cartProductModel;
