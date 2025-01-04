import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="text-white bg-gray-700 shadow-md">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold hover:text-red-500">
          <Link to="/">Easy Way</Link>
        </h1>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/home"
              className="transition duration-200 hover:text-blue-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="transition duration-200 hover:text-blue-300"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="transition duration-200 hover:text-blue-300"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/user"
              className="transition duration-200 hover:text-blue-300"
            >
              <FaUser size={20} className="border-s-slate-50" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
