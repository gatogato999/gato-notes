const database = require("better-sqlite3");

const db = new database("./data/gatonotes.db", {
  // verbose: console.log,
  fileMustExist: false,
  timeout: 5000,
});

// db.pragma('foreign_keys = on');

db.exec(`
  CREATE TABLE IF NOT EXISTS  users(
    id INTEGER PRIMARY KEY AUTOINCREMENT , 
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL, 
    email TEXT UNIQUE NOT NULL ,
    password TEXT NOT NULL 
  );
  `);
db.exec(`
  CREATE TABLE IF NOT EXISTS  notes(
    id INTEGER PRIMARY KEY AUTOINCREMENT , 
    title TEXT NOT NULL, 
    content TEXT NOT NULL, 
    user_id INTEGER NOT NULL ,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP ,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
  `);

module.exports = db;
