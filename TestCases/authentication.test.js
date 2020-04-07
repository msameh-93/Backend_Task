const supertest= require("supertest");
const app= require(`${__dirname}\\..\\app`);
const usersModel= require(`${__dirname}\\..\\Model\\usersModel`);
const bscrypt= require(`bcryptjs`);

const testUser= {
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
test("Fail to sign up if no email or password provided", (done) => {
    done();
});
test("Sign in", (done) => {
    done();
});
test("Fail to sign in if JWT token expires", (done) => {
    done();
});