const express= require("express");

const movieRouter= require(`${__dirname}\\Routers\\movieRouter`);
/*************************************************/
const app= express();

/**Middle-ware**/


/**Mounting Routers**/
//use as middle-ware and put router logic in separate file to avid code duplicaiton
app.use("/api/movies", movieRouter);    //All /api/movies/... will pass through this

/*************************************************/
module.exports= app;