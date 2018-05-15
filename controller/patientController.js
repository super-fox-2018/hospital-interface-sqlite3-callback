const Patient = require('../models/Patient');
const PatientView = require('../views/PatientView');

class PatientController {
  static index () {
    Patient.getAll(function (data) {
      PatientView.index(data);
    });
  }
}

module.exports = PatientController;
