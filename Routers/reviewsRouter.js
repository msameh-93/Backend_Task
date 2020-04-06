const express= require("express");
const reviewsController= require(`${__dirname}\\..\\Controller\\reviewsController`);

const router= express.Router();

router.use("/")
    .get(reviewsController.getReviews)
    .post(reviewsController.postReviews);

router.use("/:id")
    .patch(reviewsController.updateReviews)
    .delete(reviewsController.deleteReviews);