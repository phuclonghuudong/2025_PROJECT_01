import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const ProductListPage = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingData, setLoadingData] = useState(false);

  const fetchData = async () => {
    try {
      setLoadingData(true);

      const response = await Axios({
        ...SummaryApi.getProduct,
        data: { page: page },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setProductData(responseData?.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div>ProductPage Hello</div>;
};

export default ProductListPage;
