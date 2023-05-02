let artist = JSON.parse(localStorage.getItem("userInput"))
const ticketid = "io5nerXdiuuhzQi2TB1bN1Dh0N9Vtllx";
// const p = document.createElement("p");
// document.body.appendChild(p)

const event1El = document.getElementById("event1");
const event2El = document.getElementById("event2");
const event3El = document.getElementById("event3");

  //Shows by Ticketmaster
function Show() {
  const showlocation = `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketid}&keyword=${artist}&locale=*&countryCode=MX`
  fetch(showlocation, {
    method: 'GET',
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
        console.log("event1", event1El);
        event1El.textContent = data._embedded.events[0].name;
        console.log("embedded", data._embedded.events[0].name);
        event2El.textContent = data._embedded.events[1].name;
        event3El.textContent = data._embedded.events[2].name;
        console.log("data", data)
    })
    .catch(error => {
      console.error('Error:', error);
    });
}



let searchButton = document.querySelector("#search");

Show();

//Return to menu button
let menuButton = document.querySelector("#menu");
menuButton.addEventListener("click", function (event) {
    location.href = "index.html"
});
