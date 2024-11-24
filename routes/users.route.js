const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller.js');

// register new user
router.post('/register', registerUser)

// login user
router.post('/login', loginUser)

// Get all users
router.get('/', getUsers);

// Get a specific user by ID
router.get("/:id", getUser);

// Update an existing user by ID
router.put("/:id", updateUser);

// Delete a user by ID
router.delete("/:id", deleteUser);

module.exports = router;
