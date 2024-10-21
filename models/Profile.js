const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: false
    },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    profilePicture: { type: String, required: false },

    // المستندات الخاصة بالمتطوع
    identityProof: { 
        type: String, 
        required: function() { return this.userRole === 'Volunteer'; } // إلزامية فقط للمتطوعين
    },
    drivingLicense: { 
        type: String, 
        required: function() { return this.userRole === 'Volunteer'; } // إلزامية فقط للمتطوعين
    },
    medicalCertificate: { 
        type: String, 
        required: function() { return this.userRole === 'Volunteer'; } // إلزامية فقط للمتطوعين
    },
});

// الحصول على دور المستخدم من مخطط User وربطه بـ Profile
ProfileSchema.virtual('userRole').get(function() {
    return this.user && this.user.role;
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
