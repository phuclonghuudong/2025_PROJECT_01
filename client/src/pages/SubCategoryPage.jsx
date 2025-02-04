import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import ConfirmBox from "../components/ConfirmBox";
import DisplayTable from "../components/DisplayTable";
import EditSubCategory from "../components/EditSubcategory";
import NoData from "../components/NoData";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import ViewImage from "../components/ViewImage";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const SubCategoryPage = () => {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const columnHelper = createColumnHelper();
  const [ImageUrl, setImageUrl] = useState();
  const [openEditSubCategory, setOpenEditSubCategory] = useState(false);
  const [openDeleteSubCategory, setOpenDeleteSubCategory] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
  });
  const [deleteData, setDeleteData] = useState({
    _id: "",
  });

  const allSubCategory = useSelector((state) => state.product.subCategory);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            <img
              src={row?.original?.image}
              alt={row?.original?.name}
              onClick={() => setImageUrl(row?.original?.image)}
              className="w-10 h-10 cursor-pointer"
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <div className="flex justify-start items-center gap-2">
            {row.original.category.map((c, index) => {
              return (
                <p
                  key={c._id + "table"}
                  className="shadow-md px-1 inline-block"
                >
                  {c.name}
                </p>
              );
            })}
          </div>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center gap-1">
            <button
              onClick={() => {
                setOpenEditSubCategory((pre) => !pre);
                setEditData(row.original);
              }}
              className="p-2 bg-green-100 hover:text-green-700 rounded-full"
            >
              <FaPen size={17} />
            </button>
            <button
              onClick={() => {
                setOpenDeleteSubCategory((pre) => !pre);
                setDeleteData(row.original);
              }}
              className="p-2 bg-red-100 hover:text-red-700 rounded-full"
            >
              <MdDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory(), setOpenDeleteSubCategory(false);
        setDeleteData({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
    }
  };
  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Sub Category</h2>

        <button
          onClick={() => setOpenUploadSubCategory((pre) => !pre)}
          className="text-sm border border-blue-500 hover:bg-blue-700 hover:text-white px-3 py-1 rounded"
        >
          Add Sub Category
        </button>
      </div>

      <div className="overflow-auto">
        <DisplayTable data={data} columns={column} />
      </div>
      {!data[0] && !loading && <NoData />}

      {openUploadSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenUploadSubCategory((pre) => !pre)}
          fetchData={fetchSubCategory}
        />
      )}

      {openEditSubCategory && (
        <EditSubCategory
          close={() => setOpenEditSubCategory((pre) => !pre)}
          data={editData}
          fetchData={fetchSubCategory}
        />
      )}

      {openDeleteSubCategory && (
        <ConfirmBox
          close={() => setOpenDeleteSubCategory((pre) => !pre)}
          cancel={() => setOpenDeleteSubCategory((pre) => !pre)}
          confirm={handleDeleteSubCategory}
        />
      )}

      {ImageUrl && <ViewImage url={ImageUrl} close={() => setImageUrl("")} />}
    </section>
  );
};

export default SubCategoryPage;
