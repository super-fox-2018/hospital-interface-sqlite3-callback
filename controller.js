const EmployeeFeature = require("./model.js")
const View = require("./view.js")


class Controller {

	static register(username,password,role) {
		EmployeeFeature.register(username,password,role,function(err,result) {
			if(err) {
				View.errorMessage(err)
			}else{
				View.register(result)
			}
		})
	}

	static login(username,password) {
		EmployeeFeature.login(username,password,function(err,failed,success) {
			if(err) {
				View.errorMessage(err)
			}else{
				if(failed) {
					View.message(failed)
				}else{
					View.login(success)
				}
			}
		})
	}

	static addPatient(patientName,diagnosis) {
		EmployeeFeature.addPatient(patientName,diagnosis,function(err,success,failed) {
			if(err) {
				View.errorMessage(err)
			}else {
				if(failed) {
					View.message(failed)
				}else{
					View.addPatient(success)
				}
			}
		})
	}

	static logout() {
		EmployeeFeature.logout(function(err,success,failed){
			if(err) {
				View.errorMessage(err)
			}else{
				if(failed) {
					View.message(failed)
				}else{
					View.logout(success)
				}
			}
		})
	}
}

module.exports = Controller