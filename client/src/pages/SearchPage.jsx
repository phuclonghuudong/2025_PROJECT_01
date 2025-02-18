import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "../components/CardLoading";
import CardProduct from "../components/CardProduct";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation();
  const searchText = params.search.slice(3);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: { search: searchText, page: page },
      });

      const { data: responseData } = response;

      if (responseData?.success) {
        if (responseData?.page == 1) {
          setData(responseData?.data);
        } else {
          setData((pre) => {
            return [...pre, ...responseData.data];
          });
        }
      }

      setTotalPage(responseData?.totalPage);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage((pre) => pre + 1);
    }
  };

  const loadingArrayCard = new Array(10).fill(null);
  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data?.length} </p>

        <InfiniteScroll
          dataLength={data?.length}
          hasMore={true}
          next={handleFetchMore}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-2">
            {data?.map((p, index) => {
              return (
                <CardProduct data={p} key={p?._id + "searchProduct" + index} />
              );
            })}

            {/* loading data */}
            {loading &&
              loadingArrayCard.map((_, index) => {
                return <CardLoading key={"loadingSearch" + index} />;
              })}
          </div>
        </InfiniteScroll>
        {/* No data */}
        {!data[0] && !loading && (
          <div className="flex w-full h-full justify-center items-center">
            <NoData />
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
