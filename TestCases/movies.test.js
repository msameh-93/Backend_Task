const supertest= require("supertest");
const app= require(`${__dirname}\\..\\app`);

const moviesModel= require(`${__dirname}\\..\\Model\\movieModel`);

const jwt= require("jsonwebtoken");
const mongoose= require("mongoose");
const faker= require("faker");

const testUser= {
    _id: new mongoose.Types.ObjectId,   //test authorization through jwt token
    email: "xyz@lol.com", 
    password: "test1234"
}

test("Sort and/or Filter Movies - Signed in or not", async () => {
   
});
test("Get All Movies - Signed in or not", async () => {
   
});
test("Get One Movie - Signed in or not", async () => {
   
});
test("Create a movie only if signed in", async () => {
   
});
test("Update a movie only if signed in", async () => {
   
});
test("Delete a movie only if signed in", async () => {
   
});