const express = require('express');
const {
  getAllReviews,
  getReviewById,
  getReviewsByService,
  getReviewsByUser,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/review.contoller');
const authenticateUser = require('../auth.middleware');

const router = express.Router();

// Get all reviews
router.get('/', getAllReviews);

// Get review by review ID
router.get('/:id', getReviewById);

// Get reviews for a specific service
router.get('/service/:service_id', getReviewsByService);

// Get reviews by a specific user
router.get('/user/:user_id', getReviewsByUser);

// Create a new review (Protected)
router.post('/:user_id', authenticateUser, createReview);

// Update a review (Protected)
router.put('/:id', authenticateUser, updateReview);

// Delete a review (Protected)
router.delete('/:id', authenticateUser, deleteReview);

module.exports = router;
