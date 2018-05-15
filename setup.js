var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hospital.db');

db.serialize(function() {
	db.run(`CREATE TABLE patients (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,diagnosis TEXT)`)
	db.run(`CREATE TABLE employees (id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT UNIQUE,password TEXT,role TEXT,status TEXT DEFAULT 'false')`)
})