// controllers/errorController.js
const AppError = require('../utils/appError');

// التعامل مع خطأ الإدخال غير الصحيح في MongoDB
const handleCastErrorDB = error => {
    const message = `Invalid ${error.path}: ${error.value}.`;
    return new AppError(message, 400);
};

// التعامل مع أخطاء البيانات المكررة في MongoDB
const handleDuplicateFieldsDB = err => {
    const key = Object.keys(err.keyValue)[0];
    const value = err.keyValue[key];
    const message = `Duplicate field ${key} with value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

// التعامل مع أخطاء التحقق في MongoDB
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

// إرسال استجابة في بيئة التطوير
const sendDevErrorResponse = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

// إرسال استجابة في بيئة الإنتاج
const sendProductionErrorResponse = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        console.error('ERROR 💥', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};

// الدالة الرئيسية للتعامل مع الأخطاء
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendDevErrorResponse(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;

        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

        sendProductionErrorResponse(error, res);
    }
};

