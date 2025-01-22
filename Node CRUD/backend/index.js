const express = require("express");
const port = 7805;
const app = express();
const db = require("./config/db");
const schema = require("./model/crudSchema");
const multer  = require('multer');
const path =require("path");
const fs = require("fs");
const cors = require("cors")

app.cors({origin:" http://localhost:5173/"})
app.use(express.urlencoded());

const Storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename :(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now())
    }
})
  
  const upload = multer({ storage: Storage }).single("image");
  // app.use(express.static(path.join(__dirname,"uploads")))
  app.use("/uploads",express.static(path.join(__dirname , "uploads"))),

app.get("/" , async(req,res)=>{
   let data = await schema.find({});
   data ? res.render("index",{data}) : console.log("Not Getting Data!!");
})

app.post("/insert",upload,async(req,res)=>{
    req.body.image = req.file.path
    let data = await schema.create(req.body)
    data ? res.redirect("back") : console.log("Data Not Submitted");
})

app.get("/delete",async(req,res)=>{
    let singledata =  await schema.findById(req.query.id);
    fs.unlinkSync(singledata.image)
    let datatodelete = await schema.findByIdAndDelete(req.query.id);
    datatodelete ? res.redirect("back") : console.log("Data Not Deleted");
})

app.get("/edit",async(req,res)=>{
    let editData = await schema.findById(req.query.id);
    editData ? res.render("edit",{editData}) : console.log("Data Not Found");
})
app.post("/update",upload,async(req,res)=>{
    let img = ""
    let singledata = await schema.findById(req.query.id);
    req.file ? img = req.file.path : img = singledata.image
    if(req.file){
        fs.unlinkSync(singledata.image)
    }
    console.log(req.body.image)
    req.body.image = img;
    let updatedata = await schema.findByIdAndUpdate(req.query.id,req.body);
    updatedata ? res.redirect("/") : console.log("Data Not update");
});
app.listen(port,(err)=>{
    err ? console.log(err) : console.log( `server is running on port ${port}`);    
})