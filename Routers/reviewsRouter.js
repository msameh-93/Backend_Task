const express= require("express");
const reviewsController= require(`${__dirname}\\..\\Controller\\reviewsController`);

const router= express.Router();

router.route("/")
    .get(reviewsController.getReviews)
    .post(reviewsController.createReviews);

router.route("/:id")
    .patch(reviewsController.updateReviews)
    .delete(reviewsController.deleteReviews);

module.exports= router;