const Profile = require('../models/Profile');
const factory = require('./factoryHandler');

exports.getAllProfiles = factory.getAll(Profile);
exports.getProfile = factory.getOne(Profile);
exports.createProfile = factory.createOne(Profile);
exports.updateProfile = factory.updateOne(Profile);
exports.deleteProfile = factory.deleteOne(Profile);