const express= require("express");
const path= require("path");
const reviewsController= require(path.join(__dirname+`/../Controller/reviewsController`));
const usersController= require(path.join(__dirname+`/../Controller/usersController`));
const router= express.Router();

//RESTful CRUD apis
//protect routes from non logged in user
//Mounted routers on app.js (/api/reviews/...)
router.route("/")
    .get(reviewsController.getReviews)  //non logged users can view only
    .post(usersController.protect, reviewsController.createReviews);

router.route("/:id")
    .patch(usersController.protect, reviewsController.updateReviews)
    .delete(usersController.protect, reviewsController.deleteReviews);

module.exports= router;