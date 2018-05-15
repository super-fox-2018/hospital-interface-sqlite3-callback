const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./dbHospital.db');

class Register {
  constructor() {}




  registerEmployee(username, password, role, cb) {

    let daftar = `INSERT INTO employees(username, password, role, islogin)
      VALUES("${username}", "${password}","${role}","false");`
    db.run(daftar, function(err) {
      if (err) throw err;


      db.all(`select * from employees WHERE username = "${username}"`, function(err, rows) {
        if (err) {
          console.log(err);
        }
        cb(rows)
      });
    });
  }


  Loginku(username, password, cb) {


    let query = `SELECT * FROM employees where username = "${username}" and password = "${password}"`
    db.get(query, function(err, data) {
      if (err) throw err
      db.run(`UPDATE employees SET islogin = "true" WHERE username = "${username}" AND password = "${password}"`, function(err) {
        if (err) throw err;
        cb(data)
      });
    })

  }



  addPatient(username, diagnosis) {

    db.all(`select * from employees WHERE islogin = 'true' AND role = 'dokter'`, function(err, rows) {
      if (err) throw err
      if (rows.length > 0) {

        console.log(username, diagnosis)

        //INSERT NAMA PASIEN
        let pasien = `INSERT INTO patient(name)
              VALUES("${username}");`
        db.run(pasien, function(err) {
          if (err) throw err;


        });

        //CARI ID PASIEN
        let cariid = `select id from patient where name = "${username}"`
        db.get(cariid, function(err, pasien) {
          if (err) {
            console.log(err);
          }



          for (let i = 0; i < diagnosis.length; i++) {
            let daftarsakit = `INSERT INTO diagnose(id_patient, disease) VALUES("${pasien.id}", "${diagnosis[i]}");`
            db.run(daftarsakit, function(err) {

              if (err) {

                console.log(err);


              }




            });

          }


        });






      } else {
        console.log('tidak memiliki akses untuk add passien')
      }

    })

  }




}

module.exports = Register
