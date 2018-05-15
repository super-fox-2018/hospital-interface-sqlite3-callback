var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hospital.db');


class Model {
  static addRegister(dataEmployee, cb) {
    // console.log(dataEmployee);
    let username = dataEmployee[0]
    let password = dataEmployee[1]
    let role = dataEmployee[2]
    let addEmployee = `INSERT INTO employees VALUES(null,'${username}','${password}','${role}',null) `
    let getTotalEmployee = `SELECT count(id) AS totalEmployee FROM employees`
    db.run(addEmployee)
      db.get(getTotalEmployee, (err, data) => {
        if (err) {
          cb(null,err)
        }
        cb(`save data success {username:${username},password:${password},role:${role}} Total Employee : ${data.totalEmployee}`,null);
      })

  }

  static login(dataLogin, cb) {
    let usernameLogin = dataLogin[0]
    let passwordLogin = dataLogin[1]
    let getDataLogin = `SELECT * FROM employees WHERE username='${usernameLogin}' AND password = '${passwordLogin}'`
    let setLogin = `UPDATE employees SET login = 1 WHERE username='${usernameLogin}' AND password = '${passwordLogin}'`
    let setOtherLogin = `UPDATE employees SET login = 0 WHERE username IS NOT '${usernameLogin}' AND '${passwordLogin}'`
    db.get(getDataLogin, (err, data) => {
      if (err) {
        cb(null,err)
      }
      if (data === undefined) {
        var result = `password / username wrong`
      }
      else {
        db.run(setLogin)
        db.run(setOtherLogin)
        var result = `user ${usernameLogin} logged in successfully`
      }
      cb(result,null)
    })
  }


  static addNewPatient(dataPatient,cb){
    let namePatient = dataPatient[0]
    let diagnosisPatient = dataPatient.slice(1).join(' ')
    let getAllData = `SELECT * FROM employees WHERE login = 1`
    let addRegisterPatient = `INSERT INTO patients VALUES(null,'${namePatient}','${diagnosisPatient}')`
    db.get(getAllData,(err,data)=>{
      if (err) {
        cb(null,err)
      }

      if ((data.role).toLowerCase() === 'dokter') {
        db.run(addRegisterPatient,function(err){
          if (err) {
            cb(null,err)
          }
          var result = `data pasien berhasil ditambahkan,Total pasien = ${this.lastID}`
          cb(result,null)
        })
      }
      else {
        var result = `tidak memiliki akses untuk add patient`
      }
      cb(result,null)
    })
  }

  static logoutEmployee(cb){
    let logout = `UPDATE employees SET login = 0 WHERE login = 1`
    db.run(logout,(err)=>{
      if (err) {
        cb(null,err)
      }
      var result = `logout berhasil`
      cb(result,null)
    })
  }
}

module.exports = Model
