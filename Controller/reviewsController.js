const reviewsModel= require(`${__dirname}\\..\\Model\\reviewsModel`);
const movieModel= require(`${__dirname}\\..\\Model\\movieModel`);
const customError= require(`${__dirname}\\customError`);

exports.getReviews= async (request, response, next) => {
    try
    {
        const allDocuments= await reviewsModel.find();
        if(!allDocuments)   
        {
            throw new customError("No Documents Found", 404);   //404 Not Found
        }
        response.status(200).json({                             //200 OK
            status: "Successful",
            resultCount: allDocuments.length,
            data: allDocuments
        });
    } catch(error)
    {
        next(new customError(error, 404));
    }
};
exports.createReviews= async (request, response, next) => {
    try{
        const newDoc= await reviewsModel.create(request.body);
        const movie= await movieModel.findById(newDoc.movieId) || "No movie related to this review";
        //ommit event to socket server with created object
        response.io.emit("review", newDoc, movie.name); 
        response.status(201).json({                             //201 Created
            status: "Successful",
            data: newDoc
        });
    } catch(error)
    {
        next(new customError(error, 404));
    }
};
exports.updateReviews= async (request, response, next) => {
    try{
        const updatedDoc= await reviewsModel.findByIdAndUpdate(request.params.id, request.body, {
            new: true       //"new" Tells mongoose to create the updated document as a new instance
        });
        if(!updatedDoc)
        {
            throw new customError("No Documents Found", 404);   //404 Not Found
        }
        response.status(201).json({                             //201 Created
            status: "Successful",
            data: updatedDoc
        })
    } catch(error)
    {
        next(new customError(error, 404));
    }
};
exports.deleteReviews= async (request, response, next) => {
    try{
        const deletedDoc= await reviewsModel.findByIdAndDelete(request.params.id);
        if(!deletedDoc)                 //Save document in variable to check if ID is null
        {
            throw new customError("No Documents Found", 404);       //404 Not Found
        }
        response.status(204).json({     //204 No Content to preview
            status: "Successful"
        })
    } catch(error)
    {
        next(new customError(error, 404));
    }
};