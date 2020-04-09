const path= require("path");
const movieModel= require(path.join(__dirname+`/../Model/movieModel`)); //Model inported from model.js
const customError= require(path.join(__dirname+`/customError`));

exports.readAllMovies= async (request, response, next) => {
    try
    {
        let queriedDocuments= movieModel.find().populate("Allreviews");    //virtual populate
        if(request.query.filterBy)
        {
            //Parse incoming URL query to JSON object
            //user can filter field by operators (gt),(gte),(lt),(lte),(eq)
            //eg: asd(gt)asd
            let filterQuery= request.query.filterBy;           //{name=asc,genre=asc}
            //Chain of methods to convert from regular query(abc=123) to json object({"abc":"123"})
            filterQuery= filterQuery
                .replace(/\b(\(gte\))|(\(gt\)|(\(lte\))|(\(lt\))|(\(eq\)))\b/g, matched =>`$${matched}":"`)  
                .replace(/\(/g, '')
                .replace(/\)/g, '')
                .replace(/\$/g, '":{$')   
                .replace(/\)/g, ')":"')   
                .replace(/{/g, '{"')     
                .replace(/}/g, '"}}');      
            queriedDocuments= queriedDocuments.find(JSON.parse(filterQuery));
        }
        if(request.query.sortBy)//if includes= method chain appropriate mongoose filter method
        {
            //Parse incoming URL query to JSON object
            //user can sort by 1 or asc for ascending
            //user can sort by -1 or desc for descending    
            //Chain of methods to convert from regular query(abc=123) to json object({"abc":"123"})
            let sortQuery= request.query.sortBy;           //{name=asc,genre=asc}
            sortQuery= sortQuery.replace(/=/g, '":"')      //{name:asc,genre:asc}
                                .replace(/,/g, '","')      //{name:asc","genre:asc}
                                .replace(/{/g, '{"')       //{"name:asc","genre:asc}
                                .replace(/}/g, '"}');      //{"name:asc","genre:asc"} --> parsed as json
            queriedDocuments= queriedDocuments.sort(JSON.parse(sortQuery));
        }
        const allDocuments= await queriedDocuments; //Await documents after filtering process
        if(!allDocuments)   //Send error message if no documents TODO: Custom error message
        {
            throw new customError("No Movies were found", 404);  //404 Not Found  
        }
        response.status(200).json({                     ////200 OK
            status: "Successful",       
            resultCount: allDocuments.length,
            data: allDocuments
        })
    }  catch(error) {
        next(new customError(error, 404));        
        //express feauture: sending argument in next() triggers global error handler
    }
};
exports.readMovie= async (request, response, next) => {
    try
    {
        const document= await movieModel.findById(request.params.id).populate("Allreviews");
        if(!document)
        {
            throw new customError("No such movie exists", 404); //404 Not Found
        }
        response.status(200).json({         //200 OK
            status: "Successful",
            data: document
        });
    } catch(error) {
        next(new customError(error, 404));
    }
};
exports.createOneMovie= async (request, response, next) => {
    try{
        const newDoc= await movieModel.create(request.body);
        response.io.emit("movie", newDoc);      //ommit event to socket server with created object
        response.status(201).json({     //201 sccessfully created/updated
            status: "Successful",
            data: newDoc
        });
    } catch(error) {
        next(new customError(error, 404));
    }
};
exports.updateMovie= async (request, response, next) => {
    try
    {
        const updatedDoc= await movieModel.findByIdAndUpdate(request.params.id, request.body, {
            new: true       //"new" Tells mongoose to create the updated document as a new instance
        });
        if(!updatedDoc)
        {
            throw new customError("No such ovie exists", 404);      //404 Not Found
        }
        response.status(201).json({                                 //201 Created
            status: "Successful",
            data: updatedDoc
        })
    } catch(error) {
        next(new customError(error, 404));
    }
};
exports.deleteMovie= async (request, response, next) => {
    try
    {
        const deletedDoc= await movieModel.findByIdAndDelete(request.params.id);
        if(!deletedDoc)                 //save document in variable to check if ID is null
        {
            throw new customError("No document with this ID found", 404);
        }
        response.status(200).json({     //204 No Content to preview
            status: "Successful"
        })
    } catch(error) {
        next(new customError(error, 404));
    }
};