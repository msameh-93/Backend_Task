const supertest= require("supertest");
const app= require(`${__dirname}\\..\\app`);
const reviewsModel= require(`${__dirname}\\..\\Model\\reviewsModel`);
const jwt= require("jsonwebtoken");
const mongoose= require("mongoose");
const { signInUser, testReview, clearDB }= require(`${__dirname}\\data`);

afterAll(clearDB);  //to reset dummy data entered by jest if it was not deleted by "delete" test case

test("Create to Create a review only if signed in", async () => {
    const token= await jwt.sign({id:signInUser.id},"secretjwtwebtokenforauthentication", {expiresIn:"5m"});
    await supertest(app)
        .post("/api/reviews")
        .set("Cookie", `jwt=${token}`)
        .send(testReview)
        .expect(201);
});
test("Fail to post review if not signed in", async () => {
    await supertest(app)
        .post("/api/reviews")
        .set("Cookie", `jwt= `)
        .send({ })
        .expect(404);
});
test("Get All Reviews - Signed in or not", async () => {
    const response= await supertest(app)    //variable stores response body for logging
        .get("/api/reviews")
        .set("Cookie", `jwt= `)
        .send()
        .expect(200);
    expect(response).not.toBeNull();    //make sure DB is not empty
    expect(response.body.data[response.body.data.length-1].title).toBe(testReview.title); 
    //ensure data consistency
});
test("Update a review only if signed in", async () => {
    const token= await jwt.sign({id:signInUser.id},"secretjwtwebtokenforauthentication", {expiresIn:"5m"});
    const review= await reviewsModel.findOne(testReview);
    if(!review)
    {
        throw new Error("No ID for this document - test case message");
    }
    await supertest(app)
        .patch(`/api/reviews/${review._id}`)
        .set("Cookie", `jwt=${token}`)
        .send({ })
        .expect(201);
});
test("Fail to Update a review if ID not found", async () => {
    const token= await jwt.sign({id:signInUser.id},"secretjwtwebtokenforauthentication", {expiresIn:"5m"});
    await supertest(app)
        .patch(`/api/reviews/${new mongoose.Types.ObjectId}`)
        .set("Cookie", `jwt=${token}`)
        .send({})
        .expect(404);
});
test("Delete a review only if signed in", async () => {
    const token= await jwt.sign({id:signInUser.id},"secretjwtwebtokenforauthentication", {expiresIn:"5m"});
    const review= await reviewsModel.findOne(testReview);
    if(!review)
    {
        throw new Error("No ID for this document - test case message");
    }
    await supertest(app)
        .delete(`/api/reviews/${review._id}`)
        .set("Cookie", `jwt=${token}`)
        .send()
        .expect(200);
});
test("Fail to Delete a review if ID not found", async () => {
    const token= await jwt.sign({id:signInUser.id},"secretjwtwebtokenforauthentication", {expiresIn:"5m"});
    const review= await reviewsModel.findOne(testReview);
    await supertest(app)
        .delete(`/api/reviews/${new mongoose.Types.ObjectId}`)
        .set("Cookie", `jwt=${token}`)
        .send()
        .expect(404);
});