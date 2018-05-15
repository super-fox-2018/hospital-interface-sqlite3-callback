const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./hospital.db');
const Patient = require('./patientModel.js')

class Employee {
  constructor() {
  }

  static Read(cb){
    let readEmp = `SELECT * FROM employees;`
    db.all(readEmp, function(err, employeesData){
      if (err) throw err;
      cb(employeesData);
    })
  }

  static addEmployee(empObj, cb){
    Employee.Read(function(employeesData){
      let insertEmployee = `INSERT INTO employees (name, username, password, position, login_status)
                            VALUES ('${empObj.name}','${empObj.username}','${empObj.password}','${empObj.position}','${empObj.login_status}');`

      db.run(insertEmployee, function (err) {
        if (err) throw err;
      });

      let maxIdQuery = `SELECT MAX(id) AS maxId FROM employees;`

      db.all(maxIdQuery, function(err,maxId){
        if(err) throw err;
        cb(empObj, maxId);
      })
    })


  }
  static isLogged(cbLogged){
    Employee.Read(function(employees){
      var isLogged = false;
      for(let i = 0; i < employees.length; i++){
        if(employees[i].login_status === 1){
          isLogged = true;
        }
      }
      cbLogged(isLogged)
    })
  }

  static logIn(empObj, cb){
    var isValid = false;
    Employee.Read(function (employees){
      Employee.isLogged (function (isLogged){
        let queryLogin = `SELECT * FROM employees
                            WHERE employees.username = '${empObj.username}'
                            AND employees.password = '${empObj.password}'
                            AND employees.login_status = 0`
        db.all(queryLogin, function (err, result){
          if(err) throw err;
          else if (result.length !== 0){
            isValid = true;
            let updateQuery = `UPDATE employees
                                 SET login_status = 1
                                 WHERE employees.username = '${empObj.username}'`
           db.run(updateQuery, function(err){
             if(err) throw err;
           })
          }
          cb(isValid, isLogged);
        })
      })
    });
  }

  static addPatient(patientObj, cbAdd){
    Employee.Read(function(employees){
      var isDoctor = false;
      var isLogged = false;
      let findLogStatus = `SELECT * FROM employees
                               WHERE employees.login_status = 1;`
      db.all(findLogStatus, function(err, statusResult){
        if (err) throw err;
        if(statusResult.length !== 0){
          isLogged = true;
          let findPositionQuery = `SELECT * FROM employees
                                     WHERE employees.login_status = 1
                                     AND employees.position = "doctor";`

          db.all(findPositionQuery, function(err, positionResult){
            if(err) throw err;
            if(positionResult.length !== 0){
              isDoctor = true;
              let insertPatient = `INSERT INTO patients (name)
                                   VALUES ('${patientObj.name}');`

              db.run(insertPatient, function(err){
                if(err) throw err;
                Patient.Read(function(patientData){
                  let findPatientId = `SELECT * FROM patients
                                       WHERE patients.name = '${patientObj.name}'`
                   db.all(findPatientId, function(err, resultPatient){
                     let patientId = resultPatient[0].id;
                     for(let k = 0; k < patientObj.symptoms.length; k++){
                       let insertSymptoms = `INSERT INTO symptoms (description, patient_id)
                                             VALUES ('${patientObj.symptoms[k].toLowerCase()}', ${patientId})`

                       db.all(insertSymptoms, function(err, result){
                         if(err) throw err;
                         })
                       }
                     })
                   })
                })
              }
            Patient.Read(function(patientData){
              let maxIdQuery = `SELECT MAX(id) AS maxId FROM patients;`
              db.all(maxIdQuery, function(err,maxId){
                cbAdd(maxId, isDoctor, isLogged);
              })
            })
          })
        }
      })
    })
  }


  static logOut(username,cbLogOut){
    Employee.Read(function(employees){
      let isLogged = false;
     let checkStatusQuery = `SELECT * FROM employees
                              WHERE employees.username = '${username}'
                              AND employees.login_status = 1;`
      db.all(checkStatusQuery, function(err, result){
        if(err) throw err;

        if(result.length !== 0){
          isLogged = true;
          let logoutQuery = `UPDATE employees
                             SET login_status = 0
                             WHERE employees.username = '${username}';`
          db.run(logoutQuery, function(err){
            if(err) throw err;
          })
        }
        cbLogOut(isLogged);
      })
    })
  }

}


module.exports = Employee;

