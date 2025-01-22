const mongoose = require("mongoose");

const crud = mongoose.Schema({
    name : {
        type:String,
        required : true
    },
    salary : {
        type:String,
        required : true
    },
    image : {
        type : String,
        required : true,
      }
})

const crudTable = mongoose.model("crud",crud)

module.exports = crudTable;