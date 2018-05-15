class View {
  displayRegister(person, total) {
    console.log(`sucessfully register ${person}. total employees now is ${total}`);
  }

  displayLogin(username) {
    console.log(`user ${username} logged in sucessfully`);
  }

  displayLogout(username) {
    console.log(`user ${username} logged out sucessfully`);
  }

  displayAddPatient(name, totalPatient) {
    console.log(`data pasien ${name} berhasil ditambah. jumlah pasien sekarang: ${totalPatient}`);
  }

  displayText(string) {
    console.log(string);
  }
}

module.exports = View;
