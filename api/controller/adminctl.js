const adminschema = require("../model/adminschema");
const managerschema = require("../model/managerschema");
const employeschema = require("../model/employeschema")
const bcrypt = require("bcrypt")
const moment = require("moment")
const jwt = require("jsonwebtoken")
const mailer = require("../config/mailer")

module.exports.addadmin = async (req, res) => {
    let user = await adminschema.findOne({ email: req.body.email });
    if (user) {
        return res.status(200).json({ msg: "user already exits" })
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.creaedAT = moment().format('MMMM Do YYYY, h:mm:ss a');

    let data = await adminschema.create(req.body)
    data ? res.status(200).json({ msg: 'data sent scuccessfully' }) : res.status(404).json({ msg: 'error for sendin data' })
    console.log(req.body)

}
module.exports.logadmin = async (req, res) => {
    let user = await adminschema.findOne({ email: req.body.email });
    console.log(user)
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            let token = jwt.sign({ userdata: user }, "node", { expiresIn: "1h" })
            console.log(token)
            res.status(200).json({ msg: 'login scuccessfully', token: token })

        } else {
            res.status(404).json({ msg: 'password not match' })
        }
    } else {
        res.status(404).json({ msg: 'user not found' })
    }
}

module.exports.viewadmin = async (req, res) => {
    let data = await adminschema.find({});
    data ? res.status(200).json({ msg: 'data sent scuccessfully', admindata: data }) : res.status(404).json({ msg: 'error for sendin data' })

}
module.exports.changepass = async (req, res) => {

    let user = await adminschema.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Current password does not match" });
    }
    const newpassword = await bcrypt.hash(req.body.newpassword, 10);
    user.password = newpassword;
    await user.save();

    res.status(200).json({ msg: "Password changed successfully" });
}
module.exports.forgetpass = async (req, res) => {
    console.log(req.body)
    let user = await adminschema.findOne({ email: req.body.email });
    console.log(user)
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }
    let otp = Math.floor(Math.random() * 100000 + 90000);
    mailer.sendotp(req.body.email, otp);
    req.session.otp = otp;
    req.session.adminId = user.id;
    res.status(200).json({ msg: "OTP sent to your email" });

    console.log(req.session.otp)

}
module.exports.verifyOtp = async (req, res) => {
    const otp = req.body.otp;
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;

    let adminId = req.session.adminId;
    console.log(req.session.otp)
    console.log(req.body)

    if (req.session.otp == otp) {
        if (newpassword == confirmpassword) {
            const hashedPassword = await bcrypt.hash(newpassword, 10);
            await adminschema.findByIdAndUpdate(adminId, { password: hashedPassword }) && res.status(200).json({ msg: "Password updated successfully" });
        }else{
            return res.status(400).json({ msg: "new paasword and confirmpassword is same" });

        }
    } else {
        return res.status(400).json({ msg: "Invalid OTP" });
    }
};

module.exports.addmanager = async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    let data = await managerschema.create(req.body)
    data ? res.status(200).json({ msg: 'manager created' }) : res.status(404).json({ msg: 'manager not add' })
    console.log(req.body)

}

module.exports.viewmanager = async(req,res)=>{
    let data = await managerschema.find({});
    data ? res.status(200).json({ msg: 'data sent scuccessfully', managerdata: data }) : res.status(404).json({ msg: 'error for sendin data' })   
}

module.exports.deletemanager = async(req,res)=>{
    try{
        await managerschema.findByIdAndDelete(req.query.id);
    res.status(200).json({msg : "manager deleted"})
    }catch(err){
        res.status(404).json({msg : "manager not deleted"})

    }
}
module.exports.addemploye = async (req, res) => {
   
    req.body.password = await bcrypt.hash(req.body.password, 10);
    let data = await employeschema.create(req.body)
    data ? res.status(200).json({ msg: 'employe created' }) : res.status(404).json({ msg: 'employe not add' })
    console.log(req.body)

}

module.exports.viewemploye = async(req,res)=>{
    let data = await employeschema.find({});
    data ? res.status(200).json({ msg: 'data sent scuccessfully', employedata: data }) : res.status(404).json({ msg: 'error for sendin data' })   
}
module.exports.deletemploye = async(req,res)=>{
    try{
        await employeschema.findByIdAndDelete(req.query.id);
    res.status(200).json({msg : "employe deleted"})
    }catch(err){
        res.status(404).json({msg : "employe not deleted"})

    }
}