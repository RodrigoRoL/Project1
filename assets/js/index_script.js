let searchButton = document.querySelector("#search");
const artistListEl = document.getElementsByClassName(".previous-body");
// Start
searchButton.addEventListener("click", function (event) {
    userInput = document.querySelector("#search-input").value;
    localStorage.setItem("userInput", JSON.stringify(userInput));
    location.href = "result.html"
});

// const pastArtists = loadArtist();

// //Load events from local storage
// function loadArtist() {
//     const storedArtist = JSON.parse(localStorage.getItem('pastArtists'));
//     if (storedArtist) {
//         return storedArtist 
//     } else return [];
// }

// //Store searched artists in local storage
// function storedArtist() {
//     localStorage.setItem('pastArtists', JSON.stringify(pastArtists));
// }

// //Function to display the last 5 artists
// function displayArtist(pastArtists) {
//     artistListEl.empty();
//     pastArtists.splice(5);
//     console.log("splice", pastArtists);
//     const sortedArtist = [...pastArtists]; //Spread operator(...), pasa por cada elemento de pastArtist y los pone en un nuevo arreglo
//     sortedArtist.forEach(function (location) {
//         const artistDiv = $('<div>').addClass('col-12 artist');
//         const artistBtn = $('<button>').addClass('btn btn-light artist-btn').text(location.artist);
//         artistListEl.append(artistBtn);
//         artistListEl.append(artistDiv);
//     });
// }

let artist = JSON.parse(localStorage.getItem("userInput"))
const ticketId = "io5nerXdiuuhzQi2TB1bN1Dh0N9Vtllx";
const showLocation = `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketId}&keyword=${artist}&locale=*&countryCode=MX`

fetch(showLocation, {
  method: 'GET',
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Request failed');
    }
  })
//Store current artist in past artist

// const art = response.name;
// const id = response.id

// if(pastArtists[0]) {
//     pastArtists = $.grep(pastArtists, function(storedArtist){
//         return id !==storedArtist.id;
//     })
// }
// pastArtists.unshift({art, id});
// storedArtist();
// displayArtist(pastArtists);

// document.on("click", "button.artist-btn", function (event) {
//     const clickedartist = this.innerText;
//     const foundartist = $.grep(pastArtists, function (storedArtist) {
//         return clickedartist === storedArtist.artist;
//     })
//     const queryURL = buildURLFromId(foundartist[0].id)
//     searchWeather(queryURL);
// });



loadartist();
displayartist(pastArtists);
