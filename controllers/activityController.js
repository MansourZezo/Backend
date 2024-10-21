const Activity = require('../models/Activity');
const factory = require('./factoryHandler');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// العمليات الأساسية باستخدام FactoryHandler
exports.getAllActivities = factory.getAll(Activity);
exports.getActivity = factory.getOne(Activity);
exports.createActivity = factory.createOne(Activity);
exports.updateActivity = factory.updateOne(Activity);
exports.deleteActivity = factory.deleteOne(Activity);

// الموافقة على النشاط من المشرف الطبي
exports.approveActivity = catchAsync(async (req, res, next) => {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
        return next(new AppError('No activity found with that ID', 404));
    }

    // تحقق إذا كان النشاط بالفعل معتمد
    if (activity.approvedBySupervisor) {
        return next(new AppError('Activity already approved', 400));
    }

    // تحديث حالة النشاط إلى "Scheduled"
    activity.approvedBySupervisor = true;
    activity.status = 'Scheduled';

    await activity.save();

    res.status(200).json({
        status: 'success',
        data: {
            activity
        }
    });
});

// بدء النشاط
exports.startActivity = catchAsync(async (req, res, next) => {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
        return next(new AppError('No activity found with that ID', 404));
    }

    // تحقق إذا كان النشاط في حالة "Scheduled"
    if (activity.status !== 'Scheduled') {
        return next(new AppError('Activity is not scheduled yet', 400));
    }

    // تحديث حالة النشاط إلى "In Progress"
    activity.status = 'In Progress';

    await activity.save();

    res.status(200).json({
        status: 'success',
        data: {
            activity
        }
    });
});

// إنهاء النشاط (تحديد النجاح أو الفشل)
exports.completeActivity = catchAsync(async (req, res, next) => {
    const { result } = req.body;  // إما "Success" أو "Failure"
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
        return next(new AppError('No activity found with that ID', 404));
    }

    // تحقق إذا كان النشاط في حالة "In Progress"
    if (activity.status !== 'In Progress') {
        return next(new AppError('Activity is not in progress', 400));
    }

    // تحديث حالة النشاط إلى "Completed" وتحديد النتيجة
    activity.status = 'Completed';
    activity.result = result;

    await activity.save();

    res.status(200).json({
        status: 'success',
        data: {
            activity
        }
    });
});
