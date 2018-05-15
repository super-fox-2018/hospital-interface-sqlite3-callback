class View{
  static register(data){
    var dataLength = data.length;
    console.log("save data success");
    console.log(data[dataLength-1]);
    console.log(`total employee : ${dataLength}`);
  }
  static login(userLogin){
    if (userLogin==false) {
      console.log("username/password wrong");
    }
    else {

      console.log(`user ${userLogin} logged in successfully`);
    }
  }
  static addPatient(countData){
    if (countData==false) {
      console.log("tidak memiliki akses untuk add patients");
    }
    else {
      console.log(`data patient berhasil ditambahkan. Total data patient : ${countData}`);
      console.log(countData);
    }
  }
  static logout(logoutEmployee){
    if (logoutEmployee==true) {
      console.log("successfully logout");
    }
    else{
      console.log("login terlebih dahulu");
    }
  }
}

module.exports = View;
