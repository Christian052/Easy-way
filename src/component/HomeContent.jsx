import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const HomeContent = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Book Image */}
                <img
                  src={`http://localhost:5000${book.image_url}`}
                  alt={book.image_url}
                  className="w-full h-48 object-cover"
                />
                {/* Book Details */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{book.name}</h2>
                  <p className="text-gray-600 mt-2">{book.description}</p>
                </div>

                {/* Buttons */}
                <div className="p-4 flex items-center justify-center gap-3">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Ready
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeContent;
