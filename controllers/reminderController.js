const Reminder = require('../models/Reminder');
const factory = require('./factoryHandler');

exports.getAllReminders = factory.getAll(Reminder);
exports.getReminder = factory.getOne(Reminder);
exports.createReminder = factory.createOne(Reminder);
exports.updateReminder = factory.updateOne(Reminder);
exports.deleteReminder = factory.deleteOne(Reminder);
