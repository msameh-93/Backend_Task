const path= require("path");
const util= require("util");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const usersModel= require(path.join(__dirname+ `/../Model/usersModel`));
const customError= require(path.join(__dirname+ `/customError`));

exports.signup= async (request, response, next) => {
    try
    {
        await usersModel.create(request.body);
        response.status(201).json({         //201 Created
            status: "Successful",
            message: "User created successfully, you can now log in to add/update data"
        });
    } catch(error) {
        next(new customError(error, 404));
    }
    
};
exports.signin= async (request, response, next) => {
    try
    {
        const {email, password}= request.body;
        if(!email || !password) //if no password OR no email
        {
            throw new customError("No password or email provided", 404);
        }
        const loginUser= await usersModel.findOne({email: email});
        if(!loginUser)
        {
            throw new customError("User is not registered in DB", 404);
        }
        if(!await bcrypt.compare(password, loginUser.password))
        {
            throw new customError("Wrong password", 401);
        }
        const token= jwt.sign({id:loginUser.id},"secretjwtwebtokenforauthentication", {expiresIn: "5m"});
        response.cookie("jwt", token);  //Set cookie used for authorization
        response.status(200).json({     //200 OK
            status: "Successful",
            message: "Logged in successfuly. You can now add/update data"
        });
    } catch(error) {
        next(new customError(error, 401));
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
            throw new customError("You are not logged in", 401);
        });
        //else if no error verifying grant access to API
        next();     //call next middle-ware
    } catch(error) {
        next(new customError(error, 401));
    } 
};