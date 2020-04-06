const express= require("express");
const reviewsController= require(`${__dirname}\\..\\Controller\\reviewsController`);
const usersController= require(`${__dirname}\\..\\Controller\\usersController`);

const router= express.Router();
//protect routes from non logged in user
router.route("/")
    .get(reviewsController.getReviews)  //non logged users can view only
    .post(usersController.protect, reviewsController.createReviews);

router.route("/:id")
    .patch(usersController.protect, reviewsController.updateReviews)
    .delete(usersController.protect, reviewsController.deleteReviews);

module.exports= router;