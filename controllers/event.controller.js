const Event = require('../models/event.model');

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('user_id', 'user_name user_email');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate('user_id', 'user_name user_email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

// Get events by city
const getEventsByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const events = await Event.find({ event_city: city }).populate('user_id', 'user_name user_email');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events by city', error });
  }
};

// Create an event
const createEvent = async (req, res) => {
  const { event_title, event_description, event_images, event_lat, event_lon, event_city } = req.body;
  const user_id = req.user._id;

  try {
    const newEvent = new Event({
      user_id,
      event_title,
      event_description,
      event_images,
      event_lat,
      event_lon,
      event_city,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { event_title, event_description, event_images, event_lat, event_lon, event_city } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { event_title, event_description, event_images, event_lat, event_lon, event_city },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  getEventsByCity,
  createEvent,
  updateEvent,
  deleteEvent,
};