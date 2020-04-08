const express= require("express");
const cookieParser= require("cookie-parser");
const mongoose= require("mongoose");
/************************/
const movieRouter= require(`${__dirname}\\Routers\\movieRouter`);
const reviewsRouter= require(`${__dirname}\\Routers\\reviewsRouter`);
const usersRouter= require(`${__dirname}\\Routers\\usersRouter`);
/*************************************************/

const app= express();

app.set("view engine", "pug");
app.set("views", `${__dirname}\\View`);
app.use(express.static(`${__dirname}\\public`));
/**Middle-wares**/
app.use(express.json());    //middle ware to parse json data (for Post and Patch end-points)
app.use(cookieParser());    //middle ware to parse cookies in requests for jwt authentication
    /*Render Home page*/
app.use("/home", (request, response) => {
    response.status(200).render("index");
});
    /*Mounting Routers*/
//use as middle-ware and put router logic in separate file to avoid code duplicaiton
app.use("/api/movies", movieRouter);    //All /api/movies/... will pass through this
app.use("/api/reviews", reviewsRouter); //All /api/reviews/... will pass through this
app.use("/api/users", usersRouter);     //All /api/users/... will pass through this
app.all("*", (request, response) => {   //listens to all requests that did not pass through api endpoints
    response.status(404).json({
        status: "Error",
        message: "No URL with specified path exists on server"
    });
});
//express middle ware to handle errors passed to next(error)
app.use((error, request, response, next) => {//passing 4 args to middleware is recognized as errhandler
    response.status(error.statusCode).json({
        status: "Error",
        message: error.message
    })
});   
/*************Connecting to Mongoose********************/
//remove deprecation warnings: (from mongoose documentation)
mongoose.set('useNewUrlParser', true);  
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/movies", (err) => {if(err) console.log(err)})
        .then(connection => {console.log("Connection to mongoose server is successful")});
/*************************************************/

module.exports= app;