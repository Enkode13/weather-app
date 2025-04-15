const express = require('express');
const router = express.Router();
const controller = require('../controllers/weatherController');

router.post('/current', controller.getCurrentWeather);
router.post('/forecast', controller.getForecast);
router.post('/create', controller.createWeatherRecord);
router.get('/read', controller.readRecords);
router.put('/update/:id', controller.updateRecord);
router.delete('/delete/:id', controller.deleteRecord);
router.get('/export', controller.exportData);

module.exports = router;
