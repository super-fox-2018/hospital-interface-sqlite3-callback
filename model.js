const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./Database.db')


class Patient {
  constructor(name,diagnosis) {
    this.id = 0
    this.name = name;
    this.diagnosis = diagnosis;
  }
}

class Employee {
  constructor(username, password,jabatan) {
    this.username = username
    this.password = password
    this.jabatan = jabatan
    this.isLogin = false
  }
}
class EmployeeModel{
	constructor(){

	}
	static register(data,cb){
		db.run(`INSERT INTO employees (username,password,jabatan)
				VALUES ("${data[0]}","${data[1]}","${data[2]}")`,(err,data)=>{
					if (err) {
						console.log('gagal register, username telah digunakan')
						throw err
					}
					else{
						console.log('berhasil')
					}
				})
	}
	static login(data,cb){
		let queryLogin = `SELECT * FROM employees WHERE username=${data[0]} AND password=${data[1]} AND isLogin = "false"`
		let checkLogin = `SELECT * FROM employees WHERE isLogin = "true"`
		db.get(checkLogin,(err,user)=>{
			//console.log('---',user)
			if (user) {
				console.log('Login Session Sedang berjalan, logout user sebelumnya')
			}
			else{
				this.doLogin(data,cb)
			}
		})
	}
	static doLogin(data,cb){
		//console.log(data)
		console.log('login cuy')
		let updateQuery = `UPDATE employees SET isLogin = "true"
						   WHERE username="${data[0]}" AND password="${data[1]}"`
		db.run(updateQuery,(err)=>{
			db.get(`SELECT * FROM employees WHERE isLogin = "true"`,(err,user)=>{
				console.log(user)
				if (user!==null) {
					cb(user)
				}
				else{
					cb(false)
				}
				
			})
		})
		
	}
	static addPatient(name,diagnosis,cb){
		let queryPatient = `SELECT * FROM employees WHERE isLogin = "true"`
		db.get(queryPatient,(err,data)=>{
			if(data){
				this.doAddPatient(name,diagnosis,cb)
			}
			else{
				console.log('Anda Belum Login')
			}
		})
	}
	static doAddPatient(name,diagnosis,cb){
		console.log('pasien nambah')
		let queryAdd = `INSERT INTO patients (name,diagnosis)
						VALUES ("${name}","${diagnosis}")`
		let queryRead = `SELECT * FROM patients`
		db.run(queryAdd,(err)=>{
			db.all(queryRead,(err,data)=>{
				cb(data)
			})
		})
	}

}
module.exports = EmployeeModel