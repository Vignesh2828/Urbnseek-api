const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
      unique: true,  // Ensures that email is unique
    },
    
    user_password: {
      type: String,
      required: true,
    },
    
    user_name: {
      type: String,
      maxlength: 100,  // Similar to VARCHAR(100)
    },
    
    user_image: {
      type: [String],
    },
    
    user_aadhar: {
      type: String,
      length: 12,  // Aadhar number is 12 digits
    },
    
    user_pan: {
      type: String,
      length: 10,  // PAN number is 10 characters
    },
    
    user_phone: {
      type: String,
      maxlength: 15,  // To store phone numbers
    },
    
    user_whatsapp: {
      type: String,
      maxlength: 15,  // To store WhatsApp numbers
    },
    
    user_address: {
      type: String,  // You can use text for long addresses
    },
    
    user_lat: {
      type: Number,
      min: -90,
      max: 90,  // Latitude range
    },
    
    user_lon: {
      type: Number,
      min: -180,
      max: 180,  // Longitude range
    },
    
    user_city: {
      type: String,
      maxlength: 200,  // Similar to VARCHAR(100)
    },
    
    user_role: {
      type: String,
      enum: ['user', 'guest'],  // Enum-like behavior
      default: 'user',  // Default role is 'user'
    },
    
    created_at: {
      type: Date,
      default: Date.now,  // Automatically sets the creation timestamp
    },
    
    updated_at: {
      type: Date,
      default: Date.now,  // Automatically sets the update timestamp
    }
  },
  {
    timestamps: true,  // Automatically handles createdAt and updatedAt
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
