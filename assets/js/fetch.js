let artist = JSON.parse(localStorage.getItem("userInput"));
let nameEl = document.querySelector("#artist");
let followersEl = document.querySelector("#followers");
let genreEl = document.querySelector("#genre");

// Spotify Auth
const clientId = '083ca6c5e35e4936a1e52a1611cf4516';
const clientSecret = 'e97063521a0348f085cf54408a747090';
const base64ClientIdSecret = btoa(`${clientId}:${clientSecret}`);
const tokenUrl = 'https://accounts.spotify.com/api/token';

function getToken() {
  return fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${base64ClientIdSecret}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
      return data.access_token;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function artistSearch(accessToken) {
  const apiUrl = `https://api.spotify.com/v1/search?q=${artist}&type=artist`;

  return fetch(apiUrl, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
      console.log("data artist", data)
      const name = data.artists.items[0].name;
      const followers = data.artists.items[0].followers.total;
      const genres = data.artists.items[0].genres[0];
      const id = data.artists.items[0].id;

      nameEl.textContent = name;
      followersEl.textContent = followers + " followers";
      genreEl.textContent = genres;

      localStorage.setItem("id", JSON.stringify(id));
      return id; // we need to return the id for further calls
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function artistAlbums(artistId, accessToken) {
  const albumURL = `https://api.spotify.com/v1/artists/${artistId}/albums`;

  fetch(albumURL, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
        for (var i = 0; i <= 3; i++) {
            const albumName = data.items[i].name;
            const date = data.items[i].release_date;
            const year = dayjs(date).format("YYYY");
            const image = data.items[i].images[2].url;
            const spotify = data.items[i].external_urls.spotify;
    
            let newEl = document.createElement("article");
            newEl.innerHTML += `<figure class="media-left"><p class="image is-64x64"><img src=${image}></p></figure><div class="media-content"><div class="content"><p><strong>${albumName}</strong><small> ${year}</small><br><a href=${spotify} >Listen now on Spotify</a></p></div></div>`;
            newEl.className = "media";
            document.getElementById("top-albums").append(newEl);
          }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function relatedArtists(artistId, accessToken) {
  const relatedURL = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;

  fetch(relatedURL, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed');
      }
    })
    .then(data => {
        for (var i = 0; i <= 2; i++) {
            const relatedArtist = data.artists[i].name;
            const relatedFollowers = data.artists[i].followers.total;
            const relatedSpotify = data.artists[i].external_urls.spotify;
            const relatedImage = data.artists[i].images[2].url;
    
            let newEl = document.createElement("article");
            newEl.innerHTML += `<figure class="media-left"><p class="image is-64x64"><img class="is-rounded" src=${relatedImage}></p></figure><div class="media-content"><div class="content"><p><strong>${relatedArtist}</strong><small> ${relatedFollowers} Followers </small><br><a href=${relatedSpotify}>Explore</a></p></div></div>`;
            newEl.className = "media";
            document.getElementById("related-artists").append(newEl);
          }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

getToken().then(function (token) {
    // First, perform the artist search
    // the use of return statements in the .then() functions is essential for chaining Promises and passing data between them
    return artistSearch(token).then(function (artistId) {
      return { artistId, token };
      // By returning { artistId, token }, we can chain another .then() function after this one, 
      // which will receive this object as an argument. This allows us to pass both the artistId 
      // and the token to the subsequent steps in the Promise chain, ensuring we have the necessary 
      // information to call the artistAlbums() and relatedArtists() functions.
    });
  }).then(function ({ artistId, token }) {
    // Check if we have a valid artistId before proceeding
    if (artistId) {
      // Retrieve the artistId from localStorage here instead of getting it in each function
      let storedArtistId = JSON.parse(localStorage.getItem("id")); 
  
      // Pass both storedArtistId and token to the artistAlbums and relatedArtists functions
      artistAlbums(storedArtistId, token);
      relatedArtists(storedArtistId, token);
    } else {
      console.error('Error: Unable to fetch artist information');
    }
  }).catch(function (error) {
    console.error('Error:', error);
  });