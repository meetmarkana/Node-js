const adminschema = require("../model/adminschema")
const managerschema = require("../model/managerschema")
const employeschema = require("../model/employeschema")
const jwt = require("jsonwebtoken")

const auth = async(req,res,next)=>{
    let token = req.header("Authorization");
    if(!token){
        return res.status(400).json({msg : "unauthorize user"});
        
    }
    let newtoken = token.slice(7,token.length);
    let decode = jwt.verify(newtoken,"node");

    let employe = await employeschema.findById(decode.userdata._id)
    if(!employe){
        return res.status(400).json({msg:"invalid employe"})
    }

    req.user = decode;
    
    next();
}
module.exports = auth;