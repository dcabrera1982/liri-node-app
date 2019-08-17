require("dotenv").config();
// var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
// var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


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
   if (userInput === " ") {
       userInput = "The Sign"
   } 

   // search to find an artist, album, or track.
   spotify.search({ type: 'track', query: userInput, limit: 4 })
   .then(function (response) {

    var songInfo = response.tracks.items;

    for (i = 0; i < songInfo.length; i++) {
        console.log("Artist Name: " + (songInfo[i].artists[0].name));
        console.log("Song Name: " + (songInfo[i].name));
        console.log("Song Preview: " + (songInfo[i].preview_url));
        console.log("Album Name: " + (songInfo[i].album.name));
        console.log("\n----------------------------\n");
    }

   })
};





