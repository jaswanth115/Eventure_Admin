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
    categories: {
      decoration: {
        type: String,
        enum: ['yes', 'no'],
        required: true,
      },
      food: {
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
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

export const Package = mongoose.model('Package', packageSchema);
