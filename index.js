const Controller = require('./controller.js')
let argv = process.argv
let index = argv[2]
let username = argv[3]
let password = argv[4]
let role = argv[5]
let login = argv[2]
let name = argv[3]
let diagnosis = argv[4]
let logout = argv[2]
let status_login = argv[6]

if(index === "register"){
    Controller.register(username, password, role, status_login)
}
else if(index === "login"){
    Controller.login(username, password)
}
else if(index === "addPatient"){
    Controller.addPatient(name, diagnosis)
}
else if(index === "logout"){
    Controller.logout(username, password)
}
