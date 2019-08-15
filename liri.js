require("dotenv").config();
// var fs = require("fs");
// var keys = require("./keys.js");
var axios = require("axios");
// var inquirer = require("inquirer");
// var spotify = new Spotify(keys.spotify);


var command = process.argv[2];
var userInput = process.argv[3];

switch (command) {
    case "concert-this":
        bandInfo();
        break;
    case "spotify-this-song":
        spotifyInfo();
        break;
    case "movie-this":
        movieInfo();
        break;
    case "do-what-it-says":
        directions();
        default:
            break;
}



function bandInfo() {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (let i = 0; i < response.data.length; i++) {
                console.log(response);
                console.log("Artist: " + (response.data[i].lineup));
                console.log("Venue Name: " + (response.data[i].venue.name));
                console.log("Venue Location: " + (response.data[i].venue.city) + ", " + (response.data[i].venue.region) + ", " + (response.data[i].venue.country), "\n");
            }
        });
}


function spotifyInfo() {
   if (userInput === undefined) {
       userInput = "The SignS"
   } 

   // search to find an artist, album, or track.
   spotify.search({ type: 'track', query: userInput, limit: 4 }),
}





