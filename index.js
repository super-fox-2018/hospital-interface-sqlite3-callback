const Controller = require('./controller');
const commands = process.argv;

switch (commands[2]) {
  case 'register':
  Controller.register(commands[3],commands[5],commands[4]);
    break;
  case 'login':
  Controller.login(commands[3],commands[4]);
    break;
  case 'addPatient':
  let diseaseCommand = [];
  for (var i = 4; i < commands.length; i++) {
    diseaseCommand.push(commands[i]);
  }
  Controller.addPatient(commands[3],diseaseCommand)
    break;
  case 'logout':
    Controller.logout(commands[3]);
    break;
  default:

}
