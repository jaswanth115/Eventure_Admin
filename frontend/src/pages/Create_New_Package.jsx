import React, { useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { FaUtensils, FaGlassCheers, FaMusic, FaCamera, FaGifts, FaCheckCircle } from 'react-icons/fa'; // Import icons from React Icons
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS

const Create_New_Package = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [management_name, setManagementName] = useState('');
  const [price, setPrice] = useState('');
  const [venueDetails, setVenueDetails] = useState('');
  const [successMessage, setSuccessMessage] = useState(false); // New state for success message
  const [newCategory, setNewCategory] = useState(''); // New state for the category input

  const [formData, setFormData] = useState({
    decoration: '',
    catering: '',
    drinks: '',
    entertainment: '',
    photography: ''
  });

  const [availability, setAvailability] = useState({
    from: null,
    to: null
  });

  // Function to reset the form fields
  const resetForm = () => {
    setManagementName('');
    setPrice('');
    setVenueDetails('');
    setFormData({
      decoration: '',
      catering: '',
      drinks: '',
      entertainment: '',
      photography: ''
    });
    setAvailability({ from: null, to: null });
    setNewCategory(''); // Reset the category input
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const packageData = {
      management_name,
      price,
      ...formData,
      venueDetails,
      availability,
      category: newCategory // Include new category in the submission
    };

    console.log('Submitting package data:', packageData); // Add this log to inspect the data being sent
    
    try {
      const response = await axios.post('http://localhost:5000/api/packages/create-package', packageData);
      console.log('Package created successfully:', response.data);

      // Close the form and reset fields on successful submission
      resetForm();
      setIsFormOpen(false);  // Close the form after submission
      
      // Show success message and hide it after 3 seconds
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 2000); // Hide after 2 seconds
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };

  const categoryOptions = [
    { label: 'Decoration', icon: <FaGifts />, name: 'decoration' },
    { label: 'Catering', icon: <FaUtensils />, name: 'catering' },
    { label: 'Drinks', icon: <FaGlassCheers />, name: 'drinks' },
    { label: 'Entertainment', icon: <FaMusic />, name: 'entertainment' },
    { label: 'Photography & Videography', icon: <FaCamera />, name: 'photography' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 rounded-lg shadow-lg w-4/5 mx-auto mt-20"
    >
      <button
        onClick={() => {
          resetForm();  // Reset the form when toggling open
          setIsFormOpen(!isFormOpen);
        }}
        className="flex items-center bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
      >
        <span className="text-2xl font-bold mr-2">+</span> Create Package
      </button>

      {/* Success Message */}
      {successMessage && (
        <div className="flex items-center justify-center mt-4 text-green-600 animate-bounce">
          <FaCheckCircle size={40} />
          <span className="ml-2 text-lg font-bold">Package Created Successfully!</span>
        </div>
      )}

      {isFormOpen && (
        <form className="mt-6 p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name of the Management</label>
            <input
              type="text"
              value={management_name}
              onChange={(e) => setManagementName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Price</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category Options */}
          {categoryOptions.map((option, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 font-bold mb-2 flex items-center">
                {option.icon}
                <span className="ml-2">{option.label}</span>
              </label>
              <select
                name={option.name}
                value={formData[option.name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Yes/No</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          ))}

          {/* New Category Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Category</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}  // Handle category input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
          </div>

          {/* Availability Date Picker */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Availability From</label>
            <DatePicker
              selected={availability.from}
              onChange={(date) => setAvailability({ ...availability, from: date })}
              selectsStart
              startDate={availability.from}
              endDate={availability.to}
              placeholderText="Select From Date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Availability To</label>
            <DatePicker
              selected={availability.to}
              onChange={(date) => setAvailability({ ...availability, to: date })}
              selectsEnd
              startDate={availability.from}
              endDate={availability.to}
              minDate={availability.from}
              placeholderText="Select To Date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Venue Details</label>
            <textarea
              value={venueDetails}
              onChange={(e) => setVenueDetails(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter venue details here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Create Package
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default Create_New_Package;
