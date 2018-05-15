const db = require('./database');

class Patient {
  static addPatient(patientData, doctor_id, callback) {
    console.log(patientData, doctor_id);
    const addPatientQuery = `INSERT INTO patients (name, doctor_id) 
                             VALUES (?,?)`;
    db.run(addPatientQuery, [patientData.$name, doctor_id], function(err) {
      if (err) throw err;
      const getTotalPatient = `SELECT COUNT(*) AS totalPatient FROM patients`;
      db.get(getTotalPatient, (err, queryResult) => {
        const { totalPatient } = queryResult;
        const getPatientIdQuery = `SELECT id FROM patients ORDER BY 1 DESC`;
        db.get(getPatientIdQuery, (err, patient) => {
          const patientId = patient.id;
          this.addDiagnoses(patientId, patientData.diagnoses, () => {
            callback(totalPatient);
          });
        });
      });
    });
  }

  static addDiagnoses(patientId, diagnoses, callback) {
    for (let i = 0; i < diagnoses.length; i += 1) {
      const diagnosis = diagnoses[i];
      const query = `INSERT INTO diagnoses (patient_id, diagnosis, diagnosis_date) 
                     VALUES (?,?,?)`;
      db.run(query, [patientId, diagnosis, Date.now()], (err) => {
        if (err) throw err;
        if (i === diagnoses.length - 1) callback();
      });
    }
  }
}

module.exports = Patient;