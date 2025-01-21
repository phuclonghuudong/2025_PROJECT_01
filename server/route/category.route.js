const { Router } = require("express");
const {
  AddCategoryController,
  getCategoryController,
} = require("../controllers/category.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const categoryRouter = Router();
categoryRouter.post("/add-category", AddCategoryController);
categoryRouter.get("/get", getCategoryController);

module.exports = categoryRouter;
