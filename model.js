const db = require('./db');
const Controller = require('./controller')

class Model{
    
    static read(query, callback){
        db.all(query, (err, result)=>{
            if(err) throw err;
            callback(result);
        });
    }

    static createNewEmployee(recordInfo, callback){
        const name = recordInfo[0];
        const position = recordInfo[1];
        const username = recordInfo[2];
        const password = recordInfo[3];
        let newEmployee = new Employee(name, position, username, password);
        let query = `INSERT INTO employee (name, position, username, password, login_status) VALUES ("${name}", "${position}", "${username}", "${password}", 0)`;
        db.run(query, function(err){
            if(err) throw err;
            
            let queryGetCount = `select count(*) as count from employee;`;
            db.all(queryGetCount, function(err, getCount){
                if(err) throw err;
                callback(name, getCount[0].count);    
            })

        })
    }

    static getUserAndPassword(username, password, callback){
        let query = `select id, name as name, count(*) as count 
            from employee 
            where username = "${username}" and password = "${password}";`
        db.get(query, function(err, user){
            if(err) throw err;
                let id = user.id;
                let name = user.name;
                let queryUpdate = `UPDATE employee SET login_status = 1 WHERE id = ${id}`;
                db.run(queryUpdate, function(err){
                    if(err) throw err;
                    callback(user)
                })

        })
    }

    static loginStatus(callback){
        let query =`select id, position from employee where login_status = 1;`
        db.get(query, function(err, peopleLogin){
            if(err) throw err;
            callback(peopleLogin)
        })
    }

    static addPatientAndDiagnosis(idDiagnosis, namePatient, diagnosis, callback){
        console.log('dimodel', idDiagnosis, namePatient);
        let query = `INSERT INTO patient (name, diagnosis) VALUES ("${namePatient}", ${idDiagnosis});`
        db.run(query, function(err){
            if(err) throw err;
            db.get(`select id, count(id) as count from patient;`, function(err, countPatient){
                if(err) throw err;
                let patient_id = countPatient.id
                for(let a = 0; a < diagnosis.length; a++){
                    //console.log(diagnosis[a]);
                    let ill = diagnosis[a];
                    db.serialize(function(err){
                        db.run(`INSERT INTO diagnosis(patient_id, detail_diagnosis) VALUES (${patient_id},"${ill}" )`, function(err){
                            if(err) throw err;
                        })
                    })
                }
                callback(countPatient);
            })
        })
    }

   

    

}



class Patient {
    constructor(id, name, diagnosis) {
      this.id = id
      this.name = name
      this.diagnosis = diagnosis
    }
  }
  
  class Employee {
    constructor(name, position, username, password) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
      this.loginStatus = 0;
    }
  }

  module.exports = Model;