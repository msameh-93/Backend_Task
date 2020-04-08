const supertest= require("supertest");
const app= require(`${__dirname}\\..\\app`);
const usersModel= require(`${__dirname}\\..\\Model\\usersModel`);
const jwt= require("jsonwebtoken");
const { signUpUser, signInUser, setupDB, clearDB }= require(`${__dirname}\\data`);
const util= require("util");


beforeAll(setupDB);
afterAll(clearDB);

test("Sign up", async () => {
    await supertest(app)
        .post("/api/users/signup")
        .send(signUpUser)
        .expect(201);
    const signedUpUser= await usersModel.find({email:signUpUser.email});
    expect(signedUpUser.password).not.toBe("test1234"); //ensure password is encrypted in DB
});
test("Sign in", async () => {
    await supertest(app)
        .post("/api/users/signin")
        .send(signInUser)
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
//Poor attmempt to test JWT expiry :)
test("Fail to authenticate if JWT token expires", (done) => {
    const token= jwt.sign({id:signInUser.id},"secretjwtwebtokenforauthentication", {expiresIn:"500"});
    const ver= () => {jwt.verify(token, "secretjwtwebtokenforauthentication", function(error, decoded) {
        if(error)   //error means jwt expired
        {
            return done();
        }
        fail("JWT expired");
    })};
    setTimeout(ver, 1000);
});
