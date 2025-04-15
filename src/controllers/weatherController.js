const db = require('../db/database');
const weatherService = require('../services/weatherService');
const { validateLocation, validateDateRange } = require('../utils/validators');
const { exportToCSV, exportToJSON } = require('../utils/exporter');

exports.getCurrentWeather = async (req, res) => {
  try {
    const { location } = req.body;
    if (!validateLocation(location)) return res.status(400).send('Invalid location');
    const data = await weatherService.getCurrentWeather(location);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getForecast = async (req, res) => {
  try {
    const { location } = req.body;
    if (!validateLocation(location)) return res.status(400).send('Invalid location');
    const data = await weatherService.getForecast(location);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createWeatherRecord = async (req, res) => {
  try {
    const { location, startDate, endDate } = req.body;
    if (!validateLocation(location) || !validateDateRange(startDate, endDate)) {
      return res.status(400).send('Invalid input');
    }
    const stmt = db.prepare('INSERT INTO weather (location, start_date, end_date) VALUES (?, ?, ?)');
    const info = stmt.run(location, startDate, endDate);
    res.json({ id: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.readRecords = (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM weather');
    const records = stmt.all();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRecord = (req, res) => {
  try {
    const id = req.params.id;
    const { location, startDate, endDate } = req.body;
    if (!validateLocation(location) || !validateDateRange(startDate, endDate)) {
      return res.status(400).send('Invalid input');
    }
    const stmt = db.prepare('UPDATE weather SET location=?, start_date=?, end_date=? WHERE id=?');
    stmt.run(location, startDate, endDate, id);
    res.send('Record updated');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRecord = (req, res) => {
  try {
    const id = req.params.id;
    const stmt = db.prepare('DELETE FROM weather WHERE id=?');
    stmt.run(id);
    res.send('Record deleted');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.exportData = (req, res) => {
  try {
    const format = req.query.format || 'json';
    const stmt = db.prepare('SELECT * FROM weather');
    const records = stmt.all();
    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.send(exportToCSV(records));
    } else {
      res.json(exportToJSON(records));
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
