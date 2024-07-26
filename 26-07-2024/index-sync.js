const fs = require("fs");

fs.writeFileSync("demo.txt","First day of node js ");
fs.appendFileSync("demo.txt","Node Modules: ");

console.log(fs.readFileSync("demo.txt").toString());

fs.renameSync("demo.txt","first.txt");
fs.unlinkSync("first.txt");

