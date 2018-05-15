const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('./hospitalDatabase.db')

class Employee {

  static signupProcedure(name,password,position,callback){
    database.get(`SELECT * FROM employees WHERE username = ?`,[name],(err,employee_user)=>{
      if(employee_user === undefined){
        return database.run(`INSERT INTO employees (username,password,position,login_status) VALUES (?,?,?,?)`,[name,password,position,false],callback)
      }
      callback(false)
    })
  }

  static loginProcedure(name,password,callback){
    database.get(`SELECT * FROM employees WHERE login_status = 1`,(err,loggedIn)=>{
      if(loggedIn !== undefined) return callback('sudah ada yang login, mohon log out dahulu');
      database.get(`SELECT * FROM employees WHERE username = ? AND password = ?`, [name,password],(err,loginData)=>{
        if(loginData === undefined) return callback('username atau password tidak sesuai!');
        callback(`${loginData.username} has logged in!`)
        database.run(`UPDATE employees SET login_status = 1 WHERE id = ?`,[loginData.id],(err)=>{
          if(err) throw err;
        })
      })
    })
  }

  static checkLoggedInEmployee(callback){
    database.get(`SELECT * FROM employees WHERE login_status = 1`,(err,loggedInEmployee)=>{
      if(loggedInEmployee === undefined) return callback(false);
      return callback(loggedInEmployee.position,loggedInEmployee.id)
    })
  }

  static logout(callback){
    database.run(`UPDATE employees SET login_status = 0 WHERE login_status = 1`,(err)=>{
      if(err) throw err;
      callback('Employee logged out!')
    })
  }
}

module.exports = Employee