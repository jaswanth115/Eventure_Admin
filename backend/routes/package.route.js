import express from 'express';
import multer from 'multer';
import { Package } from '../models/package.model.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Configure the destination for uploaded files

// POST route to handle package creation
router.post('/create-package', upload.array('images'), async (req, res) => {
  try {
    const {
      management_name,
      price,
      services,
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

    // Collect image paths
    const images = req.files.map(file => file.path); // Assuming multer saves to 'uploads/' folder

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
      images, // Add images to the package
    });

    // Save to the database
    await newPackage.save();

    res.status(201).json({ success: true, message: 'Package created successfully!', package: newPackage });
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET route to fetch all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find(); // Fetch all packages from the database
    res.status(200).json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error); // More detailed error logging
    res.status(500).json({ message: error.message });
  }
});

export default router;
