const fs = require('fs');
const db = require('./db');

// TODO: replace JSON with DATABASE

class Employee {
  constructor(obj) {
    this.name = obj.Name;
    this.role = obj.Role;
    this.username = obj.Username;
    this.password = obj.Password;
    this.isLoggedIn = obj.isLoggedIn || false;
  }
  
  static readData(callback) {
    let readQuery = `SELECT * FROM employees`;

    db.all(readQuery, function(err, employees) {
      if (err) throw err;
      // console.log(employees);
      for (let i = 0; i < employees.length; i++) {
        employees[i] = new Employee(employees[i]);
      }
      callback(employees);
    })
  }
  
  static registerEmployee(obj, callback) {
    Employee.readData(function(employees) {
      employees.push(obj);
      // console.log(obj);
      let newEmployee = employees[employees.length - 1];
      Employee.writeData(newEmployee);
      callback(employees.length);
    })
  }

  static writeData(obj) {
    // db.run here
    const insertQuery = `INSERT INTO employees 
                         (name, username, password, role)
                         VALUES ('${obj.name}', '${obj.username}', '${obj.password}', '${obj.role}')`;
    db.run(insertQuery, function(err) {
      if (err) throw err;
      console.log(`Data inserted successfully.`)
    })
  }
}

// Employee.readData(function(data) {
//   console.log(data);
//   console.log(typeof data);
// });

module.exports = Employee;