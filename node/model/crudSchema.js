const mongoose = require("mongoose");

const crud = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    course : {
        type : String,
        require : true
    },
    image : {
        type : String,
        required : true,
      }
})

const crudTable = mongoose.model("crud",crud)

module.exports = crudTable;