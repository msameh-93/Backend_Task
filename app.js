const express= require("express");

const movieRouter= require(`${__dirname}\\Routers\\movieRouter`);
/*************************************************/
const app= express();

/**Middle-ware**/


/**Mounting Routers**/
app.use("/api/movies", mvoieRouter);

/*************************************************/
module.exports= app;