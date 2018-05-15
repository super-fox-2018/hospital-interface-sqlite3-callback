const Employee = require('./Employee');
const Patient = require('./Patient');
const View = require('./view');

class Controller {
  static handleRegister(employee) {
    Employee.register(employee, (addedEmployee, totalEmployees) => {
      View.showSaveSuccess(addedEmployee, totalEmployees);
    });
  }

  static handleLogin(loginData) {
    Employee.login(loginData, (loggedInUsername, status) => {
      if (status === 0) View.showError('username / password wrong');
      else if (status === 1) View.showError('You\'ve already logged in!');
      else View.showLoginMessage(loggedInUsername);
    });
  }

  static handleLogout(loginData) {
    Employee.logout(() => {
      View.showLogoutMessage();
    });
  }

  static handleAddPatient(patientData) {
    Employee.checkLoggedInUser(loggedInUser => {
      if (loggedInUser && loggedInUser.position === 'dokter') {
        Patient.addPatient(patientData, loggedInUser.id, totalPatients => {
          View.showAddPatient(totalPatients);
        });
      } else {
        View.showError('tidak memiliki akses untuk add patients!');
      }
    });
  }
}

module.exports = Controller;
