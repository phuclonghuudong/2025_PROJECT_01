import axios from "axios";
import { baseURl } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: baseURl,
  withCredentials: true,
});

export default Axios;
