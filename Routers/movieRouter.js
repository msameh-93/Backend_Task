const express= require("express");
const path= require("path");
const movieController= require(path.join(__dirname+`/../Controller/movieController`));
const usersController= require(path.join(__dirname+`/../Controller/usersController`));
const router= express.Router();     //used as middle ware

//RESTful CRUD apis
//protect routes from non logged in user
//Mounted routers on app.js (/api/movies/...)
router.route("/")
    .get(movieController.readAllMovies)     //non logged users can view only
    .post(usersController.protect, movieController.createOneMovie);

router.route("/:id")
    .get(movieController.readMovie)
    .patch(usersController.protect, movieController.updateMovie)
    .delete(usersController.protect, movieController.deleteMovie);

module.exports= router;     //export router to be used as an application middleware
