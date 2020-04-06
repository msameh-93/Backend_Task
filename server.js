const app= require(`${__dirname}\\app`);


const server= app.listen(8000, () => {
    console.log("Connection to server is Successful");
});