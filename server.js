// import port settings
const config = require("./data/config.local.json");

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
const { application } = require("express");
app.use(cors());

// Initialize the main project folder
app.use(express.static("client"));

// Spin up the server
const server = app.listen(config.port, () => {
  console.log(`App is running on localhost:${config.port}`);
});

// Return all data in the object for get route
app.get("/all", (request, response) => {
  response.send(projectData);
});

// Add data to the project object for post route
app.post("/add", () => {
  data.push(projectData);
});
