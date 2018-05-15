const Employee = require('./model.js')
const View = require('./view.js')

class Controller{
    constructor(){

    }
    static insertEmployee(username,password,role){
        Employee.insertEmployeesToDatabase(username,password,role,function(dataRegis){
            View.regist(dataRegis)
        })
       
    }

    static loginEmployee(username,password){
        Employee.loginEmployees(username,password,function(cb){
            View.login(cb)
            
        })   

    }

    static outEmployee(username){
        Employee.logoutEmployees(username,function(cb){
            View.logout(cb)
        })
       
    }

    static patientAdd(name,diagnosa){
        Employee.addPatient(name,diagnosa)
        View.patient(name,diagnosa)
    }

}

module.exports = Controller