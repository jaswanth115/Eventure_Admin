import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";

const AssignRoles = () => {
  const [users, setUsers] = useState([]); // All users (Admins and Data Entry)
  const [justUsers, setJustUsers] = useState([]); // Users with role 'User'
  const [errorMessage, setErrorMessage] = useState(''); // Error messages

  // Fetch users from the DB on component mount
  useEffect(() => {
    fetchUsers();
    fetchJustUsers(); // Fetch users with role 'User'
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users'); // Fetch all users
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchJustUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/just-users'); // Fetch just users
      setJustUsers(response.data);
    } catch (error) {
      console.error('Error fetching just users:', error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, { role: newRole }); // Update user role
      fetchUsers(); // Refresh the user list after role change
      fetchJustUsers(); // Refresh just users list after role change
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {/* Admin Section */}
      <h2 className="text-3xl font-extrabold mb-6 mt-20 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-black-400 to-yellow-400 drop-shadow-lg">Admins</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"> {/* Adjust columns */}
        {users.filter(user => user.role === 'Admin').map(user => (
          <div
            key={user._id}
            className="p-6 bg-gradient-to-r from-gray-400 via-black-400 to-yellow-400 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col text-white"
          >
            <div className="mb-4">
              <p className="text-lg font-semibold"><strong>Email:</strong> {user.email}</p>
              <p className="text-lg font-semibold"><strong>Role:</strong> {user.role}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                className="px-4 py-2 bg-white text-gray-800 border-none rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition hover:bg-gray-100"
              >
                <option value="Admin">Admin</option>
                <option value="Data Entry">Data Entry</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Data Entry Section */}
      <h2 className="text-3xl font-extrabold mt-8 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 drop-shadow-lg">Data Entry</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {users.filter(user => user.role === 'Data Entry').map(user => (
          <div
            key={user._id}
            className="p-6 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col text-white"
          >
            <div className="mb-4">
              <p className="text-lg font-semibold"><strong>Email:</strong> {user.email}</p>
              <p className="text-lg font-semibold"><strong>Role:</strong> {user.role}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                className="px-4 py-2 bg-white text-gray-800 border-none rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition hover:bg-gray-100"
              >
                <option value="Admin">Admin</option>
                <option value="Data Entry">Data Entry</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Just Users Section */}
      <h2 className="text-3xl font-extrabold mt-8 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 drop-shadow-lg">Just Users</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {justUsers.map(user => (
          <div
            key={user._id}
            className="p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col text-white"
          >
            <div className="mb-4">
              <p className="text-lg font-semibold"><strong>Email:</strong> {user.email}</p>
              <p className="text-lg font-semibold"><strong>Role:</strong> {user.role}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                className="px-4 py-2 bg-white text-gray-800 border-none rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transform transition hover:bg-gray-100"
              >
                <option value="Admin">Admin</option>
                <option value="Data Entry">Data Entry</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AssignRoles;
