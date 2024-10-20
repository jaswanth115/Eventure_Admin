import React, { useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { FaUtensils, FaGlassCheers, FaMusic, FaCamera, FaGifts, FaCheckCircle } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

  const Create_New_Package = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [management_name, setManagementName] = useState('');
  const [commission, setCommission] = useState('');
  const [price, setPrice] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');  // Add phoneNumber state
  const [email, setEmail] = useState('');              // Add email state
  const [successMessage, setSuccessMessage] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    decoration: '',
    catering: '',
    drinks: '',
    entertainment: '',
    photography: ''
  });

  const [venueDetails, setVenueDetails] = useState({
    venueName: '',
    capacity: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const [availability, setAvailability] = useState({
    from: null,
    to: null
  });

  const resetForm = () => {
    setManagementName('');
    setPrice('');
    setPhoneNumber('');  // Reset phone number
    setEmail('');        // Reset email
    setFormData({
      decoration: '',
      catering: '',
      drinks: '',
      entertainment: '',
      photography: ''
    });
    setVenueDetails({
      venueName: '',
      capacity: '',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    });
    setAvailability({ from: null, to: null });
    setNewCategory('');
    setImages([]); // Reset images
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleVenueChange = (e) => {
    setVenueDetails({
      ...venueDetails,
      [e.target.name]: e.target.value
    });
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));

    // Update images state with new selected files
    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const packageData = new FormData();
    packageData.append('management_name', management_name);
    packageData.append('price', price);
    packageData.append('phoneNumber', phoneNumber);  // Append phone number
    packageData.append('email', email);              // Append email
    packageData.append('commission', commission);  // Append commission
    packageData.append('category', newCategory);

    // Add services
    Object.keys(formData).forEach((key) => {
      packageData.append(`services[${key}]`, formData[key]);
    });

    // Add venue details
    Object.keys(venueDetails).forEach((key) => {
      packageData.append(`venueDetails[${key}]`, venueDetails[key]);
    });

    // Add availability
    packageData.append('availability[from]', availability.from);
    packageData.append('availability[to]', availability.to);

    // Append images to FormData
    images.forEach((image) => {
      packageData.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/packages/create-package', packageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Package created successfully:', response.data);
      resetForm();
      setIsFormOpen(false);
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 2000);
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };

  const categoryOptions = [
    { label: 'Decoration', icon: <FaGifts />, name: 'decoration' },
    { label: 'Catering', icon: <FaUtensils />, name: 'catering' },
    { label: 'Drinks', icon: <FaGlassCheers />, name: 'drinks' },
    { label: 'Entertainment', icon: <FaMusic />, name: 'entertainment' },
    { label: 'Photography & Videography', icon: <FaCamera />, name: 'photography' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 rounded-lg shadow-lg w-4/5 mx-auto "
    >
      <button
        onClick={() => {
          resetForm();
          setIsFormOpen(!isFormOpen);
        }}
        className="flex items-center bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
      >
        <span className="text-2xl font-bold mr-2">+</span> Create Package
      </button>

      {successMessage && (
        <div className="flex items-center justify-center mt-4 text-green-600 animate-bounce">
          <FaCheckCircle size={40} />
          <span className="ml-2 text-lg font-bold">Package Created Successfully!</span>
        </div>
      )}

      {isFormOpen && (
        <form className="mt-6 p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name of the Management</label>
            <input
              type="text"
              value={management_name}
              onChange={(e) => setManagementName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Commission Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Commission (%)</label>
            <input
              type="number"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Commission Percentage"
            />
          </div>
          
          {/* Phone Number Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Phone Number"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Email Address"
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

          {/* Venue Details Section */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Venue Details</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Venue Name</label>
              <input
                type="text"
                name="venueName"
                value={venueDetails.venueName}
                onChange={handleVenueChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Venue Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Street Address</label>
              <input
                type="text"
                name="streetAddress"
                value={venueDetails.streetAddress}
                onChange={handleVenueChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Street Address"
              />
            </div>

            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={venueDetails.city}
                  onChange={handleVenueChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter City"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={venueDetails.state}
                  onChange={handleVenueChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter State"
                />
              </div>
            </div>

            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={venueDetails.postalCode}
                  onChange={handleVenueChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Postal Code"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={venueDetails.country}
                  onChange={handleVenueChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Country"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Capacity</label>
                <input
                  type="text"
                  name="capacity"
                  value={venueDetails.capacity}
                  onChange={handleVenueChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Max Capacity"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
             <label className="block text-gray-700 font-bold mb-2">Category</label>
             <input
               type="text"
               value={newCategory}
               onChange={(e) => setNewCategory(e.target.value)}
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

          {/* Image Upload Section */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-2 text-gray-600">You can upload multiple images.</p>
            {/* Display selected images */}
            <div className="mt-2">
              {images.map((image, index) => (
                <div key={index} className="flex items-center justify-between border-b py-2">
                  <span>{image.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setImages(images.filter((_, i) => i !== index)); // Remove image on click
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
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
