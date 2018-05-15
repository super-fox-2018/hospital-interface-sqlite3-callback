const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db');

class Diagnosis {
  constructor(name, patientId) {
    this.id = 0
    this.name = name
    this.patientId = patientId
  }
  addDiagnosis(diagnosis, callback) {
    let query = '';
    diagnosis.readDiagnosis(diagnosis.name, function (rowDiag) {
      if (!rowDiag) {
        query = `INSERT INTO diagnosis (name) `
        query += `VALUES (`
        query += `"${diagnosis.name.toLowerCase()}"`
        query += `);`
        db.run(query, function (err) {
          if (err) throw err;
          diagnosis.id = this.lastID;
          Diagnosis.addPatientsDiagnosis(diagnosis.patientId, diagnosis.id, function () {
            callback(diagnosis)
          })
        })
      } else {
        Diagnosis.addPatientsDiagnosis(diagnosis.patientId, rowDiag.id, function () {
          callback(diagnosis)
        })
      }
    })
  }

  readDiagnosis(name, callback) {
    let query = `SELECT * FROM diagnosis where name =`
    query += `"${name.toLowerCase()}";`;
    db.get(query, [], (err, rowDiag) => {
      if (err) throw err;
      return callback(rowDiag);
    })
  }

  static addPatientsDiagnosis(patientId, diagnosisId, callback) {
    let query = `INSERT INTO patients_diagnosis (patient_id, diagnosis_id) `;
    query += `VALUES (`;
    query += `${patientId},`
    query += `${diagnosisId}`
    query += `);`
    db.run(query, function (err) {
      if (err) throw err;
      callback()
    })
  }
}

class Patient {
  constructor(name, diagnosis) {
    this.id = 0
    this.name = name
    this.diagnosis = diagnosis
  }

  addPatient(obj, callback) {
    let query = '';
    if (obj) {
      query = `INSERT INTO patients (name) `
      query += `VALUES (`
      query += `"${obj.name}"`
      query += `);`
    }
    db.run(query, function (err) {
      if (err) throw err;
      obj.id = this.lastID;
      let arrDia = [];
      for (let i = 0; i < obj.diagnosis.length; i++) {
        let diagnosis = new Diagnosis(obj.diagnosis[i], obj.id)
        diagnosis.addDiagnosis(diagnosis, function (objDiagnosis) {
          arrDia.push(objDiagnosis)
        })
      }
      Patient.retrievePatients(function (dataPatients) {
        callback(dataPatients);
      })
    })
  }

  static readPatient(colWhere, valWhere, callback) {
    query = `SELECT * FROM patients WHERE `;
    query += `${colWhere} = `;
    query += `${valWhere}`;
    db.get(query, [], (err, rowPatient) => {
      if (err) throw err;
      return callback(rowPatient)
    })
  }

  static retrievePatients(callback) {
    let query = 'SELECT * FROM patients;'
    db.all(query, [], (err, patients) => {
      if (err) throw err;
      callback(patients);
    })
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.isLogin = false;
  }

  static retrieveEmp(callback) {
    let query = `SELECT * FROM employees;`;
    db.all(query, [], (err, employees) => {
      if (err) throw err;
      callback(employees);
    })
  }


  static readEmpByUsername(userName, callback) {
    let query = `SELECT * FROM employees `;
    query += `WHERE `
    query += `username = ?`;
    db.get(query, [userName], (err, row) => {
      if (err) throw err;
      return (row) ? callback(true) : callback(false);
    })
  }
  //create employee
  addEmployee(obj, callback) {
    let query = '';
    if (obj) {
      query = `INSERT INTO employees (name, position, username, password) `
      query += `VALUES (`
      query += `"${obj.name}",`
      query += `"${obj.position}",`
      query += `"${obj.username}",`
      query += `"${obj.password}"`
      query += `);`
    }
    db.run(query, function (err) {
      if (err) throw err;
      Employee.retrieveEmp(function (data) {
        callback(data);
      })
    })
  }

  static login(username, password, callback) {
    this.retrieveEmp(function (dataEmp) {
      let isFound = false;
      for (let i = 0; i < dataEmp.length; i++) {
        if (username === dataEmp[i].username && password === dataEmp[i].password) {
          Employee.setLogin(dataEmp[i].username, dataEmp);
          isFound = true;
          callback(true)
          break;
        }
      }
      if (!isFound) {
        callback(false)
      }
    })
  }

  static logout(callback) {
    this.readEmployeeLogin(function (rowEmp) {
      if (rowEmp) {
        Employee.updateEmployee('isLogin', 'false', 'username', rowEmp.username)
      }
      callback(rowEmp)
    })
  }

  static readEmployeeLogin(callback) {
    let query = `SELECT * FROM employees WHERE isLogin = 'true'`;
    db.get(query, [], (err, rowEmp) => {
      if (err) throw err;
      return callback(rowEmp)
    })
  }

  static setLogin(username, data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].username !== username) {
        this.updateEmployee('isLogin', 'false', 'username', data[i].username)
      }
      else {
        this.updateEmployee('isLogin', 'true', 'username', data[i].username)
      }
    }
  }


  static updateEmployee(setParam, setValue, whereParam, whereValue) {
    let update = '';
    let query = '';
    if (isNaN(setValue)) {
      setValue = `"${setValue}"`;
    } else {
      setValue = `${setValue}`;
    }
    let where = `WHERE ${whereParam} = "${whereValue}"`;
    update = `UPDATE employees SET ${setParam} = ${setValue}`

    query = update + " " + where + ";";
    db.run(query, function (err) {
      if (err) throw err;
    })
  }

}

module.exports = { Employee, Patient }

