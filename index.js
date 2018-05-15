const controller = require('./controller.js')
let argv = process.argv
command = argv.slice(2)
if (command[0]===undefined) {
	controller.help()
}
if (command[0]==='register') {
	controller.register(command.slice(1))
	console.log(command.slice(1))
}
if (command[0]==='login') {
	controller.login(command.slice(1))
}
if (command[0]==='addPatient') {
	controller.addPatient(command[1],command.slice(2).join(' '))
	//console.log(command.slice(2))
}
if (command[0]==='logout') {
	controller.logout(command[1])
}