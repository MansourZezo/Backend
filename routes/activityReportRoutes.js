// routes/activityReportRoutes.js
const express = require('express');
const activityReportController = require('../controllers/activityReportController');

const router = express.Router();

router
  .route('/')
  .get(activityReportController.getAllActivityReports)
  .post(activityReportController.createActivityReport);

router
  .route('/:id')
  .get(activityReportController.getActivityReport)
  .patch(activityReportController.updateActivityReport)
  .delete(activityReportController.deleteActivityReport);

module.exports = router;
