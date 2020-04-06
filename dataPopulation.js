const mongoose= require("mongoose");
const faker= require("faker");

const movieModel= require(`${__dirname}\\Model\\movieModel`);
const reviewsModel= require(`${__dirname}\\Model\\reviewsModel`);

mongoose.connect("mongodb://localhost:27017/movies", (err) => {if(err) console.log(err)})
        .then((connection)=>{console.log("connection to mongoDB server is successful")});

/* for(var i= 0; i<10; i++)
{
    const newDoc= new movieModel({
        name: faker.lorem.word(),
        genre: "Action",
        year: faker.date.past(),
        actors: [faker.name.firstName(), faker.name.firstName()],
        reviews: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()]
    });

    newDoc.save();
} */
//5e8aedc201eada23441762dd
for(var i= 0; i<5; i++)
{
    const newDoc= new reviewsModel({
        movieId: "5e8aedc201eada23441762dd",
        rate: 4,
        description: faker.lorem.sentence(),
        title: faker.lorem.word()
    });

    newDoc.save();
}