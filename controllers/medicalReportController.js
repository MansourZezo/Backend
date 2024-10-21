const MedicalReport = require('../models/MedicalReport');
const factory = require('./factoryHandler');

exports.getAllMedicalReports = factory.getAll(MedicalReport);
exports.getMedicalReport = factory.getOne(MedicalReport);
exports.createMedicalReport = factory.createOne(MedicalReport);
exports.updateMedicalReport = factory.updateOne(MedicalReport);
exports.deleteMedicalReport = factory.deleteOne(MedicalReport);