# Weather Journal App

This project is part of the Udacity Nanodegree Course. It requires one to create an asynchronous web app that uses Web API and user data to dynamically update the UI in a Weather Journal application.

## Getting Started

Ensure you have nodejs installed on your machine.

## Installation

Enter the main directory and run

```console
npm install
```

To install all the dependencies

## Run

Ensure you have a `config.local.json` file populated in the `data/config.local.json` with the following information

```console
{
    "port": "3000"
}
```

The api key for `openweatherapi` also needs to be put in the `client/js/app.js` file here

```js
// The api key for openWeather
const apiKey = "";
```

Once the installation process is complete, to run the project, you can run:

```bash
npm run start
```

## Contributing

To contribute code to this repository please read the [CONTRIBUTING](./CONTRIBUTING.md) guidelines.

## License

[MIT](./LICENSE)
