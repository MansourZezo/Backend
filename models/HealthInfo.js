const mongoose = require('mongoose');

const HealthInfoSchema = new mongoose.Schema({
    beneficiary: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },  // المستفيد
    supervisor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: false 
    },   // المشرف الطبي
    generalHealthCondition: { 
        type: String, 
        required: false 
    }, // الحالة الصحية العامة مثل الأمراض المزمنة
    weight: { 
        type: Number, 
        required: false 
    }, // الوزن
    bloodPressure: { 
        type: String, 
        required: false 
    }, // ضغط الدم
    sugarLevel: { 
        type: String, 
        required: false 
    }, // مستوى السكر في الدم
    cholesterol: { 
        type: String, 
        required: false 
    }, // الكوليسترول
    heartRate: { 
        type: String, 
        required: false 
    }, // معدل ضربات القلب
    currentMedications: [{
        name: { type: String, required: true }, // اسم الدواء
        dosage: { type: String, required: false }, // الجرعة
        frequency: { type: String, required: false }, // عدد مرات الاستخدام
    }], // الأدوية الحالية
    allergies: [{ 
        type: String 
    }], // الحساسية تجاه أدوية أو أطعمة
    date: { 
        type: Date, 
        default: Date.now 
    } // تاريخ تسجيل البيانات
});

module.exports = mongoose.model('HealthInfo', HealthInfoSchema);

