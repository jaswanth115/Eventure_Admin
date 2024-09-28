import React from 'react';
import { motion } from "framer-motion";
import { useLocation, Link } from 'react-router-dom';
import { useAuthStore } from "../store/authStore";

const Header = () => {
  const { user, logout } = useAuthStore();
  const handleLogout = () => {
		logout();
	};
  const location = useLocation();  // Get the current route


  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 sm:p-5 md:p-6 shadow-lg z-10">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto w-full px-4 sm:px-6">
        {/* Left side - Username */}
        <div className="text-base sm:text-lg md:text-xl font-bold truncate">
          Welcome, {user?.name}
        </div>

        {/* Right side - Links */}
        <nav className="flex space-x-3 sm:space-x-4 md:space-x-6">
          <Link
            to="/"
            className={`text-sm sm:text-base hover:text-gray-300 transition duration-300 ease-in-out ${
              location.pathname === "/" ? "text-gray-500 cursor-not-allowed" : ""
            }`}
          >
            All Packages
          </Link>
          <Link
            to="/create-package"
            className={`text-sm sm:text-base hover:text-gray-300 transition duration-300 ease-in-out ${
              location.pathname === "/create-package" ? "text-gray-500 cursor-not-allowed" : ""
            }`}
          >
            Create Package
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className='w-24 sm:w-28 md:w-32 py-2 px-2 sm:px-3 bg-gradient-to-r from-blue-500 to-emerald-600 text-white 
              font-bold rounded-md sm:rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base'
          >
            Logout
          </motion.button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
