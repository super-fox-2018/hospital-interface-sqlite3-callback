const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db');
const fs = require('fs');

class Model {
  addEmployee(name, position, username, password, callback) {
    let query =
    `INSERT INTO employees (name, position, username, password, isLoggedIn)
  	 VALUES ('${name}', '${position}', '${username}', '${password}', 'false');`;
    db.run(query, (err) => {
      if (err) throw err;
      db.get('SELECT COUNT(*) AS total FROM employees;', (err, user) => {
        callback(username, user.total);
      });
    });
  }

  checkPassword(username, password, callback) {
    let query = `SELECT password FROM employees WHERE username = '${username}'`;
    db.get(query, (err, user) => {
      if (user === undefined) {
        callback(false);
      } else if (user.password === password) {
        callback(true);
        db.run(`UPDATE employees SET isLoggedIn = 'true' WHERE username = '${username}'`);
      } else {
        callback(false);
      }
    });
  }

  checkDoctor(callback) {
    let query = `SELECT position FROM employees WHERE isLoggedIn = 'true';`;
    db.get(query, (err, user) => {
      if (user === undefined) {
        callback(false);
      } else if (user.position.toLowerCase() === 'doctor') {
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  addPatient(name, diagnosis, callback) {
    let query = `INSERT INTO patients (name, diagnosis)
  	VALUES ('${name}', '${diagnosis.join(', ')}');`;
    db.run(query, (err) => {
      if (err) throw err;
      db.get('SELECT COUNT(*) AS total FROM patients;', (err, patients) => {
        callback(name, patients.total);
      });
    });
  }

  logout(username, callback) {
    db.run(`UPDATE employees SET isLoggedIn = 'false' WHERE username = '${username}';`, (err) => {
      if (err) throw err;
      callback(username);
    });
  }

  checkLogin (username, callback) {
    db.get(`SELECT isLoggedIn FROM employees WHERE username = '${username}';`, (err, employees) => {
      if (employees.isLoggedIn) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }
}

module.exports = Model;
