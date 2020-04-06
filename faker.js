const faker= require("faker");

const newObj= {
    name: faker.lorem.word(),
    genre: "Action",
    year: faker.date.past(),
    actors: [faker.name.firstName(), faker.name.firstName()],
    reviews: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()]
}

console.log(newObj);