const express = require('express');
const activityController = require('../controllers/activityController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(activityController.getAllActivities)
  .post(authController.protect, activityController.createActivity);

router
  .route('/:id')
  .get(activityController.getActivity)
  .patch(authController.protect, activityController.updateActivity)
  .delete(authController.protect, activityController.deleteActivity);

// مسار الموافقة على النشاط
router
  .patch('/:id/approve', authController.protect, activityController.approveActivity);

// مسار بدء النشاط
router
  .patch('/:id/start', authController.protect, activityController.startActivity);

// مسار إنهاء النشاط
router
  .patch('/:id/complete', authController.protect, activityController.completeActivity);

module.exports = router;
