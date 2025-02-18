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
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
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
const getProductByCategory = async (request, response) => {
  try {
    const { id } = request.body;

    if (!id) {
      return response.status(400).json({
        message: "Provide category id",
        error: true,
        success: false,
      });
    }

    const product = await ProductModel.find({
      category: { $in: id },
    }).limit(15);

    return response.json({
      message: "Category product list",
      error: false,
      success: true,
      data: product,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};
const getProductByCategoryAndSubCategory = async (request, response) => {
  try {
    const { categoryId, subCategoryId, page, limit } = request.body;

    if (!categoryId || !subCategoryId) {
      return response.status(400).json({
        message: "Provide categoryId and subCategoryId",
        error: true,
        success: false,
      });
    }
    if (!page) {
      page = 2;
    }
    if (!limit) {
      limit = 10;
    }
    const query = {
      category: { $in: categoryId },
      subCategory: { $in: subCategoryId },
    };

    const skip = (page - 1) * limit;

    const [data, dataCount] = await Promise.all([
      ProductModel.find(query).sort({ createAt: -1 }).skip(skip).limit(limit),
      ProductModel.countDocuments(query),
    ]);

    return response.json({
      message: "Product list",
      error: false,
      success: true,
      data: data,
      totalCount: dataCount,
      limit: limit,
      page: page,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};
const getProductDetails = async (request, response) => {
  try {
    const { productId } = request.body;

    const product = await ProductModel.findOne({ _id: productId });

    return response.json({
      message: "Product details",
      error: false,
      success: true,
      data: product,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};
const deleteProductController = async (request, response) => {
  try {
    const { _id } = request.body;

    const deleteProduct = await ProductModel.deleteOne({ _id: _id });

    return response.json({
      message: "Delete successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};
const countAllProduct = async (request, response) => {
  try {
    const product = await ProductModel.countDocuments();

    return response.json({
      message: "Product details",
      error: false,
      success: true,
      data: product,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};
const updateProductDetails = async (request, response) => {
  try {
    const { _id } = request.body;

    if (!_id) {
      return response
        .status(400)
        .json({ message: "Provide product ID", error: true, success: false });
    }

    const updateProduct = await ProductModel.updateOne(
      { _id: _id },
      { ...request.body }
    );

    return response.json({
      message: "Update successfully",
      error: false,
      success: true,
      data: updateProduct,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};
const searchProduct = async (request, response) => {
  try {
    let { search, page, limit } = request.body;

    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }

    const query = search ? { $text: { $search: search } } : {};
    const skip = (page - 1) * limit;

    const [data, dataCount] = await Promise.all([
      ProductModel.find(query)
        .sort({ createAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
      ProductModel.countDocuments(query),
    ]);

    return response.json({
      message: "Product search",
      error: false,
      success: true,
      data: data,
      totalCount: dataCount,
      page: page,
      totalPage: Math.ceil(dataCount / limit),
      limit: limit,
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
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductDetails,
  deleteProductController,
  countAllProduct,
  updateProductDetails,
  searchProduct,
};
