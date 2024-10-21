const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },  // البريد الإلكتروني غير مطلوب عند التسجيل
    phoneNumber: { type: String, unique: true, sparse: true },  // رقم الهاتف غير مطلوب عند التسجيل
    role: { 
        type: String, 
        enum: ['Administrator', 'Beneficiary', 'Volunteer', 'Caregiver', 'MedicalSupervisor'], 
        required: true 
    },
    caregiver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: false  // الحقل اختياري ويمكن ربطه لاحقًا
    },
    beneficiary: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: false  // الحقل اختياري ويمكن ربطه لاحقًا
    },
    password: { type: String, required: true, select: false },
    passwordChangedAt: { type: Date },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },  // ربط بالملف الشخصي
    isVerified: { type: Boolean, default: false },  // حالة الموافقة على الحساب
    date: { type: Date, default: Date.now }
});

// التأكد من أن أحد الحقلين (البريد الإلكتروني أو رقم الهاتف) موجود
UserSchema.path('email').validate(function (value) {
    if (!this.email && !this.phoneNumber) {
        throw new Error('يجب إدخال إما البريد الإلكتروني أو رقم الهاتف.');
    }
    return true;
}, 'يجب إدخال إما البريد الإلكتروني أو رقم الهاتف.');

// تشفير كلمة المرور
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    if (!this.isNew) this.passwordChangedAt = Date.now() - 1000;
    next();
});

// مقارنة كلمة المرور
UserSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// التحقق من تغيير كلمة المرور
UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
