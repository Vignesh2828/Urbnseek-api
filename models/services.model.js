const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: 'User', // Establish relationship
      required: true,
    },
    service_title: {
      type: String,
      required: true,
    },
    service_description: {
      type: String,
    },
    service_category: {
      type: String,
      maxlength: 100,
    },
    service_price: {
      type: Number, // Use Decimal128 if precision beyond floating point is necessary
      required: true,
    },
    service_lat: {
      type: Number,
      min: -90,
      max: 90,
    },
    service_lon: {
      type: Number,
      min: -180,
      max: 180,
    },
    service_city: {
      type: String,
      maxlength: 200,
    },
    service_images_urls: {
      type: [String],
    },
    service_completed_works_images: {
      type: [String], // Array of URLs
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
);

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;