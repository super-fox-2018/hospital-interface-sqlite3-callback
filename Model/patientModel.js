const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./hospital.db');

class Patient{
  constructor(){
  }

  static Read(cb){
    let query = `SELECT * FROM patients;`
    db.all(query, function(err, patientData){
      if (err) throw err;
      cb(patientData);
    })
  }


}


module.exports = Patient;