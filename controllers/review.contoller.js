const Review = require('../models/review.model');

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user_id', 'user_name user_email').populate('service_id', 'service_title');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Get a specific review by review ID
const getReviewById = async (req, res) => {
    try {
      const { id } = req.params; // Review ID
      const review = await Review.findById(id)
        .populate('user_id', 'user_name user_email') // Populate user details
        .populate('service_id', 'service_title'); // Populate service details
  
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching review', error });
    }
  };
  

// Get reviews for a specific service
const getReviewsByService = async (req, res) => {
  try {
    const { service_id } = req.params;
    const reviews = await Review.find({ service_id }).populate('user_id', 'user_name user_email user_image');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Get reviews by a specific user
const getReviewsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const reviews = await Review.find({ user_id }).populate('service_id', 'service_title');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user reviews', error });
  }
};

// Create a review
const createReview = async (req, res) => {
  const { service_id, review_text, review_star, review_images } = req.body;
  const user_id = req.user._id;

  try {
    const newReview = new Review({ user_id, service_id, review_text, review_star, review_images });
    await newReview.save();
    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error });
  }
};

// Update a review
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { review_text, review_star, review_images } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { review_text, review_star, review_images },
      { new: true } // Return the updated document
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  getReviewsByService,
  getReviewsByUser,
  createReview,
  updateReview,
  deleteReview,
};