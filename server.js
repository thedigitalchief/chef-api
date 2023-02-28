require("@babel/register");
const express = require("express");
const app = express();
require("dotenv").config();
const path =require('path')
const Validate = require("express-validation");
PORT = process.env.PORT;
const chalk = require("chalk");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./src/config/mongodb")
const pubRoutes = require("./src/routes/chef.route");
const apiRoutes = require("./src/routes/apiRoutes");
const apiAuth = require("./src/middleware/apiAuth");

app.use(cors());
app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')))

app.use("/pub", pubRoutes);
app.use("/api", apiAuth, apiRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ChefJoy API." });
});

const port = process.env.PORT || 3500
app.listen(port, function() {
    console.log('Successfully started server on http://localhost:' + port + ' !');
})



module.exports = app;
