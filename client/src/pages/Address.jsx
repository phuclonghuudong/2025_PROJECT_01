import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import AddAddress from "../components/AddAddress";
import EditAddressDetail from "../components/EditAddressDetail";
import { userGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
  const [openCreateAddress, setOpenCreateAddress] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [editAddressData, setEditAddressData] = useState({});
  const [loading, setLoading] = useState(false);
  const { fetchAddress } = userGlobalContext();

  const handleDeleteAddress = async (e) => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.deleteAddress,
        data: {
          _id: e,
        },
      });
      const { data: responseData } = response;

      if (responseData?.success) {
        toast.success(responseData?.message);
        if (close) {
          close();
          fetchAddress();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-blue-50 w-full h-full">
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Address</h2>
        <div
          onClick={() => setOpenCreateAddress((pre) => !pre)}
          className="rounded-full border-2 border-yellow-400 hover:bg-yellow-400"
        >
          <p className="font-semibold p-2 text-yellow-400 hover:text-white">
            Add Address
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-2 grid gap-3">
        {addressList?.map((a, index) => {
          return (
            <label
              key={index + "address" + a?._id}
              htmlFor={"selectAddressList" + index}
              className={`bg-white ${!a?.status && "hidden"}`}
            >
              <div
                key={a?._id + `checkoutPage` + index}
                className={`border rounded p-3 flex gap-4 hover:bg-yellow-50 justify-between `}
              >
                <div>
                  <p>{a?.address_line}</p>
                  <p>{a?.city}</p>
                  <p>{a?.state}</p>
                  <p>
                    {a?.country} - {a?.pincode}
                  </p>
                </div>
                <div className="grid gap-4">
                  <button
                    onClick={() => {
                      setOpenEditAddress(true);
                      setEditAddressData(a);
                    }}
                    className="hover:text-white hover:bg-green-600 cursor-pointer bg-green-300 p-1 rounded"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(a?._id)}
                    className="hover:text-white hover:bg-red-600 cursor-pointer bg-red-300 p-1 rounded"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {openCreateAddress && (
        <AddAddress close={() => setOpenCreateAddress(false)} />
      )}
      {openEditAddress && (
        <EditAddressDetail
          close={() => setOpenEditAddress(false)}
          data={editAddressData}
        />
      )}
    </section>
  );
};

export default Address;
