// var controllerku = require('./controller.js')
// var models = require('./model.js')
// model = new models()
//

class View {
  notifdaftar(value) {
    console.log('Save data Success')

    console.log(value[value.length - 1])
    console.log('total employee: ' + value.length)
  }


  viewLogin(data) {
    if (!data) {
      console.log('username / password salah ')
    } else {
      console.log('user ' + data.username + ' login successfully')
    }
  }

}

module.exports = View
