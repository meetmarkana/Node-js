const express = require("express");

const app = express();
app.use(express.urlencoded());

app.use(express.static("public"));
var studentData = [
  {
    id: 1,
    name: "PQR",
  },
  {
    id: 2,
    name: "XYZ",
  },
];

app.set("view engine", "ejs");
const middleware = async(req,res,next)=>{
  if(req.query.age >= 18){
    next();
  }else{
    res.redirect("/");
  }
}

app.get("/", (req, res) => {
  res.render("index", {
    student: studentData,
    studentToEdit: null,
  });
});

app.post("/insertData", (req, res) => {
  const { id, name } = req.body;
  let obj = {
    id: studentData.length + 1,
    name: name,
  };
  studentData.push(obj);
  res.redirect("/");
});

app.get("/editData", (req, res) => {
  const id = req.query.userid;
  const studentToEdit = studentData.find((el) => el.id == id);
  res.render("index", {
    student: studentData,
    studentToEdit: studentToEdit,
  });
});

app.post("/editData", (req, res) => {
  const { id, name } = req.body;
  studentData = studentData.map((el) => {
    if (el.id == id) {
      el.name = name;
    }
    return el;
  });
  res.redirect("/");
});

app.get("/deleteData", (req, res) => {
  const id = req.query.userid;
  studentData = studentData.filter((el) => el.id != id);
  res.redirect("back");
});

app.get("/home",(req,res)=>{
  res.render("home");
});

app.listen(7805, () => {
  console.log("server listen");
});