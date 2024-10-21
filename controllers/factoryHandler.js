const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with this ID', 404));

    res.status(204).json({
        status: 'success',
        message: 'Deleted successfully'
    });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) return next(new AppError('No document found with this ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.getOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) return next(new AppError('No document found with this ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.getAll = Model => catchAsync(async (req, res, next) => {
    const docs = await Model.find();

    res.status(200).json({
        status: 'success',
        results: docs.length,
        data: {
            data: docs
        }
    });
});
