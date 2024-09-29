import express from 'express';
import { Package } from '../models/package.model.js';

const router = express.Router();

// POST route to handle package creation
router.post('/create-package', async (req, res) => {
  try {
    const { management_name, price, decoration, catering, drinks, entertainment, photography, venueDetails, availability, category } = req.body;

    if (!availability || !availability.from || !availability.to) {
      return res.status(400).json({ success: false, message: 'Availability "from" and "to" dates are required' });
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
      venueDetails,
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
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
