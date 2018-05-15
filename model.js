const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('./hospital_db.db');

class Model {
  static register(username, password, role, callback){
    let statusMessage = '';
    var inputRegister = `INSERT INTO employees(username,position,password,status_login)
                    VALUES ("${username}","${role}","${password}",0)`;
    database.run(inputRegister, function(err){
      if(err) throw err;
    });
    database.all(`SELECT * FROM employees`,(err,employees)=>{
      if (!err) {
        callback(employees);
      }
      else {
        throw err;
      }
    });
  }

  static login(username, password, callback){
    // let statusMessage = '';
    var isLogin = false;
    database.all(`SELECT * FROM employees`,(err,employees)=>{
      if (!err) {
        for (var i = 0; i < employees.length; i++) {
          if (username==employees[i].username) {
            if (password==employees[i].password) {
              database.run(`UPDATE employees SET status_login = 1 WHERE username = "${username}"`,function(err){
                if(err) throw err;
              });
              isLogin = true;
              callback(false,username);
            }
          }
        }
        if (isLogin==false) {
          callback(false,false);
        }
      }
    });
  }

  static addPatient(patientName,diagnosis,callback){
    database.all(`SELECT position FROM employees where status_login = 1`,(err,employees)=>{
      if(!err){
        var positionEmployee = employees[0].position;
        if(positionEmployee=='dokter'){
          database.run(`INSERT INTO patients(name) VALUES ("${patientName}")`,function(err){
            if(err) throw err;
          })
          database.all(`SELECT id FROM patients where name = "${patientName}"`,(err,patients)=>{
            if(err) throw err;
            else {
              var id_patient = patients[0].id;
              for (var i = 0; i < diagnosis.length; i++) {
                database.run(`INSERT INTO diagnosis(diagnosa,patients_id) VALUES ("${diagnosis[i]}","${id_patient}")`,function(err){
                  if(err) throw err;
                })
              }
            }
          })
          database.all(`SELECT COUNT(*) as count FROM patients`,(err,patients)=>{
            if(!err){
              var countPatient = patients[0].count;
              callback(false,countPatient);
            }
            else {
              throw err;
            }
          })
        }
        else {

          callback(false,false);
        }
      }
      else {
        throw err;
      }
    })
  }

  static logout(username,callback){
    database.all(`SELECT status_login FROM employees WHERE username = "${username}"`,(err,employees)=>{
      if(!err){
        var statusEmployee = employees[0].status_login;
        if (statusEmployee==1) {
          database.run(`UPDATE employees SET status_login = 0 WHERE username = "${username}"`,function(err){
            if(err) throw err;
              callback(false,true);
          })

        }
        else {
          callback(false,false);
        }
      }
    })
  }
}

module.exports = Model;
