const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


let task = [
];

app.set("view engine", "ejs");

const middleware = async (req, res, next) => {
  if (req.query.age >= 18) {
    next();
  } else {
    res.redirect("/");
  }
};

app.get("/", (req, res) => {
  res.render("index", {
    todo: task,
  });
});

app.post("/insertData", (req, res) => {
  const { id, name } = req.body;
  let obj = {
    id,
    name,
  };
  task.push(obj);
  res.redirect("/");
});

app.get("/deleteData", (req, res) => {
  const id = req.query.userid;
  const data = task.filter((el) => el.id != id);
  task = data;
  res.redirect("back");
});

app.get("/editdata", (req, resp) => {
  const id = req.query.editid;
  const data = task.find((el) => el.id == id);
  // resp.send(data)
  resp.render("edit", {
    data
  });
});

app.post("/updatedata", (req, resp) => {


  const { id,name } = req.body;
  const userid = parseInt(id);
  // const todo_id = parseInt(id);
  // const todo = task.map((el) => {
  //   if(el.id == id){
  //     return {id,name}
  //   }

  //   return el
  // });

  const data = task.find(el=>el.id == userid)

  data.id = userid
  data.name = name

  
  // resp.send(todo)


  resp.redirect("/");
});

app.get("/home", middleware, (req, res) => {
  res.render("Home");
});

app.get("/admin",middleware, (req, res) => {
  res.render("index1");
});



app.use(middleware);

app.listen(7805, () => {
  console.log("server listening on port 7805");
});