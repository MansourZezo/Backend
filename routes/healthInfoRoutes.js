const express = require('express');
const healthInfoController = require('../controllers/healthInfoController');

const router = express.Router();

router
  .route('/')
  .get(healthInfoController.getAllHealthInfos)
  .post(healthInfoController.createHealthInfo);

router
  .route('/:id')
  .get(healthInfoController.getHealthInfo)
  .patch(healthInfoController.updateHealthInfo)
  .delete(healthInfoController.deleteHealthInfo);

module.exports = router;
