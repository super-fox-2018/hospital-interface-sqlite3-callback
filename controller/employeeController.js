const model_employee = require('../model/employeeModel');
const employeeView = require('../view/employeeView');

class employeeController {

  static add(data) {

    model_employee.add_employee(data, (err, success) => {
      if (err) {
        employeeView.show(err)
      } else {
        employeeView.show(success)
      }
    })
  }

  static login(data) {

    const username = data[0]
    const password = data[1]
// console.log('ini data', data);
    model_employee.login_employee(username, password, (err, statusMsg) => {
      if (err) {
        employeeView.show(statusMsg)
      } else {
        employeeView.show(statusMsg)
      }
    })
  }
}

module.exports = employeeController;
