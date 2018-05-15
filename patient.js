const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('./hospitalDatabase.db')

class Patient {

    static addPatientProcedure(name,diagnosis,doctorId,callback){
        database.run(`INSERT INTO patients (name,employee_id) VALUES (?,?)`,[name,doctorId],(err)=>{
            if(err) throw err;
            database.get(`SELECT id FROM patients ORDER BY id DESC`,(err, patient)=>{
                if(err) throw err;
                for(let i = 0; i < diagnosis.length; i++){
                    database.run(`INSERT INTO diagnosis (patients_id, known_diagnosis) VALUES (?,?)`,[patient.id,diagnosis[i]],(err)=>{
                        if(err) throw err;
                        if(i === diagnosis.length-1) callback('patients added!')
                    })
                }
            })
        })
    }
}

module.exports = Patient
  