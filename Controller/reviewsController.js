const reviewsModel= require(`${__dirname}\\..\\Model\\reviewsModel`);

exports.getReviews= async (request, response, next) => {
    try
    {
        const allDocuments= await reviewsModel.find();

        if(!allDocuments)   
        {
            return response.status(404).json({  
                status: "No Documents Found"
            });
        }
        response.status(200).json({
            status: "Successful",
            resultCount: allDocuments.length,
            data: allDocuments
        });
    } catch(error)
    {
        next(error);
    }
};
exports.createReviews= async (request, response, next) => {
    try{
        const newDoc= await reviewsModel.create(request.body);
        response.status(201).json({     //201 sccessfully created/updated
            status: "Successful",
            data: newDoc
        });
    } catch(error)
    {
        next(error);
    }
};
exports.updateReviews= async (request, response, next) => {
    try{
        const updatedDoc= await reviewsModel.findByIdAndUpdate(request.params.id, request.body, {
            new: true       //"new" Tells mongoose to create the updated document as a new instance
        });
        if(!updatedDoc)
        {
            return response.status(404).json({      //404 not found http status code
                status: "No document with this ID is found"
            });
        }
        response.status(201).json({     //201 sccessfully created/updated
            status: "Successful",
            data: updatedDoc
        })
    } catch(error)
    {
        next(error);
    }
};
exports.deleteReviews= async (request, response, next) => {
    try{
        const deletedDoc= await reviewsModel.findByIdAndDelete(request.params.id);

        if(!deletedDoc)                 //save document in variable to check if ID is null
        {
            return response.status(404).json({      //404 not found http status code
                status: "No document with this ID is found"
            });
        }
        response.status(200).json({     //200 sccessfully deleted
            status: "Successful"
        })
    } catch(error)
    {
        next(error);
    }
};