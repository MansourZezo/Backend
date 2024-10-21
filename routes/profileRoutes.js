const express = require('express');
const profileController = require('../controllers/profileController');
const router = express.Router();

router
  .route('/')
  .get(profileController.getAllProfiles)
  .post(profileController.createProfile);

router
  .route('/:id')
  .get(profileController.getProfile)
  .patch(profileController.updateProfile)
  .delete(profileController.deleteProfile);

module.exports = router;
