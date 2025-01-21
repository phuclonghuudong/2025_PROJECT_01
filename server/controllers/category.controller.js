const CategoryModel = require("../models/category.model");

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
    const data = await CategoryModel.find();

    return response.json({
      message: "",
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

module.exports = {
  AddCategoryController,
  getCategoryController,
};
