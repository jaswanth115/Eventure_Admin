import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Filter = ({ setFilteredPackages, packages }) => {
  console.log("Filter component is rendering");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState(""); // 'low-to-high', 'high-to-low'
  const [fromMonth, setFromMonth] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [states, setStates] = useState({});
  const [selectedStates, setSelectedStates] = useState([]);
  const [cities, setCities] = useState({});
  const [selectedCities, setSelectedCities] = useState([]);

  // Fetch packages to get categories, countries, states, and cities
  useEffect(() => {
    fetchPackageData();
  }, []);

  // Toggle body scroll when filter is active
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [showFilters]);

  const fetchPackageData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/packages");
      const packageData = response.data;

      const uniqueCategories = [
        ...new Set(packageData.map((pkg) => pkg.category)),
      ];
      const uniqueCountries = [
        ...new Set(packageData.map((pkg) => pkg.venueDetails.country)),
      ];

      const stateMap = {};
      const cityMap = {};

      packageData.forEach((pkg) => {
        const country = pkg.venueDetails.country;
        const state = pkg.venueDetails.state;
        const city = pkg.venueDetails.city;

        // Populate state map
        if (!stateMap[country]) stateMap[country] = new Set();
        stateMap[country].add(state);

        // Populate city map
        if (!cityMap[state]) cityMap[state] = new Set();
        cityMap[state].add(city);
      });

      setCategories(uniqueCategories);
      setCountries(uniqueCountries);
      setStates(stateMap);
      setCities(cityMap);
    } catch (error) {
      console.error("Error fetching package data:", error);
    }
  };

  // Handle applying filters
  const applyFilters = () => {
    let filtered = [...packages];

    if (sortOption) {
      filtered = filtered.sort((a, b) =>
        sortOption === "low-to-high" ? a.price - b.price : b.price - a.price
      );
    }

    if (fromMonth && toMonth) {
      filtered = filtered.filter((pkg) => {
        const from = new Date(pkg.availability.from).getMonth();
        const to = new Date(pkg.availability.to).getMonth();
        return from >= fromMonth && to <= toMonth;
      });
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((pkg) =>
        selectedCategories.includes(pkg.category)
      );
    }

    if (selectedCountries.length > 0) {
      filtered = filtered.filter((pkg) =>
        selectedCountries.includes(pkg.venueDetails.country)
      );
    }

    if (selectedStates.length > 0) {
      filtered = filtered.filter((pkg) =>
        selectedStates.includes(pkg.venueDetails.state)
      );
    }

    if (selectedCities.length > 0) {
      filtered = filtered.filter((pkg) =>
        selectedCities.includes(pkg.venueDetails.city)
      );
    }

    setFilteredPackages(filtered);
    setShowFilters(false); // Close the filter card
  };

  // Handle clearing all filters
  const clearFilters = () => {
    setSortOption("");
    setFromMonth("");
    setToMonth("");
    setSelectedCategories([]);
    setSelectedCountries([]);
    setSelectedStates([]);
    setSelectedCities([]);
    setFilteredPackages(packages);
  };

  // Handle selecting country and updating states
  const handleCountryChange = (selected) => {
    setSelectedCountries(selected);
    setSelectedStates([]);
    setSelectedCities([]);
  };

  // Handle selecting states and updating cities
  const handleStateChange = (selected) => {
    setSelectedStates(selected);
    setSelectedCities([]);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (sortOption) count += 1;
    if (fromMonth) count += 1;
    if (toMonth) count += 1;
    count += selectedCategories.length;
    count += selectedCountries.length;
    count += selectedStates.length;
    count += selectedCities.length;
    return count;
  };

  const areFiltersApplied = () => {
    return (
      sortOption ||
      fromMonth ||
      toMonth ||
      selectedCategories.length > 0 ||
      selectedCountries.length > 0 ||
      selectedStates.length > 0 ||
      selectedCities.length > 0
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="relative">
        <button
          className="font-serif relative bg-jam text-white px-4 py-2 rounded-full shadow-md transform hover:scale-110 transition duration-300"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {getActiveFilterCount()}
            </span>
          )}
        </button>
        {showFilters && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 transition duration-300">
            {" "}
            {/* Full screen overlay */}
            <div className="max-h-screen overflow-y-auto bg-white shadow-xl p-8 rounded-xl w-full max-w-lg relative transform scale-95 transition-all duration-300">
              {" "}
              {/* Centered card */}
              <button
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl focus:outline-none"
                onClick={() => setShowFilters(false)} // Close button functionality
                aria-label="Close"
              >
                &times; {/* Cross icon */}
              </button>
              {/* Sort options */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  Sort By Price
                </h4>
                <div className="flex gap-4">
                  <label className="font-serif flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="low-to-high"
                      checked={sortOption === "low-to-high"}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="font-serif mr-2"
                    />{" "}
                    Low to High
                  </label>
                  <label className="font-serif flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="high-to-low"
                      checked={sortOption === "high-to-low"}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="mr-2"
                    />{" "}
                    High to Low
                  </label>
                </div>
              </div>
              {/* Availability filters */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  Availability
                </h4>
                <div className="flex gap-4">
                  <select
                    value={fromMonth}
                    onChange={(e) => setFromMonth(e.target.value)}
                    className="p-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="">From</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>
                        {new Date(0, i).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                  <select
                    value={toMonth}
                    onChange={(e) => setToMonth(e.target.value)}
                    className="p-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="">To</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>
                        {new Date(0, i).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Category filters */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  Categories
                </h4>
                {categories.map((category) => (
                  <label key={category} className="font-serif block mb-2">
                    <input
                      type="checkbox"
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedCategories(
                          selectedCategories.includes(value)
                            ? selectedCategories.filter((c) => c !== value)
                            : [...selectedCategories, value]
                        );
                      }}
                      className="mr-2"
                    />
                    {category}
                  </label>
                ))}
              </div>
              {/* Country, State, City filters */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  Country
                </h4>
                {countries.map((country) => (
                  <label key={country} className="font-serif block mb-2">
                    <input
                      type="checkbox"
                      value={country}
                      checked={selectedCountries.includes(country)}
                      onChange={(e) =>
                        handleCountryChange(
                          selectedCountries.includes(country)
                            ? selectedCountries.filter((c) => c !== country)
                            : [...selectedCountries, country]
                        )
                      }
                      className="mr-1"
                    />
                    {country}
                  </label>
                ))}

                {selectedCountries.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">
                      States
                    </h4>
                    {selectedCountries.map((country) => (
                      <div key={country} className="font-serif block mb-2">
                        <h5>{country}</h5>
                        {Array.from(states[country] || []).map((state) => (
                          <label key={state} className="mr-2">
                            <input
                              type="checkbox"
                              value={state}
                              checked={selectedStates.includes(state)}
                              onChange={(e) =>
                                handleStateChange(
                                  selectedStates.includes(state)
                                    ? selectedStates.filter((s) => s !== state)
                                    : [...selectedStates, state]
                                )
                              }
                              className="mr-1"
                            />
                            {state}
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {selectedStates.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">
                      Cities
                    </h4>
                    {selectedStates.map((state) => (
                      <div key={state} className="font-serif block mb-2">
                        <h5>{state}</h5>
                        {Array.from(cities[state] || []).map((city) => (
                          <label key={city} className="mr-2">
                            <input
                              type="checkbox"
                              value={city}
                              checked={selectedCities.includes(city)}
                              onChange={(e) => {
                                const value = e.target.value;
                                setSelectedCities(
                                  selectedCities.includes(value)
                                    ? selectedCities.filter((c) => c !== value)
                                    : [...selectedCities, value]
                                );
                              }}
                              className="mr-1"
                            />
                            {city}
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Apply and Clear buttons */}
              <div className="flex justify-between mt-8">
                {areFiltersApplied() && (
                  <button
                    className="bg-orange-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition duration-300"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                )}
                {areFiltersApplied() && ( // Only show Apply Filters button when at least one filter is selected
                  <button
                    className="bg-jam text-white px-4 py-2 rounded-full shadow-md transition duration-300"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Filter;
