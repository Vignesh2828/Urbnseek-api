const Service = require('../models/services.model');

// Get all services
const getAllServices = async (req, res) => {
  try {
    // Get page and limit from query parameters, with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the skip value
    const skip = (page - 1) * limit;

    // Get the total count of documents
    const totalCount = await Service.countDocuments();

    // Fetch the paginated services with user data populated
    const services = await Service.find()
      .populate('user_id', 'user_name user_email') // Adjust population fields as necessary
      .skip(skip)
      .limit(limit);

    // Return the paginated response
    res.status(200).json({
      data: services,
      total: totalCount,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
};


// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id).populate('user_id', 'user_name user_email');
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error });
  }
};

// Get services by category
const getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const services = await Service.find({ service_category: category }).populate('user_id', 'user_name user_email');
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services by category', error });
  }
};

// Create a new service
const createService = async (req, res) => {
  try {
    const { service_title, service_description, service_price, service_category, service_lat, service_lon, service_city, service_images_urls, service_completed_works_images } = req.body;

    const newService = new Service({
      user_id: req.user._id, // Assumes authenticated user middleware
      service_title,
      service_description,
      service_price,
      service_category,
      service_lat,
      service_lon,
      service_city,
      service_images_urls,
      service_completed_works_images,
    });

    const savedService = await newService.save();
    res.status(201).json({ message: 'Service created successfully', service: savedService });
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error });
  }
};

// Update a service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const service = await Service.findOneAndUpdate(
      { _id: id, user_id: req.user._id }, // Ensure user can only update their own services
      updates,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found or not authorized' });
    }

    res.status(200).json({ message: 'Service updated successfully', service });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findOneAndDelete({ _id: id, user_id: req.user._id });
    if (!service) {
      return res.status(404).json({ message: 'Service not found or not authorized' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  getServicesByCategory,
  createService,
  updateService,
  deleteService,
};