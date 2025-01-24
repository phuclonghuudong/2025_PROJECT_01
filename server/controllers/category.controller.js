const CategoryModel = require("../models/category.model");
const SubCategoryModel = require("../models/subCategory.model");
const ProductModel = require("../models/product.model");

const AddCategoryController = async (request, response) => {
  try {
    const { name, image } = request.body;

    if (!name || !image) {
      return response.json({
        message: "Enter required fields",
        error: true,
        success: false,
      });
    }

    const addCategory = await CategoryModel({
      name,
      image,
    });

    const saveCategory = await addCategory.save();

    if (!saveCategory) {
      return response.status(500).json({
        message: "Not Create",
        error: true,
        success: false,
      });
    }

    return response.json({
      message: "Add Category",
      error: false,
      success: true,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

const getCategoryController = async (request, response) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 });

    return response.json({
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

const updateCategoryController = async (request, response) => {
  try {
    const { _id, name, image } = request.body;

    const update = await CategoryModel.updateOne(
      {
        _id: _id,
      },
      { name, image }
    );

    return response.json({
      message: "Update Category",
      error: false,
      success: true,
      data: update,
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

const deleteCategoryController = async (request, response) => {
  try {
    const { _id } = request.body;

    const checkSubCategory = await SubCategoryModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();
    const checkProduct = await ProductModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    if (checkProduct > 0 || checkSubCategory > 0) {
      return response.status(400).json({
        message: "Category is already use can't delete",
        error: true,
        success: false,
      });
    }

    const deleteCategory = await CategoryModel.deleteOne({ _id: _id });

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

module.exports = {
  AddCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
