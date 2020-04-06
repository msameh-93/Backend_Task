const express= require("express");
const movieController= require(`${__dirname}\\..\\Controller\\movieController`);

const router= express.Router();     //used as middle ware

//RESTful CRUD apis
router.route("/")
    .get(movieController.readAllMovies)
    .post(movieController.createOneMovie);

router.route("/:id")
    .get(movieController.readMovie)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie);

module.exports= router;     //export router to be used as an application middleware
