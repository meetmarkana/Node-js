const nodemailer = require("nodemailer");

const trasnsport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "meetmarakna07@gmail.com",
        pass : "pxeehmbsrcoupgma"
    }
})
module.exports.sendotp = (to,otp)=>{
    let mailoption ={
        from : "meetmarakna07@gmail.com",
        to : to,
        subjet : "Your otp",
        text : `your otp is ${otp}`
    }
    trasnsport.sendMail(mailoption,(err)=>{
        err && console.log(err);
    })
}