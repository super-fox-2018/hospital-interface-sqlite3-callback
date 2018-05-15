const Model = require('./model');
const View = require('./view')
class Controller {
    static register(userName, password, role) {
        let name = userName
        Model.Employee.readEmpByUsername(userName, function (isFound) {
            if (isFound) {
                let msg = `${userName} already exist`;
                View.dislpay(msg);
            } else {
                let objEmp = new Model.Employee(name, role, userName, password)
                objEmp.addEmployee(objEmp, function (data) {
                    let total = data.length;
                    let msg = 'Save data success'
                    View.dislpayRegister(msg, objEmp, total)
                })
            }
        })
    }

    static login(user, password) {
        Model.Employee.login(user, password, function (isFound) {
            let msg = '';
            if (isFound) {
                msg = `user ${user} logged in successfully`
            } else {
                msg = `username / password wrong`
            }
            View.dislpay(msg);
        })
    }

    static logout() {
        Model.Employee.logout(function (rowEmp) {
            let msg = '';
            if (rowEmp) {
                msg = `user ${rowEmp.name} logged out successfully`
            } else {
                msg = `No user log-in`
            }
            View.dislpay(msg);
        })
    }

    static addPatient(arr) {
        let name = arr[3];
        let arrDiagnotis = arr.slice(4);
        Model.Employee.readEmployeeLogin(function (objEmp) {
            if (objEmp.position.toLowerCase() === 'dokter') {
                let patient = new Model.Patient(name, arrDiagnotis)
                patient.addPatient(patient, function (dataPatients) {
                    let total = dataPatients.length;
                    let msg = `Data pasien berhasil ditambahkan. Total data pasien : ${total}`;
                    View.dislpay(msg);
                })
            } else {
                let msg = "tidak memiliki akses untuk add patient"
                View.dislpay(msg);
            }
        })
    }


}

module.exports = Controller;

