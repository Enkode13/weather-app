const Database = require('better-sqlite3');
const db = new Database('weather.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS weather (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT,
    start_date TEXT,
    end_date TEXT
  )
`).run();

module.exports = db;
