const Controller = require('./controller');

const argv = process.argv;

const lineCommand = argv[2];
const lineInfo = argv.slice(3);

if(lineCommand === 'viewData'){
    Controller.viewTable(lineInfo);
}

if(lineCommand === 'register'){
    Controller.controllerRegister(lineInfo);
}

if(lineCommand === 'login'){
    Controller.controllerLogin(lineInfo);
}

if(lineCommand === 'addPatient'){
    Controller.controllerAddPatient(lineInfo);
}




console.log('---------------', lineCommand, lineInfo, '---------------')

