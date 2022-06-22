const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const db = require("./database/mssql");

const { indexRoute, staticRoute } = require("./routes/index");

/**
 * Body Parser Middleware
 */
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Cors Origin Middleware
 * @req - request
 * @res - response
 * @next -  next
 */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

/**
 * Route Pointers
 */
app.use("/v1", indexRoute);
app.use("/v1/static", staticRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
