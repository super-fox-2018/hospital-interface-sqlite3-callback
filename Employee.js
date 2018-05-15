const db = require('./database');

class Employee {
  constructor(props) {
    this.name = props.name;
    this.password = props.password;
    this.position = props.position;
  }

  static register(employee, callback) {
    const insertQuery = `INSERT INTO employees (username, password, position) 
                   VALUES ($username,$password,$position);`
    db.run(insertQuery, employee, (err) => {
      if (err) throw err;
      const getLengthQuery = "SELECT COUNT(*) AS totalEmployee FROM employees;";
      db.all(getLengthQuery, (err, queryResult) => {
        const { totalEmployee } = queryResult[0];
        callback(employee, totalEmployee);
      });
    });
  }

  static checkLoggedInUser(callback) {
    const query = `SELECT id, username, position FROM employees 
                    WHERE is_logged_in = 1`;
    db.get(query, (err, loggedInUser) => {
      if (err) throw err;
      callback(loggedInUser);
    });
  }

  static login(loginData, callback) {
    const checkLoginQuery = `SELECT is_logged_in FROM employees 
                              WHERE username = $username AND
                                    password = $password;`;
    db.all(checkLoginQuery, loginData, (err, queryResult) =>{
      if (queryResult.length === 0) {
        callback(null, 0);
        return
      }

      const { is_logged_in } = queryResult[0];
      if (is_logged_in === 1) {
        callback(loginData.$username, 1);
        return; 
      }

      const updateLoginQuery = `UPDATE employees SET is_logged_in = 1
                                WHERE username = $username AND
                                password = $password;`
      db.run(updateLoginQuery, loginData, (err) => {
        if (err) throw err;
        callback(loginData.$username, 2);
      });
    });
  }

  static logout(callback) {
    const updateLogoutQuery = `UPDATE employees SET is_logged_in = 0
                                WHERE is_logged_in = 1;`;
    db.run(updateLogoutQuery, (err) => {
      if (err) throw err;
      callback();
    });
  }
}

module.exports = Employee;