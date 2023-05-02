let searchButton = document.querySelector("#search");
let divEl = document.querySelector(".previous-body");

// Start
searchButton.addEventListener("click", function (event) {
    userInput = document.querySelector("#search-input").value;
    localStorage.setItem("userInput", JSON.stringify(userInput));
    localFunc(userInput);
    location.href = "result.html"
});

function localFunc(userInput) {
    let localArtist = JSON.parse(localStorage.getItem("searches"));
    if (!localArtist) {
        localStorage.setItem("searches", JSON.stringify([userInput]))
    } else {
        if (localArtist.includes(userInput)) {
            return;
        }
        localArtist.push(userInput);
        localStorage.setItem("searches", JSON.stringify(localArtist));
    }
}

function displayBtn() {
    let localArtist = JSON.parse(localStorage.getItem("searches"));
    if (localArtist) {
        for (var i = 0; i < localArtist.length; i++) {
            var artistBtn = document.createElement("button");
            artistBtn.setAttribute("class", "btn")
            artistBtn.textContent = localArtist[i]

            divEl.append(artistBtn);
            artistBtn.addEventListener("click", function (event) {
                userInput = event.target.textContent
                localStorage.setItem("userInput", JSON.stringify(userInput));
                location.href = "result.html"
            })

        }
    }
}

displayBtn();

