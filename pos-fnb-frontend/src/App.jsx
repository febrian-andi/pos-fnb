import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import OrderHistory from "./components/OrderHistory";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import OrderDetails from "./components/OrderDetails";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <ToastContainer />
        <div className="mx-auto px-4 md:px-20 py-10">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-history/:id" element={<OrderDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
