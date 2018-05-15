const Employee = require('./EmployeeModel.js');
const View = require('./view.js');

class Controller {
  static handleRegister(argumentList) {
    let obj = {
      Name: argumentList[0],
      Role: argumentList[2],
      Username: argumentList[0],
      Password: argumentList[1],
      isLoggedIn: false
    }

    Employee.registerEmployee(new Employee(obj), function(len) {
      View.displayRegister(obj, len);
    })
  }

  static handleLogin(argumentList) {
    let username = argumentList[0];
    let password = argumentList[1];

    // read data
  }
  static handleAddPatient(argumentList) {}
}

Controller.handleRegister(['bibob', 'bibob0987', 'admin'])

module.exports = Controller