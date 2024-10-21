const EmergencyContact = require('../models/EmergencyContact');
const factory = require('./factoryHandler');

exports.getAllEmergencyContacts = factory.getAll(EmergencyContact);
exports.getEmergencyContact = factory.getOne(EmergencyContact);
exports.createEmergencyContact = factory.createOne(EmergencyContact);
exports.updateEmergencyContact = factory.updateOne(EmergencyContact);
exports.deleteEmergencyContact = factory.deleteOne(EmergencyContact);