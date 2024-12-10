import React from "react";
import { Link } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { formatCurrency } from "../utils/formatCurrency";

function OrderHistory() {
  const { data: orders, loading, error } = useFetchData("/orders");

  if (loading) {
    return (
      <div className="flex space-x-2 justify-center py-10">
        <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center font-bold text-red-500 py-10">
        Error fetching orders data: {error}
      </p>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order.id} className="py-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-medium">ID #{order.id}</p>
                <p className="text-gray-600">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <p className="text-gray-600 mb-2">
                Items:{" "}
                {JSON.parse(order.items)
                  .map((item) => `${item.name} (${item.quantity})`)
                  .join(", ")}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">
                  Total: {formatCurrency(order.total)}
                </p>
                <Link to={`/order-history/${order.id}`} className="border-2 border-blue-500 rounded-lg py-1 px-2 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white">
                  Detail
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;
