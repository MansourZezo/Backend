const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // المتطوع (إذا كان التقييم خاصًا بالمتطوع)
  beneficiary: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // المستفيد
  activity: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },  // النشاط (إذا كان التقييم خاصًا بالنشاط)
  type: { type: String, enum: ['Volunteer', 'Activity'], required: true },  // نوع التقييم: متطوع أو نشاط
  rating: { type: Number, min: 1, max: 5, required: true },  // التقييم من 1 إلى 5
  review: String  // ملاحظات أو مراجعة
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
