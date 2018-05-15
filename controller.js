const View = require('./view.js');
const Model = require('./model.js');

let view = new View();
let model = new Model();

class Controller {
  registerEmployee(name, position, username, password) {
    model.addEmployee(name, position, username, password, view.displayRegister);
  }

  loginEmployee(username, password) {
    model.checkPassword(username, password, (isSuccessful) => {
      if (isSuccessful) {
        view.displayLogin(username);
      } else {
        view.displayText('username or password is wrong');
      }
    });
  }

  addPatient(name, diagnosis) {
    model.checkDoctor(function(isDoctor) {
      if (isDoctor) {
        model.addPatient(name, diagnosis, view.displayAddPatient);
      } else {
        view.displayText('tidak memiliki akses buat add patient');
      }
    });
  }

  logout(username) {
    model.checkLogin(username, (isLoggedin) => {
      if (isLoggedin) {
        model.logout(username, view.displayLogout);
      } else {
        view.displayText(`${username} tidak logged in`);
      }
    });
  }
}

module.exports = Controller;
