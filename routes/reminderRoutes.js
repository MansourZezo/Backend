const express = require('express');
const reminderController = require('../controllers/reminderController');

const router = express.Router();

router
  .route('/')
  .get(reminderController.getAllReminders)
  .post(reminderController.createReminder);

router
  .route('/:id')
  .get(reminderController.getReminder)
  .patch(reminderController.updateReminder)
  .delete(reminderController.deleteReminder);

module.exports = router;
