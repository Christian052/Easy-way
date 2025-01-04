import React from "react";
import "./../App.css";

import image from "./../assets/logo.png";
import Navbar from "./Navbar";
const Aboutus = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600">About Easy Way</h1>
            <p className="mt-4 text-gray-700 text-lg">
              Your ultimate destination for free online reading and book downloads.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={image}
                alt="About Easy Way"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-4">
                At <span className="font-bold text-blue-600">Easy Way</span>, we aim to make books accessible to everyone by providing a platform where users can read and download books for free. We believe in the power of knowledge and the importance of making it available to all, regardless of location or financial means.
              </p>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Why Choose Easy Way?
              </h2>
              <ul className="list-disc list-inside text-gray-600">
                <li>Extensive library of books across various genres.</li>
                <li>Seamless online reading experience.</li>
                <li>Completely free downloads with no hidden charges.</li>
                <li>User-friendly platform optimized for all devices.</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-8 mt-10 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-blue-600 text-center mb-6">
              Join Our Community
            </h2>
            <p className="text-gray-700 text-center mb-6">
              Be part of a growing community of book enthusiasts. Discover, read, and share your favorite books with others who share your passion.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200">
                Start Reading
              </button>
              <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200">
                Explore Library
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Aboutus;
