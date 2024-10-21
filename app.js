// app.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// استيراد المسارات
const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activityRoutes');
const activityReportRoutes = require('./routes/activityReportRoutes');
const healthInfoRoutes = require('./routes/healthInfoRoutes');
const emergencyContactRoutes = require('./routes/emergencyContactRoutes');
const medicalReportRoutes = require('./routes/medicalReportRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const profileRoutes = require('./routes/profileRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// تهيئة التطبيق
const app = express();

// التأكد من وجود مجلد `uploads`
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// ميدل وير لتحليل بيانات JSON
app.use(express.json());

// جعل مجلد `uploads` مجلدًا للملفات الثابتة
app.use('/uploads', express.static(uploadDir));

// إعداد المسارات
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/activity-reports', activityReportRoutes);
app.use('/api/health-info', healthInfoRoutes);
app.use('/api/emergency-contacts', emergencyContactRoutes);
app.use('/api/medical-reports', medicalReportRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/uploads', uploadRoutes);

// معالجة المسارات غير الموجودة
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ميدل وير لمعالجة الأخطاء
app.use(globalErrorHandler);

// تصدير التطبيق
module.exports = app;
