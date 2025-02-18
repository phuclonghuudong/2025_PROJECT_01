import React, { useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import ConfirmBox from "./ConfirmBox";
import EditProductAdmin from "./EditProductAdmin";

const ProductCartAdmin = ({ fetchData, data, countData }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: {
          _id: data?._id,
        },
      });

      const { data: responseData } = response;
      if (responseData?.success) {
        toast.success(responseData?.message);
        fetchData();
        countData();
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" xl:w-40 lg:40 p-2 bg-white rounded">
      <div>
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="h-full w-full object-scale-down"
        />
        <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
        <p className="text-slate-400">{data?.unit}</p>
        <div className="grid lg:grid-cols-2 py-2 gap-2">
          <button
            onClick={() => setOpenEdit((pre) => !pre)}
            className="border border-green-600 bg-green-200 px-1 py-1 text-sm hover:bg-green-600 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => setOpenDelete((pre) => !pre)}
            className="border border-red-600 bg-red-200 px-1 py-1 text-sm hover hover:bg-red-600 rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {openEdit && (
        <EditProductAdmin
          data={data}
          fetchData={fetchData}
          close={() => setOpenEdit((pre) => !pre)}
        />
      )}
      {openDelete && (
        <ConfirmBox
          close={() => setOpenDelete((pre) => !pre)}
          cancel={() => setOpenDelete((pre) => !pre)}
          confirm={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default ProductCartAdmin;
