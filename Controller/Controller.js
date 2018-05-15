const Employee = require ('../Model/employeeModel.js');
const View = require ('../View/view.js');

class Controller{
  constructor(){
  }

  static register(empObj){
    Employee.addEmployee(empObj, function(empObj, maxId){
      View.register(empObj, maxId);
    });
  }

  static logIn(empObj){
    Employee.logIn(empObj, function(isValid, alreadyLogged){
        View.logIn(empObj, isValid, alreadyLogged)
      });
  }

  static logOut(username){
    Employee.logOut(username, function(isLogged){
      View.logOut(username, isLogged);
    })
  }

  static addPatient(patientObj){
    Employee.addPatient(patientObj, function(maxId, isDoctor, isLogged){
      View.addPatient(maxId, isDoctor, isLogged);
    })
  }
}


module.exports = Controller;
