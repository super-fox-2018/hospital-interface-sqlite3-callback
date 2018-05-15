const Controller = require ('../Controller/Controller.js');

class View{
  constructor(){

  }

  static register(empObj, maxId){
    let details = {
      username: empObj.username,
      password: empObj.password,
      position: empObj.position
    };

    details = JSON.stringify(details);

    console.log("save data success " + details + ". Total employee: " + maxId[0].maxId);
  }

  static logIn(empObj, isValid, alreadyLogged){

    if(isValid === true && alreadyLogged !== true){
      console.log("user " + empObj.username + " logged in successfully");
    }
    else if(isValid === false){
      console.log("username / password is wrong");
    }
    if(alreadyLogged === true ){
      console.log("Someone is already logged in. Please log out first.");
    }
  }

  static logOut(username, isLogged){
    if(isLogged === true){
      console.log("Successfully logged " + username + " out.");
    }
    else{
      console.log("You are not logged in. You can try logging in if you want to log out :) ");
    }
  }

  static addPatient(maxId, isDoctor, isLogged){
    if(isLogged === false){
      console.log("You are not logged in. Please log in to your account and try again.");
    }
    else{
      if(isDoctor === false){
        console.log("You do not have access to add patient");
      }
      else{
        console.log("Patient data added. Total Patient: " +  maxId[0].maxId);
      }
    }
  }

}


module.exports = View;