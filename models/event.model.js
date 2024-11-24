const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event_title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    event_description: {
      type: String,
    },
    event_images: {
      type: [String], // Array of image URLs
    },
    event_lat: {
      type: mongoose.Schema.Types.Decimal128, // Latitude with high precision
    },
    event_lon: {
      type: mongoose.Schema.Types.Decimal128, // Longitude with high precision
    },
    event_city: {
      type: String,
      maxlength: 100,
    },
  },
  {
    timestamps: true, // Automatically creates `created_at` and `updated_at` fields
  }
);

module.exports = mongoose.model('Event', EventSchema);