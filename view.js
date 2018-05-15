class View {
    static dislpayList(data) {
        console.log(data)
    }
    static dislpayRegister(msg, obj, total) {
        console.log(`${msg} ${JSON.stringify(obj)}. Total employee: ${total}`)
    }
    static dislpay(msg) {
        console.log(msg)
    }
}

module.exports = View;
