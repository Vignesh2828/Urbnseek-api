const express = require('express');
const {
  getAllEvents,
  getEventById,
  getEventsByCity,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/event.controller');
const authenticateUser = require('../auth.middleware');

const router = express.Router();

// Get all events
router.get('/', getAllEvents);

// Get event by ID
router.get('/:id', getEventById);

// Get events by city
router.get('/city/:city', getEventsByCity);

// Create a new event (Protected)
router.post('/', authenticateUser, createEvent);

// Update an event (Protected)
router.put('/:id', authenticateUser, updateEvent);

// Delete an event (Protected)
router.delete('/:id', authenticateUser, deleteEvent);

module.exports = router;