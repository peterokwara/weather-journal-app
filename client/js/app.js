// The api key for openWeather
const apiKey = "";

// The base url for openweathermap
const baseUrl = "http://api.openweathermap.org/data/2.5/weather";

// The website for openWeather
const apiUrl = `http://localhost:3000`;

// Create default options for making a request
let options = {
  method: "",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  body: "",
};

// Check to see if the html website has finished loading before running any function
document.addEventListener("DOMContentLoaded", () => {
  addGenerateEventListener();
});

/**
 * Add an onclick event listener to the generate button
 */
const addGenerateEventListener = () => {
  const generateButton = document.getElementById("generate");
  generateButton.addEventListener("click", getWeatherData);
};

/**
 * Function to get weather data from openweatherapp
 */
const getWeatherData = async () => {
  // Temporary value to store temperature value
  let temperature;

  // Get the zip code value from the text field
  const zipCode = document.getElementById("zip").value;

  if (!zipCode) {
    alert("Zip code must be filled out");
    throw new Error("Zip value is missing. Please enter a zip value");
  }

  // Get the feelings value from the text field
  const userResponse = document.getElementById("feelings").value;

  // Build the URL to fetch data from openweather
  const url = `${baseUrl}?zip=${zipCode},us&units=metric&appid=${apiKey}`;

  // Fetch the weather data
  const weatherData = await postData(url);

  if (weatherData) {
    temperature = weatherData["main"].temp;
  }

  // Store current date
  const date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

  // Post weather data to the backend api
  postWeatherData(temperature, date, userResponse);

  // Update the UI
  await updateUI();
};

/**
 * Function to post weather data to the backend api
 * @param temperature The temperature of the zip code
 * @param date The current date
 * @param userResponse The user response on how he is feeling
 */
const postWeatherData = async (temperature, date, userResponse) => {
  // The temperature, date and userResponse to post to the backend api
  const data = {
    temperature: temperature,
    date: date,
    userResponse: userResponse,
  };

  // Build the url to post the data to
  const url = `${apiUrl}/add`;

  // Describe how we send the data
  options["method"] = "POST";
  options["body"] = JSON.stringify(data);

  // Post data to the backend api
  await postData(url, options);
};

/**
 * Function to update the user interface
 */
const updateUI = async () => {
  const dateContent = document.getElementById("date");
  const tempContent = document.getElementById("temp");
  const feelingContent = document.getElementById("content");

  try {
    const data = await getProjectData();

    if (data) {
      dateContent.innerHTML = `Today\'s date: ${data.date}`;
      tempContent.innerHTML = `The temperature is ${data.temperature}°C`;
      feelingContent.innerHTML = `I\'m feeling ${data.userResponse}`;
    }
  } catch (error) {
    console.log("The UI could not be updated", error);
  }
};

/**
 * Function to do fetch project data from the backend api
 * @returns Project data in the backend api
 */
const getProjectData = async () => {
  // Build the url to get the data
  const url = `${apiUrl}/all`;

  // Describe how we send the data
  options["method"] = "GET";
  delete options["body"];

  // Get data from the backend api
  const allData = await postData(url, options);

  // return the data
  return allData;
};

/**
 * Function to do fetch request
 * @param url the url to make requests to
 * @param options this may include whether it's get or post, with data or no data
 * @returns the response from openweatherapi or from the backend
 */
const postData = async (url = "", options = {}) => {
  const response = await fetch(url, options);
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("Something went wrong!", error);
  }
};
