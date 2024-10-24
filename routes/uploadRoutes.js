//uploadRoutes.js
const express = require('express');
const upload = require('../utils/fileUpload'); // استيراد الميدل وير
const router = express.Router();

// مسار تحميل الصورة الشخصية
router.post('/profile', upload.single('profileImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            status: 'fail',
            message: 'No file uploaded for profile image',
        });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({
        status: 'success',
        fileUrl: fileUrl,
    });
});


// مسار لتحميل المستندات (identityProof، medicalCertificate، drivingLicense)
router.post('/documents', upload.single('document'), (req, res) => {
    console.log('Request received for document upload');
    console.log('File info:', req.file); // طباعة معلومات الملف
    
    if (!req.file) {
        console.log('No file uploaded for document');
        return res.status(400).json({
            status: 'fail',
            message: 'No file uploaded for document',
        });
    }

    console.log('Document uploaded successfully:', req.file.filename);

    res.status(200).json({
        status: 'success',
        fileUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
    });
});


module.exports = router;
