import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.user_details,
    });
    return response;
  } catch (error) {
    console.log("FETCH: ", error);
  }
};

export default fetchUserDetails;
