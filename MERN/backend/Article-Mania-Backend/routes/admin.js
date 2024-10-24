const express = require("express");
const routes = express.Router();
const adminctl = require("../controller/adminctl");
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploades');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Naming the file with a timestamp
    }
});

const upload = multer({ storage: storage }).single('image');


routes.post("/addadmin",adminctl.addadmin)
routes.post("/logadmin",adminctl.logadmin);
routes.get("/viewadmin",adminctl.viewadmin)
routes.post("/changepass",adminctl.changepass)
routes.post("/forgetpass", adminctl.forgetpass); 
routes.post("/verifyOtp",adminctl.verifyOtp);
routes.post("/addmanager",adminctl.addmanager);
routes.get("/viewadmin",adminctl.viewadmin);
routes.get("/viewmanager",adminctl.viewmanager);
routes.get("/editmanager", adminctl.editmanager)
routes.put('/editedmanager', adminctl.editedmanager)
routes.delete("/deletemanager",adminctl.deletemanager);
routes.post("/addemploye",adminctl.addemploye);
routes.get("/viewemploye",adminctl.viewemploye);
routes.get("/editemploye", adminctl.editemploye)
routes.put('/editedemploye', adminctl.editedemploye)
routes.delete("/deletemploye",adminctl.deletemploye);

routes.post('/addpost', upload, adminctl.addpost);  // Add post with image
routes.get('/viewposts', adminctl.viewposts);  // View all posts
routes.get('/editpost', adminctl.editpost);  // Get post data for editing
routes.post('/editedpost', upload, adminctl.editedpost);  // Edit and save the post
routes.delete('/deletepost', adminctl.deletepost);  // Delete post


module.exports = routes;    