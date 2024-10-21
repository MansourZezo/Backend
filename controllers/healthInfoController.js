const HealthInfo = require('../models/HealthInfo');
const factory = require('./factoryHandler');

exports.getAllHealthInfos = factory.getAll(HealthInfo);
exports.getHealthInfo = factory.getOne(HealthInfo);
exports.createHealthInfo = factory.createOne(HealthInfo);
exports.updateHealthInfo = factory.updateOne(HealthInfo);
exports.deleteHealthInfo = factory.deleteOne(HealthInfo);
