require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var inquirer = require("inquirer");
var spotify = new Spotify(keys.spotify);


var command = process.argv[2];
var userInput = process.argv[3];