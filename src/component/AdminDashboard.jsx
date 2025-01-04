import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaUsers, FaCog, FaTachometerAlt, FaSignOutAlt, FaBook, FaFacebookMessenger } from "react-icons/fa";
import axios from "axios";
import Upload from "./Upload";
// import { FaMessage } from "react-icons/fa6";

const Dashboard = () => (
    <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to the admin dashboard!</p>
        <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-white rounded shadow">
                <h1 className="font-bold text-center">Users</h1>
                <Link to="/users" className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-700 hover:text-red-400 ">
                    <FaUsers size={100} className="mr-5" />  Manage Users
                </Link>


            </div>
            <div className="p-4 bg-white rounded shadow">

                <h1 className="font-bold text-center">Books</h1>
                <Link to="/books" className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-700 hover:text-red-400 ">
                    <FaBook size={100} className="mr-5" /> Manage Bookks
                </Link>
            </div>
            <div className="p-4 bg-white rounded shadow">
                <h1 className="font-bold text-center">Feelback</h1>
                <Link to="/Feelback" className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-700 hover:text-red-400 ">
                    <FaFacebookMessenger size={100} className="mr-5" /> Ready FeelBacks
                </Link>
            </div>
        </div>
    </div>
);

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchUsers();
    }, []);
    return (

        loading ? (
            <p> Loading books...</p >
        ) : (
            <div className="p-4">
                <h1 className="text-2xl font-bold">Users</h1>
                <p>Manage your users here.</p>
                <table className="w-full mt-4 bg-white rounded shadow">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Password</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr>
                                <td className="px-4 py-2 border">{user.id}</td>
                                <td className="px-4 py-2 border">{user.user_name}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
                                <td className="px-4 py-2 border ">{user.password}</td>
                                <td className="px-4 py-2 border">
                                    <button className="px-2 py-1 text-white bg-blue-500 rounded">Edit</button>
                                    <button className="px-2 py-1 ml-2 text-white bg-red-500 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>))
};

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);
    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/books");
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error); // Logs detailed error
            alert(`Failed to fetch books: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };


    const handleEdit = async (book) => {
        const updatedName = prompt("Enter new book name:", book.name);
        const updatedDescription = prompt("Enter new description:", book.description);

        if (updatedName && updatedDescription) {
            try {
                await axios.put(`http://localhost:5000/api/books/${book.id}`, {
                    name: updatedName,
                    description: updatedDescription,
                });
                alert("Book updated successfully!");
                fetchBooks();
            } catch (error) {
                console.error("Error updating book:", error);
                alert("Failed to update the book. Please try again.");
            }
        } else {
            alert("Both fields are required to edit the book.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/books/${id}`);
                alert(response.data?.message || "Book deleted successfully.");
                fetchBooks();
            } catch (error) {
                console.error("Error deleting book:", error); // Logs detailed error
                alert(`Error deleting book: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Books</h1>
            <button className="px-4 py-2 mb-4 text-white bg-blue-500 rounded">
                <NavLink to="/upload" className="transition duration-200 hover:text-blue-300">
                    Upload Book
                </NavLink>
            </button>

            {loading ? (
                <p>Loading books...</p>
            ) : (
                <table className="w-full mt-4 bg-white rounded shadow">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Book Name</th>
                            <th className="px-4 py-2 border">Description</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td className="px-4 py-2 border">{book.id}</td>
                                <td className="px-4 py-2 border">{book.name}</td>
                                <td className="px-4 py-2 border">{book.description}</td>
                                <td className="px-4 py-2 border">
                                    <button className="px-2 py-1 text-white bg-blue-500 rounded" onClick={() => handleEdit(book)}>
                                        Edit
                                    </button>
                                    <button className="px-2 py-1 ml-2 text-white bg-red-500 rounded" onClick={() => handleDelete(book.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const Settings = () => (
    <div className="p-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <form className="mt-4">
            <div className="mb-4">
                <label className="block mb-2 font-medium">Site Name</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Enter site name" />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-medium">Admin Email</label>
                <input type="email" className="w-full p-2 border rounded" placeholder="Enter admin email" />
            </div>
            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">Save Changes</button>
        </form>
    </div>
);

const Sidebar = () => (
    <div className="w-64 min-h-screen text-white bg-gray-800">
        <div className="p-4 text-lg font-semibold">Easy Way Admin</div>
        <nav className="mt-4">
            <Link to="/admindashboard" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700">
                <FaTachometerAlt className="mr-2" /> Dashboard
            </Link>
            <Link to="/users" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700">
                <FaUsers className="mr-2" /> Users
            </Link>
            <Link to="/books" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700">
                <FaBook className="mr-2" /> Books
            </Link>
            <Link to="/settings" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700">
                <FaCog className="mr-2" /> Settings
            </Link>
            <Link to="/logout" className="flex items-center px-4 py-2 text-sm hover:bg-gray-700">
                <FaSignOutAlt className="mr-2" /> Logout
            </Link>
        </nav>
    </div>
);

const AdminDashboard = () => (
    <Router>
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-gray-100">
                <Routes>
                    <Route path="/admindashboard" element={<AdminDashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/upload" element={<Upload />} />
                </Routes>
            </div>
        </div>
    </Router>
);

export default AdminDashboard;
