const CartProductModel = require("../models/cartProduct.model");
const UserModel = require("../models/user.model");

const addToCartItemController = async (request, response) => {
  try {
    const userId = request.userId;
    const { productId } = request.body;

    if (!productId) {
      return response
        .status(400)
        .json({ message: "Provide productId", error: true, success: false });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return response.status(400).json({
        message: "Item already in cart",
      });
    }

    const cartItem = new CartProductModel({
      quantity: 1,
      userId: userId,
      productId: productId,
    });
    const save = await cartItem.save();

    const updateCartUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );

    return response.json({
      data: save,
      message: "Item add successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

const getCartItemController = async (request, response) => {
  try {
    const userId = request.userId;

    const cartItem = await CartProductModel.find({
      userId: userId,
    }).populate("productId");

    return response.json({
      data: cartItem,
      error: false,
      success: true,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};
const updateCartItemQtyController = async (request, response) => {
  try {
    const userId = request.userId;

    const { _id, qty } = request.body;

    if (!_id || !qty) {
      return response
        .status(400)
        .json({ message: "Provide _id, qty", error: true, success: false });
    }
    const update = await CartProductModel.updateOne(
      { _id: _id },
      { quantity: qty }
    );

    return response.json({
      message: "Item added",
      error: false,
      success: true,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};
const deleteCartItemQtyController = async (request, response) => {
  try {
    const userId = request.userId;
    const { _id } = request.body;

    if (!_id) {
      return response
        .status(400)
        .json({ message: "Provide _id", error: true, message: false });
    }

    const delItem = await CartProductModel.deleteOne({
      _id: _id,
      userId: userId,
    });

    return response.json({
      message: "Item remove",
      error: false,
      success: true,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error?.message || error, error: true, success: false });
  }
};

module.exports = {
  addToCartItemController,
  getCartItemController,
  updateCartItemQtyController,
  deleteCartItemQtyController,
};
