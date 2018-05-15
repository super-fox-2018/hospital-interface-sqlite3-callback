class View {
  static displayRegister(obj, len) {
    let jsonFormat = JSON.stringify(obj);
    console.log(`save data success`);
    console.log(`${jsonFormat}`);
    console.log(`Total employee: ${len}`)
  }

  static displayLogin(obj) {
    console.log(`user ${obj.username} logged in successfully`);

    console.log(`username / password is wrong`);
  }
}

module.exports = View