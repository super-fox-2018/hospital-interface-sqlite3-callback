const Controller = require("./Controller/Controller.js")
const argv = process.argv;
let userInput = argv[2];

let objEmp = {
  name: argv[3],
  username : argv[4],
  password: argv[5],
  position: argv[6],
}

let objPat = {
  name: argv[3],
  symptoms: [],
}


switch(userInput){
  case "register":{
    Controller.register(objEmp);
    break;
  }
  case "login":{
    let objLogin = {
      username: argv[3],
      password: argv[4],
    };
    Controller.logIn(objLogin);
    break;
  }
  case "addPatient":{
    let x = 4;
    while(argv[x] !== undefined){
      let symptoms = argv[x];
      objPat.symptoms.push(symptoms);
      x++;
    };
    Controller.addPatient(objPat);
    break;
  }

  case "logout":{
    let username = argv[3];
    Controller.logOut(username);
    break;
  }

}