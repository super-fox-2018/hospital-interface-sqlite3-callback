const Controller = require('./controller.js')

const argv = process.argv

let command = argv[2].toLowerCase()

let commandtillTheEnd = []

for(let i = 4; i < argv.length; i++){
    commandtillTheEnd.push(argv[i])
}

switch (command){
    case 'register':
        Controller.signup(argv[3],argv[4],argv[5])
        break;
    case 'login':
        Controller.login(argv[3],argv[4])
        break;
    case 'addpatient':
        Controller.addpatient(argv[3],commandtillTheEnd)
        break;
    case 'logout':
        Controller.logout()
        break;
}