//Use this class to send message along with status code to global error handler
exports= class CustomError extends Error {
    constructor(message, statusCode)
    {
        super(message);     //Send message sent through new Instance of Custom error to error
        this.statusCode= statusCode;

        Error.captureStackTrace(this, this.constructor);    //Add Custom error to stack error message
    }
};
