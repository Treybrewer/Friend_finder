var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());















app.listen(PORT, function () {
    
    console.log("Server listening on: http://localhost:" + PORT);
});