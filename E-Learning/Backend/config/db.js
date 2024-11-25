const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/E-Learning-Platform')

const db = mongoose.connection

db.once('open', (err)=>{
    console.log(err ? err : "MongoDB Connected Successfully");
})