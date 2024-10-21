const mongoose = require('mongoose');

const medicalReportSchema = new mongoose.Schema({
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  beneficiary: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportDetails: String,
  date: { type: Date, default: Date.now }
});

const MedicalReport = mongoose.model('MedicalReport', medicalReportSchema);
module.exports = MedicalReport;
