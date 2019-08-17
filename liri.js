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
   if (userInput === undefined) {
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

function movieInfo() {
    if (userInput === undefined) {
        userInput = 'Mr. Nobody';
        console.log(" If you haven't watched " + userInput +" then you should: http://www.imdb.com/title/tt0485947/\n It's on Netflix!");
    }

    // Run a request with axios to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
// console.log(queryUrl);

axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log(" Movie Title: " + response.data.Title, "\n",
                "Year movie was released: " + response.data.Year, "\n",
                "IMDB Rating: " + response.data.imdbRating, "\n",
                "Country of Movie Production: " + response.data.Country, "\n",
                "Movie Language: " + response.data.Language, "\n",
                "Movie Plot: " + response.data.Plot, "\n",
                "Movie Actors: " + response.data.Actors, "\n",
                "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
  })
  .catch(function(error) {
    if (error.response) {
      
        console.log(error);
    }
  });

}




