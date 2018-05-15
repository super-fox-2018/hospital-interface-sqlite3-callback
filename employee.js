const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./hospital.db')

class Employee {
  constructor(name, position, username, password) {
    this.name = name,
    this.position = position,
    this.username = username,
    this.password = password
  }

  static register(ctr_username, ctr_password, ctr_position, ctr_idx_status_login = 0){
    let reg = `INSERT INTO employees (username, password, role, login) VALUES ('${ctr_username}', '${ctr_password}', '${ctr_position}', '${ctr_idx_status_login}')`
    db.run(reg, function(err){
      if(err) throw err
    })
  }

  // panggil kembali pakai callback
  static login(username, password, callback){
     db.all(`SELECT * FROM employees`, function(err, employeesData){
        if(err) throw err
        // console.log(employeesData.length)
        for(let i=0; i<employeesData.length; i++){
          if(username !== employeesData[i].username){
            if(i+1 < employeesData.length){
              continue
            }
          }
          else if(username === employeesData[i].username){
            if(employeesData[i].password === password){
              db.run(`UPDATE employees SET login = 1 WHERE username = '${username}'`, function(err,){
                if (err) throw err
              })
              callback (username) // klu berhasil callback username
            }
            else{
              callback() // klu salah callback kosong aja
            }
          }
        }
      })
  }

  static logout(username, password){
    db.all(`SELECT * FROM employees`, function(err, employeesData){
      if(err) throw err
      for(let i=0; i<employeesData.length; i++){
        if(username !== employeesData[i].username){
          if(i+1 < employeesData.length){
            continue
          }
        }
        else if(username === employeesData[i].username){
          if(employeesData[i].password === password){
            db.run(`UPDATE employees SET login = 0 WHERE username = '${username}'`, function(err,){
              if (err) throw err
            })
          }
        }
      }
    })
  }
}

module.exports = Employee