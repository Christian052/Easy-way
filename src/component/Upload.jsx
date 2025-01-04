import React, { useState } from 'react';
import {FaUpload } from "react-icons/fa"

const Upload = () => {
  const [bookData, setBookData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setBookData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all required fields are filled out
    if (!bookData.name || !bookData.description || !bookData.image) {
      alert('Please fill out all fields, including uploading an image.');
      return;
    }

    // Prepare the FormData to send
    const formData = new FormData();
    formData.append('name', bookData.name);
    formData.append('description', bookData.description);
    formData.append('image', bookData.image);

    console.log('Submitting FormData:', bookData); // Debugging log

    try {
      // Send data to the backend API
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        body: formData,
      });

      // Parse the response
      const responseData = await response.json();

      if (response.ok) {
        alert('Book added successfully!');
        setBookData({ name: '', description: '', image: null }); // Reset form after successful submission
      } else {
        console.error('Error response from server:', responseData); // Log server error response
        alert('Error adding book. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error); // Log any network or fetch error
      alert('Error adding book. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Form</h1>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Add Image of Book
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-gray-700 file:bg-gray-100 hover:file:bg-gray-200"
          />
        </div>

        {/* Book Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name of Book
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={bookData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Book Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Book Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={bookData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 "
        >
          <FaUpload  size={24} className="" /> Submit
         
        </button>
      </form>
    </div>
  );
};

export default Upload;
