import React, { useState, useEffect } from "react";
import { usePostData } from "../hooks/usePostData";
import { formatCurrency } from "../utils/formatCurrency";
import { toast } from 'react-toastify';

function Cart() {
  const [ordererName, setOrdererName] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("productInCart")) || [];
    setCartItems(cart);
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const { loading, postData } = usePostData("/orders");
  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      await postData({
        orderer_name: ordererName,
        items: cartItems,
      });
      localStorage.removeItem("productInCart");
      setCartItems([]);
      setOrdererName("");
      toast.success("Order successfully!", {
        position: "top-center"
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to order!", {
        position: "top-center"
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Products Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <form onSubmit={handleCheckout}>
          <input
            type="text"
            value={ordererName}
            onChange={(e) => setOrdererName(e.target.value)}
            placeholder="Orderer Name"
            className="w-full px-4 py-4 rounded border-2 border-blue-500 mb-4"
            required
          />
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="py-4 flex justify-between">
                <div>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-600">Price: {item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="text-lg font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">Total:</p>
            <p className="text-2xl font-bold">{formatCurrency(total)}</p>
          </div>
          <button
            type="submit"
            className={`mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : "Checkout"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Cart;
