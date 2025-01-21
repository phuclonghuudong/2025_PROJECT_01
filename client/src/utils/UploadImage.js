import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";

const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await Axios({
      ...SummaryApi.uploadImage,
      data: formData,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export default uploadImage;
