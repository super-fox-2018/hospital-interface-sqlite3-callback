const fs = require('fs')
const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db');

class Employee{
    
   static insertEmployeesToDatabase(username, password, role,cb){
       let query = `INSERT INTO employees(username,password,role) VALUES ('${username}','${password}','${role}')`
        db.run(query, function(err){
            if(err)throw err
           
           let show = `SELECT * FROM employees WHERE username = "${username}"`
           db.all(show,function(err,log){
               if(err) throw err
               cb(log)
           })
        });
        
    }

    static loginEmployees(username,password,callback){
        let query = `SELECT * FROM employees WHERE username = "${username}" AND password = ${password}`
        db.get(query,function(err,data){
            // console.log(data)
            if(err) throw err
            
            let status = `UPDATE employees SET status ='true' WHERE username = "${username}"`
            db.run(status,function(err){
                if(err) throw err
                callback(data)
            })
        })
       
    }

    static logoutEmployees(username,password){
        let query = `SELECT * FROM employees`
        db.all(query,function(err,data){
            if(err) throw err
            for(let i=0;i<data.length;i++){
                if(data[i].username == username && data[i].password){
                    let update = `UPDATE employees SET status = 'false' WHERE id = ${data[i].id}`
                    db.run()
                }
            }
        })
    }

    static addPatient(name,diagnosa){
        let query = `SELECT * FROM employees WHERE role ='doctor' AND status ='true'`
        db.all(query,function(err,data){
            if(err) throw err
            console.log(name,diagnosa)
            if(data.length > 0){
                let input = `INSERT INTO patients(name) VALUES("${name}")`
                db.run(input,function(err){
                    if(err) throw err
                })

                let id =`SELECT id FROM  patients WHERE name ="${name}"`
                db.get(id,function(err,pasien){
                    if(err) throw err
                    console.log(diagnosa)
                    for(let i =0;i<diagnosa.length;i++){
                        let listDisease =`INSERT INTO diagnosa(patient_id,name) VALUES("${pasien.id}","${diagnosa[i]}")`
                        db.run(listDisease,function(err){
                            if(err) throw err
                        })
                    }

                })
            }

        })
    }


}

module.exports = Employee