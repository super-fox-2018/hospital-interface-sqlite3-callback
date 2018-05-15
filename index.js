let model = require('./model.js')
let control = require('./controller.js')
control = new control()
model = new model()


let input = process.argv[2]
let username = process.argv[3]
let pass = process.argv[4]
let role = process.argv[5]

if (input === 'register') {
  control.signup(username, pass, role)
}

if (input === 'login') {
  control.login(username, pass)
}


if (input === 'addPatient') {
  let penyakit = []
  for (let i = 4; i < process.argv.length; i++) {
    penyakit.push(process.argv[i])
  }

  control.addpatient(process.argv[3], penyakit)

}

if (input === 'logout') {
  control.logoutku(username)
}
