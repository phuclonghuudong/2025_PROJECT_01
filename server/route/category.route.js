const { Router } = require("express");
const {
  AddCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/category.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const categoryRouter = Router();
categoryRouter.post("/add-category", AddCategoryController);
categoryRouter.get("/get", getCategoryController);
categoryRouter.put("/update", auth, updateCategoryController);
categoryRouter.delete("/delete", auth, deleteCategoryController);

module.exports = categoryRouter;
