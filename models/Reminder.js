const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // المستخدم الذي يخصه التذكير
    type: { 
        type: String, 
        enum: ['Medical', 'Custom'], 
        required: true 
    }, // نوع التذكير (طبي أو مخصص)
    medicalType: { 
        type: String, 
        enum: ['Medicine', 'DoctorAppointment'], 
        required: function() { return this.type === 'Medical'; } 
    }, // النوع الطبي (دواء أو موعد طبيب)
    medicineDetails: { 
        name: { type: String }, 
        dosage: { type: String }, // الجرعة
        frequency: { type: String }, // تكرار الجرعة (مثل مرة يوميًا)
        duration: { type: String } // مدة العلاج (أيام / أسابيع)
    }, // تفاصيل الدواء في حالة تذكير "تناول الدواء"
    doctorAppointmentDetails: {
        doctorName: { type: String },
        medicalFacility: { type: String }, // الجهة الطبية
        address: { type: String }
    }, // تفاصيل موعد الطبيب في حالة "زيارة طبيب"
    title: { type: String, required: true }, // عنوان التذكير
    description: { type: String },
    date: { type: Date, required: true }, // موعد التذكير
    duration: { type: String } // مدة التذكير (اختياري)
});

module.exports = mongoose.model('Reminder', ReminderSchema);

