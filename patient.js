const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./hospital.db')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static addPatient(name, diagnosis, callback){ // callback
    db.all(`SELECT * FROM employees`, function(err, dataEmployee){
      if(err) throw err
      for(let i=0; i<dataEmployee.length; i++){
        // console.log(dataEmployee)
        if(dataEmployee[i].role !== "dokter" && dataEmployee[i].login === 1){
          if(i+1 < dataEmployee.length){
            continue
          }
        }
        else if(dataEmployee[i].role === "dokter" && dataEmployee[i].login === 1){
          let registerPatient = `INSERT INTO patients (name, diagnosis) VALUES ('${name}', '${diagnosis}')`
          db.run(registerPatient, function(err){
            if(err) throw err
          })
          callback(name)
        }
        else if(i+1 === dataEmployee.length){
          callback()
        }
      }
    })

  }

}

module.exports = Patient