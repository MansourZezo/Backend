const Profile = require('../models/Profile');
const factory = require('./factoryHandler');

exports.getAllProfiles = factory.getAll(Profile);
exports.getProfile = factory.getOne(Profile);
exports.createProfile = factory.createOne(Profile);
exports.updateProfile = factory.updateOne(Profile);
exports.deleteProfile = factory.deleteOne(Profile);


exports.updateDocuments = async (req, res, next) => {
    const profileId = req.params.profileId;
    console.log('Received request to upload document for profile ID:', profileId); // طباعة ID المستخدم

    if (!req.file) {
        console.log('No file uploaded for document'); // طباعة حالة عدم وجود ملف
        return res.status(400).json({
            status: 'fail',
            message: 'No file uploaded for document',
        });
    }

    try {
        // البحث عن الملف الشخصي بواسطة profileId
        const profile = await Profile.findById(profileId);
        console.log('Profile found:', profile); // طباعة الملف الشخصي

        if (!profile) {
            console.log('Profile not found'); // طباعة حالة عدم وجود الملف الشخصي
            return res.status(404).json({
                status: 'fail',
                message: 'Profile not found',
            });
        }

        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        console.log('Generated file URL:', fileUrl); // طباعة URL الملف

        if (req.body.documentType === 'identityProof') {
            profile.identityProof = fileUrl;
        } else if (req.body.documentType === 'drivingLicense') {
            profile.drivingLicense = fileUrl;
        } else if (req.body.documentType === 'medicalCertificate') {
            profile.medicalCertificate = fileUrl;
        } else {
            console.log('Invalid document type:', req.body.documentType); // طباعة نوع المستند الخاطئ
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid document type',
            });
        }

        // حفظ الملف الشخصي بعد التحديث
        await profile.save();
        console.log('Profile updated successfully'); // طباعة نجاح تحديث الملف الشخصي

        res.status(200).json({
            status: 'success',
            message: 'Document uploaded successfully',
            fileUrl: fileUrl,
        });
    } catch (error) {
        console.log('Error uploading document:', error); // طباعة الخطأ
        res.status(500).json({
            status: 'error',
            message: 'Error uploading document: ' + error.message,
        });
    }
};

