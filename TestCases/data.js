const mongoose= require("mongoose");
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
const setupDB= async () => {
    //to use for logging in
    await usersModel.create(signInUser);  

};
const clearDB= async () => {
    await reviewsModel.deleteOne(testReview);
    await usersModel.deleteOne({email: signUpUser.email});
    await usersModel.deleteOne({email: signInUser.email});
};
module.exports= {
    signUpUser,
    signInUser,
    testReview,
    setupDB,
    clearDB
}