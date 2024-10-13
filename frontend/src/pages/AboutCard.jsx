import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaUtensils, FaGlassCheers, FaMusic, FaCamera, FaGifts } from 'react-icons/fa'; 

const AboutCard = () => {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const imageBaseURL = 'http://localhost:5000/';

  useEffect(() => {
    fetchPackageDetails();
  }, [id]);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/packages/${id}`);
      const packageData = response.data;

      packageData.images = packageData.images.map(image => image.replace(/\\/g, '/'));
      setPackageDetails(packageData);

      if (packageData.images && packageData.images.length > 0) {
        loadImageDimensions(packageData.images[0]);
      }
    } catch (error) {
      console.error('Error fetching package details:', error);
    }
  };

  const loadImageDimensions = (imagePath) => {
    const img = new Image();
    img.src = `${imageBaseURL}${imagePath}`;
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % packageDetails.images.length;
      loadImageDimensions(packageDetails.images[newIndex]);
      return newIndex;
    });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? packageDetails.images.length - 1 : prevIndex - 1;
      loadImageDimensions(packageDetails.images[newIndex]);
      return newIndex;
    });
  };

  const serviceIcons = {
    catering: <FaUtensils />,
    drinks: <FaGlassCheers />,
    entertainment: <FaMusic />,
    photography: <FaCamera />,
    decoration: <FaGifts />,
  };

  if (!packageDetails) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="w-full min-h-screen flex flex-col">
        {/* Back Button */}
        <div className="flex items-center mb-4">
          <Link 
            to="/" 
            className="bg-lightcoral text-white flex items-center justify-center w-12 h-12 rounded-full mr-4 ml-4"
          >
            <FaArrowLeft />
          </Link>
          <span className="text-lg font-semibold">{packageDetails.category}</span>
        </div>

        {/* First Div - Management Name and Images */}
        <div className="flex-1 flex flex-col items-center mb-4">
          <div className="font-broadway text-coffee text-2xl font-bold text-center my-4">
            {packageDetails.management_name}
          </div>
          <div className="p-5 relative w-full flex justify-center">
            {packageDetails.images?.length > 0 && (
              <img
                src={`${imageBaseURL}${packageDetails.images[currentImageIndex]}`}
                alt="Package"
                className="w-full max-w-full max-h-96 object-contain rounded-md"
              />
            )}
            {packageDetails.images?.length > 1 && (
              <div className="absolute inset-0 flex justify-between items-center">
                <button onClick={handlePrevImage} className="p-2 bg-gray-300 rounded-full">
                  <FaArrowLeft />
                </button>
                <button onClick={handleNextImage} className="p-2 bg-gray-300 rounded-full">
                  <FaArrowRight />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='bg-gray-100'>
          {/* Second Div - Venue Details */}
          <div className="flex flex-col md:flex-row gap-4 m-4">
            <div className="font-lucida_sans text-xl bg-gray-100 p-4 rounded-md flex-1 text-center">
              <div className="text-xl font-semibold mb-2 border-b-2 border-gray-800">Venue</div>
              <p>{packageDetails.venueDetails.venueName}</p>
              <p>{packageDetails.venueDetails.streetAddress}</p>
              <p>{`${packageDetails.venueDetails.city}, ${packageDetails.venueDetails.state}, ${packageDetails.venueDetails.country}, ${packageDetails.venueDetails.postalCode}`}</p>
              <p>Capacity: {packageDetails.venueDetails.capacity} people</p>
            </div>

            <div className="font-lucida_sans text-xl bg-gray-100 p-4 rounded-md flex-1 text-center">
              <div className="text-xl font-semibold border-b-2 border-gray-800">Available</div>
              <div className="mt-2">
                <p>From: {new Date(packageDetails.availability.from).toLocaleDateString()}</p>
                <p>To: {new Date(packageDetails.availability.to).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Third Div - Services */}
          <div className="font-lucida_sans text-xl bg-gray-100 p-4 rounded-md m-4 text-center">
            <div className="text-xl font-semibold">Services</div>
            <div className="mt-2 flex flex-wrap justify-center space-x-4">
              {Object.keys(packageDetails.services)
                .filter((service) => packageDetails.services[service] === "yes")
                .map((service) => (
                  <div key={service} className="flex flex-col items-center">
                    {serviceIcons[service]}
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Fourth Div - Price and Book Now Button */}
          <div className="flex items-center justify-center bg-gray-100 p-4 rounded-md m-4">
            <div className="text-2xl font-bold">${packageDetails.price}</div>
            <button className="font-lucida_sans text-xl bg-green-500 text-white py-2 px-4 rounded-md shadow-lg ml-4">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutCard;
