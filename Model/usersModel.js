const mongoose= require("mongoose");

const usersSchema= new mongoose.Schema({

});

const usersModel= mongoose.model("users", usersSchema);

module.exports= usersModel;