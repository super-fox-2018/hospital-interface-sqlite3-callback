var Controller = require("./controller.js")
var argv = process.argv
var command = argv[2]

if(command == "register") {
	Controller.register(argv[3],argv[4],argv[5])
}

if(command == "login") {
	Controller.login(argv[3],argv[4])
}

if(command == "addPatient") {
	Controller.addPatient(argv[3],argv.slice(4).join(","))
}

if(command == "logout") {
	Controller.logout()
}