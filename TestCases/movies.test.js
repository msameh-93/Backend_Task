const supertest= require("supertest");
const app= require(`${__dirname}\\..\\app`);
const moviesModel= require(`${__dirname}\\..\\Model\\movieModel`);
const jwt= require("jsonwebtoken");
const mongoose= require("mongoose");
const { signInUser, testMovie, clearDB, createSortFitlerData }= require(`${__dirname}\\data`);

beforeAll(createSortFitlerData);    //populate data for sorting/filtering
afterAll(clearDB);  //to reset dummy data entered by jest if it was not deleted by "delete" test case

test("Sort Movies - Signed in or not", async () => {
    const response= await supertest(app)
        .get("/api/movies?sortBy={name=asc}")
        .set("Cookie", "jwt= ")
        .send({ })
        .expect(200);
    const names= [];        //Test that names are sorted
    response.body.data.forEach(el => {
        names.push(el.name);
    });
    expect(names).toEqual(["A", "B", "C", "D"]);
});
test("Filter Movies - Signed in or not", async () => {
    const response= await supertest(app)
        .get("/api/movies?filterBy={year(lte)2015}")
        .set("Cookie", "jwt= ")
        .send({ })
        .expect(200);
    response.body.data.forEach(el => {
        expect(parseInt(el.year)).toBeLessThanOrEqual(2016); 
        //Ensure years of data sent back is less than 2016
    });
});
test("Create a movie only if signed in", async () => {
    const token= jwt.sign({id:signInUser.id},"secretjwtwebtokenforauthentication",{expiresIn:"5m"});
    await supertest(app)
        .post("/api/movies")
        .set("Cookie", `jwt=${token}`)
        .send(testMovie)
        .expect(201);
});
test("Fail to post movie if not signed in", async () => {
    await supertest(app)
        .post("/api/movies")
        .set("Cookie", `jwt= `)
        .send({ })
        .expect(401);
});
test("Get All movie - Signed in or not", async () => {
    const response= await supertest(app)    //variable stores response body for logging
        .get("/api/movies")
        .set("Cookie", `jwt= `)
        .send()
        .expect(200);
    expect(response).not.toBeNull();    //make sure DB is not empty
    expect(response.body.data[response.body.data.length-1].title).toBe(testMovie.title); 
    //ensure data consistency
});
test("Get One movie by id - Signed in or not", async () => {
    const movie= await moviesModel.findOne(testMovie);
    const response= await supertest(app)    //variable stores response body for logging
        .get(`/api/movies/${movie._id}`)
        .set("Cookie", `jwt= `)
        .send()
        .expect(200);
    expect(response).not.toBeNull();    //make sure DB is not empty
    expect(response.body.data.name).toBe(testMovie.name); 
    //ensure data consistency
});
test("Update a movie only if signed in", async () => {
    const token= jwt.sign({id:signInUser.id},"secretjwtwebtokenforauthentication",{expiresIn:"5m"});
    const movie= await moviesModel.findOne(testMovie);
    if(!movie)
    {
        throw new Error("No such movie exists - test case message");
    }
    await supertest(app)
        .patch(`/api/movies/${movie._id}`)
        .set("Cookie", `jwt=${token}`)
        .send({ })
        .expect(201);
});
test("Fail to Update a movie if ID not found", async () => {
    const token=jwt.sign({id:signInUser.id},"secretjwtwebtokenforauthentication",{expiresIn:"5m"});
    await supertest(app)
        .patch(`/api/movies/${new mongoose.Types.ObjectId}`)
        .set("Cookie", `jwt=${token}`)
        .send({})
        .expect(404);
});
test("Delete a movie only if signed in", async () => {
    const token=jwt.sign({id:signInUser.id},"secretjwtwebtokenforauthentication",{expiresIn:"5m"});
    const movie= await moviesModel.findOne(testMovie);
    if(!movie)
    {
        throw new Error("No such movie exists - test case message");
    }
    await supertest(app)
        .delete(`/api/movies/${movie._id}`)
        .set("Cookie", `jwt=${token}`)
        .send()
        .expect(200);
});
test("Fail to delete a movie if ID not found", async () => {
    const token= jwt.sign({id:signInUser.id},"secretjwtwebtokenforauthentication", {expiresIn:"5m"});
    const movie= await moviesModel.findOne(testMovie);
    await supertest(app)
        .delete(`/api/movies/${new mongoose.Types.ObjectId}`)
        .set("Cookie", `jwt=${token}`)
        .send()
        .expect(404);
});