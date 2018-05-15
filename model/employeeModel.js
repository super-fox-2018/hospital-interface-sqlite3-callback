// const db = require('./setup');
const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db');

class Employee {
  constructor(){

  }

  static add_employee (data, cb){

    db.run(`INSERT INTO employee (user_name, position, password, status)
                VALUES ("${data[0]}", "${data[1]}", ${data[2]}, "false")`, function (err, data){

                  if (err) {
                    cb(err);
                  } else {
                    cb('success add data employee');
                  }

                })

  }

static login_employee (user_name, password, cb) {

bikin checker, 

   db.all(`SELECT * FROM employee WHERE user_name = "${user_name}" AND password= ${password} `, function(err, rows) {
     let statusMsg;
     if (rows.length <= 0) {
       statusMsg = ' username / password wrong'
       console.log(statusMsg);
       cb(err, statusMsg)
     }
     else {
       statusMsg= ` user ${user_name} logged in Successfully`
            console.log(statusMsg);
       cb(null, statusMsg)
     }
   })
}
}

// add data employee
// if (args[0] === 'add employee') {
//   const query = `INSERT INTO employee (user_name, position, password)
//                VALUES ('${args[1]}', '${args[2]}', ${args[3]})`;

//   db.run(query, function(err) {
//     if (err) throw err;
//     console.log('Successfully created a new employee data!');
//   });
// }
// // delete data employee
// if (args[0] === 'delete employee') {
//   const query = `DELETE FROM employee WHERE id=${args[1]}`;

//   db.run(query, function (err) {
//     if (err) throw err;
//     console.log('Successfully deleted employee data!');
//   });
// }
// // update data employee
// if (args[0] === 'update employee') {
//   const query = `UPDATE employee SET user_name ='${args[2]}',position='${args[3]}' password = ${args[5]} WHERE id= ${args[1]}`;

//   db.run(query, function(err) {
//     if (err) throw err;
//     console.log('Successfully updated employee data!');
//   });
// }
// // view data employee
// if (args[0] === 'view employee') {
//   db.all('SELECT * FROM employee', function(err, employee) {
//     console.log(employee);
//   });
// }

module.exports = Employee;
