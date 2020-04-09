const express= require("express");
const path= require("path");
const usersController= require(path.join(__dirname+`/../Controller/usersController`));
const router= express.Router();     //used as middle ware

//Mounted routers on app.js (/api/users/...)
router.post("/signin", usersController.signin);
router.post("/signup", usersController.signup);

module.exports= router;