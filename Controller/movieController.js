movieModel= require(`${__dirname}\\..\\Model\\movieModel`); //Model exported from model.js


exports.readAllMovies= async (request, response, next) => {
    let queriedDocuments= movieModel.find();    //find() mongoose method

    if(request.query.filterBy)
    {
        queriedDocuments= queriedDocuments.find({name: "a"});
    }
    if(request.query.sortBy)//if includes= method chain appropriate mongoose filter method
    {
        queriedDocuments= queriedDocuments.sort({name: 1});
    }

    const allDocuments= await queriedDocuments; //Await documents after filtering process
    if(!allDocuments)   //Send error message if no documents TODO: Custom error message
    {
        return response.status(404).json({  //404 not found http status code
            status: "No Documents Found"
        })
    }
    response.status(200).json({     //200 successful http status code
        status: "Successful",       
        resultCount: allDocuments.length,
        data: allDocuments
    })
};
exports.readMovie= async (request, response, next) => {
    const document= await movieModel.findById(request.params.id);
    if(!document)
    {
        return response.status(404).json({      //404 not found http status code
            status: "No document with this ID is found"
        })
    }
    response.status(200).json({
        status: "Successful",
        data: document
    });
};
exports.createOneMovie= async (request, response, next) => {
    const newDoc= await movieModel.create(request.body);
    
    response.status(201).json({     //201 sccessfully created/updated
        status: "Successful",
        data: newDoc
    });
};
exports.updateMovie= async (request, response, next) => {
    const updatedDoc= await movieModel.findByIdAndUpdate(request.params.id, request.body, {
        new: true       //"new" Tells mongoose to create the updated document as a new instance
    });

    if(!updatedDoc)
    {
        return response.status(404).json({      //404 not found http status code
            status: "No document with this ID is found"
        })
    }
    response.status(201).json({     //201 sccessfully created/updated
        status: "Successful",
        data: updatedDoc
    })
};
exports.deleteMovie= async (request, response, next) => {
    const deletedDoc= await movieModel.findByIdAndDelete(request.params.id);

    if(!deletedDoc)                 //save document in variable to check if ID is null
    {
        return response.status(404).json({      //404 not found http status code
            status: "No document with this ID is found"
        })
    }
    response.status(204).json({     //204 sccessfully deleted
        status: "Successful"
    })
};