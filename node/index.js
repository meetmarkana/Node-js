const express = require("express");
const port = 7805;
const app = express();
const db = require("./config/db");
const schema = require("./model/crudSchema");
const multer  = require('multer')
const path =require("path")

app.set("view engine", "ejs");

app.use(express.urlencoded());

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
  const upload = multer({ storage: Storage }).single("image");
  app.use(express.static(path.join(__dirname,"uploads")))

app.get("/" , async(req,res)=>{
   let data = await schema.find({});
   data ? res.render("index",{data}) : console.log("Not Getting Data!!");
   
})

app.post("/insert",upload,async(req,res)=>{

    req.body.image = req.file.filename
    let data = await schema.create(req.body)
    data ? res.redirect("back") : console.log("Data Not Submitted");
      
})

app.get("/delete",async(req,res)=>{
    let datatodelete = await schema.findByIdAndDelete(req.query.id);
    datatodelete ? res.redirect("back") : console.log("Data Not Deleted");
})

app.get("/edit",async(req,res)=>{
    let editData = await schema.findById(req.query.id);
    editData ? res.render("edit",{editData}) : console.log("Data Not Found");
})
app.post("/update",async(req,res)=>{
    let updateData = await schema.findByIdAndUpdate(req.query.id,req.body);
    updateData ? res.redirect("/") : console.log("Data Not Updated");
})
app.listen(port,(err)=>{
    err ? console.log(err) : console.log( `server is running on port ${port}`);    
})