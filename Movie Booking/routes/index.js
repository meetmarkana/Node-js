const express = require("express");

const routes = express.Router();
const multer = require("multer")



const Storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename :(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now())
    }
})

const uploadpic = multer({
    storage : Storage
}).single("image")



const moviectl = require("../controllers/moviecontroller");

routes.get("/", moviectl.home)
routes.get("/addData",moviectl.addData)
routes.post("/insert",uploadpic,moviectl.insert)
routes.get("/deletemovie",moviectl.deletemovie)
routes.get("/editdmovie",moviectl.editdmovie)
routes.post("/updatemovie",uploadpic,moviectl.updatemovie)


module.exports = routes;    