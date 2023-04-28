let searchButton = document.querySelector("#search");

// Start
searchButton.addEventListener("click", function (event) {
    userInput = document.querySelector("#search-input").value;
    localStorage.setItem("userInput", JSON.stringify(userInput));
    location.href = "result.html"
});

function localFunc() {
    var artistButton = JSON.parse(localStorage.getItem("userInput"));
    console.log("artist button", artistButton)
    
    if (!artistButton) {
        localStorage.setItem("localArtist", JSON.stringify([artist]));
    } else {
        if (cityButton.includes(artist)) {
            return;
        }
        cityButton.unshift(artist);
        localStorage.setItem("city", JSON.stringify(cityButton));
        var citiesBtn = document.createElement("button");
        citiesBtn.setAttribute("class", "btn btn-outline-primary w-100 search-history")
        citiesBtn.textContent = city

        searchCard.appendChild(citiesBtn);
        citiesBtn.addEventListener("click", function (event) {
            city = event.target.textContent
            weather();
        })
    }

}

function displayBtn() {
    var cityButton = JSON.parse(localStorage.getItem("city"));
    if (cityButton) {
        for (var i = 0; i < cityButton.length; i++) {
            var citiesBtn = document.createElement("button");
            citiesBtn.setAttribute("class", "btn btn-outline-primary w-100 search-history")
            citiesBtn.textContent = cityButton[i]

            searchCard.appendChild(citiesBtn);
            citiesBtn.addEventListener("click", function (event) {
                city = event.target.textContent
                weather();
            })
        }
    }

}

displayBtn();