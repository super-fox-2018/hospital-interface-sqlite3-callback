const Employee = require('./employee.js')
const Patient = require('./patient.js')
const View = require('./view.js')

class Controller{

    static signup(name,password,position){
        Employee.signupProcedure(name,password,position,(err)=>{
            if(err === false) return View.sendMessage('username sudah terdaftar!')
            if(err) throw err;
            View.sendMessage('data berhasil ditambahkan!')
        })
    }
    static login(name,password){
        Employee.loginProcedure(name,password,(loginName)=>{
            View.sendMessage(loginName)
        })
    }
    static addpatient(name,diagnosis){
        Employee.checkLoggedInEmployee((status,loggedInEmployee)=>{
            if(status!=='dokter'){
                return View.sendMessage('anda tidak punya otorisasi untuk menambah pasien!')
            }
            Patient.addPatientProcedure(name,diagnosis,loggedInEmployee,(status)=>{
                View.sendMessage(status)
            })
        })
    }
    static logout(){
        Employee.logout((message)=>{
            View.sendMessage(message)
        })
    }
}

module.exports = Controller