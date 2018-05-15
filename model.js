
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hospital.db');

class EmployeeFeature {

  static register(username,password,role,cb) {
    let query = `INSERT INTO employees(username,password,role) VALUES('${username}','${password}','${role}')`
    db.serialize(function() {
      db.run(query,function(err) {
        if(err) {
          cb(err,null)
        }
      })
      let query2=  `SELECT * FROM employees`
      db.all(query2,function(err,rows) {
        if(err) {
          cb(err,null)
        }else{
          cb(err,`save data success {"username":"${username}","password":"${password}","role":"${role}"}. Total Employee: "${rows.length}" `)
        }
      })
    }) 
  }

  static login(username,password,cb) {
    let query = `SELECT * FROM employees WHERE username = '${username}' AND password = '${password}' `
    db.get(query,function(err,row) {
      if(err) {
        cb(err,null,null)
      }else{
        if(row == undefined) {
          cb(null,`username/password wrong`,null)
        }else {
          db.get(`SELECT * FROM employees WHERE status = "true"`,function(err,row) {
            if(row ==undefined) {
                let query2 = `SELECT * FROM employees`
                db.each(query2,function(err,row){
                  if(err) {
                    cb(err,null,null)
                  }else{
                    if(row.username == username ){
                      db.run(`UPDATE employees SET status = "true" WHERE username = "${username}"`,function(err) {
                        if(err) {
                          cb(err,null,null)
                        }
                        cb(null,null,`user '${username}' login successfully`)
                      })
                    }
                  }  
                })      
            }else{
              cb(null,"sedang ada yang login",null)
            }
          })
        }
      }
    })
  }


  static addPatient(patientName,diagnosis,cb) {
    let query =  `SELECT * FROM employees WHERE role = "dokter" AND status = "true" `
    db.get(query,function(err,row) {
      if(err) {
        cb(err,null,null)
      }else{
        //console.log(row)
        if(row !== undefined) {
          db.serialize(function() {
             db.run(`INSERT INTO patients VALUES(null,"${patientName}","${diagnosis}")`)
             db.all(`SELECT * FROM patients`,function(err,rows) {
              cb(null,`data pasien berhasil ditambahkan. Total data pasien ${rows.length}`,null)   
             })     
          })
        }else{
           cb(null,null,`tidak memiliki akses untuk add patient`)
        }
      }
    })
  }

  static logout(cb) {
    db.get(`SELECT * FROM employees WHERE status = "true"`,function(err,row) {
      if(err) {
        cb(err,null,null)
      }else{
        if(row !== undefined) {
          db.run(`UPDATE employees SET status = "false" WHERE id = "${row.id}"`)
          cb(null,`user ${row.username} berhasil logout`)
        }else{
          cb(null,null,`tidak ada user yang login`)
        }
      }
    })
  }

}

 
module.exports = EmployeeFeature