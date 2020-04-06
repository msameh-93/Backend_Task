movieModel= require(`${__dirname}\\..\\Model\\movieModel`);


exports.readAllMovies= async (request, response, next) => {
    const allDocuments= await movieModel.find();
    if(!allDocuments)
    {
        return response.status(200).json({
            status: "No Documents Found"
        })
    }
    console.log(allDocuments);
    response.status(200).json({
        status: "Successful",
        data: allDocuments
    })
};

exports.createOneMovie= async (request, response, next) => {

};
exports.readMovie= async (request, response, next) => {

};
exports.updateMovie= async (request, response, next) => {

};
exports.deleteMovie= async (request, response, next) => {

};