const Report = require('../models/report.model');
const Service = require('../models/services.model');

// Get all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('user_id', 'user_name user_email')
      .populate('service_id', 'service_title');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error });
  }
};

// Get report by ID
const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id)
      .populate('user_id', 'user_name user_email')
      .populate('service_id', 'service_title');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report', error });
  }
};

// Get reports by service
const getReportsByService = async (req, res) => {
  try {
    const { service_id } = req.params;
    const reports = await Report.find({ service_id }).populate('user_id', 'user_name user_email');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports for service', error });
  }
};

// Create a new report
const createReport = async (req, res) => {
  const { service_id, report_category, report_images, report_description } = req.body;
  const user_id = req.user._id; // Authenticated user ID

  try {
    // Ensure the service exists
    const service = await Service.findById(service_id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const newReport = new Report({
      user_id,
      service_id,
      report_category,
      report_images,
      report_description,
    });

    await newReport.save();
    res.status(201).json({ message: 'Report created successfully', report: newReport });
  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error });
  }
};

// Update a report
const updateReport = async (req, res) => {
  const { id } = req.params;
  const { report_category, report_images, report_description } = req.body;

  try {
    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { report_category, report_images, report_description, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({ message: 'Report updated successfully', report: updatedReport });
  } catch (error) {
    res.status(500).json({ message: 'Error updating report', error });
  }
};

// Delete a report
const deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReport = await Report.findByIdAndDelete(id);
    if (!deletedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting report', error });
  }
};

module.exports = {
  getAllReports,
  getReportById,
  getReportsByService,
  createReport,
  updateReport,
  deleteReport,
};