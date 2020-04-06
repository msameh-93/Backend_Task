const express= require("express");

const movieRouter= require(`${__dirname}\\Routers\\movieRouter`);
const reviewsRouter= require(`${__dirname}\\Routers\\reviewsRouter`);
const usersRouter= require(`${__dirname}\\Routers\\usersRouter`);
/*************************************************/
const app= express();

/**Middle-wares**/

    /*Mounting Routers*/
app.use(express.json());    //middle ware to parse json data (for Post and Patch end-points)
//use as middle-ware and put router logic in separate file to avoid code duplicaiton
app.use("/api/movies", movieRouter);    //All /api/movies/... will pass through this
app.use("/api/reviews", reviewsRouter); //All /api/reviews/... will pass through this
app.use("/api/users", usersRouter);     //All /api/users/... will pass through this
//TODO:Unimplemented paths
/*************************************************/
module.exports= app;