const jwt = require('jsonwebtoken');
const User = require('./models/users.model');

const authenticateUser = async (req, res, next) => {
  // Get the token from the Authorization header (Bearer token)
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the user_id (in the decoded token) and set it in req.user
    req.user = await User.findById(decoded.user_id).select('-user_password');
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;