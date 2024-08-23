const mongoose = require("mongoose");

const bookstore = mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    author:{
        type : String,
        required : true
    },
    year:{
        type : Number,
        required : true
    },
    pages:{
        type : Number,
        required : true
    },
    price : {
        type : Number,
        
    },
    copies:{
        type : Number,
        
    }
})


const crudTable = mongoose.model("bookstore",bookstore);

module.exports = crudTable;