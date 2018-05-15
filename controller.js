const Model = require('./model');
const view = require('./view');

class Controller {
  static register(username, password, role){
    Model.register(username, password, role, (err,employees)=>{
      if(err) throw err;
      view.register(employees);
    })
  }
  static login(username, password){
    Model.login(username, password, (err,userLogin)=>{
      if(err) throw err;
      view.login(userLogin);
    })
  }
  static addPatient(patientName, diagnosis){
    Model.addPatient(patientName, diagnosis, (err,add_Patient)=>{
      if(err) throw err;
      view.addPatient(add_Patient)
    })
  }
  static logout(username){
    Model.logout(username,(err,logout)=>{
      if(err) throw err;
      view.logout(logout);
    })
  }
}

module.exports = Controller;
