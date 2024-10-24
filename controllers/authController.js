const User = require('../models/User');
const Profile = require('../models/Profile'); 
const HealthInfo = require('../models/HealthInfo'); 
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { createSendToken } = require('../utils/jwt');

// دالة التسجيل
exports.signUp = catchAsync(async (req, res, next) => {
    console.log('Step 1: Started sign-up process');
    console.log('Request Body:', JSON.stringify(req.body, null, 2)); // طباعة جميع البيانات المرسلة

    const filters = [];
    if (req.body.email) {
        filters.push({ email: req.body.email });
    }
    if (req.body.phoneNumber && req.body.phoneNumber !== '') {
        filters.push({ phoneNumber: req.body.phoneNumber });
    }

    if (filters.length > 0) {
        try {
            const existingUser = await User.findOne({ $or: filters });
            if (existingUser) {
                const conflictField = existingUser.email === req.body.email ? 'Email' : 'Phone number';
                return res.status(400).json({ 
                    status: 'fail',
                    message: `${conflictField} is already registered.`,
                });
            }
        } catch (error) {
            console.log('Error during user existence check:', error); // طباعة الخطأ
            return res.status(500).json({
                status: 'error',
                message: 'Error during user existence check: ' + error.message,
            });
        }
    }

    if (!req.body.role) {
        return res.status(400).json({
            status: 'fail',
            message: 'Role is required',
        });
    }

    let newUser;
    try {
        newUser = await User.create({
            name: req.body.name,
            email: req.body.email || undefined,
            phoneNumber: req.body.phoneNumber || undefined,
            password: req.body.password,
            role: req.body.role,
        });
        console.log('New user created successfully:', newUser); // طباعة معلومات المستخدم الجديد
    } catch (error) {
        console.log('Error creating user:', error); // طباعة الخطأ
        return res.status(500).json({
            status: 'error',
            message: 'Error creating user: ' + error.message,
        });
    }

    // طباعة مسارات الملفات قبل الإنشاء
    const profilePictureUrl = req.body.profileImage || '';
    const identityProofUrl = req.body.identityProof || '';
    const drivingLicenseUrl = req.body.drivingLicense || '';
    const medicalCertificateUrl = req.body.medicalCertificate || '';

    console.log('Profile image URL:', profilePictureUrl);
    console.log('Identity proof URL:', identityProofUrl);
    console.log('Driving license URL:', drivingLicenseUrl);
    console.log('Medical certificate URL:', medicalCertificateUrl);

    let newProfile;
    try {
        newProfile = await Profile.create({
            user: newUser._id,
            address: req.body.address || '',
            dateOfBirth: req.body.dateOfBirth || '',
            profilePicture: profilePictureUrl,
            identityProof: identityProofUrl,
            drivingLicense: drivingLicenseUrl,
            medicalCertificate: medicalCertificateUrl,
        });
        console.log('New profile created successfully:', newProfile); // طباعة معلومات الملف الشخصي الجديد
    } catch (error) {
        console.log('Error creating profile:', error); // طباعة الخطأ
        return res.status(500).json({
            status: 'error',
            message: 'Error creating profile: ' + error.message,
        });
    }

    try {
        newUser.profile = newProfile._id;
        await newUser.save();
        console.log('Profile linked to user successfully'); // طباعة ربط الملف الشخصي بالمستخدم
    } catch (error) {
        console.log('Error linking profile to user:', error); // طباعة الخطأ
        return res.status(500).json({
            status: 'error',
            message: 'Error linking profile to user: ' + error.message,
        });
    }

    // إرسال التوكن مع إرجاع profileId
    createSendToken(newUser, 201, res, {
        profileId: newProfile._id, // إرجاع profileId في الرد
    });
});

// دالة تسجيل الدخول
exports.logIn = catchAsync(async (req, res, next) => {
    const { identifier, password } = req.body;

    // 1. التحقق من وجود المستخدم بناءً على البريد أو الهاتف
    const user = await User.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }]
    }).select('+password');

    if (!user) {
      return res.status(400).json({ 
        status: 'fail', 
        message: 'Invalid email or phone number.' 
      });
    }

    // 2. التحقق من صحة كلمة المرور
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        status: 'fail', 
        message: 'Invalid password.' 
      });
    }

    // 3. إرسال JWT إذا كانت البيانات صحيحة
    createSendToken(user, 200, res);
});

// دالة الحماية (التأكد من أن المستخدم مسجل الدخول)
exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password! Please log in again.', 401));
    }

    req.user = currentUser;
    next();
});

// تقييد الوصول بناءً على الأدوار
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};

// دالة ارسال بيانات المستخدم الذي قام بتسجيل الدخول
exports.getUserInfo = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new AppError('No user found with this ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});


//دالة التحقق من الاتصال بالسيرفر
exports.checkServerStatus = (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Server is healthy',
    });
  };
  
