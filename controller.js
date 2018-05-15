const Employee = require("./employee.js")
const View = require("./view.js")
const Patient = require("./patient.js")

class Controller{
    static register(idx_username, idx_password, idx_position, idx_status_login){
        Employee.register(idx_username, idx_password, idx_position, idx_status_login)
        View.register()
    }

    static login(username, password){
        Employee.login(username, password, function(usernameLogin){
            if(usernameLogin !== undefined){
                View.login(username, password)
            }
            else{
                View.error("username / password wrong")
            }
        })
    }

    static addPatient(name, diagnosis){
       Patient.addPatient(name, diagnosis, function(addPatientNih){
           if(addPatientNih !== undefined){
            View.addPatient(name, diagnosis)
           }
           else{
               View.error("Anda tidak memiliki akses untuk add patients!")
           }
       })
    }

    static logout(username, password){
        Employee.logout(username, password)
        View.logout(username, password)
    }
}

module.exports = Controller