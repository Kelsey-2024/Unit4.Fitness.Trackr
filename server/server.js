require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const { client } = require("../db/client");
const apiRouter = require("./api");

const PORT = process.env.PORT || 8080;

//connecting server to db
client.connect();

//middleware
app.use(morgan("dev"));

//body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, "..", "./client/dist")));

//token
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});