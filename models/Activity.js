const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // المستخدم الذي يخصه النشاط
  name: { type: String, required: true }, // اسم النشاط
  type: { type: String, required: true }, // نوع النشاط
  description: { type: String }, // وصف النشاط
  date: { type: Date, required: true }, // موعد النشاط
  estimatedDuration: { type: String }, // مدة تقديرية للنشاط (اختياري)
  
  // حالات النشاط
  status: { 
    type: String, 
    enum: ['Inactive', 'Scheduled', 'In Progress', 'Completed'], // الحالات الأربع
    default: 'Inactive' 
  }, 

  // النتيجة تظهر فقط إذا كان النشاط مكتملًا
  result: { 
    type: String, 
    enum: ['Success', 'Failure'], 
    required: function() { return this.status === 'Completed'; } 
  },

  // الحقل لتحديد الموافقة من المشرف الطبي
  approvedBySupervisor: { 
    type: Boolean, 
    default: false 
  }, // يتم تحديثه عند موافقة المشرف الطبي
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
