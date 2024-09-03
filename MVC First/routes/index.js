const express = require("express");
const routes = express.Router();

const webctl = require("../controllers/webctl");

routes.get("/",webctl.home);
routes.get("/about",webctl.about);
routes.get("/contact",webctl.contact);

module.exports = routes;    