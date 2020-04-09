//Has access to socket.io library as its included in front-end page
const socket= io();           //Connect to web socket server

var movies = document.getElementById("movies");
var reviews= document.getElementById("reviews");

socket.on("movie", (message) => {
    //message is an object sent from movies controller
    let htmlResponse= `<li>`;
    htmlResponse += `<b>Name</b>: ${message.name}<br>`;
    htmlResponse += `<b>Genre</b>: ${message.genre}<br>`;
    htmlResponse += `<b>Year</b>: ${message.year}<br>`;
    htmlResponse += `<b>Actors</b>: ${message.actors}<br>`;
    htmlResponse += `</li>`;
    movies.innerHTML += htmlResponse;
});

socket.on("review", (message, movieName) => {
    //message is an object sent from reviews controller
    let htmlResponse= `<li>`;
    htmlResponse += `<b>Review Title</b>: ${message.title}<br>`;
    htmlResponse += `<b>Movie</b>: ${movieName}<br>`;
    htmlResponse += `<b>Rating</b>: ${message.rate}<br>`;
    htmlResponse += `<b>Description</b>: ${message.description}<br>`;
    htmlResponse += `<b></li>`;
    reviews.innerHTML += htmlResponse;
});

