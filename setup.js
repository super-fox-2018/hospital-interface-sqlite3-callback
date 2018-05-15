var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hospital.db');


function createTable() {
  db.serialize((err)=>{
    if (err) {
      throw err
    }
    db.run(`CREATE TABLE  IF NOT EXISTS employees (id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT,password TEXT,role TEXT,login INTEGER)`)
  })
}

function createTablePatient() {
  db.serialize((err)=>{
    if (err) {
      throw err
    }
    db.run(`CREATE TABLE  IF NOT EXISTS patients (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,diagnosis TEXT)`)
  })
}

// createTablePatient()
// createTable()
