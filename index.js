const Controller = require('./controller');

const param1 = process.argv[2]
const param2 = process.argv[3]
const param3 = process.argv[4]
const param4 = process.argv[5]
const arrParam = process.argv;


switch (param1){
    case 'register':
          if (param2){
              Controller.register(param2,param3,param4);
          }
          break
    case 'list':
          Controller.getList()
          break
    case 'login':
          Controller.login(param2, param3)
          break;
    case 'addPatient':
          Controller.addPatient(arrParam);
    case 'logout':
          Controller.logout();
    default:   
          
}