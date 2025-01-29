const { Router } = require("express");
const {
  addSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryController,
} = require("../controllers/subCategory.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const subCategoryRouter = Router();
subCategoryRouter.post("/add-subcategory", auth, addSubCategoryController);
subCategoryRouter.get("/get", getSubCategoryController);
subCategoryRouter.put("/update", auth, updateSubCategoryController);
subCategoryRouter.delete("/delete", auth, deleteSubCategoryController);

module.exports = subCategoryRouter;
