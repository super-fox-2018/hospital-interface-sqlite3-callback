class View{
	constructor(){

	}
	static help(){
		console.log('Welcome to Hospital Apps')
		console.log('help')
		console.log('register <username> <password> <role>')
		console.log('login <username> <password>')
		console.log('addPatient <name> <diagnosis>')
		console.log('logout <username>')
	}
	static register(dataEmployee){
		console.log(`Kamu berhasil register ${dataEmployee[dataEmployee.length-1].username} 
			total Employee ${dataEmployee.length}`)
	}
	static login(dataEmployee){
		if (dataEmployee==undefined) {
			console.log('username/password salah')
		}
		else if(dataEmployee!==undefined){
			console.log('Selamat Datang di Hospital Apps '+dataEmployee.username)
		}
	}
	static addPatient(dataPatient){
		// console.log(dataPatient)
		if (dataPatient!==undefined) {
			console.log(`berhasil menambahkan patient. Jumlah Patient : ${dataPatient.length}`)
		}
		else{
			console.log('tidak memiliki akses')
		}
	}
	static logout(user){
		if (user!==undefined) {
			console.log(`${user} berhasil logout`)
		}
		else{
			console.log('anda belom login')
		}
	}
}

module.exports = View