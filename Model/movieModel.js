const mongoose= require("mongoose");

const movieSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Movie must have a name"]
    },
    genre: {
        type: String,
        enum: ["Action", "Comedy", "Romance"]
    },
    year: Date,
    actors: [String],
    reviews: [String]
});

const movieModel= mongoose.model("Movies", movieSchema);

module.exports= movieModel;