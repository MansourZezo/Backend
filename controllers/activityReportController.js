const ActivityReport = require('../models/ActivityReport');
const factory = require('./factoryHandler');

exports.getAllActivityReports = factory.getAll(ActivityReport);
exports.getActivityReport = factory.getOne(ActivityReport);
exports.createActivityReport = factory.createOne(ActivityReport);
exports.updateActivityReport = factory.updateOne(ActivityReport);
exports.deleteActivityReport = factory.deleteOne(ActivityReport);
