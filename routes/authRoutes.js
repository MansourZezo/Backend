const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.get('/check', authController.checkServerStatus);

// مسار محمي لإرجاع بيانات المستخدم الحالي
router.get('/me', authController.protect, authController.getUserInfo);

module.exports = router;

