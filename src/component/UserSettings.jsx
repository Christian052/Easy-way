import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

const ProfileSettings = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [newProfilePicture, setNewProfilePicture] = useState(null);

    const userId = 1; // Replace with the actual user ID (can be fetched from authentication context)

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/profile/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
                    },
                });
                const { full_name, email, birthday, profile_picture } = response.data;
                setFullName(full_name || '');
                setEmail(email || '');
                setBirthday(birthday || '');
                setProfilePicture(profile_picture || '');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { fullName, email, password, birthday };
            await axios.put(`http://localhost:5000/api/profile/${userId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    // Handle profile picture upload
    const handleProfilePictureUpload = async () => {
        if (!newProfilePicture) return;

        const formData = new FormData();
        formData.append('profilePicture', newProfilePicture);

        try {
            const response = await axios.post(
                `http://localhost:5000/api/profile/${userId}/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setProfilePicture(response.data.imageUrl);
            alert('Profile picture updated successfully!');
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            alert('Failed to upload profile picture.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gray-100 flex items-center justify-center py-8">
                <div className="bg-white p-8 rounded-lg flex shadow-md w-full max-w-4xl">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Profile Settings</h2>
                        <div className="relative">
                            <img
                                src={profilePicture || 'https://via.placeholder.com/150'}
                                alt="Profile"
                                className="rounded-full w-52 h-52 object-cover mx-auto"
                            />
                            <label
                                htmlFor="profilePicture"
                                className="absolute bottom-4 right-6 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
                            >
                                <FaEdit />
                            </label>
                            <input
                                type="file"
                                id="profilePicture"
                                className="hidden"
                                onChange={(e) => setNewProfilePicture(e.target.files[0])}
                            />
                        </div>
                        <button
                            onClick={handleProfilePictureUpload}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Upload Picture
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full ml-8">
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter a new password"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="birthday" className="block text-gray-700 font-medium mb-2">
                                Birthday
                            </label>
                            <input
                                type="date"
                                id="birthday"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfileSettings;
