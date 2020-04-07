const usersModel= require(`${__dirname}\\..\\Model\\usersModel`);
const util= require("util");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");

//try catch w bab3at next + custoom app error
exports.signup= async (request, response, next) => {
    try
    {
        await usersModel.create(request.body);
        response.status(201).json({
            status: "Successful",
            message: "User created successfully, you can now log in to add/update data"
        });
    } catch(error) {
        next(error);
    }
    
};
exports.signin= async (request, response, next) => {
    try
    {
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
    } catch(error) {
        next(error);
    }
};
exports.protect= async (request, response, next) => {
    try
    {
        let token;
        if(request.cookies.jwt)
        {
            token= request.cookies.jwt;
        }
        //Verify token against secret key (specified in sign in function)
        //Promisify verify function (through util module) to use async/await
        await util.promisify(jwt.verify)(token, "secretjwtwebtokenforauthentication").catch(() =>{
            response.status(404).json({
                status: "Error",
                message: "You are not logged in"
            });
        });
        //else if no error verifying grant access to API
        next();     //call next middle-ware
    } catch(error) {
        next(error);
    } 
};