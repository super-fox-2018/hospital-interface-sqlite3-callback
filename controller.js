const Model = require('./model');
const View = require('./view');

class Controller {
  static registerEmployee(dataRegister) {
    Model.addRegister(dataRegister, (res,err) => {
      if (err) {
        View.errorMessage(err)
      }
      View.showAddEmployee(res)
    })
  }

  static loginEmployee(dataLogin){
    Model.login(dataLogin,(result,err)=>{
      if (err) {
        View.errorMessage(err)
      }
      else {
        View.showLogin(result)
      }
    })
  }

  static addPatient(dataPatient){
    Model.addNewPatient(dataPatient,(res,err)=>{
      if (err) {
        View.errorMessage(err)
      }
      else {
        View.showNewPatient(res)
      }
    })
  }

  static logout(){
    Model.logoutEmployee((res,err)=>{
      if (err) {
        View.errorMessage(err)
      }
      else {
        View.logoutView(res)
      }

    })
  }
}

module.exports = Controller
