import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PackageCard = () => {
  const [packages, setPackages] = useState([]); // State to store package data

  // Fetch packages from the DB on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/packages'); // Fetch all packages
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 m-10">
  {packages.map((pkg) => (
    <div
      key={pkg._id}
      className="transform hover:scale-110 transition duration-200 bg-cloud p-4 sm:p-6 shadow-md w-full h-auto relative" // Adjusted padding for smaller screens
    >
      {/* City on the top right */}
      <div className="text-sm sm:text-base text-gray-600 font-semibold absolute top-2 right-2 truncate">
        {pkg.venueDetails.city}
      </div>

      {/* Management Name in the center */}
      <div className="flex items-center justify-center h-24">
        <h2 className="font-yuGothic text-lg sm:text-xl font-bold text-coffee text-center truncate">
          {pkg.management_name}
        </h2>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-4 sm:mt-6 space-x-2 sm:space-x-4">
        <div className="text-gray-700 font-medium text-sm sm:text-lg truncate">
          ${pkg.price}
        </div>
        <div className="text-gray-500 font-light text-xs sm:text-sm truncate">
          {pkg.category}
        </div>
        <div className="text-gray-700 font-medium text-xs sm:text-sm truncate">
          Capacity: {pkg.venueDetails.capacity}
        </div>
      </div>
    </div>
  ))}
</div>
  );
};

export default PackageCard;

