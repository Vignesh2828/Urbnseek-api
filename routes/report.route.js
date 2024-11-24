const express = require('express');
const {
  getAllReports,
  getReportById,
  getReportsByService,
  createReport,
  updateReport,
  deleteReport,
} = require('../controllers/report.controller');
const authenticateUser = require('../auth.middleware');

const router = express.Router();

// Get all reports
router.get('/', authenticateUser, getAllReports);

// Get a report by ID
router.get('/:id', authenticateUser, getReportById);

// Get reports by service
router.get('/service/:service_id', authenticateUser, getReportsByService);

// Create a new report
router.post('/', authenticateUser, createReport);

// Update a report
router.put('/:id', authenticateUser, updateReport);

// Delete a report
router.delete('/:id', authenticateUser, deleteReport);

module.exports = router;