import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import CardProduct from "../components/CardProduct";
import Loading from "../components/Loading";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import validURLConvert from "../utils/validURLConvert";

const ProductListPage = () => {
  const params = useParams();
  const AllSubCategory = useSelector((state) => state.product.allSubCategory);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);

  const categoryId = params.category.split("-").slice(-1);
  const subCategoryId = params?.subCategory?.split("-").slice(-1);
  const categoryName = params.category
    .split("-")
    .slice(0, params.category.split("-")?.length - 1)
    .join(" ");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 10,
        },
      });

      const { data: responseData } = response;

      if (responseData?.success) {
        if (responseData.page == 1) {
          setData(responseData?.data);
        } else {
          setData([...data, ...responseData?.data]);
        }
        setTotalPage(responseData?.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);
  useEffect(() => {
    const sub = AllSubCategory.filter((s) => {
      const filterData = s.category.some((el) => {
        return el._id == categoryId;
      });

      return filterData ? filterData : false;
    });
    setDisplaySubCategory(sub);
  }, [params, AllSubCategory]);
  return (
    //
    <section className=" top-24 lg:top-20">
      <div className="container mx-auto top-24 grid grid-cols-[90px,1fr] md:grid-cols-[150px,1fr] lg:grid-cols-[200px,1fr] ">
        {/* sub category */}
        <div className=" min-h-[79vh] max-h-[79vh]  grid gap-1 shadow-md overflow-y-scroll scrollbarCustom py-2 bg-white">
          {DisplaySubCategory.map((c, index) => {
            const link = "";
            const url = `/${validURLConvert(c?.category[0]?.name)}-${
              c?.category[0]?._id
            }/${validURLConvert(c?.name)}-${c?._id}`;
            return (
              <Link
                to={url}
                className={`w-full p-2  lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b hover:bg-green-200 ${
                  subCategoryId == c._id ? "bg-green-400" : ""
                }`}
                key={index + "subCategory"}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 rounded box-border  ">
                  <img
                    src={c?.image}
                    alt="subCategory"
                    className="w-14 h-full object-scale-down lg:w-12 lg:h-14"
                  />
                </div>
                <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-base">
                  {c?.name}
                </p>
              </Link>
            );
          })}
        </div>

        {/* product */}
        <div className="">
          <div className="bg-white shadow-md p-2">
            <h3 className="font-semibold">{categoryName}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-2 ">
            {data.map((p, index) => {
              return <CardProduct data={p} key={p._id + "product" + index} />;
            })}
          </div>
          {loading && <Loading />}
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
