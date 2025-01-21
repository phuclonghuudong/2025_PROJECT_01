const { Router } = require("express");
const auth = require("../middleware/auth");
const {
  UploadImageController,
} = require("../controllers/UploadImage.controller");
const upload = require("../middleware/multer");

const uploadRouter = Router();

uploadRouter.post(
  "/upload",
  auth,
  upload.single("image"),
  UploadImageController
);

module.exports = {
  uploadRouter,
};
