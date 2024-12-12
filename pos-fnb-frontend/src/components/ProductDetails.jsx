import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { formatCurrency } from "../utils/formatCurrency";
import { toast } from 'react-toastify';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetchData(`/products/${id}`);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("productInCart")) || [];
    const existingProduct = cart.find((item) => item.id == id);
    if (existingProduct) {
      setQuantity(existingProduct.quantity);
    }
  }, [id]);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("productInCart")) || [];
    const existingProductIndex = cart.findIndex((item) => item.id == id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity = quantity;
    } else {
      cart.push({
        id: id,
        name: product.name,
        price: product.price,
        quantity: quantity,
      });
    }
    localStorage.setItem("productInCart", JSON.stringify(cart));
    toast.success("Product added to cart!", {
      position: "top-center"
    });
  };

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
        Error fetching products: {error}
      </p>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden md:flex">
      <div className="relative">
        <button onClick={() => navigate(-1)} className="absolute p-3 font-bold text-white bg-red-500 hover:bg-red-700 rounded-br-lg">
          Back
        </button>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full md:w-96 h-auto object-cover"
        />
      </div>
      <div className="p-6 md:w-1/2">
        <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-bold mb-4">
          {formatCurrency(product.price)}
        </p>
        <div className="my-4 flex flex-row items-center gap-x-4">
          <button
            onClick={decrementQuantity}
            className="border-2 border-gray-500 rounded-lg p-1 hover:bg-sky-300 hover:border-sky-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div>
            <p className="font-semibold text-xl">{quantity}</p>
          </div>
          <button
            onClick={incrementQuantity}
            className="border-2 border-gray-500 rounded-lg p-1 hover:bg-sky-300 hover:border-sky-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;