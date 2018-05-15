let model = require('./setup.js')

let input = process.argv
const command = input[2]
const data = input.slice(3)

const employeeController = require('./controller/employeeController')

//add employee

switch (command) {
  case 'add': { return employeeController.add(data)}
  case 'login': { return employeeController.login(data)}
  default:
    break;
}

// if (input === 'daftarEmployee') {
//     model.daftar(tabel, [process.argv[4], process.argv[5], process.argv[6], process.argv[7]])
//   }

//   if (input === 'deleteEmployee') {
//     model.delete(tabel, process.argv[4])
//   }


//   if (input === 'updateEmployee') {
//     model.update(tabel, process.argv[4])
//   }


// console.log([process.argv[4], process.argv[5], process.argv[6], process.argv[7]])

// node index.js add name position pass
