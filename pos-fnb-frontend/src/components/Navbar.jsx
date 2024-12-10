import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">
            POS System
          </Link>
          
          {/* Hamburger Icon for mobile */}
          <div className="block sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Links for desktop */}
          <div className="hidden sm:flex space-x-6">
            <Link to="/" className="hover:text-blue-200 font-semibold">
              Menu
            </Link>
            <Link to="/cart" className="hover:text-blue-200 font-semibold">
              Cart
            </Link>
            <Link to="/order-history" className="hover:text-blue-200 font-semibold">
              Order History
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden ${isOpen ? "block" : "hidden"} bg-blue-600 text-white px-4 py-2 space-y-2`}
      >
        <Link to="/" className="block hover:text-blue-200 font-semibold">
          Menu
        </Link>
        <Link to="/cart" className="block hover:text-blue-200 font-semibold">
          Cart
        </Link>
        <Link to="/order-history" className="block hover:text-blue-200 font-semibold">
          Order History
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;