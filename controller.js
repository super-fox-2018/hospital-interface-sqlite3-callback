  var modelku = require('./model.js')
  modelku = new modelku()
  var view = require('./view.js')
  view = new view()


  class Employee {

    constructor() {}
    signup(username, password, role) {
      modelku.registerEmployee(username, password, role, function(a) {
        view.notifdaftar(a)
      })
    }


    login(username, password) {
      modelku.Loginku(username, password, function(b) {
        view.viewLogin(b)
      })
    }



    addpatient(username, diagnosis) {
      modelku.addPatient(username, diagnosis, function(a) {
        view.addpasien(a)
      })
    }



    logoutku(username) {
      modelku.Logout(username, function(a) {
        view.viewlogout(a)
      })
    }


  }

  module.exports = Employee
