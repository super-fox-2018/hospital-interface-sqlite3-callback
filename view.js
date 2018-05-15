// var controllerku = require('./controller.js')
var models = require('./model.js')
models = new models()
//

class View {
  notifdaftar(value) {
    console.log('Save data Success')
    console.log(value)
    models.longs(function(c) {
      console.log('total employee ' + c.total)
    })
  }

  viewLogin(data) {
    if (!data) {
      console.log('username / password salah ')
    } else {
      console.log('user ' + data.username + ' login successfully')
    }
  }

  viewlogout(data) {
    if (!data) {
      console.log('anda belum login')
    } else {
      console.log(data.username + ' is successfully logout')
    }
  }

  justview(data) {
    console.log(data)
  }


  addpasien(data) {
    if (!data) {
      console.log('tidak memiliki akses untuk add passien')

    } else {
      models.totalpatient(function(a) {
        console.log('data pasien berhasil ditambahkan , total data pasien: ' + a.total)
      })
    }
  }

}



module.exports = View
