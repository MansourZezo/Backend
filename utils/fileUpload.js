const multer = require('multer');
const path = require('path');
const AppError = require('./appError'); // تأكد من أن AppError موجود ومُستورد بشكل صحيح

// إعداد تخزين الملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Storing file to /uploads/ directory');
    cb(null, 'uploads/'); // تحديد مجلد التحميل
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // استخراج الامتداد
    const fileName = `${file.fieldname}-${Date.now()}${ext}`; // إنشاء اسم ملف فريد
    console.log('Generated file name:', fileName);
    cb(null, fileName);
  }
});

// تصفية الملفات لضمان أن الملفات المرفوعة هي صور أو مستندات
const fileFilter = (req, file, cb) => {
    console.log('File mime type:', file.mimetype);
    if (
      file.mimetype.startsWith('image/') || 
      file.mimetype === 'application/pdf' || 
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true); // قبول الملفات
    } else {
      console.log('Invalid file format');
      cb(new AppError('الملفات المسموح بها هي صور أو مستندات PDF و DOCX فقط', 400), false); // رفض الملف
    }
};

// إنشاء مثال من Multer مع الإعدادات المحددة
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // تحديد الحد الأقصى لحجم الملف بـ 5 ميجابايت (اختياري)
});

module.exports = upload;
