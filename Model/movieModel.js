const mongoose= require("mongoose");

const movieSchema= new mongoose.Schema({
    __v: {  
        type: Number, 
        select: false   //removes _v from DB view (For presentation purpose only)
    },
    name: {
        type: String,
        required: [true, "Movie must have a name"],
        unique: true                //Movies are identified by thier names
    },
    genre: {
        type: String
        //enum: ["Action", "Comedy", "Romance"]     //Future Feauture
    },
    year: String,
    actors: [String],
    reviews: {
        type: [{    //type is ID reference to reviews (movie is Parent: One - reviews are Children: Many)
            type: mongoose.Schema.ObjectId,
            ref: "Reviews"
            }
        ],
        select: false   //Reviews is populated through virtual property to increase query performance
    }
},{
    toJSON: {virtuals: true},   //Allows the population of virtual fields
    toObject: {virtuals: true}
});
 //Virtual populate a field for All reviews to improve query performance
movieSchema.virtual("Allreviews", {
    ref:"Reviews",
    foreignField: "movieId",
    localField: "_id",
    select: "rate description"
});
const movieModel= mongoose.model("Movies", movieSchema);

module.exports= movieModel;