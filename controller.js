const View = require('./view');
const Model = require('./model');



class Controller {
    constructor(id, name){
        this.id = id || 0;
        this.name = name || '';
    }

    static viewTable(table){
        let query = `select * from ${table}`;
        Model.read(query, function(fromDatabase){
            View.viewData(fromDatabase)
        })
    }
        
    static controllerRegister(record){
        Model.createNewEmployee(record, View.succesRegister);
    }

    static controllerLogin(lineInfo){
        let username = lineInfo[0];
        let pasword = lineInfo[1];
        Model.getUserAndPassword(username, pasword, function(user){
            if(user.name){
                View.succesLogin(user.name);
            }else{
                View.failedLogin()
            }
        })

    }

    static controllerAddPatient(lineInfo){
        let id = lineInfo[0];
        let name = lineInfo[1];
        let diagnosis = lineInfo.slice(2);
        
        Model.loginStatus(function(userLogin){
            let position = userLogin.position
            if(position==='dokter'){
                Model.addPatientAndDiagnosis(id, name, diagnosis, function(countPatient){
                    View.succesAddedDiagnosis(countPatient.count);
                });
            }else{
                View.accesDenied();
            }
        
        })
    }
}


module.exports = Controller;