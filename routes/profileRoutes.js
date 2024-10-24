const express = require('express');
const profileController = require('../controllers/profileController');
const upload = require('../utils/fileUpload');
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


router.post('/documents/:profileId', upload.single('document'), profileController.updateDocuments);

module.exports = router;
