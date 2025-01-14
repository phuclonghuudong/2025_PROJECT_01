const UserModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const generateRefreshToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "7h" }
  );

  const updateRefreshToken = await UserModel.updateOne(
    {
      _id: userId,
    },
    { refresh_token: token }
  );

  return token;
};

module.exports = generateRefreshToken;
