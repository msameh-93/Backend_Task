const supertest= require("supertest");
const app= require(`${__dirname}\\..\\app`);
const usersModel= require(`${__dirname}\\..\\Model\\usersModel`);
const jwt= require("jsonwebtoken");
const mongoose= require("mongoose");

const testUser= {
    _id: new mongoose.Types.ObjectId,   //test authorization through jwt token
    email: "xyz@lol.com", 
    password: "test1234"
}
//runs before each test case
beforeEach(async () => {     //(Built-in jest/express) //To ensure consistent data accross all test cases
    await usersModel.deleteOne({email: "abcde@lol.com"});
});
beforeAll(async () => {
    //to use for logging in
    await usersModel.create({email: testUser.email, password: testUser.password});  
});
afterAll(async () => {
    await usersModel.deleteOne({email: testUser.email});
})
test("Sign up", async () => {
    await supertest(app)
        .post("/api/users/signup")
        .send({
            email: "abcde@lol.com",
            password: "test1234"
        })
        .expect(201);

});
test("Sign in", async () => {
    await supertest(app)
        .post("/api/users/signin")
        .send({
            email: testUser.email,
            password: testUser.password
        })
        .expect(200);
});
test("Fail to sign up if user does not exist in data base", async () => {
    await supertest(app)
    .post("/api/users/signin")
    .send({
        email: "dummyUser@lol.com",
        password: "dummyPassword"
    })
    .expect(404);
});
test("Fail to sign up if no email or password provided", async () => {
    await supertest(app)
    .post("/api/users/signin")
    .send({ })
    .expect(404);
});
test("Fail to sign in if JWT token expires", (done) => {
    done();
});