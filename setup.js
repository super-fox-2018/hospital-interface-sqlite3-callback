const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./Database.db')

db.serialize(function(err){
	db.run(`CREATE TABLE IF NOT EXISTS employees
			(
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				username TEXT UNIQUE,
				password TEXT,
				jabatan TEXT,
				isLogin TEXT DEFAULT 'false'
			)`,function(err,data){
				if (err) {throw err}
			})
	db.run(`CREATE TABLE IF NOT EXISTS patients
		(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT ,
			diagnosis
		)`,function(err,data){
			if (err) {throw err}
		})
})
			