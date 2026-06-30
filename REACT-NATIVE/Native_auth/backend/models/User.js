const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otpCode: {
    type: String,
    default: null
  },
  otpExpires: {
    type: Date,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);