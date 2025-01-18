const { Router } = require("express");
const {
  loginController,
  logoutController,
  registerUserController,
  uploadAvatar,
  verifyEmailController,
  updateUserDetails,
  forgotPasswordController,
  verifyForgotPasswordOtp,
  resetPasswordController,
  refreshTokenController,
  userDetails,
} = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const userRouter = Router();
userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginController);
userRouter.post("/logout", auth, logoutController);
userRouter.put("/update-avatar", auth, upload.single("avatar"), uploadAvatar);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.put("/reset-password", resetPasswordController);
userRouter.post("/refresh-token", refreshTokenController);
userRouter.get("/user-details", auth, userDetails);

module.exports = userRouter;
