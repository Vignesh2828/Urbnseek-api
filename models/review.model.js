const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    review_text: {
      type: String,
      required: false,
    },
    review_star: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    review_images: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;