// import port settings
const config = require("./data/config.local.json");

// Setup empty JS object to act as endpoint for all routes
const projectData = {
  temperature: "",
  date: "",
  userResponse: "",
};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
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
app.post("/add", (request, response) => {
  projectData["temperature"] = request.body.temperature;
  projectData["date"] = request.body.date;
  projectData["userResponse"] = request.body.userResponse;
});
