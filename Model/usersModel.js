const mongoose= require("mongoose");
const validator= require("validator");
const bcrypt= require("bcryptjs");


const usersSchema= new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,   //users identified by thier emails
        validate: [validator.isEmail, "Email is not valid"] //checks if input follows email pattern
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: [8, "Password cannot be less than 8 characters long"]
    }
});

usersSchema.pre("save", async function(next) {  //pre save mongoose middle ware
    this.password= await bcrypt.hash(this.password, 12);    //encrypt passwords in DB for security
    next();
});
const usersModel= mongoose.model("users", usersSchema);

module.exports= usersModel;