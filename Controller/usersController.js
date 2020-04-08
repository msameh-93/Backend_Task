const usersModel= require(`${__dirname}\\..\\Model\\usersModel`);
const util= require("util");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");

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
        if(!email || !password) //if no password OR no email
        {
            throw new Error("No password or email provided");
        }
        const loginUser= await usersModel.findOne({email: email});
        if(!loginUser)
        {
            throw new Error("User is not registered in DB");
        }
        if(!await bcrypt.compare(password, loginUser.password))
        {
            throw new Error("Wrong password");
        }
        const token= jwt.sign({id:loginUser.id},"secretjwtwebtokenforauthentication", {expiresIn: "5m"});
        response.cookie("jwt", token);  //Set cookie used for authorization
        response.status(200).json({
            status: "Successful",
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
            //catch rejected promise and throw to try/catch block
            throw new Error("You are not logged in");
        });
        //else if no error verifying grant access to API
        next();     //call next middle-ware
    } catch(error) {
        next(error);
    } 
};