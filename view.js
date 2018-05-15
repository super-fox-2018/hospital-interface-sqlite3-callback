class View{
    constructor(){

    }

    regist(data){ 
        console.log(data)
        console.log(`${data[0].username} has succesfully registered`)
    }
    login(username){
        if(!username){
            console.log('wrong password/username')
        }else{
        console.log(`${username.username} has succesfully logged in`)}
    }
    logout(username,password){
        console.log(`${username} has succesfully logged out`)
    }
    patient(name,diagnosa){
        console.log(`${name}`)
    }


    
}
let view = new View
module.exports = view