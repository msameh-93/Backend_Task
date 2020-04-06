movieModel= require(`${__dirname}\\..\\Model\\movieModel`); //Model exported from model.js


exports.readAllMovies= async (request, response, next) => {
    let queriedDocuments= movieModel.find().populate("Allreviews");    //find() mongoose method
    /*******url parser*******/
    
    /**************************/
    if(request.query.filterBy)
    {
        //Parse incoming URL query to JSON object
        //user can filter field by operators (gt),(gte),(lt),(lte),(eq)
        //asd(gt)asd
        let filterQuery= request.query.filterBy;           //{name=asc,genre=asc}
        console.log(filterQuery);
        filterQuery= filterQuery
            .replace(/\b(\(gte\))|(\(gt\)|(\(lte\))|(\(lt\))|(\(eq\)))\b/g, matched =>`$${matched}":"`)  
            .replace(/\(/g, '')
            .replace(/\)/g, '')
            .replace(/\$/g, '":{$')   //{name:asc","genre:asc}
            .replace(/\)/g, ')":"')   //{"name:asc","genre:asc}
            .replace(/{/g, '{"')     //{"name:asc","genre:asc"} --> this parsed as json
            .replace(/}/g, '"}}');      //{"name:asc","genre:asc"} --> this parsed as json
        queriedDocuments= queriedDocuments.find(JSON.parse(filterQuery));
    }
    if(request.query.sortBy)//if includes= method chain appropriate mongoose filter method
    {
        //Parse incoming URL query to JSON object
        //user can sort by 1 or asc for ascending
        //user can sort by -1 or desc for descending    (include in documentation)
        let sortQuery= request.query.sortBy;           //{name=asc,genre=asc}
        sortQuery= sortQuery.replace(/=/g, '":"')      //{name:asc,genre:asc}
                            .replace(/,/g, '","')      //{name:asc","genre:asc}
                            .replace(/{/g, '{"')       //{"name:asc","genre:asc}
                            .replace(/}/g, '"}');      //{"name:asc","genre:asc"} --> this parsed as json
        queriedDocuments= queriedDocuments.sort(JSON.parse(sortQuery));
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
    const document= await movieModel.findById(request.params.id).populate("Allreviews");
                                                            //Virtually populate reviews for get One API
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
    response.status(200).json({     //204 sccessfully deleted
        status: "Successful"
    })
};