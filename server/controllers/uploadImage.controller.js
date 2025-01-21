const uploadImageCloudinary = require("../utils/uploadImageCloudinary");

const UploadImageController = async (request, response) => {
  try {
    const file = request.file;

    const uploadImage = await uploadImageCloudinary(file);

    return response.json({
      message: "Upload done",
      error: false,
      success: true,
      data: uploadImage,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

module.exports = {
  UploadImageController,
};
