import express from 'express';
import { Package } from '../models/package.model.js';

const router = express.Router();

// POST route to handle package creation
router.post('/create-package', async (req, res) => {
  try {
    const {
      management_name,
      price,
      services,  // Extract the services object
      venueDetails,
      availability,
      category
    } = req.body;
    const { decoration, catering, drinks, entertainment, photography } = services;

    // Validate availability
    if (!availability || !availability.from || !availability.to) {
      return res.status(400).json({ success: false, message: 'Availability "from" and "to" dates are required' });
    }
  
    // Validate venue details
    const { venueName, streetAddress, city, state, postalCode, country, capacity } = venueDetails;
    if (!venueName || !streetAddress || !city || !state || !postalCode || !country || !capacity) {
      return res.status(400).json({ success: false, message: 'All venue details are required' });
    }

    // Create a new package
    const newPackage = new Package({
      management_name,
      price,
      services: {
                 decoration,
                 catering,
                 drinks,
                 entertainment,
                 photography,
      },
      venueDetails: {
        venueName,
        capacity,
        streetAddress,
        city,
        state,
        postalCode,
        country,
      },
      availability: {
        from: new Date(availability.from),
        to: new Date(availability.to),
      },
      category,
    });

    // Save to the database
    await newPackage.save();

    res.status(201).json({ success: true, message: 'Package created successfully!', package: newPackage });
  } catch (error) {
    console.error('Error creating package:', error); // Log the error for debugging
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;