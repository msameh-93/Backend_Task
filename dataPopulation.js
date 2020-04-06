const mongoose= require("mongoose");
const faker= require("faker");

const movieModel= require(`${__dirname}\\Model\\movieModel`);

mongoose.connect("mongodb://localhost:27017/movies", (err) => {if(err) console.log(err)})
        .then((connection)=>{console.log("connection to mongoDB server is successful")});

for(var i= 0; i<10; i++)
{
    const newDoc= new movieModel({
        name: faker.lorem.word(),
        genre: "Action",
        year: faker.date.past(),
        actors: [faker.name.firstName(), faker.name.firstName()],
        reviews: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()]
    });

    newDoc.save();
}

