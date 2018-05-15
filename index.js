const Controller = require('./controller');

let argv = process.argv
let command = argv[2]
// console.log(command);



if (command === 'register') {
  let commandRegister = argv.slice(3)
  // console.log(commandRegister);
  Controller.registerEmployee(commandRegister)
} else if (command === 'login') {
  let commandLogin = argv.slice(3)
  Controller.loginEmployee(commandLogin)
} else if (command === 'addPatient') {
  let commandAddPatient = argv.slice(3)
  Controller.addPatient(commandAddPatient)
} else if (command === 'logout') {
  Controller.logout()
}
