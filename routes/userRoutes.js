const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const emergencyContactController = require('../controllers/emergencyContactController');

const router = express.Router();

// حماية جميع المسارات باستخدام authController.protect
router.use(authController.protect);

// مسارات CRUD للمستخدمين
router
  .route('/')
  .get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// ربط المستخدم بملفه الشخصي (Profile)
router
  .route('/:userId/profile')
  .get(profileController.getProfile)
  .patch(profileController.updateProfile);

// ربط المستخدم بجهات الاتصال الطارئة (Emergency Contacts)
router
  .route('/:userId/emergency-contacts')
  .get(emergencyContactController.getAllEmergencyContacts)
  .post(emergencyContactController.createEmergencyContact);

router
  .route('/:userId/emergency-contacts/:contactId')
  .get(emergencyContactController.getEmergencyContact)
  .patch(emergencyContactController.updateEmergencyContact)
  .delete(emergencyContactController.deleteEmergencyContact);

module.exports = router;
