import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";

const MyOrder = () => {
  const order = useSelector((state) => state.orders.order);
  return (
    <section>
      <div className="bg-white shadow-sm p-3 font-semibold">My Order</div>

      <div>
        {!order[0] && <NoData />}

        {order.map((item, index) => {
          return (
            <div
              key={index + "orderItem" + item?._id}
              className="order rounded p-4"
            >
              <p>Order No: {item?.orderId}</p>
              <div className="flex justify-start">
                <img
                  src={item?.product_details?.image[0]}
                  className="w-14 h-14"
                />
                <p className="font-semibold">{item?.product_details?.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyOrder;
