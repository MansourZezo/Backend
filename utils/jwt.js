// utils/jwt.js
const jwt = require('jsonwebtoken');

// دالة توليد الـ JWT
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// دالة إرسال الـ JWT مع الاستجابة
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // إعداد الكوكي (اختياري)
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // حذف كلمة المرور من الاستجابة
    user.password = undefined;

    // التأكد من عدم وجود مشاكل في استجابة الـ API
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

module.exports = { createSendToken };
