const mongoose = require('mongoose');

const activityReportSchema = new mongoose.Schema({
  activity: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },  // النشاط المرتبط به
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // المتطوع الذي قام بالنشاط
  beneficiary: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // المستفيد
  description: String,  // وصف النشاط
  duration: Number,  // مدة النشاط بالدقائق
  notes: String,  // ملاحظات حول النشاط أو المستفيد
  rating: {
    stars: { type: Number, min: 1, max: 5 },  // التقييم بعدد النجوم
  },
  status: { type: String, enum: ['completed', 'pending', 'review'], default: 'completed' },  // حالة التقرير
  date: { type: Date, default: Date.now }  // تاريخ النشاط
});

module.exports = mongoose.model('ActivityReport', activityReportSchema);
