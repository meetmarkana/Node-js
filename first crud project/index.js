const express = require("express");
const port = 6511;
const app = express();
const db = require("./config/db");
const schema = require("./model/schema");


app.set("view engine", "ejs");

app.use(express.urlencoded());

app.get("/" , async(req,res)=>{
   let data = await schema.find({});
   data ? res.render("index",{data}) : console.log("Not Getting Data!!");
   
})

app.post("/insert", async(req,res)=>{
    let data = await schema.create(req.body)
    data ? res.redirect("back") : console.log("Data Can't Submitted!!");
})

app.get("/delete",async(req,res)=>{
    let datatodelete = await schema.findByIdAndDelete(req.query.id);
    datatodelete ? res.redirect("back") : console.log("Not Deleted!!");
})

app.get("/edit",async(req,res)=>{
    let DatatoEdit = await schema.findById(req.query.id);
    DatatoEdit ? res.render("edit",{DatatoEdit}) : console.log("Something Went Wrong:)");
})
app.post("/update",async(req,res)=>{
    let updateData = await schema.findByIdAndUpdate(req.query.id,req.body);
    updateData ? res.redirect("/") : console.log("Not Updated!!");
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log( "Server is running on port " + port);
})