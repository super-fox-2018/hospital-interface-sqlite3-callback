let EmployeeModel = require('./model.js')
let view = require('./view.js')
class Controller{
	constructor(){

	}
	static help(){
		view.help()
	}
	static register(employeeAttributes){
		let data = EmployeeModel.register(employeeAttributes,(data,err)=>{
			view.register(data)
		})
		
	}
	static login(employeeAttributes){
		let data = EmployeeModel.login(employeeAttributes,(data,err)=>{
			view.login(data)
		})
	}
	static addPatient(namePatient,diagnosis){
		let data = EmployeeModel.addPatient(namePatient,diagnosis,(data,err)=>{
			view.addPatient(data)
		})
	}
	static logout(user){
		let data = EmployeeModel.logout(user,(data,err)=>{
			view.logout(data)
		})
	}
}
module.exports = Controller