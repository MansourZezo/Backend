const Rating = require('../models/Rating');
const factory = require('./factoryHandler');

exports.getAllRatings = factory.getAll(Rating);
exports.getRating = factory.getOne(Rating);
exports.createRating = factory.createOne(Rating);
exports.updateRating = factory.updateOne(Rating);
exports.deleteRating = factory.deleteOne(Rating);
