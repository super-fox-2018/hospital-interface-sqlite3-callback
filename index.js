const Controller = require('./controller.js')
const View = require('./view.js')
let argv = process.argv

if(argv[2] === 'register'){
    Controller.insertEmployee(argv[3],argv[4],argv[5])
}else if(argv[2] === 'login'){
    Controller.loginEmployee(argv[3],argv[4])
}else if(argv[2] === 'patient'){
    let disease =[]
    for(let i =4;i<argv.length;i++){
        disease.push(argv[i])
    }
    Controller.patientAdd(argv[3],disease)
  
}else if(argv[2]=== 'logout'){
    Controller.outEmployee(argv[3])
}