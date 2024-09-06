const movietbl = require("../model/schema");
const fs = require("fs");
const path = require("path");

module.exports.home = async (req, res) => { 
    try {
        const data = await movietbl.find({});
        if (data) { 
            res.render("home", { data });
        } else {
            console.log("Data not found");
        }
    } catch (err) {
        console.error(err);
    
    }
};

module.exports.addData=async(req,res)=>{
    await res.render("addData")
}

module.exports.insert = async (req, res) => {
    try {
        req.body.image = req.file.path;
        let data = await movietbl.create(req.body);
        if (data) {
            res.redirect("/");
            // console.log(data)
        } else {
            console.log("Data not submitted");
        }
    } catch (err) {
        console.error(err);
        
    }
};

module.exports.deletemovie = async (req, res) => {
    try {
        let singledata = await movietbl.findById(req.query.id);
        if (singledata) {
            fs.unlinkSync(singledata.image);
            let deletedata = await movietbl.findByIdAndDelete(req.query.id);
            if (deletedata) {
                res.redirect("back");
            } else {
                console.log("Data not deleted");
            }
        } else {
            console.log("Movie not found");
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports.editdmovie = async (req, res) => {
    try {
        let editschema = await movietbl.findById(req.query.id);
        if (editschema) {
            res.render("edit", { editschema });
        } else {
            console.log("Data not found");
        }
    } catch (err) {
        console.error(err);
        
    }
};

module.exports.updatemovie = async (req, res) => {
    try {
        let img = "";
        let singledata = await movietbl.findById(req.query.id);
        if (singledata) {
            img = req.file ? req.file.path : singledata.image;
            if (req.file) {
                fs.unlinkSync(singledata.image);
            }
            req.body.image = img;
            let updatedata = await movietbl.findByIdAndUpdate(req.query.id, req.body);
            if (updatedata) {
                res.redirect("/");
            } else {
                console.log("Data Not updated");
            }
        } else {
            console.log("Movie not found");
        }
    } catch (err) {
        console.error(err);
    }
};