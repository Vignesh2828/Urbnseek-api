const express = require('express');
const {
  getAllServices,
  getServiceById,
  getServicesByCategory,
  createService,
  updateService,
  deleteService,
} = require('../controllers/services.controller');
const authenticateUser = require('../auth.middleware'); // Authentication middleware

const router = express.Router();

// Get all services (Public)
router.get('/', getAllServices);

// Get service by ID (Public)
router.get('/:id', getServiceById);

// Get services by category (Public)
router.get('/category/:category', getServicesByCategory);

// Create a new service (Protected, requires authentication)
router.post('/', authenticateUser, createService);

// Update a service (Protected, requires authentication)
router.put('/:id', authenticateUser, updateService);

// Delete a service (Protected, requires authentication)
router.delete('/:id', authenticateUser, deleteService);

module.exports = router;