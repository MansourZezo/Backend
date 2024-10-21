const express = require('express');
const medicalReportController = require('../controllers/medicalReportController');

const router = express.Router();

router
  .route('/')
  .get(medicalReportController.getAllMedicalReports)
  .post(medicalReportController.createMedicalReport);

router
  .route('/:id')
  .get(medicalReportController.getMedicalReport)
  .patch(medicalReportController.updateMedicalReport)
  .delete(medicalReportController.deleteMedicalReport);

module.exports = router;
