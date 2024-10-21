const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  phone: String,
  relation: String
});

const EmergencyContact = mongoose.model
