const ProductModel = require("../models/product.model");

const createProductController = async (request, response) => {
  try {
    const {
      name,
      description,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      more_details,
    } = request.body;

    if (
      !name ||
      !image[0] ||
      !description ||
      !category ||
      !subCategory ||
      !unit ||
      !stock ||
      !price ||
      !discount
    ) {
      return response.status(400).json({
        message: "Enter required fields",
        error: true,
        success: false,
      });
    }

    const product = new ProductModel({
      name,
      description,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      more_details,
    });

    const saveProduct = await product.save();

    return response.json({
      message: "Product create successfully",
      data: saveProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

module.exports = {
  createProductController,
};
