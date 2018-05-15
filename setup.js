const db = require('./database');

const queries = [];

queries.push(
  `CREATE TABLE employees (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    position TEXT NOT NULL,
    is_logged_in INTEGER DEFAULT 0
  );`
);

queries.push(
  `CREATE TABLE patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL,
    doctor_id INTEGER,
    FOREIGN KEY (doctor_id) REFERENCES employees(id) ON DELETE CASCADE
  );`
);

queries.push(
  `CREATE TABLE diagnoses (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    patient_id INTEGER NOT NULL,
    diagnosis TEXT NOT NULL,
    diagnosis_date INTEGER NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
  );`
);

for (let i = 0; i < queries.length; i += 1) {
  const query = queries[i];
  db.run(query, (err) => {
    if (err) throw err;
    console.log('Successfully add table!');
  });
}



