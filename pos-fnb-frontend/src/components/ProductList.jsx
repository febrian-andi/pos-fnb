import React from "react";
import { Link } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { formatCurrency } from "../utils/formatCurrency";

function ProductList() {
  const { data: products, loading, error } = useFetchData("/products");
  
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

  if (products.length === 0) {
    return <p className="text-center font-bold py-10">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600">{formatCurrency(product.price)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductList;
