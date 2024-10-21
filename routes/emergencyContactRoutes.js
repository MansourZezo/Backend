const express = require('express');
const emergencyContactController = require('../controllers/emergencyContactController');
const router = express.Router();

router
  .route('/')
  .get(emergencyContactController.getAllEmergencyContacts)
  .post(emergencyContactController.createEmergencyContact);

router
  .route('/:id')
  .get(emergencyContactController.getEmergencyContact)
  .patch(emergencyContactController.updateEmergencyContact)
  .delete(emergencyContactController.deleteEmergencyContact);

module.exports = router;
