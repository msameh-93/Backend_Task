const app= require(`${__dirname}\\app`);
const mongoose= require("mongoose");

//remove deprecation warnings from mongoose documentation
mongoose.set('useNewUrlParser', true);  
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/movies", (err) => {if(err) console.log(err)})
        .then(connection => {console.log("Connection to mongoose server is successful")});

const server= app.listen(8000, () => {
    console.log("Connection to server is Successful");
});