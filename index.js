const express = require("express");
const app     = express();
const path    = require("path");

const ip = (process.argv[2]) ? process.argv[2] : "localhost";
const portNum = (process.argv[3]) ? process.argv[3] : "8080";

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

image_queue = []

//
// API ENDPOINTS
//
app.get('/button_pressed', (req, res) => {
    console.log(req.query)
    image_queue.push(req.query.image)
    res.send(true)
});

app.get('/poll_for_reactions', (req, res) => {
    res.send(image_queue)
});

setInterval(function () {
    image_queue = []
}, 1000);

//
// STATIC FILES
//
app.get("/favicon.ico", (req, res) => {
    res.sendFile(path.join(__dirname + '/static/assets/favicon.ico'));
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});
app.get("/assets/:filename", (req, res) => {
    res.sendFile(path.join(__dirname + '/static/assets/' + req.params.filename));
});
app.get("/style/:filename", (req, res) => {
    res.sendFile(path.join(__dirname + '/static/style/' + req.params.filename));
});
app.get("/script/:filename", (req, res) => {
    res.sendFile(path.join(__dirname + '/static/script/' + req.params.filename));
});


app.get('/:endpoint', (req,res) => {
    console.log("404 Endpoint \"/" + req.params.endpoint + "\" not found.");
    res.sendFile(path.join(__dirname + '/static/404.html'))
});

// Replace with environment variable
app.listen(portNum);
console.log(`Hosted at: http://${ip}:${portNum}/`);
