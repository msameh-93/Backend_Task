const usersModel= require(`${__dirname}\\..\\Model\\usersModel`);
const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");

exports.signup= async (request, response, next) => {
    const newUser= await usersModel.create(request.body);
    response.status(200).json({
        status: "Successful",
        message: "User created successfully, you can now log in to add/update data"
    });
};
exports.signin= async (request, response, next) => {
    const {email, password}= request.body;
    if(!email || !password)
    {
        return response.status(404).json({
            status: "Error",
            message: "Password and/or email fields cannot be empty"
        });
    }
    const loginUser= await usersModel.findOne({email: email});
    if(!loginUser)
    {
        return response.status(404).json({
            status: "Error",
            message: "User is not registered in DB"
        });
    }
    if(!await bcrypt.compare(password, loginUser.password))
    {
        return response.status(404).json({
            status: "Error",
            message: "Wrong password"
        });
    }
    const token= jwt.sign({id: email}, "secretjwtwebtokenforauthentication", {expiresIn: "5m"});
    response.cookie("jwt", token);
    response.status(200).json({
        status: "Successful",
        token: token,
        message: "Logged in successfuly. You can now add/update data"
    });
};
exports.protect= async (request, response, next) => {

};