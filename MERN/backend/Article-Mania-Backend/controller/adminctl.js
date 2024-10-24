const adminschema = require("../model/adminschema");
const managerschema = require("../model/managerschema");
const employeschema = require("../model/employeschema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mailer = require("../config/mailer")
const postschema = require("../model/postschema");
const path = require("path");

module.exports.addadmin = async (req, res) => {
    try {
        let user = await adminschema.findOne({ email: req.body.email });
        if (user) {
            return res.status(200).json({ msg: "user already exits" })
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)
    
        let data = await adminschema.create(req.body)
        data ? res.status(200).json({ success: true, msg: 'data sent scuccessfully', data }) : res.status(404).json({ msg: 'error for sendin data' })
        console.log(req.body)
    
    } catch (error) {
        console.log("error coming in add admin ", error)
    }
   
}
module.exports.logadmin = async (req, res) => {
    try {
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
    } catch (error) {
        console.log('Error coming in login admin', error)
    }
  
}

module.exports.viewadmin = async (req, res) => {
    try {
        let data = await adminschema.find({});
        data ? res.status(200).json({ msg: 'data sent scuccessfully', admindata: data }) : res.status(404).json({ msg: 'error for sendin data' })
        
    } catch (error) {
        console.log('error coming in view admin', error)
    }

}
module.exports.changepass = async (req, res) => {
    try {
        
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
    } catch (error) {
        console.log('error coming in changepass', error)
    }

}
module.exports.forgetpass = async (req, res) => {
    try {
        
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
    } catch (error) {
        console.log('error coming in forgot pass', error)
    }

}
module.exports.verifyOtp = async (req, res) => {
    try {
        
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
    } catch (error) {
        console.log('error coming in verify', error)
    }
};

module.exports.addmanager = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        let data = await managerschema.create(req.body)
        data ? res.status(200).json({ msg: 'manager created' }) : res.status(404).json({ msg: 'manager not add' })
        console.log(req.body)
        
    } catch (error) {
        console.log('error coming in add manager', error)
    }

}

module.exports.viewmanager = async(req,res)=>{
    try {
        let data = await managerschema.find({});
        data ? res.status(200).json({ msg: 'data sent scuccessfully', managerdata: data }) : res.status(404).json({ msg: 'error for sendin data' })   
        
    } catch (error) {
        console.log('error coming in view manager', error)
    }
}

module.exports.editmanager = async (req, res)=> {
    try {
        const editdata = await managerschema.findById(req.query.id)
        res.status(200).json({ success: true, message: 'edit data get successfully.', editdata})
    } catch (error) {
        res.status(400).json({ success: false, message: 'error coming while edit data'})
    }
}

module.exports.editedmanager = async (req, res) => {
    try {
        const data = await managerschema.findByIdAndUpdate(req.query.id, req.body)
        res.status(200).json({ success: true, message: 'edit manager successfully.', data})
    } catch (error) {
        res.status(400).json({ success: false, message: 'error coming while edit data'})
    }
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
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        let data = await employeschema.create(req.body)
        data ? res.status(200).json({ msg: 'employe created' }) : res.status(404).json({ msg: 'employe not add' })
        console.log(req.body)
        
    } catch (error) {
        console.log('error coming in add employee', error)
    }

}

module.exports.viewemploye = async(req,res)=>{
    try {
        let data = await employeschema.find({});
        data ? res.status(200).json({ msg: 'data sent scuccessfully', employedata: data }) : res.status(404).json({ msg: 'error for sendin data' })   
        
    } catch (error) {
        console.log('error coming in view employee', error)
    }
}


module.exports.editemploye = async (req, res)=> {
    try {
        const editdata = await employeschema.findById(req.query.id)
        res.status(200).json({ success: true, message: 'edit data get successfully.', editdata})
    } catch (error) {
        res.status(400).json({ success: false, message: 'error coming while edit data'})
    }
}

module.exports.editedemploye = async (req, res) => {
    try {
        const data = await employeschema.findByIdAndUpdate(req.query.id, req.body)
        res.status(200).json({ success: true, message: 'edit manager successfully.', data})
    } catch (error) {
        res.status(400).json({ success: false, message: 'error coming while edit data'})
    }
}


module.exports.deletemploye = async(req,res)=>{
    try{
        await employeschema.findByIdAndDelete(req.query.id);
    res.status(200).json({msg : "employe deleted"})
    }catch(err){
        res.status(404).json({msg : "employe not deleted"})

    }
}

module.exports.addpost = async (req, res) => {
    try {
        if(req.file){
            req.body.image = req.file.path.replace(/\\/,"/")
        }
        let data = await postschema.create(req.body);
        data ? res.status(200).json({ success: true, msg: 'Post added successfully', data }) : res.status(404).json({ msg: 'Error adding post' });
    } catch (error) {
        console.log("Error in addpost: ", error);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports.viewposts = async (req, res) => {
    try {
        let data = await postschema.find({});
        data ? res.status(  200).json({ success: true, msg: 'Posts retrieved successfully', posts: data }) : res.status(404).json({ msg: 'Error retrieving posts' });
    } catch (error) {
        console.log('Error in viewposts: ', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports.editpost = async (req, res) => {
    try {
        const post = await postschema.findById(req.query.id);
        if (post) {
            res.status(200).json({ success: true, msg: 'Post found', post });
        } else {
            res.status(404).json({ msg: 'Post not found' });
        }
    } catch (error) {
        console.log('Error in editpost: ', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports.editedpost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? req.file.path : req.body.existingImage; // if a new image is uploaded

        const post = await postschema.findByIdAndUpdate(req.query.id, { title, content, image }, { new: true });
        post ? res.status(200).json({ success: true, msg: 'Post updated successfully', post }) : res.status(404).json({ msg: 'Post not found' });
    } catch (error) {
        console.log('Error in editedpost: ', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports.deletepost = async (req, res) => {
    try {
        await postschema.findByIdAndDelete(req.query.id);
        res.status(200).json({ success: true, msg: 'Post deleted successfully' });
    } catch (error) {
        console.log('Error in deletepost: ', error);
        res.status(500).json({ msg: 'Server error' });
    }
};