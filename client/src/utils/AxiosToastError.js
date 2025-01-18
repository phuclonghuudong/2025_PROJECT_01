import toast from "react-hot-toast";

const AxiosToastError = (error) => {
  console.log(error);
  toast.error(error?.response?.data?.message);
};

export default AxiosToastError;
