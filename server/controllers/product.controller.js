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

const getProductController = async (request, response) => {
  try {
    let { page, limit, search } = request.body;

    if (!page) {
      page = 2;
    }
    if (!limit) {
      limit = 10;
    }

    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ProductModel.countDocuments(query),
    ]);

    return response.json({
      message: "Product Data",
      error: false,
      success: true,
      totalCount: totalCount,
      totalNoPage: Math.ceil(totalCount / limit),
      data: data,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

module.exports = {
  createProductController,
  getProductController,
};
