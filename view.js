class View {
  static showSaveSuccess(employee, totalEmployees) {
    console.log('Save data success!');
    console.log(`Username : ${employee.$username}`);
    console.log(`Password : ${employee.$password}`);
    console.log(`Position : ${employee.$position}`);
    
    console.log(`\nTotal employee : ${totalEmployees}`);
  }

  static showError(message) {
    console.log(message);
  }

  static showLoginMessage(username) {
    console.log(`User ${username} logged in successfully!`);
  }

  static showLogoutMessage(username) {
    console.log(`user has logged out successfully!`);
  }

  static showAddPatient(totalPatients) {
    console.log(`data pasien berhasil ditambahkan. Total data pasien : ${totalPatients}`);
  }
}

module.exports = View;
