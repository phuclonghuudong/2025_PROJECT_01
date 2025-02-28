const { Router } = require("express");
const {
  addAddressController,
  getAddressController,
  deleteAddressController,
  updateAddressController,
} = require("../controllers/address.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const addressRouter = Router();
addressRouter.post("/create", auth, addAddressController);
addressRouter.get("/get", auth, getAddressController);
addressRouter.delete("/disabled", auth, deleteAddressController);
addressRouter.put("/update", auth, updateAddressController);

module.exports = addressRouter;
