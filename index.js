const Controller = require('./controller.js');
let controller = new Controller();

const argv = process.argv.slice(2);
let task = argv[0];
let input = [];
for (let i = 1; i < argv.length; i++) {
  input.push(argv[i]);
}

switch (task) {
case 'register':
  controller.registerEmployee(...input);
  break;
case 'login':
  controller.loginEmployee(...input);
  break;
case 'logout':
  controller.logout(...input);
  break;
case 'addPatient':
  let name = input[0];
  input.shift();
  controller.addPatient(name, input);
  break;
default:
  // statements_def
  break;
}