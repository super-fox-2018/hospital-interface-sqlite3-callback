const Controller = require('./controller');

class View{
    static viewData(data){
        console.log(`dari view`, data)
    }

    static succesRegister(record, count){
        console.log(`save data success ${record}, Total employee : ${count}`)
    }

    static succesLogin(name){
        console.log(`user ${name} looged in succesfully`)
    }
    static failedLogin(){
        console.log(`username / password wrong !`)
    }

    static succesAddedDiagnosis(count){
        console.log(`data pasien berhasil ditambahkan. Total data Pasien : ${count}`)
    }

    static accesDenied(){
        console.log(`BUKAN DOKTER, Tidak memiliki akses untuk add patients!`)
    }
}


module.exports = View;