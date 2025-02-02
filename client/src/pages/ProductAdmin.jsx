import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SummaryApi from "../common/SummaryApi";
import Loading from "../components/Loading";
import ProductCartAdmin from "../components/ProductCartAdmin";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [totalNoPage, setTotalNoPage] = useState(0);
  const [loadingData, setLoadingData] = useState(false);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      setLoadingData(true);

      const response = await Axios({
        ...SummaryApi.getProduct,
        data: { page: page, limit: 12, search: search },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setProductData(responseData?.data);
        setTotalPageCount(responseData?.totalCount);
        setTotalNoPage(responseData?.totalNoPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleNext = async () => {
    if (page !== totalNoPage) {
      setPage((pre) => pre + 1);
    }
  };
  const handlePrevious = async () => {
    if (page > 1) {
      setPage((pre) => pre - 1);
    }
  };
  const handleOnChangeSearch = (e) => {
    const { value } = e.target;

    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    let flag = true;
    const interval = setTimeout(() => {
      if (flag) {
        fetchData();
        flag = false;
      }
    }, 3000);

    return () => {
      clearTimeout(interval);
    };
  }, [search]);
  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between gap-2">
        <h2 className="font-semibold">Product</h2>
        <div className="h-full w-full bg-blue-50 flex justify-between items-center gap-2 py-1 px-2 rounded border focus-within:border-yellow-400  min-w-24 max-w-48">
          <FaSearch size={25} />
          <input
            type="text"
            className="h-full w-full py-2 outline-none bg-transparent"
            placeholder="Search product here...."
            onChange={handleOnChangeSearch}
            value={search}
          />
        </div>
      </div>

      {loadingData && <Loading />}

      <div className="p-4 bg-blue-50">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 min-h-[60vh]">
          {productData.map((p, index) => {
            return <ProductCartAdmin data={p} key={index + "product"} />;
          })}
        </div>

        <div className="flex justify-between my-4">
          <button
            onClick={handlePrevious}
            disabled={page <= 1 ? true : false}
            className={
              page <= 1
                ? "bg-slate-500 px-4 py-1"
                : "border border-yellow-400 px-4 py-1 hover:bg-yellow-400"
            }
          >
            Previous
          </button>
          <button className="w-full bg-slate-100">
            {page}/{totalNoPage}
          </button>
          <button
            onClick={handleNext}
            disabled={page >= totalNoPage ? true : false}
            className={
              page >= totalNoPage
                ? "bg-slate-500 px-4 py-1"
                : "border border-yellow-400 px-4 py-1 hover:bg-yellow-400"
            }
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductAdmin;
