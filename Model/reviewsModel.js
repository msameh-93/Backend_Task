const mongoose= require("mongoose");

const reviewsSchema= new mongoose.Schema({
    __v: { 
        type: Number, 
        select: false
    },
    movieId: {
        type: mongoose.Schema.ObjectId,
        ref: "Movies"
    },
    rate: Number,
    description: String,
    title: String
});
/*Populate the movie field by its ID - for performance, its better to virtually populate fields and persist only IDs
//pre is a mongoose query middle ware
reviewsSchema.pre(/^find/, function(next) { //populate field before functions that start with "find in its name", eg: findOne or findById
    this.populate({                         //this refers to current mongoose query
        path: "movieId",
        ref: "Movies",
        select: "_id name"
    });
    next();
});
*/
const reviewsModel= mongoose.model("Reviews", reviewsSchema);

module.exports= reviewsModel;