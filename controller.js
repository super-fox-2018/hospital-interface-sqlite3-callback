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
      modelku.Loginku(username, password, function(a) {
        view.viewLogin(a)
      })
    }




  }

  module.exports = Employee
