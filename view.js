class View{
    constructor(){

    }

    regist(data){ 
        console.log(data)
        console.log(`${data[0].username} has succesfully registered`)
        console.log(`total employee ${data[0].id}`)
    }
    login(username){
        if(!username){
            console.log('wrong password/username')
        }else{
        console.log(`${username.username} has succesfully logged in`)}
    }
    logout(data){
        console.log(`${data.username} has succesfully logged out`)
    }
    patient(name,diagnosa){
        console.log(`${name}`)
    }


    
}
let view = new View
module.exports = view