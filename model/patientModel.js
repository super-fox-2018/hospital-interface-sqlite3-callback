const db = require('./setup');
const args = process.argv.slice(2);

// add data patient
if (args[0] === 'add patient') {
  const query = `INSERT INTO patient (user_name, position, password)
               VALUES ('${args[1]}', '${args[2]}', ${args[3]})`;

  db.run(query, function(err) {
    if (err) throw err;
    console.log('Successfully created a new patient data!');
  });
}
// delete data patient
if (args[0] === 'delete patient') {
  const query = `DELETE FROM patient WHERE id=${args[1]}`;

  db.run(query, function (err) {
    if (err) throw err;
    console.log('Successfully deleted patient data!');
  });
}
// update data patient
if (args[0] === 'update patient') {
  const query = `UPDATE patient SET user_name ='${args[2]}',position='${args[3]}' password = ${args[5]} WHERE id= ${args[1]}`;

  db.run(query, function(err) {
    if (err) throw err;
    console.log('Successfully updated patient data!');
  });
}
// view data patient
if (args[0] === 'view patient') {
  db.all('SELECT * FROM patient', function(err, patient) {
    console.log(patient);
  });
}

module.exports = Patient;
