const mongoose= require("mongoose");
const movieModel= require(`${__dirname}\\..\\Model\\movieModel`);
const usersModel= require(`${__dirname}\\..\\Model\\usersModel`);
const reviewsModel= require(`${__dirname}\\..\\Model\\reviewsModel`);
const faker= require("faker");

const signInUser= {
    _id: new mongoose.Types.ObjectId,   //test authorization through jwt token
    email: "xyz@lol.com", 
    password: "test1234"
}
const signUpUser= {
    _id: new mongoose.Types.ObjectId,   //test authorization through jwt token
    email: "abcdef@lol.com", 
    password: "test1234"
}
const testReview= {
    movieId: new mongoose.Types.ObjectId(),
    rate: 4,
    description: faker.lorem.sentence(),
    title: faker.lorem.word()
}
const testMovie= {
    name: faker.lorem.word(),
    genre: faker.lorem.word(),
    year: Date.toString(faker.date.past()),
    actors: [faker.name.firstName(), faker.name.firstName()],
    reviews: [new mongoose.Types.ObjectId(),new mongoose.Types.ObjectId(),new mongoose.Types.ObjectId()]
}
const setupDB= async () => {
    //to use for logging in
    await usersModel.create(signInUser);  
};
const clearDB= async () => {
    await reviewsModel.deleteOne(testReview);
    await movieModel.deleteOne(testMovie);
    await usersModel.deleteOne({email: signUpUser.email});
    await usersModel.deleteOne({email: signInUser.email});
    await movieModel.deleteMany({name: {$regex: /\b(A|B|C|D)\b/g}});
};
const createSortFitlerData= async () => {
    await movieModel.create({name: "D",year: "2010"});
    await movieModel.create({name: "A",year: "2020"});
    await movieModel.create({name: "C",year: "2018"});
    await movieModel.create({name: "B",year: "2015"});
}
module.exports= {
    signUpUser,
    signInUser,
    testReview,
    testMovie,
    setupDB,
    clearDB,
    createSortFitlerData
}