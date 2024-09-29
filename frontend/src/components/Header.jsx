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
          {user?.name}
        </div>

        {/* Right side - Links */}
        <nav className="flex space-x-3 sm:space-x-4 md:space-x-6 items-center">
          <Link
            to="/"
            className={`text-sm sm:text-base hover:text-gray-300 transition duration-300 ease-in-out ${
              location.pathname === "/" ? "border-b-2 border-white" : ""
            }`}
          >
            All Packages
          </Link>

          {/* Conditional rendering based on user role */}
          {user?.role === 'Admin' && (
            <>
              <Link
                to="/create-package"
                className={`text-sm sm:text-base hover:text-gray-300 transition duration-300 ease-in-out ${
                  location.pathname === "/create-package" ? "border-b-2 border-white" : ""
                }`}
              >
                Create Package
              </Link>
              <Link
                to="/assign-roles"
                className={`text-sm sm:text-base hover:text-gray-300 transition duration-300 ease-in-out ${
                  location.pathname === "/assign-roles" ? "border-b-2 border-white" : ""
                }`}
              >
                Assign Roles
              </Link>
            </>
          )}

          {user?.role === 'Data Entry' && (
            <Link
              to="/create-package"
              className={`text-sm sm:text-base hover:text-gray-300 transition duration-300 ease-in-out ${
                location.pathname === "/create-package" ? "border-b-2 border-white" : ""
              }`}
            >
              Create Package
            </Link>
          )}

          {/* Wrap motion.button in a fixed-size div */}
          <div className="w-24 sm:w-28 md:w-32">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className='w-full py-2 px-2 sm:px-3 bg-gradient-to-r from-pink-500 to-orange-300 text-white 
                font-bold rounded-md sm:rounded-lg shadow-lg hover:from-pink-600 hover:to-orange-400
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base'
            >
              Logout
            </motion.button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
