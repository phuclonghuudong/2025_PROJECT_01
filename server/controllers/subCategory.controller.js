const CategoryModel = require("../models/category.model");
const SubCategoryModel = require("../models/subCategory.model");
const ProductModel = require("../models/product.model");

const addSubCategoryController = async (request, response) => {
  try {
    const { name, image, category } = request.body;

    if (!name || !image || !category) {
      return response.json({
        message: "Enter required fields",
        error: true,
        success: false,
      });
    }

    const addSubCategory = await SubCategoryModel({
      name,
      image,
      category,
    });

    const saveCategory = await addSubCategory.save();

    if (!saveCategory) {
      return response.status(500).json({
        message: "Not Create",
        error: true,
        success: false,
      });
    }

    return response.json({
      message: "Add Sub Category",
      error: false,
      success: true,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

const getSubCategoryController = async (request, response) => {
  try {
    const data = await SubCategoryModel.find()
      .sort({ createdAt: -1 })
      .populate("category");

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

const updateSubCategoryController = async (request, response) => {
  try {
    const { _id, name, image, category } = request.body;

    const checkSub = await SubCategoryModel.findById(_id);

    if (!checkSub) {
      return response.status(400).json({
        message: "Check your _id",
        error: true,
        success: false,
      });
    }

    const update = await SubCategoryModel.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });

    return response.json({
      message: "Update Successfully",
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

const deleteSubCategoryController = async (request, response) => {
  try {
    const { _id } = request.body;

    const deleteSub = await SubCategoryModel.findByIdAndDelete(_id);

    return response.json({
      message: "Delete successfully",
      data: deleteSub,
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
  addSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryController,
};
