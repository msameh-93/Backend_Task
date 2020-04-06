const express= require("express");
const usersController= require(`${__dirname}\\..\\Controller\\usersController`);

const router= express.Router();

router.post("/signin", usersController.signin);
router.post("/signup", usersController.signup);

module.exports= router;