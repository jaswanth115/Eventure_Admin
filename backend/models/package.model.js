import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    management_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    services: {
      decoration: {
        type: String,
        enum: ['yes', 'no'],
        required: true,
      },
      catering: {
        type: String,
        enum: ['yes', 'no'],
        required: true,
      },
      drinks: {
        type: String,
        enum: ['yes', 'no'],
        required: true,
      },
      entertainment: {
        type: String,
        enum: ['yes', 'no'],
        required: true,
      },
      photography: {
        type: String,
        enum: ['yes', 'no'],
        required: true,
      },
    },
    venueDetails: {
      venueName: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      capacity: {
        type: String,
        required: true,
      },
    },
    availability: {
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
        required: true,
      },
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Store multiple image paths
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address'], // Simple email validation
    },
  },
  { timestamps: true }
);

export const Package = mongoose.model('Package', packageSchema);
