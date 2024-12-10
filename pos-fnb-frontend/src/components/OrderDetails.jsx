import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchData } from '../hooks/useFetchData';
import { formatCurrency } from '../utils/formatCurrency';

function OrderDetails() {
  const { id } = useParams();

  const { data: order, loading, error } = useFetchData(`/orders/${id}`);

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
        Error fetching data: {error}
      </p>
    );
  }

  const printInvoice = () => {
    window.print();
  };

  if (!order) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mt-8">
      <div id="invoice-content">
        <h2 className="text-2xl font-semibold mb-4">Order Details - #{order.id}</h2>
        <p className="text-gray-600 mb-4">Date : {new Date(order.created_at).toLocaleString()}</p>
        <p className="text-lg font-semibold mb-4">Orderer Name : {order.orderer_name}</p>
        <h3 className="text-xl font-semibold mb-2">Items :</h3>
        <ul className="divide-y divide-gray-200 mb-4">
          {JSON.parse(order.items).map((item, index) => (
            <li key={index} className="py-2 flex justify-between">
              <span>{item.name} ({formatCurrency(item.price)} x {item.quantity})</span>
              <span>{formatCurrency((item.price * item.quantity))}</span>
            </li>
          ))}
        </ul>
        <div className="text-xl font-semibold flex justify-between">
          <span>Total:</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Link to="/order-history" className="border-2 border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition-colors">
          Back
        </Link>
        <button onClick={printInvoice} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Print Invoice
        </button>
      </div>
    </div>
  );
}

export default OrderDetails;