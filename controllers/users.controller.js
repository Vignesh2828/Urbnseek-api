const User = require('../models/users.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

  // Login a user
  const loginUser = async (req, res) => {
    const { user_email, user_password } = req.body;
  
    if (!user_email || !user_password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const user = await User.findOne({ user_email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(user_password, user.user_password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        {
          user_id: user._id,
          user_email: user.user_email,
          user_role: user.user_role,
          user_name: user.user_name,
          user_city: user.user_city,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      const userData = {
        user_id: user._id,
        user_email: user.user_email,
        user_role: user.user_role,
        user_name: user.user_name,
        user_city: user.user_city,
        user_lat: user.user_lat,
        user_lon: user.user_lon,
        user_address: user.user_address,
        user_phone: user.user_phone,
        user_whatsapp: user.user_whatsapp,
        user_aadhar: user.user_aadhar,
        user_pan: user.user_pan,
      };
  
      res.json({ token, user: userData, message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };

// Register a new user
const registerUser = async (req, res) => {
    const { 
      user_email, 
      user_password, 
      user_name, 
      user_lat, 
      user_lon, 
      user_city, 
      user_image
    } = req.body;
  
    if (!user_email || !user_password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const existingUser = await User.findOne({ user_email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(user_password, 10);
  
      const newUser = new User({
        user_email,
        user_password: hashedPassword,
        user_name,
        user_lat,
        user_lon,
        user_city,
        user_role: 'user',
        user_image,
      });
  
      await newUser.save();
  
      const token = jwt.sign(
        {
          user_id: newUser._id,
          user_email: newUser.user_email,
          user_role: newUser.user_role,
          user_name: newUser.user_name,
          user_city: newUser.user_city,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(201).json({ token, user: newUser, message: 'User registered successfully' });
    } catch (error) {
      console.error("Error in registerUser:", error);
      res.status(500).json({ message: 'Error registering user', error });
    }
  };  
  
// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update an existing user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({message : "Updated successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
};
